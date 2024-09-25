import { CoordinatesHelper } from './CoordinatesHelper';

describe('CoordinatesHelper', () => {
  describe('getXYFromAttackAddress', () => {
    it('should correctly extract x and y from address', () => {
      const address = '0x123456789ABCDEF123456789ABCDEF123456789A';
    const { x, y } = CoordinatesHelper.getXYFromAttackAddress(address);

    // Manually calculated values
      const expectedX = Number((BigInt(address) >> 32n) & 0xFFFFFFFFn);
      const expectedY = Number(BigInt(address) & 0xFFFFFFFFn);

      expect(x).toBe(expectedX);
      expect(y).toBe(expectedY);
      });

    it('should correctly extract x and y from address', () => {
      const address = '0x90397692893043c5986e53dc157fb50760e05dad';
      const { x, y } = CoordinatesHelper.getXYFromAttackAddress(address);
      expect(x).toBe(360690951);
      expect(y).toBe(1625316781);
    });
  });
});

describe('getXYFromAddress', () => {
  it('should extract X and Y correctly from a valid address', () => {
    const address = '0x0000000000000000000100000000000000000002';
    const { x, y } = CoordinatesHelper.getXYFromAddress(address);
    expect(x).toBe(1);
    expect(y).toBe(2);
  });

  it('should handle addresses with leading zeros', () => {
    const address = '0x0000000100000000000000000000000000000002';
    const { x, y } = CoordinatesHelper.getXYFromAddress(address);
    expect(x).toBe(281474976710656);
    expect(y).toBe(2);
  });

  it('should handle addresses with trailing zeros', () => {
    const address = '0x0000000000000000000100000000000000000000';
    const { x, y } = CoordinatesHelper.getXYFromAddress(address);
    expect(x).toBe(1);
    expect(y).toBe(0);
  });

  it('should handle addresses with no leading or trailing zeros', () => {
    const address = '0x0000000000000000011100000000000000000002';
    const { x, y } = CoordinatesHelper.getXYFromAddress(address);
    expect(x).toBe(273);
    expect(y).toBe(2);
  });

  it('should throw an error for invalid addresses', () => {
    const invalidAddress = 'invalid address';
    expect(() => CoordinatesHelper.getXYFromAddress(invalidAddress)).toThrowError('Cannot convert invalid address to a BigInt');
  });
});

describe('CoordinatesHelper', () => {
  describe('getXYFromAddress', () => {
    it('should correctly generate address from x and y', () => {
      const address = CoordinatesHelper.generateAddressFromXY(10n, 2n);
      expect(address).toBe('0x0000000000000000000a00000000000000000002');
    });    
  });
});

