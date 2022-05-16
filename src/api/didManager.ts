import {
    IIdentifier,
    IKey
} from './core/types/IIdentifier'
import { computePublicKey } from '@ethersproject/signing-key'


export function createIdentifier(key:IKey): IIdentifier {
    const compressedPublicKey = computePublicKey(`0x${key.publicKeyHex}`, true)
    const identifier = `did:ethr:rinkeby:${compressedPublicKey}`

    let did:IIdentifier = {
        did: identifier,
        provider: 'did:ethr:rinkeby',
        key: key
    }

    _storeIdentifier(did)


    return did
}


// export function getIdentifier(callback?: any) {
//     chrome.storage.local.get('did', function (result) {
//         return result.did
//     })
// }

function _storeIdentifier(did: IIdentifier) {
    chrome.storage.local.set({did: did})
}

