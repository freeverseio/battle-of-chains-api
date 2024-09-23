import { QueryBuilderService } from './QueryBuilderService';
import { AssetWhereInput } from '../../types';
import { assetsQueryTemplate } from '../../queries/assets';

describe('QueryBuilderService', () => {


  beforeEach(() => {
    process.env.LAOS_BOC_CONTRACT_ADDRESS = '0xfffffffffffffffffffffffe00000000000000bb';
  });

  it('should build query with only laosContract (no filters)', () => {
    const where: AssetWhereInput = {};
    const query = QueryBuilderService.buildAssetsQuery(where);

    // Assert that no owner, tokenId, or cursor is present
    expect(query).toContain('laosContract: "0xfffffffffffffffffffffffe00000000000000bb"');
    expect(query).not.toContain('owner:');
    expect(query).not.toContain('tokenId:');
    expect(query).not.toContain('after');
  });

  it('should build query with only laosContract (where undefined)', () => {
    const query = QueryBuilderService.buildAssetsQuery(undefined);

    // Assert that no owner, tokenId, or cursor is present
    expect(query).toContain('laosContract: "0xfffffffffffffffffffffffe00000000000000bb"');
    expect(query).not.toContain('owner:');
    expect(query).not.toContain('tokenId:');
    expect(query).not.toContain('after');
  });

  it('should build query with owner and tokenId', () => {
    const where: AssetWhereInput = {
      owner: '0x1234567890abcdef',
      tokenId: '1001',
    };
    const query = QueryBuilderService.buildAssetsQuery(where);

    // Assert that the owner and tokenId are inserted
    expect(query).toContain('owner: "0x1234567890abcdef"');
    expect(query).toContain('tokenId: "1001"');
  });

  it('should build query with cursor for pagination', () => {
    const where: AssetWhereInput = {
      cursor: 'abc123',
    };
    const query = QueryBuilderService.buildAssetsQuery(where);

    // Assert that the cursor is correctly inserted
    expect(query).toContain('after: "abc123"');
  });

  it('should handle all input fields correctly', () => {
    const where: AssetWhereInput = {
      owner: '0xabcdefabcdefabcdef',
      tokenId: '2002',
      cursor: 'MTcyNjgyMTQzMjAwMDowOjB4N2U1MzQ4YjFkMDhkMTQzNzY5N2M5ZDVhODMwYWVlOWUwZjQ5NjBjMg',
    };
    const query = QueryBuilderService.buildAssetsQuery(where);

    // Assert that all fields are correctly inserted
    expect(query).toContain('owner: "0xabcdefabcdefabcdef"');
    expect(query).toContain('tokenId: "2002"');
    expect(query).toContain(', after: "MTcyNjgyMTQzMjAwMDowOjB4N2U1MzQ4YjFkMDhkMTQzNzY5N2M5ZDVhODMwYWVlOWUwZjQ5NjBjMg"');
  });

  it('should replace empty placeholders correctly', () => {
    const where: AssetWhereInput = {};
    const query = QueryBuilderService.buildAssetsQuery(where);

    // Ensure no placeholders like '#cursorPlaceholder' remain
    expect(query).not.toContain('#cursorPlaceholder');
    expect(query).not.toContain('#ownerPlaceholder');
    expect(query).not.toContain('#tokenIdPlaceholder');
  });
});
