
module.exports = { 

    addRequest: async (req, res) => {
        const {id, recepient_id} = req.body;
        const db = req.app.get('db');

        const allRequests = await db.messages.create_request({idea_id: id, request_id: req.session.user.id, recepient_id});

        res.status(200).send(allRequests);
    }, 
    getRequests: async (req, res) => {
        const db = req.app.get('db');

        const allUserRequests = await db.messages.get_my_requests(req.session.user.id);
        const allOtherRequests = await db.messages.get_others_requests(req.session.user.id)
        console.log([...allUserRequests, ...allOtherRequests])
        res.status(200).send([...allUserRequests, ...allOtherRequests]);
    },
    deleteRequest: async ( req, res ) => {
        const db = req.app.get('db');
        const {id} = req.params;

        const allRequests = await db.messages.delete_request(id);

        res.sendStatus(200);
    }
};