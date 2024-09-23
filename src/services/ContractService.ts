import { Contract, ContractWhereInput } from "../types";

export class ContractService {
  constructor(private context: any) { }

  async getOwnershipContracts(where?: ContractWhereInput): Promise<Contract[]> {  
    try {      
      const ownershipContracts = process.env.OWNERSHIP_CONTRACTS || '{}';
      const parsedOwnershipContracts = JSON.parse(ownershipContracts);
      const contracts = [];
      for (const [network, address] of Object.entries(parsedOwnershipContracts)) {
        if(!where) {
          contracts.push(
            new Contract({
              address: String(address),
              network: network,
            })        
          )
        }else if(where?.network == network) {
          contracts.push(
            new Contract({
              address: String(address),
              network: network,
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
