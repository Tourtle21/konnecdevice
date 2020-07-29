insert into ideas (
    title, description, plan, img, is_project, is_live, user_id
) values (
    ${title}, ${description}, '', '', false, false, ${user_id}
);
select * from ideas;