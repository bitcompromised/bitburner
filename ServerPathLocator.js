
export async function main( ns){
	
	var servers = [];
	var paths = [];
	
    async function sortServers( ns, Server) {
		Server = Server || await ns.getHostname();
        var scan = await ns.scan( Server);
        for ( var i = 0; i < scan.length; i++) {
            if ( !servers.includes( scan[i])) {
                servers.push( scan[i]);
				paths.push([ scan[i], [ Server]]);
                await sortServers( ns, scan[i]);
            }
        }
    }
	await sortServers(ns, "home");
	ns.clearLog();
	ns.tail();
    await getPath( ns, ns.args[0], paths);
}


async function getPath( ns, server, paths){
	var found = true;
	var path = "; connect " + server;
	paths.sort( function( a, b) {
		return (b[0].match( new RegExp(server, "g")) || []).length - (a[0].match( new RegExp(server, "g")) || []).length;
	});
	var match = paths[0];
	while ( found ){
		if ( match[1] == "home" ){
			found = false;
			return ns.print(path);
		} else {
			paths.sort(function(a, b) {
				return ( b[0].match( new RegExp(match[1][0], "g")) || []).length - (a[0].match( new RegExp(match[1][0], "g")) || []).length;
			});
			match = paths[0];
			path = ( "; connect " + match[0] +path);//+ path);
		}
	};
	ns.print( paths);
}
