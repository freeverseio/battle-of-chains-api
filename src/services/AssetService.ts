import { Asset, AssetWhereInput } from "../types";
import { CoordinatesHelper } from "./helper/CoordinatesHelper";
import { QueryBuilderService } from "./helper/QueryBuilderService";
import { parse } from 'graphql';

export class AssetService {
  constructor(private context: any) { }

  async getAssets(where?: AssetWhereInput): Promise<Asset[]> {
    const query = QueryBuilderService.buildAssetsQuery(where);
    console.log(query);
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
        coordinates,
      });
    });

    return assets;
  }
}
