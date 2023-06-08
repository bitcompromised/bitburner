/* learning array functions. my code. */
async function genServers( ns, SERVER, SERVER_LIST){
	var SCAN = await ns. scan( SERVER)
		.filter( CHILD=>! SERVER_LIST. ALL. includes( CHILD))
		.map( async( CHILD)=> {
			SERVER_LIST. ALL.push( CHILD)
			await genServers( ns, CHILD, SERVER_LIST)
		});
}
