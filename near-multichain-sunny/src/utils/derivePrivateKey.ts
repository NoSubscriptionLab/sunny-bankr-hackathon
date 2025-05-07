import { HDNodeWallet, Mnemonic } from 'ethers';

// Seed phrase hidden because repo is public
const mnemonic = "";
const path = "m/44'/60'/0'/0/0";

const main = () => {
  const derivedWallet = HDNodeWallet.fromMnemonic(
    Mnemonic.fromPhrase(mnemonic),
    path // Passamos aqui direto
  );

  console.log("🔐 Private Key:", derivedWallet.privateKey);
  console.log("📬 Address:", derivedWallet.address);
};

main();