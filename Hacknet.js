export async function main(ns) {
    if (ns.getHostname() != "home") {
        return ns.tprint( "Please run on home");
    } else {
        // do Init process
        ns.print( "Welcome home.");
		    }
    let settings = {
		calculate_priceperproduction: true,
        ['phases']: {
			phases: 4,
			0: {
				max_nodes: 10,
				min_level: 60,
				min_ram: 4,
				min_cores: 1,
			},
            1: {
				max_nodes: 14,
				min_level: 120,
				min_ram: 32,
				min_cores: 2,
			},
			2: {
				max_nodes: 16,
				min_level: 130,
				min_ram: 64,
				min_cores: 4,
			},
			3: {
				max_nodes: 18,
				min_level: 150,
				min_ram: 64,
				min_cores: 6,
			},
        },
    };
	ns.disableLog("ALL");
	ns.clearLog();
	ns.print( " Welcome to Hacknet node farmer");
	ns.tail();
	while (await getNextMove( ns, settings.phases)){
		await ns.sleep(1000);
	}
	ns.print( " Ran out of money.");
}

async function getNextMove( ns){
	if ( await ns.hacknet.numNodes() <= 0 ) {
		let nodeCost = ns.hacknet.getPurchaseNodeCost();
		let money = await ns.getPlayer().money;
		if (money > nodeCost){
			await ns.hacknet.purchaseNode();
		}
	} else {
		let nodeMin = [];
		for (let i=0; i < await ns.hacknet.numNodes(); i++){
			let coreCost = await ns.hacknet.getCoreUpgradeCost( i, 1);
			let levelCost = await ns.hacknet.getLevelUpgradeCost( i, 10);
			let ramCost = await ns.hacknet.getRamUpgradeCost( i, 1);
			let info = {
				coreCost: coreCost,
				levelCost: levelCost,
				ramCost: ramCost
			}
			let sortable = [];
			for (var cost in info) {
				if ( ns.formulas ) {
					//ns.tprint(ns.formulas.skills);
				}
				sortable.push([cost, info[cost]]);
			}
			sortable.sort(function(a, b) {
				return a[1] - b[1];
			});
			nodeMin.push([i, sortable[0]]);
			//let nodeCost = ns.hacknet.getPurchaseNodeCost();
			//ns.print(ns.getHacknetMultipliers() + ns.HacknetNodesFormulas.moneyGainRate(1,1,1,1));
		}
		nodeMin.sort(function(a, b) {
			return a[1][1] - b[1][1];
		});
		let action = nodeMin[0][1][0];
		let price = nodeMin[0][1][1];
		let nodeStats = ns.hacknet.getNodeStats(nodeMin[0][0]);
		let nodeCost = ns.hacknet.getPurchaseNodeCost();
		if (nodeCost < price){
			action = "nodeCost";
			price = nodeCost;
		}
		let money = await ns.getPlayer().money;
		if (money > price){
			price = Math.floor( price);
			if ( action == "coreCost" ){
				ns.print("Upgrading core of " + nodeMin[0][0] + " lvl " + nodeStats.cores + "->" + (nodeStats.cores + 1) + " ($" + price + ")");
				await ns.hacknet.upgradeCore( nodeMin[0][0], 1);
			} else if ( action == "levelCost" ) {
				ns.print("Upgrading level of " + nodeMin[0][0] + " lvl " + nodeStats.level + "->" + (nodeStats.level + 10) + " ($" + price + ")");
				await ns.hacknet.upgradeLevel( nodeMin[0][0], 10);
			} else if ( action == "ramCost" ) {
				ns.print("Upgrading ram of " + nodeMin[0][0] + " lvl " + nodeStats.ram^2 + "->" + ((nodeStats.ram^2)*2) + " ($" + price + ")");
				await ns.hacknet.upgradeRam( nodeMin[0][0], 1);
			} else if ( action == "nodeCost") {
				ns.print("Purchasing new node ($" + price + ")");
				await ns.hacknet.purchaseNode();
			};
		} else {
			ns.print("Ran out of money. Waiting 10 seconds.");
			await ns.sleep(9500);
			
		}
	}
	//ns.print(nodeMin);
	return true;
}
