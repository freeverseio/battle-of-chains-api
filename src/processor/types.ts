export type JoinedChainEvent = {
    _user: string;
    _homeChain: number;
    _nickname: string;
    timestamp: Date;
    blockNumber: number;
    blockHash: string;
    txHash: string;
    logIndex: number;
};

export type MultichainMintEvent = {
    _tokenId: bigint;
    _user: string;
    _type: number;
    _homeChain: number;
    timestamp: Date;
    blockNumber: number;
    blockHash: string;
    txHash: string;
    logIndex: number;
  }

  export type Event = JoinedChainEvent | MultichainMintEvent;