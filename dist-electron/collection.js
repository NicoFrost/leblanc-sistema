const Method = require("./db/models/Method");

function registerCollectionIpc(ipcMain,Collection, Method) {
    ipcMain.handle('collection:create', async (event, collectionData) => {
        console.log(collectionData);
        
        const {dataValues: collection} = await Collection.create(collectionData);
        return collection;
    });

    ipcMain.handle('collection:get', async () => {
        const collections = await Collection.findAll({where: { state: true }});
        // const collections = await Collection.findAll({
        //     where: { state: true }, 
        //     include: [{
        //         model: Method,
        //         attributes: ['id', 'type', 'name']
        //     }]
        // });
        return collections;
    });
    ipcMain.handle('collection:update', async (event, collectionId, collectionData) => {
        const collection = await Collection.findByPk(collectionId);
        if (collection) {
            await Collection.update(collectionData, { where: { id: collectionId } });
        }
        return { msg: "Cobranza actualizada", helpMsg: "Cobranza " + collectionData.description + " actualizada con éxito", success: !!collection };
    }
    );
    ipcMain.handle('collection:delete', async (event, collectionId) => {
        const collection = await Collection.findByPk(collectionId);
        if (collection) {
            await Collection.update({ state: false }, { where: { id: collectionId } });
        }
        return { msg: "Cobranza eliminada", helpMsg: "Cobranza " + collection.description + " eliminada con éxito", success: !!collection };
    });
}

module.exports = { registerCollectionIpc };