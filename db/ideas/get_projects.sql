select * from ideas
where $1 = user_id and is_project is true
union
select ideas.* from ideas
join requests r on ideas.id = r.idea_id
where ($1 = r.request_id or $1 = r.recepient_id) and r.accepted is true;