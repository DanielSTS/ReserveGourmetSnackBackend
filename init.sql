CREATE TABLE public.owner_establishment (
  id uuid PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL
);

CREATE TABLE public.reserve_user (
  id uuid PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  phone varchar(20) NULL
);

CREATE TABLE public.establishment (
  id uuid PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  phone varchar(20) NOT NULL,
  opening_hours_start timestamp NOT NULL,
  opening_hours_end timestamp NOT NULL,
  address varchar(255) NOT NULL,
  category varchar(255) NOT NULL,
  owner_establishment_id uuid NOT NULL,
  max_capacity int4 NULL,
  "enabled" boolean NOT NULL DEFAULT true,
  CONSTRAINT fk_owner_establishment FOREIGN KEY (owner_establishment_id) REFERENCES public.owner_establishment (id)
);

CREATE TABLE public.reservation (
  id uuid PRIMARY KEY,
  "datetime" timestamp NOT NULL,
  num_people int4 NOT NULL,
  observation varchar(255) NULL,
  establishment_id uuid NOT NULL,
  user_id uuid NOT NULL,
  CONSTRAINT fk_establishment FOREIGN KEY (establishment_id) REFERENCES public.establishment (id),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.reserve_user (id)
);

CREATE TABLE public.comment (
  reservation_id uuid NOT NULL,
  user_id uuid NOT NULL,
  id uuid PRIMARY KEY,
  "text" varchar(255) NOT NULL,
  CONSTRAINT fk_comment_reservation FOREIGN KEY (reservation_id) REFERENCES public.reservation (id),
  CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES public.reserve_user (id)
);

CREATE TABLE public.review (
  establishment_id uuid NOT NULL,
  user_id uuid NOT NULL,
  id uuid PRIMARY KEY,
  rating float8 NOT NULL,
  "comment" varchar(255) NULL,
  CONSTRAINT fk_review_establishment FOREIGN KEY (establishment_id) REFERENCES public.establishment (id),
  CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES public.reserve_user (id)
);

CREATE TABLE public.faq (
  id uuid PRIMARY KEY,
  question varchar(255) NOT NULL,
  answer varchar(255) NOT NULL
);