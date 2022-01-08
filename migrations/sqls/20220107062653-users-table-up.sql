/* Replace with your SQL commands */
create table users
(
	id serial not null
		primary key,
	user_name varchar(156) not null,
	first_name varchar(155) not null,
	last_name varchar(155) not null,
	password varchar(155) not null
);

