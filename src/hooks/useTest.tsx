import { getAll } from "@vercel/edge-config";

export async function test() {
  const config = await getAll();
  console.log(config,config.data);
}