// userService.ts
import { parse } from 'graphql';
import { User } from '../types';
import { tokenOwnersQuery } from '../queries';
import { UserWhereInput } from '../types';
import { Coordinates } from '../types/coordinates';
import { CoordinatesHelper } from './helper/CoordinatesHelper';

export class UserService {
  constructor(private context: any) { }

  async getUsers(where: UserWhereInput): Promise<User[]> {
    const query = tokenOwnersQuery(process.env.LAOS_BOC_CONTRACT_ADDRESS!, where?.address);
    const result = await this.context.indexerExec({
      document: parse(query),
      context: this.context,
    });

    return result.data.tokenOwners.map((owner: any) => {
      return new User({
        address: owner.owner,
        chainId: this.chainIdFromTokenId(owner.randomTokenId),
        coordinates: CoordinatesHelper.getXYFromAddress(owner.owner),
      });
    });
  }

  chainIdFromTokenId(tokenId: string) {
    return Number((BigInt(tokenId) >> 163n) & 0xFFFFFFFFn);
  }
}
