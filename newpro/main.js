import { Database_Manager, Database, DatabaseEntry} from "./classes.js"
import { findServers} from "./funcs";

export async function main( ns){

    ns.disableLog('ALL')
    ns.clearLog()

    let SERVER_LIST = []
    let MAP = []

    let db_manager = new Database_Manager()
    let server_db = db_manager.new( "servers")

    await findServers( ns, "home", SERVER_LIST, MAP)

    for( let i=0; i< MAP.length; i++){
        await MAP[i].init( ns)
        MAP[i] = server_db.addEntry( MAP[i].name, MAP[i])
    }

    let test_db = server_db.search("foodnstuff")
    ns.tprint( test_db.get("money"))
    test_db.add( "money", 0-199999)
    ns.tprint( test_db.get("money"))
    test_db.mult( "money", 2)
    ns.tprint( test_db.get("money"))
}
