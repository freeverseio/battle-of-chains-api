import { UserService } from './UserService';
import { User } from '../types/user';

// Mock data for testing
const mockOwner = {
  owner: '0x123456789ABCDEF123456789ABCDEF123456789A',
  initialOwner: '0x123456789ABCDEF123456789ABCDEF123456789A',
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
jest.mock('../types', () => {
  return {
    User: jest.fn().mockImplementation((data) => data),
    UserWhereInput: jest.fn().mockImplementation((data) => data),
  };
});

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockContext);
  });

  describe('getUsers', () => {
    it('should return users with correct data', async () => {
      process.env.OWNERSHIP_CONTRACTS='{"137":"0xe4785c845a2dbed6958bcd0983a18ba686ebc261", "1":"0x2", "42161":"0x404394075a609e570f2ed6b6cab22fedd923d796"}';

      const users = await userService.getUsers({});

      expect(mockContext.indexerExec).toHaveBeenCalled();
      expect(users.length).toBe(1);
      expect(users[0]).toEqual({
        address: mockOwner.owner,
        coordinates: expect.any(Object),
      });
    });
   
  });

  describe('chainIdFromTokenId', () => {

    it('should correctly extract chainId from tokenId', () => {
      const tokenId = '47799547995601867861741518321076309536288495128070729111970261691149110500781';
      const chainId = userService.chainIdFromTokenId(tokenId);
      expect(chainId).toBe(137);
    });
  });

  
});
