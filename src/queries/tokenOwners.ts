export const tokenOwnersQuery = (contractAddress: string) => `
    query {
      tokenOwners(where: {laosContract: "${contractAddress}"}) {
        owner
        randomTokenId
      }
    }
  `;