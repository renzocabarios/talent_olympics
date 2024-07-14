import { Connection, Keypair } from "@solana/web3.js";
import ENV from "../env";
import { PublicKey } from "@solana/web3.js";
import { OCR2Feed } from "@chainlink/solana-sdk";
import { AnchorProvider, Wallet } from "@project-serum/anchor";
import { SOCKET } from "../../app";

const CONNECTION = new Connection(ENV.HELIUS_RPC);

export async function intializeListener() {
  const CHAINLINK_FEED_ADDRESS = "CH31Xns5z3M1cTAbKW34jcxPPciazARpijcHj9rxtemt";

  const CHAINLINK_PROGRAM_ID = new PublicKey(
    "cjg3oHmg9uuPsP8D6g29NWvhySJkdYdAo9D25PRbKXJ"
  );

  const feedAddress = new PublicKey(CHAINLINK_FEED_ADDRESS);
  const provider = new AnchorProvider(
    CONNECTION,
    new Wallet(Keypair.generate()),
    {}
  );

  let dataFeed = await OCR2Feed.load(CHAINLINK_PROGRAM_ID, provider);

  dataFeed.onRound(feedAddress, (event) => {
    SOCKET.emit("ChainlinkUpdate", { price: event.answer.toString() });
  });
}

export default { intializeListener };
