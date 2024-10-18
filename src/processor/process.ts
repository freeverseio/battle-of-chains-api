import { getJoinedChainEvents } from './getEvents';
import { sortJoinedChanEvents } from './sortEvents';
import { JoinedChainEvent} from './types';

async function main() {
  try {
    console.log("Fetching events...");
    const events: JoinedChainEvent[] = await getJoinedChainEvents();
    const sortedEvents = await sortJoinedChanEvents(events);
    
    for (const event of sortedEvents) {
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