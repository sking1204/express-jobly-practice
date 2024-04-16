\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE jobly2;
CREATE DATABASE jobly2;
\connect jobly2

\i jobly2-schema.sql
\i jobly2-seed.sql

\echo 'Delete and recreate jobly_test2 db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE jobly_test2;
CREATE DATABASE jobly_test2;
\connect jobly_test2

\i jobly2-schema.sql
