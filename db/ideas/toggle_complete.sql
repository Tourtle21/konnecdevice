update tasks
set completed = not completed
where id = $1;

select completed from tasks
where id = $1;