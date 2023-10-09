-- public."comment" definition

-- Drop table

-- DROP TABLE public."comment";

CREATE TABLE public."comment" (
	id serial4 NOT NULL,
	"text" varchar(255) NULL,
	CONSTRAINT comment_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public."comment" OWNER TO root;
GRANT ALL ON TABLE public."comment" TO root;


-- public.establishment definition

-- Drop table

-- DROP TABLE public.establishment;

CREATE TABLE public.establishment (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	phone varchar(20) NULL,
	opening_hours_start timestamp NULL,
	opening_hours_end timestamp NULL,
	address varchar(255) NULL,
	category varchar(255) NULL,
	CONSTRAINT establishment_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.establishment OWNER TO root;
GRANT ALL ON TABLE public.establishment TO root;


-- public.faq definition

-- Drop table

-- DROP TABLE public.faq;

CREATE TABLE public.faq (
	id serial4 NOT NULL,
	question varchar(255) NOT NULL,
	answer varchar(255) NOT NULL,
	CONSTRAINT faq_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.faq OWNER TO root;
GRANT ALL ON TABLE public.faq TO root;


-- public.owner_establishment definition

-- Drop table

-- DROP TABLE public.owner_establishment;

CREATE TABLE public.owner_establishment (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT owner_establishment_email_key UNIQUE (email),
	CONSTRAINT owner_establishment_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.owner_establishment OWNER TO root;
GRANT ALL ON TABLE public.owner_establishment TO root;


-- public.reservation definition

-- Drop table

-- DROP TABLE public.reservation;

CREATE TABLE public.reservation (
	id serial4 NOT NULL,
	"date" date NULL,
	"time" timestamp NULL,
	numpeople int4 NULL,
	CONSTRAINT reservation_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.reservation OWNER TO root;
GRANT ALL ON TABLE public.reservation TO root;


-- public.reserve_user definition

-- Drop table

-- DROP TABLE public.reserve_user;

CREATE TABLE public.reserve_user (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	phone varchar(20) NULL,
	CONSTRAINT reserve_user_email_key UNIQUE (email),
	CONSTRAINT reserve_user_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.reserve_user OWNER TO root;
GRANT ALL ON TABLE public.reserve_user TO root;


-- public.review definition

-- Drop table

-- DROP TABLE public.review;

CREATE TABLE public.review (
	id serial4 NOT NULL,
	rating float8 NULL,
	"comment" varchar(255) NULL,
	CONSTRAINT review_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.review OWNER TO root;
GRANT ALL ON TABLE public.review TO root;