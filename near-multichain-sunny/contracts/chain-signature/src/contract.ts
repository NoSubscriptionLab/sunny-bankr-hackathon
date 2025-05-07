import { NearBindgen, view } from 'near-sdk-js';
// @ts-ignore
import { verify, utils } from '@noble/secp256k1';
import * as secp256k1 from 'noble-secp256k1';

@NearBindgen({})
class Contract {
  @view({})
  verify({
    public_key,
    foreign_address,
    message,
    signature,
  }: {
    public_key: string,
    foreign_address: string,
    message: string,
    signature: string
  }): boolean {
    try {
      const msgHash = utils.hash.keccak256(message);
      const isValid = secp256k1.verify(signature, msgHash, public_key);

      // Opcional: derivar o endereço e conferir se bate
      const derivedAddress = '0x' + utils.hash.keccak256(Buffer.from(public_key, 'hex')).slice(-40);
      const addressMatches = derivedAddress.toLowerCase() === foreign_address.toLowerCase();

      return isValid && addressMatches;
    } catch (e) {
      return false;
    }
  }
}
