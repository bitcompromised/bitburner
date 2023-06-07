export async function main( ns){
	
	ns. atExit( async()=>{
		await ns. exec( "start.js", "home", 1);
		await ns. closeTail( ns.pid)
    }) ;
	
	await ns. nuke( "foodnstuff");
	
	await ns. write( "eski/init/weaken.script", "weaken( 'foodnstuff')", "w");
	await ns. write( "eski/init/grow.script", "grow( 'foodnstuff')", "w");
	await ns. write( "eski/init/hack.script", "hack( 'foodnstuff')", "w");
		
	for ( var i = 0; i< 5; i++){
		await ns. exec( "eski/init/weaken.script", "home", 2)
		await ns. sleep( 230000);
		await ns. exec( "eski/init/grow.script", "home", 2)
		await ns. sleep( 230000);
		await ns. exec( "eski/init/hack.script", "home", 2)
		await ns. sleep( 230000);
	}
	
}
