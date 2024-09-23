import { Attack, AttackWhereInput } from '../types';
import { parse } from 'graphql';
import { Coordinates } from '../types/coordinates';
import { CoordinatesHelper } from './helper/CoordinatesHelper';
import { QueryBuilderService } from './helper/QueryBuilderService';
export class AttackService {
  constructor(private context: any) { }

  async getAttacks(where?: AttackWhereInput): Promise<Attack[]> {
    let query = QueryBuilderService.buildAttacksQuery(process.env.POLYGON_BOC_CONTRACT_ADDRESS!, where);
    
    // Ensure the query is a valid string before parsing
    if (!query) {
      throw new Error('Generated query is invalid');
    }
  
    const result = await this.context.indexerExec({
      document: parse(query),
      context: this.context,
    });
  
    const attacks = result.data.transfers.map((transfer: any) => {
      const coordinates = CoordinatesHelper.getXYFromAddress(transfer.to);
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
