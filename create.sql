-- Definição da tabela public.owner_establishment
CREATE TABLE public.owner_establishment (
  id uuid PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL
);

-- Definição da tabela public.reserve_user
CREATE TABLE public.reserve_user (
  id uuid PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  phone varchar(20) NULL
);

-- Definição da tabela public.establishment
CREATE TABLE public.establishment (
  id uuid PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  phone varchar(20) NULL,
  opening_hours_start timestamp NULL,
  opening_hours_end timestamp NULL,
  address varchar(255) NULL,
  category varchar(255) NULL,
  owner_establishment_id uuid NOT NULL,
  max_capacity int4 NULL,
  CONSTRAINT fk_owner_establishment FOREIGN KEY (owner_establishment_id) REFERENCES public.owner_establishment (id)
);

-- Definição da tabela public.reservation
CREATE TABLE public.reservation (
  id uuid PRIMARY KEY,
  "datetime" timestamp NULL,
  num_people int4 NULL,
  observation varchar(255) NULL,
  establishment_id uuid NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT fk_establishment FOREIGN KEY (establishment_id) REFERENCES public.establishment (id),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.reserve_user (id)
);

-- Definição da tabela public.faq
CREATE TABLE public.faq (
  id uuid PRIMARY KEY,
  question varchar(255) NOT NULL,
  answer varchar(255) NOT NULL
);

-- Definição da tabela public.comment
CREATE TABLE public.comment (
  id uuid PRIMARY KEY,
  "text" varchar(255) NULL
);

-- Definição da tabela public.review
CREATE TABLE public.review (
  id uuid PRIMARY KEY,
  rating float8 NULL,
  "comment" varchar(255) NULL
);