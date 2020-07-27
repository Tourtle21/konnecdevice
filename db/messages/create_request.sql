insert into requests (
    request_id, recepient_id, idea_id, accepted
) values (
    ${request_id}, ${recepient_id}, ${idea_id}, false
);

select r.*, u.display_name, i.title from requests r
join users u on r.recepient_id = u.id
join ideas i on i.user_id = u.id
where request_id = ${request_id} or recepient_id = ${request_id};