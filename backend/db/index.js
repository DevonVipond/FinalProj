const db = require('./mysql')
const util = require('util')

function Database() {
    if (!(this instanceof Database)) {
        return new Database()
    }
}

const normalize = (rows) => {

    return rows.map((obj, index) => {
        return Object.assign({}, obj)
    })

}

//Database.prototype.call = async (procedure_name, arguments) => {
//    try {
//
//        let procedure = `${procedure_name}(`
//
//        if (arguments.length === 0) procedure = procedure + `)`
//
//        Object.keys(arguments).forEach((value, index, array) => {
//            procedure = procedure + `?,`
//        })
//
//        procedure = procedure + '@res); select @res;'
//
//        console.log('Database -> calling procedure: ', procedure)
//
//        const result = await db.query(procedure, arguments);
//
//        return result[1][0]['@res']
//
//    } catch(e) {
//
//        console.error("Database::call -> Exception: " + e)
//        throw e
//
//    }
//}

Database.prototype.call = async (procedure_name, arguments) => {
    try {

        console.log('Database -> calling ', procedure_name)

        let prefix = '!';
        const query = new Promise((resolve, reject) => {
            db.query(procedure_name, arguments, function(e, result) {
                if(e) {
                    console.log(e)
                    reject(e)
                }

                resolve(result);
            });
        });

        const ret = await query;

        console.log(ret[1])
        return ret[1]

    } catch(e) {

        console.error("Database::call -> Exception: " + e)
        throw e

    }
}

const database = new Database()

module.exports = database

