import { Resolver, Query, Ctx, Int } from 'type-graphql';
import { AppDataSource } from '../db/AppDataSource';
import { UserLog, Chain, User, Asset, ChainActionProposal } from '../db/entity';
import { ChainOutput } from '../types/chain';
import { UserOutput } from '../types/user';
import { AssetOutput } from '../types/asset';
import { ChainActionProposalOutput } from '../types/chain_action_proposal';
import { EventProcessor } from '../processor/process';
import { UserLogOutput } from '../types';
@Resolver()
export class UserLogResolver {
  @Query(() => [UserLogOutput])
  async user_logs(@Ctx() context: any): Promise<UserLogOutput[]> {
    const repository = AppDataSource.getRepository(UserLog);
    const allLogs = await repository.find();
    return allLogs.map(entry => new UserLogOutput(entry));
  }
}
export class ChainResolver {
  @Query(() => [ChainOutput])
  async chains(@Ctx() context: any): Promise<ChainOutput[]> {
    const repository = AppDataSource.getRepository(Chain);
    const allChains = await repository.find();
    return allChains.map(entry => new ChainOutput(entry));
  }
}
export class UserResolver {
  @Query(() => [UserOutput])
  async users(@Ctx() context: any): Promise<UserOutput[]> {
    const repository = AppDataSource.getRepository(User);
    const allUsers = await repository.find();
    return allUsers.map(entry => new UserOutput(entry));
  }
}
export class AssetResolver {
  @Query(() => [AssetOutput])
  async assets(@Ctx() context: any): Promise<AssetOutput[]> {
    const repository = AppDataSource.getRepository(Asset);
    const allAssets = await repository.find();
    return allAssets.map(entry => new AssetOutput(entry));
  }
}
export class ChainActionProposalResolver {
  @Query(() => [ChainActionProposalOutput])
  async chain_action_proposals(@Ctx() context: any): Promise<ChainActionProposalOutput[]> {
    const repository = AppDataSource.getRepository(ChainActionProposal);
    const allProposals = await repository.find();
    return allProposals.map(entry => new ChainActionProposalOutput(entry));
  }
}
export class ReprocessResolver {
  @Query(() => Number)
  async reprocess(@Ctx() context: any): Promise<Number> {
    const eventProcessor = new EventProcessor();
    await eventProcessor.reprocess();

    // Add users
    const processedUsers = eventProcessor.getUsers();
    const usersToInsert: User[] = [];
    for (let user of processedUsers) {
      const newUser = new User();
      newUser.address = user.address;
      newUser.name = user.name;
      newUser.homechain = user.homechain;
      newUser.joined_timestamp = user.joined_timestamp.getDate();
      newUser.score = user.score;
      usersToInsert.push(newUser);
    }
    if (usersToInsert.length > 0) {
      const repository = AppDataSource.getRepository(User);
      await repository.save(usersToInsert);
    }

    // Add assets
    const processedAssets = eventProcessor.getAssets();
    const assetsToInsert: Asset[] = [];
    for (let asset of processedAssets) {
      const newAsset = new Asset();
      newAsset.chain_id = asset.chain_id;
      newAsset.token_id = asset.token_id;
      newAsset.type = asset.type;
      newAsset.creation_timestamp = asset.creation_timestamp.getDate();
      newAsset.owner = asset.owner;
      newAsset.xp = asset.xp;
      newAsset.health = asset.health;
      assetsToInsert.push(newAsset);
    }
    console.log('ASSETS:');
    console.log(assetsToInsert);
    if (assetsToInsert.length > 0) {
      const repositoryAssets = AppDataSource.getRepository(Asset);
      await repositoryAssets.save(assetsToInsert);
    }

    // Add chain action proposals
    const processedProposals = eventProcessor.getCurrentPeriodChainActionProposals();
    const proposalsToInsert: ChainActionProposal[] = [];
    for (let proposal of processedProposals) {
      const newProposal = new ChainActionProposal();
      newProposal.proposal_hash = proposal.chainActionProposalHash;
      newProposal.source_chain_id = proposal.sourceChain;
      newProposal.target_chain_id = proposal.targetChain;
      newProposal.type = proposal.actionType;
      newProposal.attack_area = proposal.attackArea;
      newProposal.attack_address = proposal.attackAddress;
      newProposal.votes = proposal.votes;
      proposalsToInsert.push(newProposal);
    }
    console.log('Chain Actions:');
    console.log(proposalsToInsert);
    if (proposalsToInsert.length > 0) {
      const repositoryAssets = AppDataSource.getRepository(ChainActionProposal);
      await repositoryAssets.save(proposalsToInsert);
    }


    return processedUsers.length + assetsToInsert.length;
  }
}