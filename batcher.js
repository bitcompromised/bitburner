



export async function main( ns){
	//let trackerPID = ns.exec();
	//ns.atExit(async f()=>{
	//	ns.kill( trackerPID);
	//});
	
   // do Init process
	ns. disableLog("ALL");
	ns. clearLog();
	
	//ns. write( "batching/batch.js", ``, "w");

    
	var delay = 1000; // 10s delay;
	var servers = {
		all: [],
		targets: [],
		slaves: [],
		batching: [],
	};
	
	
	async function sortServers( ns, Server) {
		Server = Server || await ns. getHostname();
		if (await ns. hasRootAccess( Server) && await ns. getServerMaxRam( Server) > 0 ) {
            servers. slaves. push([ Server ,[ await ns.getServerMaxRam( Server)]]);
			ns. scp( "batching/batch.js", Server, "home");
        }
		if (await ns.getServerMaxMoney( Server) > 0 && await ns. getServerRequiredHackingLevel( Server) <= await ns.getHackingLevel() && await ns.hasRootAccess(Server)) {
			var server = ns.getServer( Server);
			var player = ns.getPlayer();
			servers.targets. push([ Server ,[ 
				await ns.getServerMaxMoney( Server), await ns. getServerMinSecurityLevel( Server),( ns. ls( Server). includes("formulas.exe") ? ns.formulas.hacking. hackTime(server, player)+ ns.formulas.hacking. growTime(server, player)+ ns.formulas.hacking. weakenTime( server, player) : ns. getHackTime( Server)+ ns. getWeakenTime( Server)+ ns. getGrowTime( Server) )
			]]);
        }
        var scan = await ns. scan( Server);
        for (var i = 0; i < scan. length; i++) {
            if (! servers.all. includes( scan[ i])) {
				try{
					ns. relaysmtp( scan[ i]);
				} catch {};
				try{
					ns. httpworm( scan[ i]);
				} catch {};
				try{
					ns. ftpcrack( scan[ i]);
				} catch {};
				try{
					ns. brutessh( scan[ i]);
				} catch {};
				try{
					ns. sqlinject( scan[ i]);
				} catch {};
				try{
					ns. nuke( scan[ i]);
				} catch {};
                servers.all. push(scan[ i]);
                await sortServers( ns, scan[ i]);
            }
        }
    }
    await sortServers( ns);
	servers.targets. sort(function(a, b) {
		return b[1][3] - a[1][3];
	});
	servers.batching. push( servers. targets[ 0]);
	servers.batching. push( servers. targets[ 1]);
	//servers.batching. push( servers. targets[ 2]);
	//servers.batching. push( servers. targets[ 3]);
	//servers.batching. push( servers. targets[ 4]);
	//servers.batching. push( servers. targets[ 5]);
	//servers.batching. push( servers. targets[ 6]);
	
	// exec serverTracker [ servers. batching ]
	await ns. exec( "serverTracker.js", "home", 1, servers. batching[ 0][ 0], servers. batching[ 1][ 0]);//, servers. batching[ 2][ 0]);
	for( var i = 0; i < servers.batching. length; i++){
		// Prepare servers...
		await deliverAndExecute( ns, "batching/batch.js", 5, servers.slaves, servers.batching[ i][ 0]);
	};
}

async function deliverAndExecute( ns, file, threads, slaves, target){ // slaves: [ Server,[ maxRam]]
	var ramUsage = ns. getScriptRam( file, "home");
	for( let i = 0; i < slaves.length; i++ ){
		await ns. scp( file, slaves[ slaves. length- i- 1][0], "home");
		if ( threads == 0 ){
			return true;
		}
		let ramAvailable = slaves[ slaves. length- i- 1][ 1][ 0] - ns. getServerUsedRam( slaves[ slaves. length- i- 1][ 0]);
		if ( slaves[ slaves. length- i- 1][0] == "home"){
			ramAvailable -= 64;
		}
		let threadsPossible = Math.abs( Math.ceil( Math.min( threads, Math. floor( ramAvailable/ ramUsage))));
		if ( threadsPossible > 0 ){
			var success = await ns. exec( file, slaves[ slaves. length- i- 1][ 0], threadsPossible, target);
			if ( success == 0 ) {
				ns. tprint( "Failed to execute "+ file+ "| on server "+ slaves[ slaves. length- i- 1][ 0]);
			} else {
				threads -= threadsPossible;
			}
		}
	};
	return false;
};
