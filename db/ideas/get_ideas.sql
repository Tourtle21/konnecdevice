select title, display_name, i.id, i.img, u.profile_img, i.description, i.user_id, i.is_live from ideas i
join users u on i.user_id = u.id
where i.is_live = true;