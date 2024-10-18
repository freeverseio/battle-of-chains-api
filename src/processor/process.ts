import { getJoinedChainEvents, getMultichainMintEvents } from './getEvents';
import { sortJoinedChanEvents, sortMultichainMintEvents } from './sortEvents';
import { EventType, JoinedChainEvent, MultichainMintEvent, UserType } from './types';

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

export class EventProcessor {
    private users: UserType[] = [];

    processJoinedChain(event: JoinedChainEvent): void {
        console.log(`Processing JoinedChain Event ${event.timestamp}, ${event._user}, HomeChain: ${event._homeChain}, Timestamp: ${event.timestamp}`);
        const newUser: UserType = {
            address: event._user,
            homechain: event._homeChain,
            name: event._nickname,
            joined_timestamp: event.timestamp,
            score: 44,
        };
        this.users.push(newUser);
    }

    // Updated processMultichainMint to append users
    processMultichainMint(event: MultichainMintEvent): void {
        console.log(`Processing MultichainMint Event ${event.timestamp}, ${event._user}, TokenID: ${event._tokenId}, Timestamp: ${event.timestamp}`);
    }

    // Method to get all users
    getUsers(): UserType[] {
        return this.users;
    }

    async reprocess() {
        try {
            const joinedChainEvents = await sortJoinedChanEvents(await getJoinedChainEvents());
            const multichainMintEvents = await sortMultichainMintEvents(await getMultichainMintEvents());

            const nJoinedChain = joinedChainEvents.length;
            const nMultichainMint = multichainMintEvents.length;
            const nEvents = nJoinedChain + nMultichainMint;

            let idxJoinedChain = 0;
            let idxMultichainMint = 0;

            for (let i = 0; i < nEvents; i++) {
                const nextEventTypeToProcess = indexOfSmallest([
                    idxJoinedChain < nJoinedChain ? joinedChainEvents[idxJoinedChain].timestamp : infiniteDate,
                    idxMultichainMint < nMultichainMint ? multichainMintEvents[idxMultichainMint].timestamp : infiniteDate,
                ]);

                if (nextEventTypeToProcess == EventType.JoinedChainEvent) {
                    this.processJoinedChain(joinedChainEvents[idxJoinedChain]);
                    idxJoinedChain += 1;
                }
                if (nextEventTypeToProcess == EventType.MultichainMintEvent) { 
                    this.processMultichainMint(multichainMintEvents[idxMultichainMint]);
                    idxMultichainMint += 1;
                }
        
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    }
}

// Main function to execute the processing
async function main() {
    const eventProcessor = new EventProcessor();
    await eventProcessor.reprocess();
  
    console.log('All processed users:', eventProcessor.getUsers());
}

main();
