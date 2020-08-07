select * from requests
where (recepient_id = $1 or request_id = $1) and idea_id = $2;