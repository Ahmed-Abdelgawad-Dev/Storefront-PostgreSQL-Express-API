/* Replace with your SQL commands */
create type status_types as enum ('active', 'complete');
create table orders (
    id serial primary key,
    status status_types not null,
    user_id bigint not null,
    constraint fk_user foreign key(user_id) references users(id)
);