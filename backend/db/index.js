import db from "./mysql"

function Database() {
    if (!(this instanceof Database)) {
        return new Database()
    }
}

Database.prototype.call = async (procedure_name, arguments) => {
    try {
        let procedure = `${procedure_name}(`

        Object.keys(arguments).forEach((value, index, array) => {
            if (index === arguments.length() - 1) {
                procedure = procedure + `?)`
            } else {
                procedure = procedure + `?,`
            }
        })

        const result = await db.query(procedure, arguments);

        return result

    } catch(e) {

        console.error("Database::call -> Exception: " + e)
        throw e

    }
}

const database = new Database()

export default database

