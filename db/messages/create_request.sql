insert into requests (
    request_id, recepient_id, idea_id, user_request, accepted
) values (
    ${request_id}, ${recepient_id}, ${idea_id}, ${user_request}, false
);

select r.*, u.display_name, i.title from requests r
join users u on r.recepient_id = u.id
join ideas i on i.id = r.idea_id
where (request_id = ${request_id} or recepient_id = ${request_id}) and accepted is false;