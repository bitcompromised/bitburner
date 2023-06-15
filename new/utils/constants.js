
export { player, server, logs}

const player = {
    maxRam: 2**30,
    servers:{
        limit: 25,
        maxRam: 2**20,
    },
    travel:{
        cost: 2e5,
        cities: {

        }
    }
}
const server= {
    securityIncrease: 2e-3,
    securityDecrease: 5e-2
}

const corporationConstants = {}

const gangs = {
    GANGS: [
        "Slum Snakes",
        "Tetrads",
        "The Syndicate",
        "The Dark Army",
        "Speakers for the Dead",
        "NiteSec",
        "The Black Hand"
    ],
    RESPECT_TO_REPUTATION: 5, // Respect is divided by this to get rep gain
    MAX_MEMBERS: 30,
    RECRUITMENT_MULTIPLIER: 2,
    CYCLES_TO_UPDATE: 100,
    ACENTION_UPGRADES_KEPT_RATIO: 15 / 100, // Portion of upgrade multiplier that is kept after ascendin
}

const stocks = {
    // Stock market
    WSE_COST: 200e6,
    TIX_COST: 5e9,
    MARKET_4S_Cost: 1e9,
    MARKET_TIX4S_COST: 25e9,
    STOCK_COMMISSION: 100e3,
}

const cities = {
    CITIES: [],
    HOSPITAL_COST_PER_HP: 100e3,
}

const logs = {
    TOGGLED: {
        ALL: false,
        ERRORS: false,
        WARNINGS: false,
        INFORMATION: true,
        LOG: true,
    },
    LOGS: [],
    sendLog: ( ns, LOGS, TYPE = "ERROR", MESSAGE = "NO MESSAGE PROVIDED") => {
        let HOST = ns. getHostname()
        let SCRIPT = ns. getScriptName()
        let TIME = Date.now();
        let DATA = [TYPE, MESSAGE, SCRIPT, HOST, TIME];
        switch( TYPE){
            case "ERROR":
                DATA. push( "\u001b[31m")
                break
            case "INFORMATION":
                DATA. push( "\u001b[34m")
                break
            case "WARNING":
                DATA. push( "\u001b[33m")
                break
            case "LOG":
                DATA. push( "\u001b[3m")
                break
        }
        LOGS. push( DATA)
    },
    getLogs: ( LOGS, TYPE, HOST, SCRIPT, START_TIME = 0) => {
        let RESULTS = TYPE === "ALL" ? LOGS : LOGS
            .filter( LOG => LOG[0] === TYPE);
        RESULTS =( SCRIPT === "NONE") ? RESULTS : RESULTS
            .filter( LOG => LOG[2].match( SCRIPT) !== null)
        RESULTS = START_TIME === 0 ? RESULTS : RESULTS
            .filter( LOG => LOG[3].match( HOST))
        RESULTS = START_TIME === 0 ? RESULTS : RESULTS
            .filter( LOG => LOG[4] > START_TIME)
        return RESULTS
    },
    clearLogs: ( LOGS) =>{
        LOGS.splice( 0, LOGS. length)
        return LOGS
    },
    TEXT:{
        RESET: "\u001b[0m",
        COLORS: {
            BACKGROUND: {
                RED: "\u001b[41m",
                GREEN: "\u001b[42m",
                YELLOW: "\u001b[43m",
                BLUE: "\u001b[44m",
                PINK: "\u001b[45m",
                CYAN: "\u001b[46m",
                WHITE: "\u001b[47m",
            },
            GREY: "\u001b[30m",
            RED: "\u001b[31m",
            YELLOW: "\u001b[33m",
            BLUE: "\u001b[34m",
            PINK: "\u001b[35m",
            CYAN: "\u001b[36m",
            WHITE: "\u001b[37m",
        },
        STYLES: {
            BOLD: "\u001b[1m",
            ITALICS: "\u001b[3m",
            UNDERLINE: "\u001b[4m",
        },
    },
}
