import { getJoinedChainEvents, getMultichainMintEvents } from './getEvents';
import { sortJoinedChanEvents, sortMultichainMintEvents } from './sortEvents';
import { EventType, JoinedChainEvent, MultichainMintEvent } from './types';

const infiniteDate = new Date(2050, 0, 1);

function indexOfSmallest(arr: Date[]): number {
    let smallestIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[smallestIndex]) {
        smallestIndex = i;
        }
    }
    return smallestIndex;
}

function processJoinedChain(event: JoinedChainEvent): void {
    console.log(`Processing JoinedChain Event for user: ${event._user}, HomeChain: ${event._homeChain}, Timestamp: ${event.timestamp}`);
}

// Dummy implementation for processMultichainMint
function processMultichainMint(event: MultichainMintEvent): void {
    console.log(`Processing MultichainMint Event for user: ${event._user}, TokenID: ${event._tokenId}, Timestamp: ${event.timestamp}`);
}

async function main() {
  try {
    const joinedChainEvents = await sortJoinedChanEvents(await getJoinedChainEvents());
    const multichainMintEvents = await sortMultichainMintEvents(await getMultichainMintEvents());

    const nJoinedChain = joinedChainEvents.length;
    const nMultichainMint = multichainMintEvents.length;
    const nEvents = nJoinedChain + nMultichainMint;

    let idxJoinedChain = 0;
    let idxMultichainMint = 0;

    for (let i = 0; i < nEvents; i++) {
        console.log("idxJoinedChain, idxJoinedChain", idxJoinedChain, idxMultichainMint);
        const nextEventTypeToProcess = indexOfSmallest([
            idxJoinedChain < nJoinedChain ? joinedChainEvents[idxJoinedChain].timestamp : infiniteDate,
            idxMultichainMint < nMultichainMint ? multichainMintEvents[idxMultichainMint].timestamp : infiniteDate,
        ]);
        
        console.log('EventType', nextEventTypeToProcess);
        if (nextEventTypeToProcess == EventType.JoinedChainEvent) {
            processJoinedChain(joinedChainEvents[idxJoinedChain]);
            idxJoinedChain += 1;
        }
        if (nextEventTypeToProcess == EventType.MultichainMintEvent) { 
            processMultichainMint(multichainMintEvents[idxMultichainMint]);
            idxMultichainMint += 1;
        }

    }

    // for (const event of joinedChainEvents) {
    //     console.log(`JoinedChain Event - User: ${event._user}, Nickname: ${event._nickname}, Timestamp: ${event.timestamp}`);
    // }
    // for (const event of multichainMintEvents) {
    //     console.log(`multichainMintEvents Event - User: ${event._user}, Type: ${event._type}, Timestamp: ${event.timestamp}`);
    // }

} catch (error) {
    console.error("Error fetching joinedchainevents:", error);
  }
}

main();