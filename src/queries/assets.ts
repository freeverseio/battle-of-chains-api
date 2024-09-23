export const totalNumberOfassetsQuery = (contractAddress: string) => `
   query MyQuery {
      tokens(where: {laosContract: "${contractAddress}"}) {
        totalCount
      }
    }
  `;

export const assetsQueryTemplate = `
  query MyQuery {
    tokens(
      where: {
        contractAddress: "#contractAddressPlaceholder"
        #ownerPlaceholder
        #tokenIdPlaceholder
      },
      pagination: { 
        first: 50  #cursorPlaceholder
      },
      orderBy: CREATED_AT_DESC
    ) {
      totalCount
      edges {
        node {
          name
          attributes
          description
          image
          owner
          tokenId
        }
      }
    }
  }
`;