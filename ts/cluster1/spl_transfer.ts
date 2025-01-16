import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { Commitment, Connection, Keypair, PublicKey } from "@solana/web3.js";
import wallet from "./wallet/wallet.json";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("5aRrfMQATNY2r4SMxeTeyQCZJoHmXboQxfou81WBrvrV");

// Recipient address
const to = new PublicKey("Ep42nExonCSkeXx2Lbu8uVaJMBb63VNcysHu7t2Zp6Ln");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);

        // Get the token account of the toWallet address, and if it does not exist, create it
        const to_ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);
        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(connection, keypair, ata.address, to_ata.address, keypair.publicKey, 99999999);
        console.log("Transferred token complete:", tx.toString());
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();