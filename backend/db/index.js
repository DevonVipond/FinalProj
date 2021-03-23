const db = require('./mysql')
const util = require('util')

function Database() {
    if (!(this instanceof Database)) {
        return new Database()
    }
}

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

        console.log('Database -> call -> ' + JSON.stringify(ret))
        return ret

    } catch(e) {

        console.error("Database::call -> Exception: " + e)
        throw e

    }
}

Database.prototype.procedure = async (procedure_name, arguments) => {
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

        const filteredResults =  Object.values(JSON.parse(JSON.stringify(findRowDataPackets(ret))))
        console.log('Database -> procedure -> ' + JSON.stringify(filteredResults))
        return filteredResults

    } catch(e) {

        console.error("Database::call -> Exception: " + e)
        throw e

    }
}

function findRowDataPackets(ds) {
    let results = []
    for (const idx in ds) {
      const obj = ds[idx]
      if (typeof obj === 'object' && obj.constructor.name == 'RowDataPacket') {
          results.push(obj)
      }
      else if (Array.isArray(obj)) {
        const res = findRowDataPackets(obj)
        if (res) {
          results = results.concat(res)
        }

      }
    }

    return results
}

Database.prototype.findResults = (ds) =>  {
    return Object.values(JSON.parse(JSON.stringify(findRowDataPackets(ds))))
}

const database = new Database()

module.exports = database

