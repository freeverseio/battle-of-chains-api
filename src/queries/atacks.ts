export const atacksQuery = (to?: string) => `
query MyQuery {
  transfers(where: {
    ${to ? `to: "${to}",` : `to_startsWith: "0x000000000000000000000000000000000000000000000000000000000000",`}
    tokenId_gt: 0
  }) {
    from
    to
    tokenId
  }
}
`;