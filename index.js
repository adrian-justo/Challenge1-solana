// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Get the wallet balance from a given address
const getWalletBalance = async (address) => {
    try {
        const walletBalance = await connection.getBalance(
            new PublicKey(address)
        );
        console.log(`Wallet ${address} balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async (address) => {
    try {
        // Request airdrop of 2 SOL to the wallet
        console.log(`Airdropping some SOL to wallet ${address}!`);
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(address),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async (wallets) => {
    if (wallets.length === 0) {
        console.log(`No argument input!`);
    }

    for (const address of wallets) {
        await getWalletBalance(address);
        await airDropSol(address);
        await getWalletBalance(address);
    }
}

mainFunction(process.argv.slice(2));
