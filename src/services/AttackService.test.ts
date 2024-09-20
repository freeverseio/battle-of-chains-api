import { AttackService } from "./AttackService";

const mockResponse = {
  data: {
    transfers: [
      {
        "from": "0x1b0b4a597c764400ea157ab84358c8788a89cd28",
        "to": "0x1b0b4a597c764400ea157ab84358c8788a89cd28",
        "tokenId": "60232296836873883150014947134364433056753454589868353462171729296652782652712"
      },
      {
        "from": "0xc52293dcf9be02c6ef7e6f840bf0f0e2fc45c646",
        "to": "0xc52293dcf9be02c6ef7e6f840bf0f0e2fc45c646",
        "tokenId": "60232296836873883150014947134364433056753454589868353462171729296652782652712"
      },
    ],
  },
};

jest.mock('../types', () => {
  return {
    User: jest.fn().mockImplementation((data) => data),
    UserWhereInput: jest.fn().mockImplementation((data) => data),
    Coordinates: jest.fn().mockImplementation((data) => data),
  };
});

describe('AttackService', () => {
  const mockContext = {
    indexerExec: jest.fn().mockResolvedValue(mockResponse),
  };
  let attackService: AttackService;
  beforeEach(() => {
    attackService = new AttackService(mockContext);
  });
  describe('getAttacks', () => {
    it('should correctly extract x and y from address', () => {
      const attackAddress =  attackService.getAttackAddress(137, 360690951, 1625316781);
      expect(attackAddress).toBe('0x000000000000000000000089157fb50760e05dad');
    });
  });
});