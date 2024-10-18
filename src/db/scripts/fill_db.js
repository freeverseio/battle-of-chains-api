const users = [
    {
        "address": "0x971Af926aE88704F804c8c847711285a743aB0b0",
        "name": "Lucky Luke",
        "homechain": 137,
        "joined_timestamp": 1729252955,
        "score": "10",
    }
]

const assets = [
    {
        "chain_id": 137,
        "token_id": "66057979215653289099562052760734921540679241766849125926542385189126540013744",
        "type": "0",
        "creation_timestamp": 1729253955,
        "owner": "0x971Af926aE88704F804c8c847711285a743aB0b0",
        "xp": 42,
        "health": 99,
    }
]

for (let user of users) {
    console.log(`INSERT INTO public.user ("address","name",homechain,joined_timestamp,score) VALUES ('${user.address}','${user.name}',${user.homechain},${user.joined_timestamp},${user.score});`);
}
for (let asset of assets) {
    console.log(`INSERT INTO public.asset (chain_id,"token_id","type",creation_timestamp,"owner",xp,health) VALUES (${asset.chain_id},'${asset.token_id}',${asset.type},${asset.creation_timestamp},'${asset.owner}',${asset.xp},${asset.health});`);
}
