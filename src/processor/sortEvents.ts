import { JoinedChainEvent} from './types';

export async function sortJoinedChanEvents(events: JoinedChainEvent[]) : Promise<JoinedChainEvent[]> {
  // Sort the events by blockNumber, and logIndex if blockNumber matches
  const sortedEvents = events.sort((a: JoinedChainEvent, b: JoinedChainEvent) => {
      // First, compare block numbers
      if (a.blockNumber !== b.blockNumber) {
        return a.blockNumber - b.blockNumber;
      }

      // If block numbers are the same, sort by logIndex
      return a.logIndex - b.logIndex;
  });
  return sortedEvents;
}