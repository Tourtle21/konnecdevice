insert into users (
    username, password, description, display_name, profile_img
) values (
    ${username}, ${hash}, ${description}, ${displayName}, 'img'
)
returning *;