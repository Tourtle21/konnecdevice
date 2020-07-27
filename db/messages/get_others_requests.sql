select r.*, u.display_name, i.title from requests r
join users u on r.request_id = u.id
join ideas i on i.user_id = $1
where r.recepient_id = $1;