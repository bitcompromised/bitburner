import { findServers, getAvailableRam} from "src/utils/utilities.js"
import { logs} from "src/utils/constants.js"


/*
    sendLog( ns, LOGS, TYPE, MESSAGE)
    getLogs( LOGS, TYPE, HOST, SCRIPT, START_TIME)
    clearLogs( log.Logs)


 */
export async function main( ns){
    let SERVERS = await findServers( ns)
    let serverRam = await getAvailableRam( ns, ...SERVERS. SERVER_LIST)
    logs.sendLog( ns, logs.LOGS, "ERROR", "Server Ram: "+ serverRam)
    let thisLogs = await logs.getLogs( logs.LOGS, "ALL")
    logs.clearLogs( logs.LOGS)

    ns. tprint( thisLogs)
}
