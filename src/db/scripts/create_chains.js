const chains = [
    {
        "chain_id": 137,
        "name": "Polygon PoS",
    },
    {
        "chain_id": 1,
        "name": "Ethereum",
    }
]

const initScore = 0;

for (let chain of chains) {
    console.log(`INSERT INTO public.chain (chain_id,"name",score) VALUES (${chain.chain_id},'${chain.name}',${initScore});`);
}
