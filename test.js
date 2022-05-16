"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var did_resolver_1 = require("did-resolver");
var ethr_did_resolver_1 = require("ethr-did-resolver");
var wallet_1 = require("@ethersproject/wallet");
var signing_key_1 = require("@ethersproject/signing-key");
var hash_1 = require("@ethersproject/hash");
var bytes_1 = require("@ethersproject/bytes");
var transactions_1 = require("@ethersproject/transactions");
var util = require('util');
function resolve(did) {
    return __awaiter(this, void 0, void 0, function () {
        var providerConfig, ethrDidResolver, didResolver, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    providerConfig = {
                        networks: [
                            { name: "ropsten", rpcUrl: "https://ropsten.infura.io/v3/d3321433cd864acba8dcc581a2801225" }
                        ]
                    };
                    ethrDidResolver = ethr_did_resolver_1.getResolver(providerConfig);
                    didResolver = new did_resolver_1.Resolver(ethrDidResolver);
                    return [4 /*yield*/, didResolver.resolve(did)];
                case 1:
                    doc = _a.sent();
                    console.log(util.inspect(doc, false, null, true));
                    return [2 /*return*/];
            }
        });
    });
}
function hello() {
    return __awaiter(this, void 0, void 0, function () {
        var wallet, mnemonic, message, signature, expectedAddress, expectedPublicKey, actualAddress, msgHash, msgHashBytes, recoveredPubKey, recoveredAddress, matches, publicKeyHex, privateKeyHex, compressedPublicKey, identifier;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wallet = wallet_1.Wallet.createRandom();
                    mnemonic = wallet.mnemonic.phrase;
                    message = "Hello dapp";
                    return [4 /*yield*/, wallet.signMessage(message)];
                case 1:
                    signature = _a.sent();
                    return [4 /*yield*/, wallet.getAddress()];
                case 2:
                    expectedAddress = _a.sent();
                    expectedPublicKey = wallet.publicKey;
                    console.log("ISSUING SIGNATURE");
                    console.log("ADDR:    ", expectedAddress);
                    console.log("PUB K:   ", expectedPublicKey);
                    console.log("SIG      ", signature);
                    console.log();
                    actualAddress = wallet_1.verifyMessage(message, signature);
                    console.log("APPROACH 1");
                    console.log("EXPECTED ADDR: ", expectedAddress);
                    console.log("ACTUAL ADDR:   ", actualAddress);
                    console.log();
                    msgHash = hash_1.hashMessage(message);
                    msgHashBytes = bytes_1.arrayify(msgHash);
                    recoveredPubKey = signing_key_1.recoverPublicKey(msgHashBytes, signature);
                    recoveredAddress = transactions_1.recoverAddress(msgHashBytes, signature);
                    matches = expectedPublicKey === recoveredPubKey;
                    console.log("APPROACH 2");
                    console.log("EXPECTED ADDR:    ", expectedAddress);
                    console.log("RECOVERED ADDR:   ", recoveredAddress);
                    console.log("EXPECTED PUB K:   ", expectedPublicKey);
                    console.log("RECOVERED PUB K:  ", recoveredPubKey);
                    console.log("SIGNATURE VALID:  ", matches);
                    console.log();
                    console.log('關於這個錢包：');
                    publicKeyHex = wallet.publicKey.substring(2);
                    privateKeyHex = wallet.privateKey.substring(2);
                    compressedPublicKey = signing_key_1.computePublicKey("0x" + publicKeyHex, true);
                    identifier = "did:ethr:ropsten:" + compressedPublicKey;
                    console.log('mnemonic: ', mnemonic);
                    console.log('publicKeyHex: ', publicKeyHex);
                    console.log('privateKeyHex: ', privateKeyHex);
                    console.log('compressPublicKey: ', compressedPublicKey);
                    console.log('identifier: ', identifier);
                    console.log('用compressedPublicKey推回publicKey: ', signing_key_1.computePublicKey(compressedPublicKey));
                    console.log();
                    resolve(identifier);
                    return [2 /*return*/];
            }
        });
    });
}
function checkPasswordConsistence(password1, password2) {
    return password1 === password2;
}
function checkPasswordIsValid(password) {
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,14}$/.test(password));
}
// hello()
console.log(checkPasswordIsValid('helenpig'));
