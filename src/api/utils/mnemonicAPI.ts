import { Wallet } from '@ethersproject/wallet'

export function createMnemonic() {
  const wallet = Wallet.createRandom()
  const mnemonic = wallet.mnemonic.phrase
  const mnemonicArray = mnemonic.split(" ")

  chrome.storage.local.set({mnemonic: mnemonic})

  return mnemonicArray
}

export function getMnemonic(callback?: any) {
  chrome.storage.local.get('mnemonic', function (result) {
    return result.mnemonic
  })
}

// export const getMnemonic = (callback?: any) => {
//   chrome.storage.local.get('mnemonic', function (result) {
//     callback(result.mnemonic)
//   })
// }

// export const getMnemonicArray = () => {
//   chrome.storage.local.get('mnemonic', function (result) {
//     return result.mnemonic.split(" ")
//   })
// }

export function shuffleMnemonic(mnemonicArray: string[]): string[]{
  const shuffledMnemonicArray = mnemonicArray.sort(() => Math.random() - 0.5);
  return shuffledMnemonicArray
}

export function checkMnemonicConsistence(array1: string[], array2: string[]): boolean{
  return array1.length===array2.length && array1.sort().join('|') === array2.sort().join('|')
}

export function checkMnemonicIsCorrect(mnemonicArray: string[], callback: (result: boolean) => any){
  chrome.storage.local.get('mnemonic', function (result) {
    callback(result.mnemonic.split(" ") === mnemonicArray)
  })
}