-- create users table 
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255) NOT NULL
);