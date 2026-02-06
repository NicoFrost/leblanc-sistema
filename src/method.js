function registerMethodIpc(ipcMain, Method) {
    ipcMain.handle('method:create', async (event, methodData) => {
        const method = await Method.create(methodData);
        return {
            msg: "Metodo creado", helpMsg: "Metodo " + method.methodName + " creado con éxito", success: !!method,
            method: method,
            success: !!method
        };
    });

    ipcMain.handle('method:get', async () => {
        const methods = await Method.findAll({ where: { state: true } });
        // console.log(methods);
        
        return methods;
    });

    ipcMain.handle('method:update', async (event, methodId, methodData) => {
        const method = await Method.findByPk(methodId);
        if (method) {
            await method.update(methodData);
        }
        return { msg: "Metodo actualizado", helpMsg: "Metodo " + methodData.methodName + " actualizado con éxito", id: methodId, success: !!method };
    });

    ipcMain.handle('method:delete', async (event, methodId) => {
        const method = await Method.findByPk(methodId);
        if (method) {
            await method.update({ state: false });
        }
        return { msg: "Metodo eliminado", helpMsg: "Metodo " + method.methodName + " eliminado con éxito", success: !!method };
    });
}

module.exports = { registerMethodIpc };