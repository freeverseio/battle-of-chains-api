export const tokenOwnersQuery = (contractAddress: string, owner?: string) => `
    query {
      tokenOwners(where: {laosContract: "${contractAddress}"${owner ? `, owner: "${owner}"` : ''}}) {
        owner
        randomTokenId
      }
    }
  `;