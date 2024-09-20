import { CoordinatesHelper } from './CoordinatesHelper';

describe('CoordinatesHelper', () => {
  describe('getXYFromAddress', () => {
    it('should correctly extract x and y from address', () => {
      const address = '0x123456789ABCDEF123456789ABCDEF123456789A';
    const { x, y } = CoordinatesHelper.getXYFromAddress(address);

    // Manually calculated values
      const expectedX = Number((BigInt(address) >> 32n) & 0xFFFFFFFFn);
      const expectedY = Number(BigInt(address) & 0xFFFFFFFFn);

      expect(x).toBe(expectedX);
      expect(y).toBe(expectedY);
      });

    it('should correctly extract x and y from address', () => {
      const address = '0x90397692893043c5986e53dc157fb50760e05dad';
      const { x, y } = CoordinatesHelper.getXYFromAddress(address);
      expect(x).toBe(360690951);
      expect(y).toBe(1625316781);
    });
  });
});