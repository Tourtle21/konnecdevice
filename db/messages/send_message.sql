insert into messages (
    display_name, profile_img, message, idea_id
) values (
    ${display_name}, ${profile_img}, ${message}, ${idea_id}
)
returning *;