
export { player, server}

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

const gangConstants = {
    GangRespectToReputationRatio: 5, // Respect is divided by this to get rep gain
    MaximumGangMembers: 30,
    GangRecruitCostMultiplier: 2,
    CyclesPerTerritoryAndPowerUpdate: 100,
    AscensionMultiplierRatio: 15 / 100, // Portion of upgrade multiplier that is kept after ascending
    GangNames: [
        "Slum Snakes",
        "Tetrads",
        "The Syndicate",
        "The Dark Army",
        "Speakers for the Dead",
        "NiteSec",
        "The Black Hand"
    ],
}

const stockConstants = {
    // Stock market
    WSEAccountCost: 200e6,
    TIXAPICost: 5e9,
    MarketData4SCost: 1e9,
    MarketDataTixApi4SCost: 25e9,
    StockMarketCommission: 100e3,
}

const cityConstants = {
    // Hospital/Health
    HospitalCostPerHp: 100e3,
}

const logConstants = {
    possibleLogs: {
        ALL: true,
        scan: true,
        hack: true,
        sleep: true,
        disableLog: true,
        enableLog: true,
        grow: true,
        weaken: true,
        nuke: true,
        brutessh: true,
        ftpcrack: true,
        relaysmtp: true,
        httpworm: true,
        sqlinject: true,
        run:true,
        exec:true,
        spawn: true,
        kill: true,
        killall: true,
        scp: true,
        getHackingLevel: true,
        getServerMoneyAvailable: true,
        getServerSecurityLevel: true,
        getServerBaseSecurityLevel: true,
        getServerMinSecurityLevel: true,
        getServerRequiredHackingLevel: true,
        getServerMaxMoney: true,
        getServerGrowth: true,
        getServerNumPortsRequired: true,
        getServerRam: true,

        // TIX API
        buyStock: true,
        sellStock: true,
        shortStock: true,
        sellShort: true,
        purchase4SMarketData: true,
        purchase4SMarketDataTixApi: true,

        // Singularity Functions
        purchaseServer: true,
        deleteServer: true,
        universityCourse: true,
        gymWorkout: true,
        travelToCity: true,
        purchaseTor: true,
        purchaseProgram: true,
        stopAction: true,
        upgradeHomeRam: true,
        workForCompany: true,
        applyToCompany: true,
        joinFaction: true,
        workForFaction: true,
        donateToFaction: true,
        createProgram: true,
        commitCrime: true,

        // Bladeburner API
        startAction: true,
        upgradeSkill: true,
        setTeamSize: true,
        joinBladeburnerFaction: true,

        // Gang API
        recruitMember: true,
        setMemberTask: true,
        purchaseEquipment: true,
        setTerritoryWarfare: true,
    }
}
