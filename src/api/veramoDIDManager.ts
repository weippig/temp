/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { agent } from './veramo/setup'
import { Wallet } from '@ethersproject/wallet'
import { computePublicKey } from '@ethersproject/signing-key'
import { ICreatedDID } from './types/IDIDManager'
import { isValidMnemonic } from '@ethersproject/hdnode'

export class DIDManager {
  async createDID (didMnemonic: string) {
    if (!isValidMnemonic(didMnemonic)) throw new Error('invalid Mnemonic')
    const wallet = Wallet.fromMnemonic(didMnemonic)

    const publicKeyHex = wallet.publicKey.substring(2)
    const privateKeyHex = wallet.privateKey.substring(2)
    const compressedPublicKey = computePublicKey(`0x${publicKeyHex}`, true)
    const identifier = `did:ethr:ropsten:${compressedPublicKey}`

    try {
      const identity = await agent.didManagerImport({
        did: identifier,
        provider: 'did:ethr:ropsten',
        controllerKeyId: publicKeyHex,
        keys: [
          {
            kid: publicKeyHex,
            kms: 'local',
            type: 'Secp256k1',
            publicKeyHex: publicKeyHex,
            privateKeyHex: privateKeyHex,
          },
        ],
        services: [],
      })
      console.log('New identity created')

      const did: ICreatedDID = {
        mnemonic: wallet.mnemonic.phrase,
        privateKey: wallet.privateKey,
        publicKey: wallet.publicKey,
        address: wallet.address,
        identity: identity,
      }
      return did
    } catch (err) {
      console.log(err)
    }
  }

  async listDIDs () {
    return await agent.didManagerFind()
  }

  async getDID (did: string) {
    const identifier = await agent.didManagerGet({
      did: did,
    })
    return identifier
  }

  async resolveDID (did: string) {
    const didDoc = await agent.resolveDid({
      didUrl: did,
    })
    return didDoc
  }
}