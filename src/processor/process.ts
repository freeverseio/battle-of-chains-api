import { getEvents } from "./getEvents";

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