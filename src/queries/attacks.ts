export const attacksQuery = (to?: string) => `
query MyQuery {
  transfers(where: {
    ${to ? `to: "${to}",` : `to_startsWith: "0x000000000000000000000",`}
  }) {
    from
    to
    tokenId
  }
}
`;