CREATE TABLE public.test_table (
	id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL
);


INSERT INTO test_table(username, created_on)
VALUES ('Neciji ujak2', current_timestamp);

select * from test_table;