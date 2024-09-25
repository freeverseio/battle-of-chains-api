import { Asset, AssetWhereInput, AssetType } from "../types";
import { CoordinatesHelper } from "./helper/CoordinatesHelper";
import { QueryBuilderService } from "./helper/QueryBuilderService";
import { parse } from 'graphql';

export class AssetService {
  constructor(private context: any) { }

  async getAssets(where?: AssetWhereInput): Promise<Asset[]> {
    const ownershipContracts = JSON.parse(process.env.OWNERSHIP_CONTRACTS!);
    const query = QueryBuilderService.buildAssetsQuery(ownershipContracts["137"], where); // TODO: for all chains
    
    const result = await this.context.indexerExec({
      document: parse(query),
      context: this.context,
    });

    const assets = result.data.tokens.edges.map((edge: any) => {
      const coordinates = CoordinatesHelper.getXYFromAddress(edge.node.owner);
      return new Asset({
        tokenId: edge.node.tokenId,
        name: edge.node.name,
        image: edge.node.image,
        description: edge.node.description,
        attributes: edge.node.attributes,
        type: this.getAssetTypeFromTokenId(edge.node.tokenId),
        coordinates,
      });
    });

    return assets;
  }
   getAssetTypeFromTokenId(tokenId: string): number {
    const result = (BigInt(tokenId) >> 160n) & 0x7n;
    return Number(result);
}
}
