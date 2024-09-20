// userService.ts
import { parse } from 'graphql';
import { User } from '../types/user';
import { tokenOwnersQuery } from '../queries';

export class UserService {
  constructor(private context: any) {}

  async getUsers(): Promise<User[]> {
    const query = tokenOwnersQuery(process.env.LAOS_BOC_CONTRACT_ADDRESS!);
    const result = await this.context.indexerExec({
      document: parse(query),
      context: this.context,
    });

    return result.data.tokenOwners.map((owner: any) => {
      return new User({
        address: owner.owner,
        chainId: this.chainIdFromTokenId(owner.randomTokenId),
        ...this.getXYFromAddress(owner.owner),
      });
    });
  }

  chainIdFromTokenId(tokenId: string) {
    return Number((BigInt(tokenId) >> 163n) & 0xFFFFFFFFn);
  }

  getXYFromAddress(address: string) {
    // Remove the "0x" prefix and convert the address to BigInt
    let bigIntAddress = BigInt(address);

    // Extract the last 64 bits (x and y coordinates)
    let x = Number((bigIntAddress >> 32n) & 0xFFFFFFFFn); // Convert x to number
    let y = Number(bigIntAddress & 0xFFFFFFFFn); // Convert y to number

    return {
      x, 
      y,
    };
  }
}
