import { justStarted, serverManager} from "./eski/utils.js";

export async function main(ns) {
	if ( ns. getHostname() != "home") {
        return ns. tprint( "Please run on home");
    }
	ns. disableLog( "ALL");
	ns. clearLog();
	ns. tail();
	ns. print( serverManager. int);
  await justStarted( ns) === true ? ( async()=>{
    ns. atExit( async()=>{
		await ns. exec( "eski/firstrun.js", "home", 1);
		await ns. closeTail( ns.pid)
    }) ;

    await ns. sleep( 15000);
    await ns. exit();

	})(): ( async()=>{
		ns. atExit( async()=>{
			
		});
		await ns. sleep( 15000);
		await ns. tprint( "User already initiated");
		return await ns. exit();
	})();


}
