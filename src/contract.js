const Building = require("./db/models/Building");

function registerContractIpc(ipcMain, Contract) {
    ipcMain.handle('contract:create', async (event, contractData) => {
        try {
            const {dataValues: contract} = await Contract.create(contractData);
            return {
                msg: "Contrato creado", 
                helpMsg: "Contrato de " + contract.buildingId + " creado con éxito",
                contract
            };
        } catch (error) {
            console.error('Error creating contract:', error);
        }
    });
    ipcMain.handle('contract:get', async () => {
        const contracts = await Contract.findAll({ where: { state: 1 } });
                
        return contracts;
    });
    ipcMain.handle('contract:update', async (event, contractId, contractData) => {
        const contract = await Contract.findByPk(contractId);
        if (contract) {
            await contract.update(contractData);
        }
        return { msg: "Contrato actualizado", helpMsg: "Contrato " + contractData.buildingName + " actualizado con éxito", success: !!contract };
    });
    ipcMain.handle('contract:delete', async (event, contractId) => {
        const contract = await Contract.findByPk(contractId);
        if (contract) {
            await contract.update({state: false});
        }
        return { msg: "Contrato eliminado", helpMsg: "Contrato " + contract.id + " eliminado con éxito", success: !!contract };
    });
}

module.exports = { registerContractIpc };

