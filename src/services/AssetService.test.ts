import { AssetService } from './AssetService';
import { QueryBuilderService } from './helper/QueryBuilderService';
import { CoordinatesHelper } from './helper/CoordinatesHelper';
import { Asset } from '../types';
import { parse } from 'graphql';

jest.mock('./helper/QueryBuilderService', () => ({
  QueryBuilderService: {
    buildAssetsQuery: jest.fn(),
  },
}));

jest.mock('./helper/CoordinatesHelper', () => ({
  CoordinatesHelper: {
    getXYFromAddress: jest.fn(),
  },
}));

jest.mock('graphql', () => ({
  parse: jest.fn(),
}));

jest.mock('../types', () => ({
  Asset: jest.fn().mockImplementation((data) => data),
}));

describe('AssetService', () => {
  const mockContext = {
    indexerExec: jest.fn(),
  };
  let assetService: AssetService;

  beforeEach(() => {
    assetService = new AssetService(mockContext);
  });

  describe('getAssets', () => {
    const mockResponse = {
      data: {
        tokens: {
          edges: [
            {
              node: {
                tokenId: '1234567890',
                name: 'Test Asset 1',
                image: 'image1.png',
                description: 'Description 1',
                attributes: [{ trait_type: 'Color', value: 'Blue' }],
                owner: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
              },
            },
            {
              node: {
                tokenId: '1234567890',
                name: 'Test Asset 2',
                image: 'image2.png',
                description: 'Description 2',
                attributes: [{ trait_type: 'Size', value: 'Large' }],
                owner: '0x1234567890abcdef1234567890abcdef12345678',
              },
            },
          ],
        },
      },
    };

    it('should return the list of assets', async () => {
      // Mock the buildAssetsQuery method to return a mock query
      process.env.OWNERSHIP_CONTRACTS='{"137":"0xe4785c845a2dbed6958bcd0983a18ba686ebc261", "1":"0x2", "42161":"0x404394075a609e570f2ed6b6cab22fedd923d796"}';

      const mockQuery = 'mock_query_string';
      jest.spyOn(QueryBuilderService, 'buildAssetsQuery').mockReturnValueOnce(mockQuery);


      // Mock the result from indexerExec
      mockContext.indexerExec.mockResolvedValue(mockResponse);

      // Mock the coordinates from the owner address
      jest.spyOn(CoordinatesHelper, 'getXYFromAddress').mockReturnValue({ x: "10", y: "20" });

      const assets = await assetService.getAssets();

      expect(QueryBuilderService.buildAssetsQuery).toHaveBeenCalledWith("0xe4785c845a2dbed6958bcd0983a18ba686ebc261", undefined);
      expect(mockContext.indexerExec).toHaveBeenCalledWith({
        document: parse(mockQuery),
        context: mockContext,
      });

      expect(assets).toHaveLength(2);
      expect(assets[0]).toEqual(expect.objectContaining({
        tokenId: '1234567890',
        name: 'Test Asset 1',
        image: 'image1.png',
        description: 'Description 1',
        attributes: [{ trait_type: 'Color', value: 'Blue' }],
        coordinates: { x: "10", y: "20" },
        type: 0,
      }));
      expect(assets[1]).toEqual(expect.objectContaining({
        tokenId: '1234567890',
        name: 'Test Asset 2',
        image: 'image2.png',
        description: 'Description 2',
        attributes: [{ trait_type: 'Size', value: 'Large' }],
        coordinates: { x: "10", y: "20" },
        type: 0,
      }));
    });

    it('should return an empty array if no assets are returned', async () => {
      process.env.OWNERSHIP_CONTRACTS='{"137":"0xe4785c845a2dbed6958bcd0983a18ba686ebc261", "1":"0x2", "42161":"0x404394075a609e570f2ed6b6cab22fedd923d796"}';

      const emptyResponse = {
        data: {
          tokens: {
            edges: [],
          },
        },
      };

      mockContext.indexerExec.mockResolvedValue(emptyResponse);

      const assets = await assetService.getAssets();

      expect(assets).toEqual([]);
    });

   
  });

  describe('getAssetTypeFromTokenId', () => {
    it('should return the correct asset type from tokenId', () => {
      const tokenId = '60232296836873883150014947134364433056753454589868353462171729296652782652712'; // Example tokenId
      const assetType = assetService.getAssetTypeFromTokenId(tokenId);

      // Expected result based on (BigInt(tokenId) >> 160n) & 0x7n calculation
      const expectedType = Number((BigInt(tokenId) >> 160n) & 0x7n);

      expect(assetType).toBe(expectedType);
    });

    it('should handle large tokenId values correctly', () => {
      const largeTokenId = '12345678901234567890123456789012345678901234567890'; // Example large tokenId
      const assetType = assetService.getAssetTypeFromTokenId(largeTokenId);

      // Expected result based on (BigInt(tokenId) >> 160n) & 0x7n calculation
      const expectedType = Number((BigInt(largeTokenId) >> 160n) & 0x7n);

      expect(assetType).toBe(expectedType);
    });
  });
});
