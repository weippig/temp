import { IKey } from './core/types/IIdentifier'
import { Wallet } from '@ethersproject/wallet'
import { isValidMnemonic } from '@ethersproject/hdnode'

export function createKey():IKey {
    const wallet = Wallet.createRandom()
    const publicKeyHex = wallet.publicKey.substring(2)
    const privateKeyHex = wallet.privateKey.substring(2)

    let key :IKey = {
        type: 'Secp256k1',
        publicKeyHex: publicKeyHex,
        privateKeyHex: privateKeyHex,
        meta: {
            algorithms: [
                'ES256K',
                'ES256K-R',
                'eth_signTransaction',
                'eth_signTypedData',
                'eth_signMessage'
                ]
        }
    }

    _storeMnemonic(wallet.mnemonic.phrase)

    return key
}

export function importKey(mnemonic: string): IKey {
    if (!isValidMnemonic(mnemonic)) throw new Error('invalid Mnemonic')
    const wallet = Wallet.fromMnemonic(mnemonic)
    const publicKeyHex = wallet.publicKey.substring(2)
    const privateKeyHex = wallet.privateKey.substring(2)

    let key :IKey = {
        type: 'Secp256k1',
        publicKeyHex: publicKeyHex,
        privateKeyHex: privateKeyHex,
        meta: {
            algorithms: [
                'ES256K',
                'ES256K-R',
                'eth_signTransaction',
                'eth_signTypedData',
                'eth_signMessage'
                ]
        }
    }

    _storeMnemonic(wallet.mnemonic.phrase)

    return key
}


function _storeMnemonic(mnemonic: string) {
    chrome.storage.local.set({mnemonic: mnemonic})
}