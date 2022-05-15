import { Wallet } from '@ethersproject/wallet'

export async function createMnemonic(): Promise<string[]>{
  const wallet = Wallet.createRandom()
  const mnemonic = wallet.mnemonic.phrase
  const mnemonicArray = mnemonic.split(" ");
  await chrome.storage.local.set({mnemonic: mnemonicArray});

  return mnemonicArray
}

export const getMnemonic = () => {
  chrome.storage.local.get('mnemonic', function (result) {
    return result.mnemonic
  })
}

export const shuffleMnemonic = (mnemonicArray: string[]): string[] => {
  const shuffledMnemonicArray = mnemonicArray.sort(() => Math.random() - 0.5);
  return shuffledMnemonicArray
}

export const checkMnemonicConsistence = (array1: string[], array2: string[]): boolean => {
  return array1.length===array2.length && array1.sort().join('|') === array2.sort().join('|')
}

export const checkMnemonicIsCorrect = (mnemonicArray: string[]) => {
  chrome.storage.local.get('mnemonic', function (result) {
    return result.mnemonic === mnemonicArray
  })
}
