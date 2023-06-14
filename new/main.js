import { findServers, getAvailableRam} from "src/utils/utilities.js"


export async function main( ns){
    let SERVERS = await findServers( ns)
    let serverRam = await getAvailableRam( ns, ...SERVERS. SERVER_LIST);
    ns. tprint( "Server Ram: "+ serverRam)
}
