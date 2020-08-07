select u.display_name, u.profile_img, u.id from users u
join requests r on r.request_id = u.id
where r.idea_id = $1
union
select u.display_name, u.profile_img, u.id from users u
join requests r on r.recepient_id = u.id
where r.idea_id = $1;