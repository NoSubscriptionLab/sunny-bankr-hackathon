import { Near, keyStores, Contract } from 'near-api-js';
import { connect } from 'near-api-js';
import * as dotenv from 'dotenv';

dotenv.config();

const PUBLIC_KEY = '61362cf07b4f8e13051f3ec52bab6f43d3364ca263fd4da2bd63a1ae39aff0be';
const FOREIGN_ADDRESS = '0x397D55adAA5A6dCacA1C492a28d2B5f96e5c265a';
const MESSAGE = JSON.stringify({
  type: "authorize-deposit",
  campaignId: "d94cb8cc-e596-4029-ab30-a8c0eec9d6a0",
  amount: "10",
  token: "USDC",
  timestamp: 1746629003
});
const SIGNATURE = '0x3975fc7e3c978a274ab3be16e1973d72ea696d5cf34216b261fcd1514494a881756995ec9384fcec3f8df5e7bcba2526305bee153c193dee8cbdfa34bd65523d1c';

const CONTRACT_NAME = "chain-signature-carlosg.testnet";

async function main() {
  const keyStore = new keyStores.InMemoryKeyStore(); // sem chave privada pq só vamos chamar método de view
  const near = await connect({
    networkId: 'testnet',
    keyStore,
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
  });

  const account = await near.account('example.testnet'); // qualquer conta válida no testnet (sem necessidade de chave)

  const contract: any = new Contract(account, CONTRACT_NAME, {
    viewMethods: ['verify'],
    changeMethods: [],
  });

  const result = await contract.verify({
    public_key: PUBLIC_KEY,
    foreign_address: FOREIGN_ADDRESS,
    message: MESSAGE,
    signature: SIGNATURE,
  });

  console.log('✅ Verificação retornou:', result);
}

main().catch(console.error);