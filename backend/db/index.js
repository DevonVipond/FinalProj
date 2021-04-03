const db = require('./mysql')

function Database() {
    if (!(this instanceof Database)) {
        return new Database()
    }
}

function convertTo1DArray(nestedArr) {
    if (!Array.isArray(nestedArr)) return [ nestedArr ]

    return nestedArr.reduce(
        (a, b) => a.concat(Array.isArray(b) ? convertTo1DArray(b) : b), []
    )
}

Database.prototype.exec = async (procedure_name, arguments) => {
    try {

        console.log('------------------------------\nCalling Stored Procedure: ', procedure_name, ' With Arguments: ', arguments)

        const query = new Promise((resolve, reject) => {
            db.query(procedure_name, arguments, function(e, result) {
                if(e) {
                    console.log(e)
                    reject(e)
                }

                resolve(result);
            });
        });

        const result = await query;

        const flattenedArray = convertTo1DArray(result)

        console.log('Result of Stored Procedure: ' + procedure_name + ' is: ' + JSON.stringify(flattenedArray) + '\n------------------------------')

        return {
            data: flattenedArray.filter( e => { return e.constructor.name == 'RowDataPacket' }),
            affectedRows: flattenedArray.filter( e => { return e.constructor.name == 'OkPacket' })[0].affectedRows
        }
    } catch(e) {

        console.error("Stored Procedure: ", procedure_name, " Failed With Error: ", + e)
        throw e

    }
}

const database = new Database()

module.exports = database

