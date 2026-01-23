function registerEmployeeIpc(ipcMain,Employee) {
    ipcMain.handle('employee:create', async (event, employeeData) => {
        try {
            const {dataValues: employee} = await Employee.create(employeeData);
            return { success: true, employee };
        } catch (error) {
            console.error('Error creating employee:', error);
        }
    });

    ipcMain.handle('employee:get', async () => {
        const employees = await Employee.findAll({ where: { state: true } });
        return employees;
    });

    ipcMain.handle('employee:update', async (event, employeeId, employeeData) => {
        const employee = await Employee.findByPk(employeeId);
        if (employee) {
            await employee.update(employeeData);
        }
        return { msg: "Empleado actualizado", helpMsg: "Empleado " + employeeData.name + " actualizado con éxito", id: employeeId, success: !!employee };
    });

    ipcMain.handle('employee:delete', async (event, employeeId) => {
        const employee = await Employee.findByPk(employeeId);
        if (employee) {
            await employee.update({ state: false });
        }
        return { msg: "Empleado eliminado", helpMsg: "Empleado " + employee.name + " eliminado con éxito", success: !!employee };
    });


}

module.exports = { registerEmployeeIpc };