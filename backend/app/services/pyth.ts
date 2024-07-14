import {
  PriceStatus,
  getPythProgramKeyForCluster,
  PythHttpClient,
} from "@pythnetwork/client";
import { Connection } from "@solana/web3.js";
import ENV from "../env";
import { PriceServiceConnection } from "@pythnetwork/price-service-client";
import { SOCKET } from "../../app";

const CONNECTION = new Connection(ENV.HELIUS_RPC);
const pythPublicKey = getPythProgramKeyForCluster("pythnet");
const pythClient = new PythHttpClient(CONNECTION, pythPublicKey);

export async function intializeListener() {
  const connection = new PriceServiceConnection("https://hermes.pyth.network");

  const priceIds = [
    "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d", // SOL/USD price id
  ];

  connection.subscribePriceFeedUpdates(priceIds, (priceFeed) => {
    SOCKET.emit("PythUpdate", {
      price: priceFeed.getPriceNoOlderThan(60)?.price,
    });
  });
}

export default { intializeListener };
