CREATE TABLE public.playstore_orders (
	timestamp int8 NOT NULL,
	comment text,
	CONSTRAINT user_log_pkey PRIMARY KEY (timestamp, comment)
);