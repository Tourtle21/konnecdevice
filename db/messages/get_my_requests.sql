select r.*, u.display_name, i.title from requests r
join users u on r.recepient_id = u.id
join ideas i on r.idea_id = i.id
where r.request_id = $1 and r.accepted is false;