type EventWithBlockInfo = {
  blockNumber: number;
  logIndex: number;
};

export async function sortEvents<T extends EventWithBlockInfo>(events: T[]): Promise<T[]> {
  return events.sort((a, b) => {
    if (a.blockNumber !== b.blockNumber) {
      return a.blockNumber - b.blockNumber;
    }
    return a.logIndex - b.logIndex;
  });
}
