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

        console.log('Database -> call -> ' + JSON.stringify(ret))
        return ret

    } catch(e) {

        console.error("Database::call -> Exception: " + e)
        throw e

    }
}

function recursiveFind(ds) {
    let results = []
    for (const idx in ds) {
      const obj = ds[idx]
      if (typeof obj === 'object' && obj.constructor.name == 'RowDataPacket') {
          results.push(obj)
      }
      else if (Array.isArray(obj)) {
        const res = recursiveFind(obj)
        if (res) {
          results = results.concat(res)
        }

      }
    }

    return results
}

function findKey (keyToFind, dataStructure) {

    if (!keyToFind || !dataStructure) return null

    for (const key in dataStructure) {

        const value = dataStructure[key]

        if (key == keyToFind) { 

            return value            

        } else if (Array.isArray(value)) { 

            const res = findKey(keyToFind, value); 

            if(res) return res

        } else if (typeof dataStructure[key] === 'object' && !Array.isArray(value)) { 

            const res = findKey(keyToFind, value); 

            if(res) return res

        }  else {

            console.log('findKey -> processing unknown key: ', key)

        }
    }

    return null; 

}

Database.prototype.findResults = (ds, keyToFind=null) =>  {
    const results = recursiveFind(ds)

    if (keyToFind) {
        return findKey(keyToFind, results)
    } else {
        return results
    }

}


const database = new Database()

module.exports = database

