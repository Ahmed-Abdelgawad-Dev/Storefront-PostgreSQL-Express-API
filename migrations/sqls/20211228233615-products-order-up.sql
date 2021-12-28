/* Replace with your SQL commands */
create table products_order(
    id serial primary key,
    product_id bigint references products(id),
    oderer_id bigint references orders(id) not null,
    quantity int
);