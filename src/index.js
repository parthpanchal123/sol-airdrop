const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} = require("@solana/web3.js");

// Generate a new keypair ie (private key, public key)
const newPair = new Keypair();

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const privateKey = newPair._keypair.secretKey;

const getWalletBalance = async () => {

  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Generate the wallet from the privateKey
    const myWallet = Keypair.fromSecretKey(privateKey);

    const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey));

    console.log(`Wallet balance: ${walletBalance}`);
  }
  catch (err) {
    console.log(err);
  }

}

const airDropSol = async () => {
  try {
    const walletKeyPair = Keypair.fromSecretKey(privateKey);

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);

  } catch (err) {
    console.log(err);
  }
};

const driverFunction = async () => {
  try{
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
    console.log("AirDrop complete");
  }
  catch (err) {
    console.log(err);
  }
}

driverFunction();
