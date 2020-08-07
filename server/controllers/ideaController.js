
module.exports = {
    getIdeas: async (req, res) => {
        const db = req.app.get('db');

        const allIdeas = await db.ideas.get_ideas();
        res.status(200).send(allIdeas);
    },
    getMyIdeas: async (req, res) => {
        const db = req.app.get('db');
        const allIdeas = await db.ideas.get_my_ideas(req.session.user.id);
        res.status(200).send(allIdeas);
    }, 
    toggleLive: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const finished = await db.ideas.toggle_idea(id);
        res.sendStatus(200);
    },
    deleteIdea: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const allIdeas = await db.ideas.delete_idea(id);
        res.status(200).send(allIdeas);
    },
    editIdea: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {title, description} = req.body;
        const allIdeas = await db.ideas.update_idea({id, title, description});
        res.status(200).send(allIdeas);
    },
    getIdea: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        console.log(id);
        const idea = await db.ideas.get_idea(id);
        res.status(200).send(idea[0]);
    },
    createIdea: async (req, res) => {
        const db = req.app.get('db');
        const {title, description} = req.body;
        const allIdeas = await db.ideas.create_idea({title, description, user_id:req.session.user.id});
        res.status(200).send(allIdeas);
    },
    getProjects: async (req, res) => {
        const db = req.app.get('db');
        const projects = await db.ideas.get_projects(req.session.user.id);
        res.status(200).send(projects);
    },
    getCollaborators: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const collaborators = await db.ideas.get_collaborators(id);

        res.status(200).send(collaborators);
    },
    createTask: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {coll_id, task} = req.body;

        const newTask = await db.ideas.create_task({id, coll_id, task});

        res.status(200).send(newTask[0]);
    },
    getTasks: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;

        const tasks = await db.ideas.get_tasks(id);
        res.status(200).send(tasks);
    },
    deleteTask: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;

        const deleted = await db.ideas.delete_task(id);

        res.sendStatus(200);
    },
    toggleComplete: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;

        const updated = await db.ideas.toggle_complete(id);

        res.status(200).send(updated[0]);
    },
    editPlan: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {plan} = req.body;
        console.log(plan);
        const updated = await db.ideas.edit_plan({id, plan});

        res.sendStatus(200);
    }
}