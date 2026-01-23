function registerBuildingIpc(ipcMain, Building) {
    ipcMain.handle('building:create', async (event, buildingData) => {
        const building = await Building.create(buildingData);
        return building;
    });

    ipcMain.handle('building:get', async () => {
        const buildings = await Building.findAll({ where: { state: true } });
        // console.log(buildings);
        
        return buildings;
    });

    ipcMain.handle('building:update', async (event, buildingId, buildingData) => {
        const building = await Building.findByPk(buildingId);
        if (building) {
            await building.update(buildingData);
        }
        return { msg: "Edificio actualizado", helpMsg: "Edificio " + buildingData.buildingName + " actualizado con éxito", id: buildingId, success: !!building };
    });

    ipcMain.handle('building:delete', async (event, buildingId) => {
        const building = await Building.findByPk(buildingId);
        if (building) {
            await building.update({ state: false });
        }
        return { msg: "Edificio eliminado", helpMsg: "Edificio " + building.buildingName + " eliminado con éxito", success: !!building };
    });
}

module.exports = { registerBuildingIpc };