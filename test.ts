import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { Wallet, verifyMessage } from '@ethersproject/wallet'
import { computePublicKey, recoverPublicKey } from '@ethersproject/signing-key'
import { hashMessage } from '@ethersproject/hash'
import { arrayify } from '@ethersproject/bytes'
import { recoverAddress } from '@ethersproject/transactions'
const util = require('util')


async function resolve(did:string) {
  const providerConfig = {
    networks: [
      { name: "ropsten", rpcUrl: "https://ropsten.infura.io/v3/d3321433cd864acba8dcc581a2801225" }
    ]
  }

  const ethrDidResolver = getResolver(providerConfig)
  const didResolver = new Resolver(ethrDidResolver)

  const doc = await didResolver.resolve(did)
  console.log(util.inspect(doc, false, null, true))
}

async function hello(){
  const wallet = Wallet.createRandom()
  const mnemonic = wallet.mnemonic.phrase
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
  
  
  
  
  console.log('關於這個錢包：')
  const publicKeyHex = wallet.publicKey.substring(2)
  const privateKeyHex = wallet.privateKey.substring(2)
  const compressedPublicKey = computePublicKey(`0x${publicKeyHex}`, true)
  const identifier = `did:ethr:ropsten:${compressedPublicKey}`
  
  console.log('mnemonic: ', mnemonic)
  console.log('publicKeyHex: ', publicKeyHex)
  console.log('privateKeyHex: ', privateKeyHex)
  console.log('compressPublicKey: ', compressedPublicKey)
  console.log('identifier: ', identifier)
  console.log('用compressedPublicKey推回publicKey: ',computePublicKey(compressedPublicKey))

  console.log()
  resolve(identifier)
}

function checkPasswordConsistence(password1: string, password2: string): boolean {
  return password1===password2;
}
function checkPasswordIsValid(password: string): boolean {
  return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,14}$/.test(password)); 
}

// hello()

console.log(checkPasswordIsValid('helenrr88888'))