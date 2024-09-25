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
      const users = await userService.getUsers({});

      expect(mockContext.indexerExec).toHaveBeenCalled();
      expect(users.length).toBe(1);
      expect(users[0]).toEqual({
        address: mockOwner.owner,
        chainId: expect.any(Number),
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
