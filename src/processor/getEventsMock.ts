import { JoinedChainEvent, MultichainMintEvent, AttackEvent, ChainActionProposalEvent, ChainActionProposalOption } from "./types";

const reasonableDate = 1729253900*1000;
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
        _user: "0x1111111111111111111111111111111111111111",
        _type: 3,
        _homeChain: 2,
        timestamp: new Date(reasonableDate + 2 * oneSec),
        blockNumber: reasonableBlock +  2 * oneSec,
        blockHash: "0xghi789",
        txHash: "0xjkl012",
        logIndex: 2,
      },
      {
        _tokenId: BigInt(9123456789),
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
        _tokenId: BigInt(99123456789),
        _user: "0x3311111111111111111111111111111111111133",
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
export async function getAttackEvents(): Promise<AttackEvent[]> {
  return new Promise((resolve) => {
    const events: AttackEvent[] = [
      {
        _tokenIds: ['123456789', '9123456789'],
        _targetAddress: "0x1111111111111111111111111111111111111111",
        _operator: "0x2211111111111111111111111111111111111122",
        _attacker: "0x2211111111111111111111111111111111111122",
        _targetChain: 137,
        _strategy: 0,
        timestamp: new Date(reasonableDate + 2000 * oneSec),
        blockNumber: reasonableBlock +  20 * oneSec,
        blockHash: "0xghi789232",
        txHash: "0xjkl012321",
        logIndex: 0,
      },
      {
        _tokenIds: [],
        _targetAddress: "0x1111111111111111111111111111111111111111",
        _operator: "0x3311111111111111111111111111111111111133",
        _attacker: "0x2211111111111111111111111111111111111122",
        _targetChain: 137,
        _strategy: 0,
        timestamp: new Date(reasonableDate + oneSec),
        blockNumber: reasonableBlock + 1000,
        blockHash: "0xghi789",
        txHash: "0xjkl012",
        logIndex: 2,
      },
      {
        _tokenIds: [],
        _targetAddress: "0x3311111111111111111111111111111111111133",
        _operator: "0x3311111111111111111111111111111111111133",
        _attacker: "0x2211111111111111111111111111111111111122",
        _targetChain: 1,
        _strategy: 0,
        timestamp: new Date(reasonableDate + oneSec),
        blockNumber: reasonableBlock + 1000,
        blockHash: "0xghi789",
        txHash: "0xjkl012",
        logIndex: 2,
      },
    ];
    setTimeout(() => resolve(events), 1000); // Simulate a delay
  });
}
export async function getChainActionProposalEvents(): Promise<ChainActionProposalEvent[]> {
  return new Promise((resolve) => {
    const events: ChainActionProposalEvent[] = [
      {
        _operator: "0x3311111111111111111111111111111111111133",
        _user: "0x2211111111111111111111111111111111111122",
        _sourceChain: 1,
        _action: {
          targetChain: 137,
          actionType: ChainActionProposalOption.Defend,
          attackArea: 0,
          attackAddress: "0x0",
        },
        _comment: "Please do this, it benefits us all",
        timestamp: new Date(reasonableDate + 53200 * oneSec),
        blockNumber: reasonableBlock + 5000,
        blockHash: "0xghi78ddd9",
        txHash: "0xjkl01ss2",
        logIndex: 0,
      },
      {
        _operator: "0x2211111111111111111111111111111111111122",
        _user: "0x2211111111111111111111111111111111111122",
        _sourceChain: 1,
        _action: {
          targetChain: 137,
          actionType: ChainActionProposalOption.Defend,
          attackArea: 0,
          attackAddress: "0x0",
        },
        _comment: "Please do this, it benefits us all",
        timestamp: new Date(reasonableDate + 53200 * oneSec),
        blockNumber: reasonableBlock + 5000,
        blockHash: "0xghi78ddd9",
        txHash: "0xjkl01ss2",
        logIndex: 1,
      },
      {
        _operator: "0x2211111111111111111111111111111111111122",
        _user: "0x2211111111111111111111111111111111111122",
        _sourceChain: 1,
        _action: {
          targetChain: 137,
          actionType: ChainActionProposalOption.Improve,
          attackArea: 0,
          attackAddress: "0x0",
        },
        _comment: "Please do this, it benefits us all",
        timestamp: new Date(reasonableDate + 93200 * oneSec),
        blockNumber: reasonableBlock + 9000,
        blockHash: "0xghi78dsddd9",
        txHash: "0xjkl01ssds2",
        logIndex: 0,
      },
    ];
    setTimeout(() => resolve(events), 1000); // Simulate a delay
  });
}
