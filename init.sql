-- Crie a tabela public.owner_establishment
CREATE TABLE public.owner_establishment (
  id uuid PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL
);

-- Crie a tabela public.reserve_user
CREATE TABLE public.reserve_user (
  id uuid PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  phone varchar(20) NULL
);

-- Crie a tabela public.establishment
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

-- Crie a tabela public.reservation
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

-- Definição da tabela public.faq
CREATE TABLE public.faq (
  id uuid PRIMARY KEY,
  question varchar(255) NOT NULL,
  answer varchar(255) NOT NULL
);

-- Crie a tabela public.comment
CREATE TABLE public.comment (
  reservation_id uuid NOT NULL,
  user_id uuid NOT NULL,
  id uuid PRIMARY KEY,
  "text" varchar(255) NOT NULL,
  CONSTRAINT fk_comment_reservation FOREIGN KEY (reservation_id) REFERENCES public.reservation (id),
  CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES public.reserve_user (id)
);

-- Crie a tabela public.review
CREATE TABLE public.review (
  establishment_id uuid NOT NULL,
  user_id uuid NOT NULL,
  id uuid PRIMARY KEY,
  rating float8 NOT NULL,
  "comment" varchar(255) NULL,
  CONSTRAINT fk_review_establishment FOREIGN KEY (establishment_id) REFERENCES public.establishment (id),
  CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES public.reserve_user (id)
);


-- Inserir dados na tabela public.owner_establishment com UUIDs
INSERT INTO public.owner_establishment (id, "name", email, "password")
VALUES
  ('c60579b9-1606-3d2e-a0de-b5364f26b1cd', 'John Doe', 'john.doe@example.com', 'password1'),
  ('8c4a5df9-6314-3503-ae21-8c2aa8a06b2f', 'Jane Smith', 'jane.smith@example.com', 'password2'),
  ('a641fcd9-5b3c-3c62-af0f-693ee4e0b0e0', 'Michael Johnson', 'michael.johnson@example.com', 'password3'),
  ('32f9569e-2e7d-31f7-84cd-45b9f773400d', 'Sarah Davis', 'sarah.davis@example.com', 'password4'),
  ('f4b6e363-5f6d-3da9-a3a5-3f1619730554', 'Robert Wilson', 'robert.wilson@example.com', 'password5');

-- Inserir dados na tabela public.reserve_user com UUIDs
INSERT INTO public.reserve_user (id, "name", email, "password", phone)
VALUES
  ('8c4a5df9-6314-3503-ae21-8c2aa8a06b2f', 'John Doe', 'john.doe@example.com', 'password1', '123456789'),
  ('a641fcd9-5b3c-3c62-af0f-693ee4e0b0e0', 'Jane Smith', 'jane.smith@example.com', 'password2', '987654321'),
  ('32f9569e-2e7d-31f7-84cd-45b9f773400d', 'Michael Johnson', 'michael.johnson@example.com', 'password3', '555555555'),
  ('f4b6e363-5f6d-3da9-a3a5-3f1619730554', 'Sarah Davis', 'sarah.davis@example.com', 'password4', '999999999'),
  ('09da6806-52db-3bf3-af29-99e199c05e23', 'Robert Wilson', 'robert.wilson@example.com', 'password5', '111111111');

-- Inserir dados na tabela public.establishment com UUIDs
INSERT INTO public.establishment (id, "name", phone, opening_hours_start, opening_hours_end, address, category, owner_establishment_id, max_capacity, "enabled")
VALUES
('c60579b9-1606-3d2e-a0de-b5364f26b1cd', 'Acme Hotel', '123456789', TO_TIMESTAMP('09:00', 'HH24:MI'), TO_TIMESTAMP('18:00', 'HH24:MI'), 'Address 1', 'Category 1', 'c60579b9-1606-3d2e-a0de-b5364f26b1cd', 50, true),
('8c4a5df9-6314-3503-ae21-8c2aa8a06b2f', 'XYZ Restaurant', '987654321', TO_TIMESTAMP('10:00', 'HH24:MI'), TO_TIMESTAMP('20:00', 'HH24:MI'), 'Address 2', 'Category 2', '8c4a5df9-6314-3503-ae21-8c2aa8a06b2f', 100, true),
('a641fcd9-5b3c-3c62-af0f-693ee4e0b0e0', 'ABC Cafe', '555555555', TO_TIMESTAMP('08:00', 'HH24:MI'), TO_TIMESTAMP('17:00', 'HH24:MI'), 'Address 3', 'Category 1', 'a641fcd9-5b3c-3c62-af0f-693ee4e0b0e0', 30, true),
('32f9569e-2e7d-31f7-84cd-45b9f773400d', 'PQR Bar', '999999999', TO_TIMESTAMP('18:00', 'HH24:MI'), TO_TIMESTAMP('02:00', 'HH24:MI'), 'Address 4', 'Category 3', '32f9569e-2e7d-31f7-84cd-45b9f773400d', 80, true),
('f4b6e363-5f6d-3da9-a3a5-3f1619730554', 'DEF Bakery', '111111111', TO_TIMESTAMP('07:00', 'HH24:MI'), TO_TIMESTAMP('16:00', 'HH24:MI'), 'Address 5', 'Category 2', 'f4b6e363-5f6d-3da9-a3a5-3f1619730554', 20, true);

-- Inserir dados na tabela public.reservation com UUIDs
INSERT INTO public.reservation (id, "datetime", num_people, observation, establishment_id, user_id)
VALUES
('a3b3a68c-9952-4c50-98f5-6a52efcde1c0', TO_TIMESTAMP('2022-01-01 10:00:00', 'YYYY-MM-DD HH24:MI:SS'), 4, 'Observation 1', 'c60579b9-1606-3d2e-a0de-b5364f26b1cd', '8c4a5df9-6314-3503-ae21-8c2aa8a06b2f'),
('e5b2b891-fa2e-4c14-a201-2c8a4bbf56fb', TO_TIMESTAMP('2022-02-02 15:00:00', 'YYYY-MM-DD HH24:MI:SS'), 2, 'Observation 2', '8c4a5df9-6314-3503-ae21-8c2aa8a06b2f', 'a641fcd9-5b3c-3c62-af0f-693ee4e0b0e0'),
('8d08a590-20ef-45a6-b2f5-2ea888e091d4', TO_TIMESTAMP('2022-03-03 18:00:00', 'YYYY-MM-DD HH24:MI:SS'), 3, 'Observation 3', 'a641fcd9-5b3c-3c62-af0f-693ee4e0b0e0', '32f9569e-2e7d-31f7-84cd-45b9f773400d'),
('3a97ae7f-671e-44a2-ae96-86f88ec71f5e', TO_TIMESTAMP('2022-04-04 20:00:00', 'YYYY-MM-DD HH24:MI:SS'), 5, 'Observation 4', '32f9569e-2e7d-31f7-84cd-45b9f773400d', 'f4b6e363-5f6d-3da9-a3a5-3f1619730554'),
('a67ea185-44f7-4995-9360-6b52a6a1cf52', TO_TIMESTAMP('2022-05-05 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), 2, 'Observation 5', 'f4b6e363-5f6d-3da9-a3a5-3f1619730554', '09da6806-52db-3bf3-af29-99e199c05e23');

-- Inserir dados na tabela public.comment com UUIDs
INSERT INTO public.comment (reservation_id, user_id, id, "text")
VALUES
  ('32f9569e-2e7d-31f7-84cd-45b9f773400d', '8c4a5df9-6314-3503-ae21-8c2aa8a06b2f', gen_random_uuid(), 'Comment 1'),
  ('a641fcd9-5b3c-3c62-af0f-693ee4e0b0e0', '32f9569e-2e7d-31f7-84cd-45b9f773400d', gen_random_uuid(), 'Comment 2'),
  ('32f9569e-2e7d-31f7-84cd-45b9f773400d', 'a641fcd9-5b3c-3c62-af0f-693ee4e0b0e0', gen_random_uuid(), 'Comment 3'),
  ('f4b6e363-5f6d-3da9-a3a5-3f1619730554', '32f9569e-2e7d-31f7-84cd-45b9f773400d', gen_random_uuid(), 'Comment 4'),
  ('09da6806-52db-3bf3-af29-99e199c05e23', 'f4b6e363-5f6d-3da9-a3a5-3f1619730554', gen_random_uuid(), 'Comment 5');

-- Inserir dados na tabela public.faq com UUIDs
INSERT INTO public.faq (id, question, answer)
VALUES
  ('8301606a-72c6-351f-92f1-5e67b100d0db', 'Question 1', 'Answer 1'),
  ('e8680f03-5099-358f-9c73-37de72a77e88', 'Question 2', 'Answer 2'),
  ('422d5b7c-b45c-36ea-8e67-966c2bf6d0f0', 'Question 3', 'Answer 3'),
  ('32f9569e-2e7d-31f7-84cd-45b9f773400d', 'Question 4', 'Answer 4'),
  ('f4b6e363-5f6d-3da9-a3a5-3f1619730554', 'Question 5', 'Answer 5');

-- Inserir dados na tabela public.review com UUIDs
INSERT INTO public.review (establishment_id, user_id, id, rating, "comment")
VALUES
  ('a641fcd9-5b3c-3c62-af0f-693ee4e0b0e0', '32f9569e-2e7d-31f7-84cd-45b9f773400d', 'f4b6e363-5f6d-3da9-a3a5-3f1619730554', 4.5, 'Review 1'),
  ('32f9569e-2e7d-31f7-84cd-45b9f773400d', 'a641fcd9-5b3c-3c62-af0f-693ee4e0b0e0', 'e8680f03-5099-358f-9c73-37de72a77e88', 3.5, 'Review 2'),
  ('f4b6e363-5f6d-3da9-a3a5-3f1619730554', '32f9569e-2e7d-31f7-84cd-45b9f773400d', '422d5b7c-b45c-36ea-8e67-966c2bf6d0f0', 5.0, 'Review 3'),
  ('09da6806-52db-3bf3-af29-99e199c05e23', 'f4b6e363-5f6d-3da9-a3a5-3f1619730554', '8301606a-72c6-351f-92f1-5e67b100d0db', 2.5, 'Review 4'),
  ('32f9569e-2e7d-31f7-84cd-45b9f773400d', '09da6806-52db-3bf3-af29-99e199c05e23', 'f4b6e363-5f6d-3da9-a3a5-3f1619730554', 4.0, 'Review 5');

-- Atualizar senhas na tabela public.owner_establishment
UPDATE public.owner_establishment
SET "password" = '{"value":"$2b$10$bQ2pCbatGNZQ98YFgo0m8ObyJPoM5GcI1kqtEnK.3wZ7Hwh8OUeU2","salt":10}';

-- Atualizar senhas na tabela public.reserve_user
UPDATE public.reserve_user
SET "password" = '{"value":"$2b$10$bQ2pCbatGNZQ98YFgo0m8ObyJPoM5GcI1kqtEnK.3wZ7Hwh8OUeU2","salt":10}';