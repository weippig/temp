import { IIdentifier } from '@veramo/core'

export interface ICreatedDID {
    mnemonic: string,
    publicKey: string,
    privateKey: string,
    address: string,
    identity: IIdentifier
}