insert into tasks (
    task, coll_id, idea_id, completed
) values (
    ${task}, ${coll_id}, ${id}, false
)
returning *;