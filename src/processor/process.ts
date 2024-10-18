import { getJoinedChainEvents, getMultichainMintEvents } from './getEvents';
import { sortJoinedChanEvents, sortMultichainMintEvents } from './sortEvents';
import { JoinedChainEvent} from './types';

async function main() {
  try {
    const joinedChainEvents = await sortJoinedChanEvents(await getJoinedChainEvents());
    
    const multichainMintEvents = await sortMultichainMintEvents(await getMultichainMintEvents());

    for (const event of joinedChainEvents) {
        console.log(`JoinedChain Event - User: ${event._user}, HomeChain: ${event._homeChain}, Nickname: ${event._nickname}`);
    }
    for (const event of multichainMintEvents) {
        console.log(`multichainMintEvents Event - User: ${event._user}, Type: ${event._type}`);
    }

} catch (error) {
    console.error("Error fetching joinedchainevents:", error);
  }
}

// Run the main function
main();