export const tokenOwnersQuery = (contractAddress: string, owner?: string) => `
    query {
      tokenOwners(where: {contractAddress: "${contractAddress}"${owner ? `, owner: "${owner}"` : ''}}) {
        owner
        initialOwner
        randomTokenId
      }
    }
  `;
