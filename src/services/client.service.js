const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_access/db");
const Client = db.Client;

module.exports = {
    auth,
    fetch,
    fetchById,
    create,
    update,
    delete: _delete,
};


async function fetch() {
    return await Client.find().select("-hash");
}

async function fetchById(id) {
    return await Client.findById(id).select("-hash");
}


async function update(id, userParam) {
    const user = await Client.findById(id);

    
    if (!user) throw "Client not found";
    if (
        user.username !== userParam.username &&
        (await Client.findOne({ username: userParam.username }))
    ) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    
    Object.assign(user, userParam);

    await user.save();
}

async function create(userParam) {
    
    
    if (await Client.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const client = new Client(userParam);

    
    if (userParam.password) {
        client.hash = bcrypt.hashSync(userParam.password, 10);
    }

    
    await client.save();
    return client
}


async function auth({ username, password }) {
    const client = await Client.findOne({ username });
    if (client && bcrypt.compareSync(password, client.hash)) {
        const { hash, ...userWithoutHash } = client.toObject();
        const token = jwt.sign({ sub: client.id }, config.secret);
        return {
            ...userWithoutHash,
            token,
        };
    }
}

async function _delete(id) {
    await Client.findByIdAndRemove(id);
}
