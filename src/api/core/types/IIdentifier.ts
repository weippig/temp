/**
 * Identifier interface
 * @public
 */
export interface IIdentifier {
  /**
   * Decentralized identifier
   */
  did: string

  /**
   * Optional. Identifier alias. Can be used to reference an object in an external system
   */
  alias?: string

  /**
   * Identifier provider name
   */
  provider: string

  /**
   * Controller key id
   */
  controllerKeyId?: string

  /**
   * Array of managed keys
   */
  key: IKey
}


/**
 * Cryptographic key type
 * @public
 */
export type TKeyType = 'Ed25519' | 'Secp256k1' | 'X25519' | 'Bls12381G1' | 'Bls12381G2'

/**
 * Cryptographic key
 * @public
 */
export interface IKey {
  /**
   * Key type
   */
  type: TKeyType

  /**
   * Public key
   */
  publicKeyHex: string

  /**
   * Optional. Private key
   */
  privateKeyHex?: string

  /**
   * Optional. Key metadata. This should be used to determine which algorithms are supported.
   */
  meta?: KeyMetadata | null
}

export interface KeyMetadata {
  algorithms?: string[]
  [x: string]: any
}
