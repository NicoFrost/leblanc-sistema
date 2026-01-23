function registerUsersIpc(ipcMain, User) {
    ipcMain.handle('get-users', async () => {
    const users = await User.findAll();
    return users;
    });

    ipcMain.handle('add-user', async (event, userData) => {
    const newUser = await User.create(userData);
    return newUser;
    });

    ipcMain.handle('delete-user', async (event, userId) => {
    const user = await User.findByPk(userId);
    if (user) {
        await user.update({ state: 'false' });
    }
    return { success: !!user };
    });

}

module.exports = { registerUsersIpc };