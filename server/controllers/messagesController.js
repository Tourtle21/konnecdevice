
module.exports = { 

    addRequest: async (req, res) => {
        const {id, recepient_id, user_request} = req.body;
        const db = req.app.get('db');
        const checkRequest = await db.messages.check_request({idea_id: id, request_id: req.session.user.id});

        if (checkRequest[0]) return res.status(401).send('Already sent a request');
        const allRequests = await db.messages.create_request({idea_id: id, request_id: req.session.user.id, recepient_id, user_request});

        res.status(200).send(allRequests);
    }, 
    getRequests: async (req, res) => {
        const db = req.app.get('db');

        const allUserRequests = await db.messages.get_my_requests(req.session.user.id);
        const allOtherRequests = await db.messages.get_others_requests(req.session.user.id)
        res.status(200).send([...allUserRequests, ...allOtherRequests]);
    },
    deleteRequest: async ( req, res ) => {
        const db = req.app.get('db');
        const {id} = req.params;

        const allRequests = await db.messages.delete_request(id);

        res.sendStatus(200);
    },
    acceptRequest: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const allRequests = await db.messages.accept_request(id);
        res.sendStatus(200);
    },
    sendMessage: async (req, res) => {
        const db = req.app.get('db');
        const {message} = req.body;
        const {id} = req.params;
        const {display_name, profile_img} = req.session.user;
        const newMessage = await db.messages.send_message({display_name, profile_img, message, idea_id:id});
        res.status(200).send(newMessage[0]);
    },
    getMessages: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;

        const allMessages = await db.messages.get_messages(id);
        res.status(200).send(allMessages);
    }
};