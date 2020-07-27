
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
    }
}