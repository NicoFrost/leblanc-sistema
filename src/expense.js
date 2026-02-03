function registerExpenseIpc(ipcMain,Expense) {
    ipcMain.handle('expense:create', async (event, expenseData) => {
        const {dataValues: expense} = await Expense.create(expenseData);
        return {
            msg: "Gasto creado", 
            helpMsg: "Gasto " + expense.description + " creado con éxito",
            success: true,
            expense
        };
    });

    ipcMain.handle('expense:get', async () => {
        const expenses = await Expense.findAll({ where: { state: true } });
        // console.log(expenses);
        
        return expenses;
    });

    ipcMain.handle('expense:update', async (event, expenseId, expenseData) => {
        const expense = await Expense.findByPk(expenseId);
        if (expense) {
            await expense.update(expenseData);
        }
        return { msg: "Gasto actualizado", helpMsg: "Gasto " + expenseData.description + " actualizado con éxito", success: !!expense };
    });

    ipcMain.handle('expense:delete', async (event, expenseId) => {
        const expense = await Expense.findByPk(expenseId);
        if (expense) {
            await expense.update({ state: false });
        }
        return { msg: "Gasto eliminado", helpMsg: "Gasto " + expense.description + " eliminado con éxito", success: !!expense };
    });

}

module.exports = { registerExpenseIpc };