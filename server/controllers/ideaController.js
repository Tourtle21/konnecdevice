
module.exports = {
    getIdeas: async (req, res) => {
        const db = req.app.get('db');

        const allIdeas = await db.ideas.get_ideas();

        res.status(200).send(allIdeas);
    }
}