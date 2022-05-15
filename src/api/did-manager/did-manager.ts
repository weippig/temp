import {
    IIdentifier,
    IKey
} from '../core/types/IIdentifier'
import { computePublicKey } from '@ethersproject/signing-key'


export class DIDManeger {
    async createIdentifier(key:IKey): Promise<IIdentifier> {
        const compressedPublicKey = computePublicKey(`0x${key.publicKeyHex}`, true)
        const identifier = `did:ethr:ropsten:${compressedPublicKey}`

        let did:IIdentifier = {
            did: identifier,
            provider: 'did:ethr:ropsten',
            key: key
        }

        return did
    }
}