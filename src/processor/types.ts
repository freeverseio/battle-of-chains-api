export enum EventType {
  JoinedChainEvent,
  MultichainMintEvent
}

export type Chain = {
  chain_id: number;
  name: string;
  score: number;
};

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

  export type UserType = {
    address: string;
    homechain: number;
    name: string;
    joined_timestamp: Date;
    score: number;
};

export type AssetType = {
  chain_id: number;
  token_id: string;
  type: string;
  creation_timestamp: Date;
  owner: string;
  xp: number;
  health: number;
};