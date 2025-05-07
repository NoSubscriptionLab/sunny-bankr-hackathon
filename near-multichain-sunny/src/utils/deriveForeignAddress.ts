import { keccak256 } from '@ethersproject/keccak256';
import { arrayify } from '@ethersproject/bytes';

function deriveForeignAddress(publicKeyHex: string): string {
  const hash = keccak256(arrayify('0x' + publicKeyHex));
  return '0x' + hash.slice(-40);
}

// Executa se rodado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  const publicKeyHex = '61362cf07b4f8e13051f3ec52bab6f43d3364ca263fd4da2bd63a1ae39aff0be';
  const derived = deriveForeignAddress(publicKeyHex);
  console.log('🔗 Derived Ethereum/Base Address:', derived);
}

export { deriveForeignAddress };