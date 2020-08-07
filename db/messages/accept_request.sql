update requests
set accepted = true
where id = $1;

update ideas
set is_project = true
from requests
where requests.id = $1 and requests.idea_id = ideas.id;