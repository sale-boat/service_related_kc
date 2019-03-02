#! /bin/bash

dropdb --if-exists carousel
createdb carousel

psql postgres -c "ALTER ROLE carousel CREATEDB"
psql postgres -c "ALTER DATABASE carousel OWNER TO carousel"
psql carousel -a -w -f '/Users/Kheng/Dropbox/Backup/Hack Reactor/sdc/service_related_kc/server/helpers/psSchema.sql'
psql postgres -c "ALTER ROLE carousel WITH PASSWORD 'test'"