/* Replace with your SQL commands */
create table users (
    id serial primary key not null,
    user_name varchar(55) not null,
    first_name varchar(55) not null,
    last_name varchar(55) not null,
    password varchar(55) not null
);