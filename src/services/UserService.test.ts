import { UserService } from './UserService';
import { User } from '../types/user';

// Mock data for testing
const mockOwner = {
  owner: '0x123456789ABCDEF123456789ABCDEF123456789A',
  randomTokenId: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
};

const mockResponse = {
  data: {
    tokenOwners: [mockOwner],
  },
};

const mockContext = {
  indexerExec: jest.fn().mockResolvedValue(mockResponse),
};

// Mock User class
jest.mock('../types/user', () => {
  return {
    User: jest.fn().mockImplementation((data) => data),
  };
});

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockContext);
  });

  describe('getUsers', () => {
    it('should return users with correct data', async () => {
      const users = await userService.getUsers();

      expect(mockContext.indexerExec).toHaveBeenCalled();
      expect(users.length).toBe(1);
      expect(users[0]).toEqual({
        address: mockOwner.owner,
        chainId: expect.any(Number),
        x: expect.any(Number),
        y: expect.any(Number),
      });
    });

    it('should correctly calculate chainId from tokenId', async () => {
      const users = await userService.getUsers();
      const chainId = userService.chainIdFromTokenId(mockOwner.randomTokenId);
      
      expect(users[0].chainId).toBe(chainId);
    });

    it('should correctly calculate x and y from address', async () => {
      const users = await userService.getUsers();
      const { x, y } = userService.getXYFromAddress(mockOwner.owner);

      expect(users[0].x).toBe(x);
      expect(users[0].y).toBe(y);
    });
  });

  describe('chainIdFromTokenId', () => {

    it('should correctly extract chainId from tokenId', () => {
      const tokenId = '47799547995601867861741518321076309536288495128070729111970261691149110500781';
      const chainId = userService.chainIdFromTokenId(tokenId);
      
      expect(chainId).toBe(137);
    });
  });

  describe('getXYFromAddress', () => {
    it('should correctly extract x and y from address', () => {
      const address = '0x123456789ABCDEF123456789ABCDEF123456789A';
      const { x, y } = userService.getXYFromAddress(address);

      // Manually calculated values
      const expectedX = Number((BigInt(address) >> 32n) & 0xFFFFFFFFn);
      const expectedY = Number(BigInt(address) & 0xFFFFFFFFn);

      expect(x).toBe(expectedX);
      expect(y).toBe(expectedY);
    });

    it('should correctly extract x and y from address', () => {
      const address = '0x90397692893043c5986e53dc157fb50760e05dad';
      const { x, y } = userService.getXYFromAddress(address);
      expect(x).toBe(360690951);
      expect(y).toBe(1625316781);
    });
  });
});
