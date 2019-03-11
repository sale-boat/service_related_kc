#! /bin/bash

sudo -u postgres dropdb --if-exists carousel
sudo -u postgres createdb carousel

sudo -u postgres psql -c "ALTER ROLE carousel CREATEDB"
sudo -u postgres psql -c "ALTER DATABASE carousel OWNER TO carousel"
sudo -u carousel psql -a -w -f '/home/ubuntu/service_related_kc/server/helpers/psSchema.sql'
sudo -u postgres psql -c "ALTER ROLE carousel WITH PASSWORD 'test'"