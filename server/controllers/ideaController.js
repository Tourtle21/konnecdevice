
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
    createIdea: async (req, res) => {
        const db = req.app.get('db');
        const {title, description} = req.body;
        const allIdeas = await db.ideas.create_idea({title, description, user_id:req.session.user.id});
        res.status(200).send(allIdeas);
    }
}