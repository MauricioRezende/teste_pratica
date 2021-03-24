var config = require('./config');
const sql = require('mssql');


async function getTechnical() {
    try {
        let pool = await sql.connect(config);
        let technical = await pool.request().query("SELECT * FROM TECHNICIAN ORDER BY id ASC");
        return technical.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getTechnician(technicianId) {
    try {
        let pool = await sql.connect(config);
        let technician = await pool.request()
            .input('id', sql.Int, technicianId)
            .query("SELECT * FROM TECHNICIAN WHERE id = @id");
        return technician.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}



async function addTechnician(technician) {
    try {
        let pool = await sql.connect(config);
        let insertTechnician = await pool.request()
            .input('name', sql.NVarChar, technician.name)
            .input('telephone', sql.NVarChar, technician.telephone)
            .input('email', sql.NVarChar, technician.email)
            .input('address', sql.NVarChar, technician.address)
            .input('status', sql.NVarChar, technician.status)
            .query("INSERT INTO TECHNICIAN(name,telephone,email,address,status) VALUES(@name,@telephone,@email,@address,@status) SELECT * FROM TECHNICIAN WHERE id = SCOPE_IDENTITY()");
        // return technician;
        return insertTechnician.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function putTechnician(technician) {
    try {
        let pool = await sql.connect(config);

        let query = 'UPDATE TECHNICIAN SET '
        if(technician.name !== null && technician.name !== undefined){
            query += 'name = @name,'
        }
        if(technician.telephone !== null && technician.telephone !== undefined){
            query += 'telephone = @telephone,'
        }
        if(technician.email !== null && technician.email !== undefined){
            query += 'email = @email,'
        }
        if(technician.address !== null && technician.address !== undefined){
            query += 'address = @address,'
        }
        if(technician.status !== null && technician.status !== undefined){
            query += 'status = @status,'
        }
        query += 'change_date = GETDATE() WHERE id = @id SELECT * FROM TECHNICIAN WHERE id = @id'

        let insertTechnician = await pool.request()
            .input('name', sql.NVarChar, technician.name)
            .input('telephone', sql.NVarChar, technician.telephone)
            .input('email', sql.NVarChar, technician.email)
            .input('address', sql.NVarChar, technician.address)
            .input('status', sql.NVarChar, technician.status)
            .input('id', sql.NVarChar, technician.id)
            .query(query);
        return insertTechnician.recordsets;
        // return technician
    }
    catch (err) {
        console.log(err);
    }
}

async function delTechnician(technicianId) {
    try {
        let pool = await sql.connect(config);
        let technician = await pool.request()
            .input('id', sql.Int, technicianId)
            .query("DELETE FROM TECHNICIAN WHERE id = @id");
        return technician.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTechnical   : getTechnical,
    getTechnician  : getTechnician,
    addTechnician  : addTechnician,
    delTechnician  : delTechnician,
    putTechnician : putTechnician
}