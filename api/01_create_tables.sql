-- DROP TABLE public.chain;

CREATE TABLE public.chain (
	chain_id int4 NOT NULL,
	name text NOT NULL,
	score int8 NOT NULL,
	CONSTRAINT chain_pkey PRIMARY KEY (chain_id)
);

-- DROP TABLE public.user;

CREATE TABLE public.user (
	address text NOT NULL,
	name text,
	homechain int4 NOT NULL,
	joined_timestamp int8,
	score int8 NOT NULL,
	CONSTRAINT user_pkey PRIMARY KEY (address),
	CONSTRAINT user_homechain_fkey FOREIGN KEY (homechain) REFERENCES public.chain(chain_id)
);

-- DROP TABLE public.user_logs;

CREATE TABLE public.user_logs (
    id SERIAL PRIMARY KEY,
	user_address text NOT NULL,
	timestamp int8 NOT NULL,
	comment text NOT NULL,
	CONSTRAINT user_fkey FOREIGN KEY (user_address) REFERENCES public.user(address)
);

-- DROP TABLE public.asset;

CREATE TABLE public.asset (
	chain_id int4 NOT NULL,
	token_id text NOT NULL,
	type text NOT NULL,
	creation_timestamp int8,
	owner text NOT NULL,
	xp int8,
	health int8,
	CONSTRAINT asset_pkey PRIMARY KEY (chain_id, token_id),
	CONSTRAINT asset_owner_fkey FOREIGN KEY (owner) REFERENCES public.user(address),
	CONSTRAINT asset_chain_id_fkey FOREIGN KEY (chain_id) REFERENCES public.chain(chain_id)
);

-- DROP TABLE public.chain_action_proposals;

CREATE TABLE public.chain_action_proposal (
	proposal_hash text NOT NULL,
	source_chain_id int4 NOT NULL,
	target_chain_id int4,
	type int4 NOT NULL,
	attack_area int4,
	attack_address text,
	votes int4 NOT NULL,
	CONSTRAINT chain_action_proposal_pkey PRIMARY KEY (proposal_hash),
	CONSTRAINT source_chain_id_fkey FOREIGN KEY (source_chain_id) REFERENCES public.chain(chain_id),
	CONSTRAINT target_chain_id_fkey FOREIGN KEY (target_chain_id) REFERENCES public.chain(chain_id)
);
