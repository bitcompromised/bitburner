
/*{"name":"iron-gym",
"entries":{
"name":"iron-gym",
"parent":"home",
"ip":"91.4.9.9",
"lvl":100,
"playerserver":false,
"org":"Iron Gym Network",
"maxram":32,
"availableram":32,
"security":30,
"minsecurity":10,
"root":false,
"hackable":false,
"ns":{}}*/
class Server{

    constructor( name = "home", parent = "none") {
        this.name = name;
        this.parent = name == "home"? "none": parent
        return this;
    }

    async init( ns){
        let server = await ns.getServer( this.name)
        this.ip = server.ip
        this.lvl = server.requiredHackingSkill
        this.playerserver = server.purchasedByPlayer
        this.org = server.organizationName
        this.money = server.moneyAvailable
        this.maxmoney = server.moneyMax
        this.maxram = server.maxRam
        this.availableram = server.maxRam - server.ramUsed
        this.security = server.hackDifficulty
        this.minsecurity = server.minDifficulty;
        this.root = server.hasAdminRights;
        this.hackable = this.root && (server.numOpenPortsRequired <= server.openPortCount);
        this.ns = ns
    }

    async hack( args={}){
        return await this.ns.hack(this.name, args)
    }
}
class DatabaseEntry{
    constructor( name, entry = {}){
        this.name = name
        this.entry = entry
    }
    get( index){
        if( index == undefined){
            return this.entry
        } else {
            return this.entry[index]
        }
    }
    update( upd_obj){
        for( let key in upd_obj){
            this.entry[key] = upd_obj[key]
        }
    }
    add( index, val){
        this.entry[index]+= val;
    }
    mult( index, val){
        this.entry[index]*= val;
    }
}
class Database{
    constructor(name, content) {
        this.name = name
        this.entries = content
        return this
    }
    addEntry( name, value = {}){
        this.entries[name]= new DatabaseEntry( name, value)
        return this.entries[name]
    }
    search( name){
        let matches = []
        for( let entry in this.entries){
            if (entry== name){
                return ( this.entries[entry])
            } else if( entry.match( name)) {
                matches.push( this.entries[entry])
            }
        }
        return matches
    }
}
class Database_Manager{
    constructor(){
        this.databases = []
    }
    new( name, value = {}){
        let database = new Database( name, value)
        this.databases.push([name, database])
        return database
    }
    search( name){
        return this.databases.filter( db=> db[0].match( name))[0]
    }
}
export { Server, Database_Manager, Database, DatabaseEntry}















