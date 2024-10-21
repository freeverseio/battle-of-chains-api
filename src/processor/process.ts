import { Chain } from '../db/entity';
import { getJoinedChainEvents, getMultichainMintEvents } from './getEvents';
import { getChains } from './getChains';
import { sortJoinedChanEvents, sortMultichainMintEvents } from './sortEvents';
import { AssetType, EventType, JoinedChainEvent, MultichainMintEvent, UserType } from './types';
import murmurhash from 'murmurhash';

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
    private chains: Chain[] = [];
    private users: UserType[] = [];
    private assets: AssetType[] = [];

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

    createAssetStats(chain: Number, homechain: Number, txHash: string, token_id: bigint, type: number) {
        // First mock. Assets are a bit better for the homechain the user belongs to
        const data = `${chain}${homechain}${txHash}${token_id}`;
        const seed = murmurhash.v3(data);
        const isHomeChain = chain == homechain ? 1 : 0;
        return {
            "health":  40 * isHomeChain + seed % 40,
            "xp":  100 * isHomeChain + seed % 40,
        }
    }


    processMultichainMint(event: MultichainMintEvent): void {
        console.log(`Processing MultichainMint Event ${event.timestamp}, ${event._user}, TokenID: ${event._tokenId}, Timestamp: ${event.timestamp}`);
        for (let chain of this.chains) {
            const stats = this.createAssetStats(chain.chain_id, event._homeChain, event.txHash, event._tokenId, event._type);
            const newAsset: AssetType = {
                chain_id: chain.chain_id,
                token_id: (event._tokenId).toString(),
                type: (event._type).toString(),
                creation_timestamp: event.timestamp,
                owner: event._user,
                xp: stats.xp,
                health: stats.health,
            };
            this.assets.push(newAsset);
        }
    }

    getUsers(): UserType[] {
        return this.users;
    }

    getAssets(): AssetType[] {
        return this.assets;
    }

    async addChains(): Promise<void> {
        this.chains = await getChains();
    }

    async reprocess() {
        try {
            await this.addChains();

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
