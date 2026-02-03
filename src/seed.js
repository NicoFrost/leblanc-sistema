const createSeed = async ({ Employee, Building, Expense,Collection, Contract, Invoice,Method,Payment,Salary}) => {
    try {
        const [buildings,employees,expense,collections,contract,invoices,methods,salaries,payments] = await Promise.all(
            [
                Building.findAll(), 
                Employee.findAll(),
                Expense.findAll(),
                Collection.findAll(),
                Contract.findAll(),
                Invoice.findAll(),
                Method.findAll(),
                Salary.findAll(),
                Payment.findAll(),
            ]
        );
        
        const notNeeded = ["buildings","employees","expenses","contracts","invoices","salaries","collections","payments"]; // agregar los modelos que no se quieran popular

        if (buildings.length == 0 && !notNeeded.includes('buildings')) {
            await Building.bulkCreate([
                {
                    buildingName: 'Building C',
                    contactName: 'Lucia García',
                    address: 'Oak St,789',
                    // articuloLimpieza: ['Guantes', 'Limpiavidrios'],
                    phone: '+54 91199881122',
                    email: 'lucia.garcia@edifC.com',
                    IVA: false,
                    CoordX: -33.4489,
                    CoordY: -70.6693
                },
                {
                    buildingName: 'Building D',
                    contactName: 'Carlos Lopez',
                    address: 'Pine St,456',
                    // articuloLimpieza: ['Desinfectante', 'Trapeador'],
                    phone: '+54 91199887766',
                    email: 'carlos.lopez@edifD.com',
                    IVA: true,
                    CoordX: -33.4490,
                    CoordY: -70.6700
                },
                {
                    buildingName: 'Building E',
                    contactName: 'María Torres',
                    address: 'Elm St,123',
                    phone: '+54 91199884455',
                    email: 'maria.torres@edifE.com',
                    IVA: false,
                    CoordX: -33.4491,
                    CoordY: -70.6705
                }
            ]);

            console.log("buildings created");
            
        };

        if(employees.length == 0 && !notNeeded.includes('employees')) {
            await Employee.bulkCreate([
                { name: 'Ariel', lastName: 'Fernández', phone: '+54 91167239101', address: 'Calle Falsa,742', arca: false },
                { name: 'Jane', lastName: 'Smith', phone: '+25 5555678', address: 'Pine St,341', arca: false }
            ]);

            console.log("employee created");
        }

        if(expense.length == 0 && !notNeeded.includes('expenses')){
            await Expense.bulkCreate([
                { description: 'Compra de insumos de limpieza', amount: 150.75, date: '2025-05-15', reason: 'EDIF' },
                { description: 'Pago de servicios públicos', amount: 300.00, date: '2025-05-10', reason: 'EMP' }
            ]);

            console.log("expenses created");
        }

        
        if (contract.length == 0 && !notNeeded.includes('contracts')) {
            await Contract.bulkCreate([
                {
                    buildingId: 1, // idBuilding
                    employeeId: 1, // idEmployee
                    hoursPerDay: 200,
                    days: 'L_19:15-21:15,M_19:15-21:15,V_19:15-21:15',
                    hourlyRate: 1500,
                    initialDate: new Date('2025-05-19'),
                    endDate: new Date('2030-05-19'),
                    state: true,
                },
                {
                    buildingId: 2,
                    employeeId: 2,
                    hoursPerDay: 70,
                    days: 'X_19:15-21:15,J_19:15-21:15',
                    hourlyRate: 2300,
                    initialDate: new Date('2025-05-19'),
                    endDate: new Date('2030-05-19'),
                    state: true,
                },
                {
                    buildingId: 1,
                    employeeId: 2,
                    hoursPerDay: 180,
                    days: 'S_10:00-14:00,D_10:00-14:00',
                    hourlyRate: 800,
                    initialDate: new Date('2025-05-19'),
                    endDate: new Date('2030-05-19'),
                    state: false,
                },
            ]);

            console.log("contracts created");
        }
        
        
        if(methods.length == 0 && !notNeeded.includes('methods')){
            await Method.bulkCreate([
                { type: 'efectivo' },
                { type: 'transferencia', name: 'Banco del Sol' },
                { type: 'transferencia', name: 'Cuenta DNI' },
                { type: 'transferencia', name: 'Mercado Pago' },
                { type: 'transferencia', name: 'Brubank' },
                { type: 'transferencia', name: 'Prex' },
                { type: 'transferencia', name: 'Uala' },
                { type: 'tarjeta' },
            ]);

            console.log("methods created");
        }

        if(invoices.length == 0 && !notNeeded.includes('invoices')){
            await Invoice.bulkCreate([
                {
                    buildingId: 1,
                    settlementDate: new Date('2025-07-01'),
                    total: 1200,
                    settled: false,
                    state: true,
                },
                {
                    buildingId: 2,
                    settlementDate: new Date('2025-06-01'),
                    total: 750,
                    settled: false,
                    state: true,
                },
                {
                    buildingId: 3,
                    settlementDate: new Date('2025-05-01'),
                    total: 430,
                    settled: false,
                    state: false,
                },
            ]);

            console.log("invoices created");
        }


        if(collections.length == 0 && !notNeeded.includes('collections')){
            await Collection.bulkCreate([
                {
                    invoiceId: 1,
                    amount: 700.00,
                    date: new Date('2025-05-11'),
                    methodId: 1,
                    imageURL: 'https://res.cloudinary.com/du7nakzdh/image/upload/v1763514544/leblanc/private_sys/wmcu8hccp1twqpkhtqqo.png'
                },
                {
                    invoiceId: 1,
                    amount: 400.00,
                    date: new Date('2025-05-16'),
                    methodId: 2
                },
                {
                    invoiceId: 2,
                    amount: 550.00,
                    date: new Date('2025-05-12'),
                    methodId: 3,
                    imageURL: 'https://res.cloudinary.com/du7nakzdh/image/upload/v1763514747/leblanc/private_sys/ryf6voyiwgq29f2k4w4h.png'
                }
            ]);

            console.log("collections created");
        }

        if(salaries.length == 0 && !notNeeded.includes('salaries')){
            await Salary.bulkCreate([
                {
                    employeeId: 1,
                    period: '2025-05',
                    grossAmount: 45000,
                    netAmount: 42000,
                    date: new Date(),
                    paid: false,
                    state: true,
                },
                {
                    employeeId: 2,
                    period: '2025-05',
                    grossAmount: 38000,
                    netAmount: 35000,
                    paid: false,
                    date: new Date(),
                    state: true,
                }
            ]);

            console.log("salaries created");
        }

        if(payments.length == 0 && !notNeeded.includes('payments')){
            await Payment.bulkCreate([
                {
                    salaryId: 1,
                    amount: 45000,
                    date: new Date('2025-06-05'),
                    methodId: 2,
                    state: true,
                },
                {
                    salaryId: 2,
                    amount: 38000,
                    date: new Date('2025-06-05'),
                    methodId: 1,
                    state: true,
                }
            ]);

            console.log("payments created");
        }
    } catch (error) {
        console.error('Error creating seed data:', error);  
    }
}

module.exports = { createSeed };