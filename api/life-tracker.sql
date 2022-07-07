\echo 'Delete and recreate life-tracker.sql?'
\prompt 'Return for yes or ctrl+c for no' answer

DROP DATABASE life_tracker;
CREATE DATABASE life_tracker;
\connect life_tracker;

\i life-tracker-schema.sql