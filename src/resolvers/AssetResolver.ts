import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { Asset, AssetWhereInput } from '../types';
import { AssetService } from '../services/AssetService';

@Resolver()
export class AssetResolver {
  @Query(() => [Asset])
  async assets(
    @Arg('where', () => AssetWhereInput, { nullable: true }) where: AssetWhereInput,
    @Ctx() context: any): Promise<Asset[]> {
    const assetService = new AssetService(context);
    return assetService.getAssets(where);
  }
}