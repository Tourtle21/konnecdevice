select u.id from users u
join ideas i on i.user_id = u.id
where $1 = i.id;
