import { verify } from '@noble/secp256k1';
import { sha256 } from '@noble/hashes/sha256';
import { utf8ToBytes, hexToBytes } from '@noble/hashes/utils';

function verifySignature({
  message,
  signatureHex,
  publicKeyHex,
}: {
  message: string;
  signatureHex: string;
  publicKeyHex: string;
}): boolean {
  const msgHash = sha256(utf8ToBytes(message));
  const signature = hexToBytes(signatureHex.replace(/^0x/, '')).slice(0, 64); // 👈 ajuste aqui
  const publicKey = hexToBytes(publicKeyHex);
  return verify(signature, msgHash, publicKey);
}

// Exemplo:
const message = JSON.stringify({
  type: 'authorize-deposit',
  campaignId: 'd94cb8cc-e596-4029-ab30-a8c0eec9d6a0',
  amount: '10',
  token: 'USDC',
  timestamp: 1746629003,
});

const signature = '0x3975fc7e3c978a274ab3be16e1973d72ea696d5cf34216b261fcd1514494a881756995ec9384fcec3f8df5e7bcba2526305bee153c193dee8cbdfa34bd65523d1c';
const publicKey = '61362cf07b4f8e13051f3ec52bab6f43d3364ca263fd4da2bd63a1ae39aff0be';

const isValid = verifySignature({
  message,
  signatureHex: signature,
  publicKeyHex: publicKey,
});

console.log('✅ Assinatura válida?', isValid);