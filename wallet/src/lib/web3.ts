import {
  Connection,
  Keypair,
  ParsedAccountData,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { RPC_URL } from "./env";
import * as bip39 from "bip39";

export const CONNECTION = new Connection(RPC_URL);

export function getKeypairFromNemomnic(value: string) {
  const seed = bip39.mnemonicToSeedSync(value, "");
  return Keypair.fromSeed(seed.subarray(0, 32));
}

interface ITransferSolTransaction {
  fromPubkey: PublicKey;
  toPubkey: PublicKey;
  lamports: number | bigint;
}

export function transferSolTransaction({
  fromPubkey,
  toPubkey,
  lamports,
}: ITransferSolTransaction) {
  return new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports,
    })
  );
}

export async function getNumberDecimals(mintAddress: string): Promise<number> {
  const info = await CONNECTION.getParsedAccountInfo(
    new PublicKey(mintAddress)
  );
  const result = (info.value?.data as ParsedAccountData).parsed.info
    .decimals as number;
  return result;
}
