const Method = require("./db/models/Method");

function registerPaymentIpc(ipcMain, Payment, Method) {
    ipcMain.handle('payment:create', async (event, paymentData) => {
        const {dataValues: payment} = await Payment.create(paymentData);
        return payment;
    });

    ipcMain.handle('payment:get', async () => {
        const payments = await Payment.findAll({where: { state: true }});
        return payments;
    });

    ipcMain.handle('payment:update', async (event, paymentId, paymentData) => {
        const payment = await Payment.findByPk(paymentId);
        if (payment) {
            await Payment.update(paymentData, { where: { id: paymentId } });
        }
        return { msg: "Pago actualizado", helpMsg: "Pago actualizado con éxito", success: !!payment };
    });

    ipcMain.handle('payment:delete', async (event, paymentId) => {
        const payment = await Payment.findByPk(paymentId);
        if (payment) {
            await Payment.update({ state: false }, { where: { id: paymentId } });
        }
        return { msg: "Pago eliminado", helpMsg: "Pago eliminado con éxito", success: !!payment };
    });
}

module.exports = { registerPaymentIpc };