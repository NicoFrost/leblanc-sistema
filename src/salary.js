function registerSalaryIpc(ipcMain, Salary) {
    ipcMain.handle('salary:create', async (event, salaryData) => {
        const {dataValues: salary} = await Salary.create(salaryData);
        return salary;
    });

    ipcMain.handle('salary:get', async () => {
        const dataDB = await Salary.findAll({where: { state: true }});
        return dataDB;
    });

    ipcMain.handle('salary:update', async (event, salaryId, salaryData) => {
        const salary = await Salary.findByPk(salaryId);
        if (salary) {
            await Salary.update(salaryData, { where: { id: salaryId } });
        }
        return { msg: "Salario actualizado", helpMsg: "Salario actualizado con éxito", success: !!salary };
    });

    ipcMain.handle('salary:delete', async (event, salaryId) => {
        const salary = await Salary.findByPk(salaryId);
        if (salary) {
            await Salary.update({ state: false }, { where: { id: salaryId } });
        }
        return { msg: "Salario eliminado", helpMsg: "Salario eliminado con éxito", success: !!salary };
    });
}

module.exports = { registerSalaryIpc };