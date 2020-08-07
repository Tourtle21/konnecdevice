select r.*, u.display_name, i.title from requests r
join users u on r.request_id = u.id
join ideas i on i.id = r.idea_id
where r.recepient_id = $1 and r.accepted is false;