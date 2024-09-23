import { assetsQueryTemplate } from '../../queries/assets';
import { attacksQueryTemplate } from '../../queries/attacks';
import { AssetWhereInput, AttackWhereInput } from '../../types';

export class QueryBuilderService {
  static buildAssetsQuery(contractAddress: string, where?: AssetWhereInput): string { // Made 'where' optional
     let query = assetsQueryTemplate;
     // Replace placeholders in the query
    query = query.replace('#contractAddressPlaceholder', contractAddress);

    query = query.replace('#ownerPlaceholder', where?.owner ? `owner: "${where.owner}"` : '');
    query = query.replace('#tokenIdPlaceholder', where?.tokenId ? `tokenId: "${where.tokenId}"` : '');
    query = query.replace('#cursorPlaceholder', where?.cursor ? `, after: "${where.cursor}"` : '');

    return query;
  }

  static buildAttacksQuery(contractAddress: string, where?: AttackWhereInput): string {
    let query = attacksQueryTemplate;
    query = query.replace('#contractAddressPlaceholder', contractAddress);
    if (where && where.chainId && where.coordinates) {
      const { x, y } = where.coordinates;
      const address = QueryBuilderService.getAttackAddress(where.chainId, x, y);
      query = query.replace('#toPlaceholder', `, to: "${address}"` );
    } else if (where && where.chainId && !where.coordinates) {
      const address = QueryBuilderService.getAttackAddress(where.chainId);
      query = query.replace('#toPlaceholder', `, to_startsWith: "${address}"` );
    } else {
      query = query.replace('#toPlaceholder', '');
    }
    return query;
  }

  static getAttackAddress(targetChainId: number, x?: number, y?: number) {
    const targetChainIdBig = BigInt(targetChainId);
    if (x === undefined || y === undefined) {
        // Return only the chainId part
        const addressHex = targetChainIdBig.toString(16).padStart(24, '0'); 
        return '0x' + addressHex;
    } else {
        const xBig = BigInt(x);
        const yBig = BigInt(y);
        const addressBig = (targetChainIdBig << 64n) | (xBig << 32n) | yBig;
        const addressHex = addressBig.toString(16).padStart(40, '0');
        return '0x' + addressHex;
    }
  }
}