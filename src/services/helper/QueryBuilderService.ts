import { assetsQueryTemplate } from '../../queries/assets';
import { AssetWhereInput } from '../../types';

export class QueryBuilderService {
  static buildAssetsQuery(where?: AssetWhereInput): string { // Made 'where' optional
     let query = assetsQueryTemplate;
     // Replace placeholders in the query
    query = query.replace('#contractAddressPlaceholder', process.env.LAOS_BOC_CONTRACT_ADDRESS!);

    query = query.replace('#ownerPlaceholder', where?.owner ? `owner: "${where.owner}"` : '');
    query = query.replace('#tokenIdPlaceholder', where?.tokenId ? `tokenId: "${where.tokenId}"` : '');
    query = query.replace('#cursorPlaceholder', where?.cursor ? `, after: "${where.cursor}"` : '');

    return query;
  }
}
