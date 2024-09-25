import { Attack, AttackWhereInput } from '../types';
import { parse } from 'graphql';
import { Coordinates } from '../types/coordinates';
import { CoordinatesHelper } from './helper/CoordinatesHelper';
import { QueryBuilderService } from './helper/QueryBuilderService';
export class AttackService {
  constructor(private context: any) { }

  async getAttacks(where?: AttackWhereInput): Promise<Attack[]> {
    const ownershipContracts = JSON.parse(process.env.OWNERSHIP_CONTRACTS!);
    const query = QueryBuilderService.buildAssetsQuery(ownershipContracts["137"], where); // TODO: for all chains
    
    // Ensure the query is a valid string before parsing
    if (!query) {
      throw new Error('Generated query is invalid');
    }
  
    const result = await this.context.indexerExec({
      document: parse(query),
      context: this.context,
    });
  
    const attacks = result.data.transfers.map((transfer: any) => {
      const coordinates = CoordinatesHelper.getXYFromAttackAddress(transfer.to);
      return new Attack({
        from: transfer.from,
        to: transfer.to,
        tokenId: transfer.tokenId,
        coordinates: coordinates,
      });
    });
    return attacks;
  }

  
}
