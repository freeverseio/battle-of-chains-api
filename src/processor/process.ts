import { JoinedChainType, RawMultichainMint, Event } from "./types";

async function getEvents(): Promise<Event[]> {
  return new Promise((resolve) => {
    const events: Event[] = [
      {
        _user: "0x1111111111111111111111111111111111111111",
        _homeChain: 1,
        _nickname: "Alice",
        timestamp: new Date(),
        blockNumber: 1000,
        blockHash: "0xabc123",
        txHash: "0xdef456",
        logIndex: 1,
      },
      {
        _tokenId: BigInt(123456789),
        _user: "0x2222222222222222222222222222222222222222",
        _type: 42,
        _homeChain: 2,
        timestamp: new Date(),
        blockNumber: 2000,
        blockHash: "0xghi789",
        txHash: "0xjkl012",
        logIndex: 2,
      },
    ];
    setTimeout(() => resolve(events), 1000); // Simulate a delay
  });
}

async function main() {
  try {
    console.log("Fetching events...");
    const events = await getEvents();

    console.log("Events fetched. Processing each event:");
    for (const event of events) {
      if ('_nickname' in event) {
        console.log(`JoinedChain Event - User: ${event._user}, HomeChain: ${event._homeChain}, Nickname: ${event._nickname}`);
      } else {
        console.log(`MultichainMint Event - TokenID: ${event._tokenId}, User: ${event._user}, Type: ${event._type}`);
      }
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

// Run the main function
main();