import { JoinedChainEvent, MultichainMintEvent } from "./types";

const reasonableDate = 1729253900;
const reasonableBlock = 1000;
const oneSec = 1000;

export async function getJoinedChainEvents(): Promise<JoinedChainEvent[]> {
  return new Promise((resolve) => {
    const events: JoinedChainEvent[] = [
      {
        _user: "0x3311111111111111111111111111111111111133",
        _homeChain: 137,
        _nickname: "Carol",
        timestamp: new Date(reasonableDate + 10 * oneSec),
        blockNumber: reasonableBlock + 10,
        blockHash: "0xabc567",
        txHash: "0xdef789",
        logIndex: 0,
      },
      {
        _user: "0x2211111111111111111111111111111111111122",
        _homeChain: 137,
        _nickname: "Bob",
        timestamp: new Date(reasonableDate),
        blockNumber: reasonableBlock,
        blockHash: "0xabc123",
        txHash: "0xdef000",
        logIndex: 1,
      },
      {
        _user: "0x1111111111111111111111111111111111111111",
        _homeChain: 137,
        _nickname: "Alice",
        timestamp: new Date(reasonableDate),
        blockNumber: reasonableBlock,
        blockHash: "0xabc123",
        txHash: "0xdef456",
        logIndex: 0,
      },      
    ];
    setTimeout(() => resolve(events), 1000); // Simulate a delay
  });
}
export async function getMultichainMintEvents(): Promise<MultichainMintEvent[]> {
  return new Promise((resolve) => {
    const events: MultichainMintEvent[] = [
      {
        _tokenId: BigInt(123456789),
        _user: "0x2222222222222222222222222222222222222222",
        _type: 3,
        _homeChain: 2,
        timestamp: new Date(reasonableDate + 2 * oneSec),
        blockNumber: reasonableBlock +  2 * oneSec,
        blockHash: "0xghi789",
        txHash: "0xjkl012",
        logIndex: 2,
      },
      {
        _tokenId: BigInt(123456789),
        _user: "0x2211111111111111111111111111111111111122",
        _type: 2,
        _homeChain: 2,
        timestamp: new Date(reasonableDate + oneSec),
        blockNumber: reasonableBlock + 1000,
        blockHash: "0xghi789",
        txHash: "0xjkl012",
        logIndex: 2,
      },
      {
        _tokenId: BigInt(123456789),
        _user: "0x2222222222222222222222222222222222222222",
        _type: 1,
        _homeChain: 2,
        timestamp: new Date(reasonableDate + oneSec),
        blockNumber: reasonableBlock + 1000,
        blockHash: "0xghi789",
        txHash: "0xjkl012",
        logIndex: 1,
      },

    ];
    setTimeout(() => resolve(events), 1000); // Simulate a delay
  });
}