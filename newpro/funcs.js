import { Server} from "./classes.js"
async function findServers( ns, SERVER = "home", SERVER_LIST = [], MAP = []){
    let SCAN = await ns. scan( SERVER)
        .filter( CHILD=>! SERVER_LIST.includes( CHILD))
        .map( async( CHILD)=> {
            let server = new Server( CHILD, SERVER)
            MAP. push( server)
            SERVER_LIST.push( CHILD)
            await findServers( ns, CHILD, SERVER_LIST, MAP)
        });
    return {SERVER_LIST, MAP }
}


export { findServers}
