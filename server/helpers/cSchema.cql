tracing on

DROP KEYSPACE IF EXISTS carousel;

CREATE KEYSPACE carousel WITH replication = {'class':'SimpleStrategy', 'replication_factor':1};

USE carousel;

CREATE TABLE related (
  src_prod_id int PRIMARY KEY,
  rel_prod_id int
);

COPY related(src_prod_id, rel_prod_id) FROM '/Users/Kheng/Dropbox/Backup/Hack Reactor/sdc/service_related_kc/dist/related.csv' WITH DELIMITER = ',';

CREATE TABLE products (
  prod_id int PRIMARY KEY,
  prod_name text,
  category text,
  manufacturer text,
  primary_image text,
  secondary_images list<text>,
  review_one_star_count int,
  review_two_star_count int,
  review_three_star_count int,
  review_four_star_count int,
  review_five_star_count int,
  review_count int,
  question_count int,
  price text,
  total_price text,
  stock int,
  is_prime boolean,
  prod_description text,
  thumbnail_image text
);

COPY products(prod_id, prod_name, category, manufacturer, primary_image, secondary_images, review_one_star_count, review_two_star_count, review_three_star_count, review_four_star_count, review_five_star_count, review_count, question_count, price, total_price, stock, is_prime, prod_description, thumbnail_image) FROM '/Users/Kheng/Dropbox/Backup/Hack Reactor/sdc/service_related_kc/dist/products.csv' WITH DELIMITER = ',' AND HEADER = TRUE;