/* Replace with your SQL commands */
create table order_details (
    id serial primary key,
    product_id bigint,
    quantity integer,
    order_id bigint,
    constraint fk_product foreign key (product_id) references products(id),
    constraint fk_order foreign key(order_id) references orders(id)
);