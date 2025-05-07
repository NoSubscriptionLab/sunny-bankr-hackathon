import { Wallet } from 'ethers';

// private key hidden because repo is public
const privateKey = "";
const wallet = new Wallet(privateKey);

const payload = {
  type: "authorize-deposit",
  campaignId: "d94cb8cc-e596-4029-ab30-a8c0eec9d6a0",
  amount: "10",
  token: "BNKR",
  timestamp: Math.floor(Date.now() / 1000),
};

const message = JSON.stringify(payload);

async function sign() {
  const signature = await wallet.signMessage(message);

  console.log("🔏 Signature:", signature);
  console.log("📦 Message:", message);
  console.log("📬 Address:", wallet.address);
}

sign();