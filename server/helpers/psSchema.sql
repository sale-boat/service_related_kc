\timing on
CREATE TABLE related (
  related_id serial PRIMARY KEY,
  src_prod_id integer,
  rel_prod_id integer
);

COPY related(src_prod_id, rel_prod_id)
FROM '/Users/Kheng/Dropbox/Backup/Hack Reactor/sdc/service_related_kc/dist/related-sample.csv' DELIMITER ',' CSV;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  prod_id integer,
  prod_name varchar(255), -- truncate to speed up?
  category varchar(255), -- truncate to speed up?
  manufacturer varchar(255),
  primary_image varchar(255),
  secondary_images text[],
  review_one_star_count integer,
  review_two_star_count integer,
  review_three_star_count integer,
  review_four_star_count integer,
  review_five_star_count integer,
  review_count integer,
  question_count integer,
  price varchar(20),
  total_price varchar(20),
  stock integer,
  is_prime boolean,
  prod_description text,
  thumbnail_image varchar(255)
);

COPY products(prod_id, prod_name, category, manufacturer, primary_image, secondary_images, review_one_star_count, review_two_star_count, review_three_star_count, review_four_star_count, review_five_star_count, review_count, question_count, price, total_price, stock, is_prime, prod_description, thumbnail_image)
FROM '/Users/Kheng/Dropbox/Backup/Hack Reactor/sdc/service_related_kc/dist/products.csv' DELIMITER ',' CSV HEADER;