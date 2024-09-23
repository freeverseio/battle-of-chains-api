export const attacksQueryTemplate = `
query MyQuery {
  transfers(where: {
    contractAddress: "#contractAddressPlaceholder",
    #toPlaceholder
  }, orderBy: TIMESTAMP_DESC) {
    from
    to
    tokenId
  }
}
`;