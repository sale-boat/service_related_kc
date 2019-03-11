-- Getting Started:
-- If the data isn't available, run the following generate scripts in the helpers folder:
-- generateRelated.js
-- generateProducts.js (will require additional CSVs to generate)

\timing on

-- CREATE TABLE products (
--   id SERIAL PRIMARY KEY,
--   prod_id integer,
--   prod_name varchar(255),
--   category varchar(255),
--   manufacturer varchar(255),
--   primary_image varchar(255),
--   secondary_images text[],
--   review_one_star_count integer,
--   review_two_star_count integer,
--   review_three_star_count integer,
--   review_four_star_count integer,
--   review_five_star_count integer,
--   review_count integer,
--   question_count integer,
--   price varchar(20),
--   total_price varchar(20),
--   stock integer,
--   is_prime boolean,
--   prod_description text,
--   thumbnail_image varchar(255)
-- );

-- COPY products(prod_id, prod_name, category, manufacturer, primary_image, secondary_images, review_one_star_count, review_two_star_count, review_three_star_count, review_four_star_count, review_five_star_count, review_count, question_count, price, total_price, stock, is_prime, prod_description, thumbnail_image) FROM '/Users/Kheng/Dropbox/Backup/Hack Reactor/sdc/service_related_kc/dist/products.csv' DELIMITER ',' CSV HEADER;

-- CREATE INDEX prod_id_idx ON products (prod_id);
-- CREATE INDEX prod_name_idx ON products (prod_name);

-- CREATE TABLE related (
--   related_id serial PRIMARY KEY,
--   src_prod_id integer,
--   rel_prod_id integer
-- );

-- COPY related(src_prod_id, rel_prod_id) FROM '/Users/Kheng/Dropbox/Backup/Hack Reactor/sdc/service_related_kc/dist/related.csv' DELIMITER ',' CSV;

-- CREATE INDEX src_idx ON related (src_prod_id) INCLUDE (related_id, rel_prod_id);
-- CREATE INDEX rel_idx ON related (rel_prod_id) INCLUDE (related_id, src_prod_id);

-- CREATE TABLE products_nest (
--   id SERIAL PRIMARY KEY,
--   prod_id integer,
--   prod_name varchar(255),
--   category varchar(255),
--   manufacturer varchar(255),
--   primary_image varchar(255),
--   secondary_images text[],
--   review_one_star_count integer,
--   review_two_star_count integer,
--   review_three_star_count integer,
--   review_four_star_count integer,
--   review_five_star_count integer,
--   review_count integer,
--   question_count integer,
--   price varchar(20),
--   total_price varchar(20),
--   stock integer,
--   is_prime boolean,
--   prod_description text,
--   thumbnail_image varchar(255),
--   related integer[]
-- );

-- COPY products_nest(prod_id, prod_name, category, manufacturer, primary_image, secondary_images, review_one_star_count, review_two_star_count, review_three_star_count, review_four_star_count, review_five_star_count, review_count, question_count, price, total_price, stock, is_prime, prod_description, thumbnail_image, related) FROM '/Users/Kheng/Dropbox/Backup/Hack Reactor/sdc/service_related_kc/dist/products-nested.csv' DELIMITER ',' CSV HEADER;

-- CREATE INDEX prod_nest_id_idx ON products_nest (prod_id);
-- CREATE INDEX prod_nest_name_idx ON products_nest (prod_name);

DROP TABLE IF EXISTS related_products;

CREATE TABLE related_products (
  id SERIAL PRIMARY KEY,
  prod_id integer,
  rel_id integer,
  slug varchar(255),
  prod_name varchar(255),
  avg_review numeric,
  price varchar(20),
  is_prime boolean,
  review_count integer,
  thumbnail_image varchar(255)
);

COPY related_products(prod_id, rel_id, slug, prod_name, avg_review, price, is_prime, review_count, thumbnail_image) FROM '/Users/Kheng/Dropbox/Backup/Hack Reactor/sdc/service_related_kc/dist/related-products.csv' DELIMITER ',' CSV;

COPY related_products(prod_id, rel_id, slug, prod_name, avg_review, price, is_prime, review_count, thumbnail_image) FROM '/home/ubuntu/service_related_kc/dist/related-products.csv' DELIMITER ',' CSV;

CREATE INDEX rel_prods_prod_id_idx ON related_products (prod_id);
CREATE INDEX rel_prods_rel_id_idx ON related_products (rel_id);
CREATE INDEX rel_prods_slug_idx ON related_products (slug);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO carousel;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO carousel;
ALTER ROLE carousel WITH LOGIN;

-- SELECT setval(pg_get_serial_sequence('products', 'id'), max(id)) FROM products;
-- SELECT setval(pg_get_serial_sequence('related', 'related_id'), max(related_id)) FROM related;
-- SELECT setval(pg_get_serial_sequence('products_nest', 'id'), max(id)) FROM products_nest;
SELECT setval(pg_get_serial_sequence('related_products', 'id'), max(id)) FROM related_products;
