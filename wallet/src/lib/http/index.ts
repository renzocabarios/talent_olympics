import axios from "axios";

export const API_INSTANCE = axios.create({ baseURL: "http://localhost:9000/" });

export async function GET(uri: string) {
  return await API_INSTANCE.get(uri);
}
