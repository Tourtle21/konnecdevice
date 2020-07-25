select title, display_name, i.img, u.profile_img, i.description from ideas i
join users u on i.user_id = u.id;