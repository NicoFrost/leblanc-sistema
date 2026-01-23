function registerInvoiceIpc(ipcMain,Invoice) {
    ipcMain.handle('invoice:create', async (event, invoiceData) => {
        const {dataValues: invoice} = await Invoice.create(invoiceData);
        return invoice;
    });

    ipcMain.handle('invoice:get', async () => {
        const invoices = await Invoice.findAll({where: { state: true }});
        // console.log(invoices);
        
        return invoices;
    });

    ipcMain.handle('invoice:update', async (event, invoiceId, invoiceData) => {
        console.log(event,invoiceId, invoiceData);
        
        const invoice = await Invoice.findByPk(invoiceId);
        if (invoice) {
            await Invoice.update(invoiceData, { where: { id: invoiceId } });
        }
        return { msg: "Pago actualizado", helpMsg: "Pago " + invoiceData.description + " actualizado con éxito", success: !!invoice };
    });

    ipcMain.handle('invoice:delete', async (event, invoiceId) => {
        const invoice = await Invoice.findByPk(invoiceId);
        if (Invoice) {
            await Invoice.update({ state: false });
        }
        return { msg: "Pago eliminado", helpMsg: "Pago " + invoice.description + " eliminado con éxito", success: !!invoice };
    });
    
}

module.exports = { registerInvoiceIpc };