-- DROP TABLE public.user_logs;

CREATE TABLE public.user_logs (
	timestamp int8 NOT NULL,
	comment text,
	CONSTRAINT user_log_pkey PRIMARY KEY (timestamp, comment)
);

-- DROP TABLE public.chain;

CREATE TABLE public.chain (
	chain_id int8 NOT NULL,
	name text NOT NULL,
	score int8 NOT NULL,
	CONSTRAINT chain_pkey PRIMARY KEY (chain_id)
);