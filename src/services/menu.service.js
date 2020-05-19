const db = require("../_access/db");
const Menu = db.Menu;


module.exports = {
    fetch,
    create,
    update,
    delete: _delete,
    fetchByClient
};

async function fetch() {
    return await Menu.find().select("-hash");
}


export async function fetchByClient(userParam) {
    return await Menu.find({ restaurantId: userParam })
}

async function create(userParam) {

    const menu = new Menu(userParam);

    await menu.save();

    return menu;
}

async function update(id, userParam) {
    const menu = await Menu.findById(id);

    if (!menu) throw "Menu not found";

    Object.assign(menu, userParam);

    await menu.save();
}


async function _delete(id) {
    await Menu.findByIdAndRemove(id);
}