import { ContractService } from './ContractService';
import { Contract } from '../types';

jest.mock('../types', () => {
  return {
    Contract: jest.fn().mockImplementation(({ address, chainId }) => {
      return { address, chainId }; // Return the correct object structure
    }),
  };
});


describe('ContractService', () => {
  let service: ContractService;
  
  const mockContext = {};

  beforeEach(() => {
    service = new ContractService(mockContext);
  });

  afterEach(() => {
    jest.resetAllMocks();  // Reset mocks after each test
    delete process.env.OWNERSHIP_CONTRACTS; // Reset env var after each test
  });

  test('should return all ownership contracts if no filter is provided', async () => {
    process.env.OWNERSHIP_CONTRACTS = '{"137":"0x1", "1":"0x2", "42161":"0x3"}';

    const contracts = await service.getOwnershipContracts();
    
    expect(contracts).toEqual([
      { address: '0x2', chainId: 1 },
      { address: '0x1', chainId: 137 },
      { address: '0x3', chainId: 42161 }
    ]);

    expect(Contract).toHaveBeenCalledTimes(3);
  });
  
  test('should return an empty array if no contracts match the chainId filter', async () => {
    process.env.OWNERSHIP_CONTRACTS = '{"polygon":"0x1", "ethereum":"0x2", "arbitrum":"0x3"}';

    const where = { chainId: 23 };
    const contracts = await service.getOwnershipContracts(where);
    
    expect(contracts).toEqual([]);
    expect(Contract).not.toHaveBeenCalled();
  });

  test('should return an empty array if OWNERSHIP_CONTRACTS is not set', async () => {
    const contracts = await service.getOwnershipContracts();
    
    expect(contracts).toEqual([]);
    expect(Contract).not.toHaveBeenCalled();
  });

  test('should return an empty array if JSON parsing fails', async () => {
    process.env.OWNERSHIP_CONTRACTS = '{"invalidJSON":}';  // Invalid JSON format

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const contracts = await service.getOwnershipContracts();
    
    expect(contracts).toEqual([]);
    expect(Contract).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
