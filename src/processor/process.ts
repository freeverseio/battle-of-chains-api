import { getJoinedChainEvents } from './getEvents';
import { JoinedChainEvent} from './types';

async function main() {
  try {
    console.log("Fetching events...");
    const events: JoinedChainEvent[] = await getJoinedChainEvents(); // Ensure events has the correct type

    // Sort the events by blockNumber, and logIndex if blockNumber matches
    const sortedEvents = events.sort((a: JoinedChainEvent, b: JoinedChainEvent) => {
        // First, compare block numbers
        if (a.blockNumber !== b.blockNumber) {
          return a.blockNumber - b.blockNumber;
        }
  
        // If block numbers are the same, sort by logIndex
        return a.logIndex - b.logIndex;
      });

    for (const event of events) {
      if ('_nickname' in event) {
        console.log(`JoinedChain Event - User: ${event._user}, HomeChain: ${event._homeChain}, Nickname: ${event._nickname}`);
      }
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

// Run the main function
main();