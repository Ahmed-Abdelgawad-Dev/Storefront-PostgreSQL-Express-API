/* Replace with your SQL commands */
create table products(
    id serial primary key,
    name varchar(100),
    description varchar(255),
    category varchar(100) not null,
    price numeric(8, 2)
);