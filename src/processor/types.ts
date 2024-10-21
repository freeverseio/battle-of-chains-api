export enum EventType {
  JoinedChainEvent,
  MultichainMintEvent,
  AttackEvent,
  ChainActionProposalEvent,
}

export enum ChainActionProposalOption {
  Defend,
  Improve,
  AttackArea,
  AttackAddress
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

export interface AttackEvent {
  _tokenIds: string[];
  _targetAddress: string;
  _operator: string;
  _attacker: string;
  _targetChain: number;
  _strategy: number;
  timestamp: Date;
  blockNumber: number;
  blockHash: string;
  txHash: string;
  logIndex: number;
}

export interface ChainActionProposalEvent {
  _operator: string;
  _user: string;
  _sourceChain: number;
  _action: {
    targetChain: number;
    actionType: ChainActionProposalOption;
    attackArea: number;
    attackAddress: string;
  };
  _comment: string;
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

export interface CurrentPeriodChainActionProposalType {
  chainActionProposalHash: string;
  sourceChain: number;
  action: {
    targetChain: number;
    actionType: ChainActionProposalOption;
    attackArea: number;
    attackAddress: string;
  };
  votes: number;
}