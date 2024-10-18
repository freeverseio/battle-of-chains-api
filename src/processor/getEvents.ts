import { JoinedChainType, RawMultichainMint, Event } from "./types";

export async function getEvents(): Promise<Event[]> {
  return new Promise((resolve) => {
    const events: Event[] = [
      {
        _user: "0x1111111111111111111111111111111111111111",
        _homeChain: 1,
        _nickname: "Alice",
        timestamp: new Date(),
        blockNumber: 1000,
        blockHash: "0xabc123",
        txHash: "0xdef456",
        logIndex: 1,
      },
      {
        _tokenId: BigInt(123456789),
        _user: "0x2222222222222222222222222222222222222222",
        _type: 42,
        _homeChain: 2,
        timestamp: new Date(),
        blockNumber: 2000,
        blockHash: "0xghi789",
        txHash: "0xjkl012",
        logIndex: 2,
      },
    ];
    setTimeout(() => resolve(events), 1000); // Simulate a delay
  });
}