drop table if exists requests;
drop table if exists ideas;
drop table if exists users;

create table users (
	id serial primary key,
	username varchar(200),
	password varchar(100),
	description text,
    display_name varchar(100),
	profile_img text
);

create table ideas (
	id serial primary key,
	title varchar(100),
	description text,
	plan text,
	img text,
	is_project boolean,
	is_live boolean,
	user_id int references users(id) on delete cascade
);

create table requests (
	id serial primary key,
	request_id int references users(id) on delete cascade,
	recepient_id int references users(id) on delete cascade,
	idea_id int references ideas(id) on delete cascade,
	accepted boolean
);

insert into users (username, password, description, display_name, profile_img) 
values ('kadenkleinonline', '$2a$10$q5j15tVl9/Ihc5Je9mQRhuNaVFGy7doTSD6yBDbN5YHcTjSZpGgOu', 'Cool person with awesome hair', 'Tourtle21', 'img');
insert into users (username, password, description, display_name, profile_img) 
values ('Kliden', '$2a$10$xUiVtx0XIO7Ojq2BtOsEnukwHDqxXZayBNMlMNdeCa8.jZRmwWf.O', 'Cool person with awesome hair', 'Piper', 'img');
insert into ideas (title, description, plan, img, is_project, is_live, user_id)
values ('Konnecd Hub', 'A little hub for connecting programmers and entreprenuers with ideas', '', '', false, false, 1);
insert into requests(request_id, recepient_id, idea_id, accepted)
values (2, 1, 1, false);