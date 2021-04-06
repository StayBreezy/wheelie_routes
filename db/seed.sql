-- CREATE TABLE users (
-- user_id SERIAL PRIMARY KEY,
-- username VARCHAR(15),
-- password VARCHAR(30)
-- );

-- CREATE TABLE user_info (
-- user_id integer references users(user_id),
-- first_name varchar(255),
-- last_name varchar(255),
-- email varchar(255) unique,
-- profile_pic text
-- );

-- CREATE TABLE routes (
-- route_id SERIAL PRIMARY KEY,
-- gpx text,
-- distance integer,
-- vertical_gain integer,
-- recommended_bike varchar(30),
-- water boolean,
-- shops boolean,
-- user_id integer references users(user_id)
-- );

-- CREATE TABLE comments (
-- comment_id SERIAL PRIMARY KEY,
-- user_id integer references users(user_id),
-- route_id integer references routes(route_id),
-- trail_conditions varchar(100),
-- comment varchar(140)
-- );

-- CREATE TABLE pictures (
-- picture_id SERIAL PRIMARY KEY,
-- route_id integer references routes(route_id),
-- user_id integer references users(user_id),
-- picture_url text,
-- description varchar(140)
-- );
