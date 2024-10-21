import { Chain } from "./types";

export async function getChains(): Promise<Chain[]> {
  return new Promise((resolve) => {
    const events: Chain[] = [
      {
        chain_id: 137,
        name: "Polygon PoS Mock",
        score: 242,
      },
    ];
    setTimeout(() => resolve(events), 1000); // Simulate a delay
  });
}