import Users from "@/model/user";

// get: http://localhost:3000/api/users
export async function getUsers(req, res) {
    try {
        const users = await Users.find({});
        res.status(200).json(users);
    } catch(error) {
        res.status(404).json({error: "Error While Fetching Data!"});
    }
};

// get: http://localhost:3000/api/users/userId
export async function getUser(req, res) {
    try {
        const {userId} = req.query;

        if(userId) {
            const user = await Users.findById(userId);
            res.status(200).json(user);
        }
        res.status(404).json({error: "User not selected!"});
    } catch(error) {
        res.status(404).json({error: "Error While Fetching Data!"});
    }
};

// post: http://localhost:3000/api/users
export async function postUser(req, res) {
    try {
        const formData = req.body;
        if(!formData) {
            return res.status(404).json({error: "Form Data Not Provided!"});
        }
        Users.create(formData, function(err, data) {
            if(!err) {
                return res.json(data);
            }
        });
    } catch(error) {
        res.status(404).json({error: "Error While Posting Data!"});
    }
};

// put: http://localhost:3000/api/users?userId=63eb4....
export async function putUser(req, res) {
    try {
        const {userId} = req.query;
        const formData = req.body;

        if(userId && formData) {
            const user = await Users.findByIdAndUpdate(userId, formData);
            res.status(200).json(user);
        }
        res.status(404).json({error: "User Not Selected!"});
    } catch(error) {
        res.status(404).json({error: "Error While Updating Data!"});
    }
}

// delete: http://localhost:3000/api/users?userId=63eb4....
export async function deleteUser(req, res) {
    try {
        const {userId} = req.query;
        if(userId) {
            const user = await Users.findByIdAndDelete(userId);
            return res.status(200).json(user);
        }
        res.status(404).json({error: "User Not Selected!"});
    } catch(error) {
        res.status(404).json({error: "Error While Deleting Data!"});
    }
}