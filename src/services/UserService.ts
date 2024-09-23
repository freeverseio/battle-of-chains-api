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

    const query = tokenOwnersQuery(process.env.POLYGON_BOC_CONTRACT_ADDRESS!, where?.address);
    const result = await this.context.indexerExec({
      document: parse(query),
      context: this.context,
    });

    let users = result.data.tokenOwners.flatMap((owner: any) => {
      if (owner.initialOwner != owner.owner) {
        return [
          new User({
            address: owner.initialOwner,
            chainId: this.chainIdFromTokenId(owner.randomTokenId),
            coordinates: CoordinatesHelper.getXYFromAddress(owner.initialOwner),
          }),
          new User({
            address: owner.owner,
            chainId: this.chainIdFromTokenId(owner.randomTokenId),
            coordinates: CoordinatesHelper.getXYFromAddress(owner.owner),
          }),
        ];
      } else {
        return new User({
          address: owner.initialOwner,
          chainId: this.chainIdFromTokenId(owner.randomTokenId),
          coordinates: CoordinatesHelper.getXYFromAddress(owner.initialOwner),
        });
      }
    }).filter((user: User, index: number, self: User[]) =>
      index === self.findIndex((t: User) => t.address === user.address)
    )
    // Filter out attacks
    .filter((user: User) => !user.address.startsWith("0x000000000000000000000"));

    return users;
  }

  chainIdFromTokenId(tokenId: string) {
    return Number((BigInt(tokenId) >> 163n) & 0xFFFFFFFFn);
  }


}
