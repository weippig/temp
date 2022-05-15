// import {
//   DIDDocument,
//   parse as parseDID,
//   Resolvable,
// } from 'did-resolver'
// import ethr from 'ethr-did-resolver'
// export { DIDDocument }



// interface Options {
//   resolver: Resolvable
// }

import { Wallet, verifyMessage } from '@ethersproject/wallet'
import { computePublicKey, recoverPublicKey } from '@ethersproject/signing-key'
import { hashMessage } from '@ethersproject/hash'
import { arrayify } from '@ethersproject/bytes'
import { recoverAddress } from '@ethersproject/transactions'

const wallet = Wallet.createRandom()
const message = "Hello dapp"
const signature = await wallet.signMessage(message)
const expectedAddress = await wallet.getAddress()
const expectedPublicKey = wallet.publicKey

console.log("ISSUING SIGNATURE")
console.log("ADDR:    ", expectedAddress)
console.log("PUB K:   ", expectedPublicKey)
console.log("SIG      ", signature)
console.log()

// Approach 1
const actualAddress = verifyMessage(message, signature)

console.log("APPROACH 1")
console.log("EXPECTED ADDR: ", expectedAddress)
console.log("ACTUAL ADDR:   ", actualAddress)
console.log()

// Approach 2
const msgHash = hashMessage(message);
const msgHashBytes = arrayify(msgHash);

// Now you have the digest,
const recoveredPubKey = recoverPublicKey(msgHashBytes, signature);
const recoveredAddress = recoverAddress(msgHashBytes, signature);

const matches = expectedPublicKey === recoveredPubKey

console.log("APPROACH 2")
console.log("EXPECTED ADDR:    ", expectedAddress)
console.log("RECOVERED ADDR:   ", recoveredAddress)

console.log("EXPECTED PUB K:   ", expectedPublicKey)
console.log("RECOVERED PUB K:  ", recoveredPubKey)

console.log("SIGNATURE VALID:  ", matches)
console.log()




console.log('for create did')
const publicKeyHex = wallet.publicKey.substring(2)
const privateKeyHex = wallet.privateKey.substring(2)
const compressedPublicKey = computePublicKey(`0x${publicKeyHex}`, true)
const identifier = `did:ethr:ropsten:${compressedPublicKey}`

console.log('publicKeyHex', publicKeyHex)
console.log('privateKeyHex', privateKeyHex)
console.log('compressPublicKey', compressedPublicKey)
console.log('identifier', identifier)