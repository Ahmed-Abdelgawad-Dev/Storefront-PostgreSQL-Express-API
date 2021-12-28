/* Replace with your SQL commands */
create table orders(
    id serial primary key,
    status varchar(30),
    userid bigint references users(id)
);