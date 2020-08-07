insert into users (
    username, password, description, display_name, profile_img, plan
) values (
    ${username}, ${hash}, ${description}, ${displayName}, ${file}, ''
)
returning *;