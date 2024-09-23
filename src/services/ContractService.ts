import { Contract, ContractWhereInput } from "../types";

export class ContractService {
  constructor(private context: any) { }

  async getOwnershipContracts(where?: ContractWhereInput): Promise<Contract[]> {  
    try {      
      const ownershipContracts = process.env.OWNERSHIP_CONTRACTS || '{}';
      const parsedOwnershipContracts = JSON.parse(ownershipContracts);
      const contracts = [];
      for (const [chainId, address] of Object.entries(parsedOwnershipContracts)) {
        if(!where) {
          contracts.push(
            new Contract({
              address: String(address),
              chainId: Number(chainId),
            })        
          )
        }else if(String(where?.chainId) == chainId) {
          contracts.push(
            new Contract({
              address: String(address),
              chainId: Number(chainId),
            })        
          )
          break;
        }
      }
      
      return contracts;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
