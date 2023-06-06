export async function main( ns){
	
	ns.disableLog("ALL");
	ns.clearLog();
	ns.tail();
	
	var target = ns. args[ 0];
	var servers = [ ];
	var slaves = [ ];
	var delay = 45000; // 15s delay
	
	async function sortServers( ns, Server) {
		Server = Server || await ns. getHostname();
		if (await ns. hasRootAccess( Server) && await ns. getServerMaxRam( Server) > 0 ) {
            slaves. push([ Server ,[ await ns.getServerMaxRam( Server)]]);
        }
        var scan = await ns. scan( Server);
        for ( var i = 0; i < scan. length; i++) {
            if (! servers. includes( scan[ i])) {
                servers. push(scan[ i]);
                await sortServers( ns, scan[ i]);
            }
        }
    }
    await sortServers( ns);
	while( true){
		while ( ns.getServerMinSecurityLevel( target) < ns.getServerSecurityLevel( target) || ns.getServerMaxMoney( target) > ns.getServerMoneyAvailable( target) ){
			// Initial Prepare
			var gThreads = Math.ceil(ns. growthAnalyze( target, ns. getServerMaxMoney( target)/ns. getServerMoneyAvailable( target), 1));
			var wThreads = Math.ceil((ns. getServerSecurityLevel( target)- ns. getServerMinSecurityLevel( target))/ ns. weakenAnalyze( 1,1)+( gThreads/ 2));
			
			var Time = Date. now();
			var gTime = await ns. getGrowTime( target);
			var wTime = await ns. getWeakenTime( target);
			var maxTime = Math. max( gTime, wTime)+ 3000;
			var gStart = Time+ maxTime- gTime- 1000;
			var wStart = Time+ maxTime- wTime- 2000;
				
			await deliverAndExecute( ns, "batching/grow.script", gThreads, slaves, target, gStart);
			await deliverAndExecute( ns, "batching/weak.script", wThreads, slaves, target, wStart);
			
			var interval = maxTime/ 20;
			for( var i = 0; i < 20; i++){
				ns.clearLog();
				ns. print( "		"+ target);
				ns. print( "G+W ["+ "|". repeat( i)+ "-". repeat( 20- i)+"]");
				await ns. sleep( interval);
			};
		};
		
		// Prepared.
		
		
		var hThreads = Math. ceil((( await ns. getServerMaxMoney( target)* .25)/ await ns. getServerMaxMoney( target))/ await ns. hackAnalyze( target));
		var wThreads = hThreads/ 4;
		var gThreads = ns. growthAnalyze( target, 1.5, 1);
		var wThreads2 = gThreads;
		
		var hTime = await ns. getHackTime( target);
		var gTime = await ns. getGrowTime( target);
		var wTime = await ns. getWeakenTime( target);
		
		var maxTime = Math. max( hTime, gTime, wTime)+ 25000;
		
		
		while( ns.getServerMaxMoney( target)/2 < ns.getServerMoneyAvailable( target)){
			
			var Time = Date.now()+ maxTime;
			
			await deliverAndExecute( ns, "batching/hack.script", hThreads, slaves, target, Time- hTime- 20000);
			await deliverAndExecute( ns, "batching/weak.script", wThreads, slaves, target, Time- wTime- 15000);
			await deliverAndExecute( ns, "batching/grow.script", gThreads, slaves, target, Time- gTime- 10000);
			await deliverAndExecute( ns, "batching/weak.script", wThreads2, slaves, target, Time- wTime- 5000);
			
			ns. print( "Batching");

			await ns. sleep( delay);
		}
	}
}

async function deliverAndExecute( ns, file, threads, slaves, target, time){ // slaves: [ Server,[ maxRam]]
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
			var success = await ns. exec( file, slaves[ slaves. length- i- 1][ 0], threadsPossible, target, time);
			if ( success == 0 ) {
				ns. tprint( "Failed to execute "+ file+ "| on server "+ slaves[ slaves. length- i- 1][ 0]);
			} else {
				threads -= threadsPossible;
			}
		}
	};
	return false;
};
