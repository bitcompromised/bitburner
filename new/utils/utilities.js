//import {} from "./constants.js"
async function findServers( ns, SERVER = "home", SERVER_LIST = [], MAP = []){
    let SCAN = await ns. scan( SERVER)
        .filter( CHILD=>! SERVER_LIST.includes( CHILD))
        .map( async( CHILD)=> {
            MAP. push([ SERVER, CHILD])
            SERVER_LIST.push( CHILD)
            await findServers( ns, CHILD, SERVER_LIST, MAP)
        });
    return {SERVER_LIST, MAP }
}

function getAvailableRam( ns, ...SERVERS){
    return SERVERS
        .reduce( (prev, cur, index, array) => prev+ ns.getServerMaxRam( cur)- ns.getServerUsedRam( cur), 0)
}

const portManager = {
    portRegistry: [],
    registerPort: ( PORTS, IDENTIFIER) =>{
        PORTS. push( [IDENTIFIER, PORTS. length + 1])
    },
    reregisterPort: ( PORTS, IDENTIFIER) =>{
        let portNumber = PORTS
            .filter( PORT=> PORT[0] === IDENTIFIER)[0][1]
        delete PORTS[portNumber]
        PORTS.push([ "UNUSED", 0])
    },
    getPort: ( PORTS, IDENTIFIER) =>{
        return PORTS.filter( PORT=> PORT[0] === IDENTIFIER)[0][0]
    }
}

export { portManager, findServers, getAvailableRam};
