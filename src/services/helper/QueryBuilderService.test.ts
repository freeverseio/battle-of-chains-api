import { QueryBuilderService } from './QueryBuilderService';
import { AssetWhereInput, AttackWhereInput } from '../../types';
import { assetsQueryTemplate } from '../../queries/assets';

describe('QueryBuilderService', () => {


  beforeEach(() => {
    process.env.POLYGON_BOC_CONTRACT_ADDRESS = '0xfffffffffffffffffffffffe00000000000000bb';
  });

  it('should build query with only contractAddress (no filters)', () => {
    const where: AssetWhereInput = {};
    const query = QueryBuilderService.buildAssetsQuery('0xfffffffffffffffffffffffe00000000000000bb', where);

    // Assert that no owner, tokenId, or cursor is present
    expect(query).toContain('contractAddress: "0xfffffffffffffffffffffffe00000000000000bb"');
    expect(query).not.toContain('owner:');
    expect(query).not.toContain('tokenId:');
    expect(query).not.toContain('after');
  });

  it('should build query with only contractAddress (where undefined)', () => {
    const query = QueryBuilderService.buildAssetsQuery('0xfffffffffffffffffffffffe00000000000000bb', undefined);

    // Assert that no owner, tokenId, or cursor is present
    expect(query).toContain('contractAddress: "0xfffffffffffffffffffffffe00000000000000bb"');
    expect(query).not.toContain('owner:');
    expect(query).not.toContain('tokenId:');
    expect(query).not.toContain('after');
  });

  it('should build query with owner and tokenId', () => {
    const where: AssetWhereInput = {
      owner: '0x1234567890abcdef',
      tokenId: '1001',
    };
    const query = QueryBuilderService.buildAssetsQuery('0xfffffffffffffffffffffffe00000000000000bb', where);

    // Assert that the owner and tokenId are inserted
    expect(query).toContain('owner: "0x1234567890abcdef"');
    expect(query).toContain('tokenId: "1001"');
  });

  it('should build query with cursor for pagination', () => {
    const where: AssetWhereInput = {
      cursor: 'abc123',
    };
    const query = QueryBuilderService.buildAssetsQuery('0xfffffffffffffffffffffffe00000000000000bb', where);

    // Assert that the cursor is correctly inserted
    expect(query).toContain('after: "abc123"');
  });

  it('should handle all input fields correctly', () => {
    const where: AssetWhereInput = {
      owner: '0xabcdefabcdefabcdef',
      tokenId: '2002',
      cursor: 'MTcyNjgyMTQzMjAwMDowOjB4N2U1MzQ4YjFkMDhkMTQzNzY5N2M5ZDVhODMwYWVlOWUwZjQ5NjBjMg',
    };
    const query = QueryBuilderService.buildAssetsQuery('0xfffffffffffffffffffffffe00000000000000bb', where);

    // Assert that all fields are correctly inserted
    expect(query).toContain('owner: "0xabcdefabcdefabcdef"');
    expect(query).toContain('tokenId: "2002"');
    expect(query).toContain(', after: "MTcyNjgyMTQzMjAwMDowOjB4N2U1MzQ4YjFkMDhkMTQzNzY5N2M5ZDVhODMwYWVlOWUwZjQ5NjBjMg"');
  });

  it('should replace empty placeholders correctly', () => {
    const where: AssetWhereInput = {};
    const query = QueryBuilderService.buildAssetsQuery('0xfffffffffffffffffffffffe00000000000000bb', where);

    // Ensure no placeholders like '#cursorPlaceholder' remain
    expect(query).not.toContain('#cursorPlaceholder');
    expect(query).not.toContain('#ownerPlaceholder');
    expect(query).not.toContain('#tokenIdPlaceholder');
  });
});

describe('QueryBuilderService - buildAttacksQuery', () => {

  beforeEach(() => {
    process.env.POLYGON_BOC_CONTRACT_ADDRESS = '0xfffffffffffffffffffffffe00000000000000bb';
  });

  it('should build attacks query with no filters when where is undefined', () => {
    const query = QueryBuilderService.buildAttacksQuery('0xfffffffffffffffffffffffe00000000000000bb', undefined);

    // Assert that no 'to' filters are present
    expect(query).toContain('contractAddress: "0xfffffffffffffffffffffffe00000000000000bb"');
    expect(query).not.toContain('to:');
    expect(query).not.toContain('to_startsWith');
  });

  it('should build attacks query with chainId and no coordinates', () => {
    const where: AttackWhereInput = {
      chainId: 137
    };
    const query = QueryBuilderService.buildAttacksQuery('0xfffffffffffffffffffffffe00000000000000bb', where);

    // Assert that the to_startsWith filter is applied for chainId
    expect(query).toContain('to_startsWith: "0x000000000000000000000089"');
  });

  it('should correctly extract x and y from address', () => {
    const attackAddress =  QueryBuilderService.getAttackAddress(137, "360690951", "1625316781");
    expect(attackAddress).toBe('0x000000000000000000000089157fb50760e05dad');
  });

  it('should build attacks query with chainId and coordinates', () => {
    const where: AttackWhereInput = {
      chainId: 137,
      coordinates: {
        x: "50",
        y: "100"
      }
    };
    const query = QueryBuilderService.buildAttacksQuery('0xfffffffffffffffffffffffe00000000000000bb', where);

    // Assert that the full 'to' address with coordinates is applied
    const expectedAddress = QueryBuilderService.getAttackAddress(137, "50", "100");
    expect(query).toContain(`to: "${expectedAddress}"`);
  });

  it('should not leave placeholders when no filters are provided', () => {
    const where: AttackWhereInput = {};
    const query = QueryBuilderService.buildAttacksQuery('0xfffffffffffffffffffffffe00000000000000bb', where);

    // Ensure no placeholders like '#toPlaceholder' remain
    expect(query).not.toContain('#toPlaceholder');
  });

  it('should build query with only chainId when coordinates are undefined', () => {
    const where: AttackWhereInput = {
      chainId: 137,
      coordinates: undefined
    };
    const query = QueryBuilderService.buildAttacksQuery('0xfffffffffffffffffffffffe00000000000000bb', where);

    // Assert that only the chainId part is used
    expect(query).toContain('to_startsWith: "0x000000000000000000000089"');
    expect(query).not.toContain('to:');
  });
});