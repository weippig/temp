"use strict";
// import {
//   DIDDocument,
//   parse as parseDID,
//   Resolvable,
// } from 'did-resolver'
// import ethr from 'ethr-did-resolver'
// export { DIDDocument }
exports.__esModule = true;
// interface Options {
//   resolver: Resolvable
// }
var wallet_1 = require("@ethersproject/wallet");
var signing_key_1 = require("@ethersproject/signing-key");
var hash_1 = require("@ethersproject/hash");
var bytes_1 = require("@ethersproject/bytes");
var transactions_1 = require("@ethersproject/transactions");
var wallet = wallet_1.Wallet.createRandom();
var message = "Hello dapp";
var signature = await wallet.signMessage(message);
var expectedAddress = await wallet.getAddress();
var expectedPublicKey = wallet.publicKey;
console.log("ISSUING SIGNATURE");
console.log("ADDR:    ", expectedAddress);
console.log("PUB K:   ", expectedPublicKey);
console.log("SIG      ", signature);
console.log();
// Approach 1
var actualAddress = wallet_1.verifyMessage(message, signature);
console.log("APPROACH 1");
console.log("EXPECTED ADDR: ", expectedAddress);
console.log("ACTUAL ADDR:   ", actualAddress);
console.log();
// Approach 2
var msgHash = hash_1.hashMessage(message);
var msgHashBytes = bytes_1.arrayify(msgHash);
// Now you have the digest,
var recoveredPubKey = signing_key_1.recoverPublicKey(msgHashBytes, signature);
var recoveredAddress = transactions_1.recoverAddress(msgHashBytes, signature);
var matches = expectedPublicKey === recoveredPubKey;
console.log("APPROACH 2");
console.log("EXPECTED ADDR:    ", expectedAddress);
console.log("RECOVERED ADDR:   ", recoveredAddress);
console.log("EXPECTED PUB K:   ", expectedPublicKey);
console.log("RECOVERED PUB K:  ", recoveredPubKey);
console.log("SIGNATURE VALID:  ", matches);
console.log();
console.log('for create did');
var publicKeyHex = wallet.publicKey.substring(2);
var privateKeyHex = wallet.privateKey.substring(2);
var compressedPublicKey = signing_key_1.computePublicKey("0x" + publicKeyHex, true);
var identifier = "did:ethr:ropsten:" + compressedPublicKey;
console.log('publicKeyHex', publicKeyHex);
console.log('privateKeyHex', privateKeyHex);
console.log('compressPublicKey', compressedPublicKey);
console.log('identifier', identifier);
