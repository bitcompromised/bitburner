


export async function justStarted( ns, ){
	
	const FORMULAS = ns. ls( "home").includes( "Formulas.exe");
	const SINGULARITY = ns. getServerMaxRam( "home") === 8;
	
	return SINGULARITY === false? true: !FORMULAS;
}

export async function getServer( ns, SERVERT){
	const SERVER = await ns. getServer( SERVERT);
	const host = SERVER. hostname;
	const ip = SERVER. ip;
	const root = SERVER. hasAdminRights;
	const backdoor = SERVER. backdoorinstalled;
	const Security = SERVER. hackDifficulty;
	const minSecurity = SERVER. minDifficulty;
	const cpuCores = SERVER.cpuCores;
	const maxMoney = SERVER. moneyMax;
	const money = SERVER. moneyAvailable;
	const portsNeeded = SERVER. numOpenPortsRequired;
	const portsOpen = SERVER. openPortCount;
	const organization = SERVER. organizationName;
	const player = SERVER. purchasedByPlayer;
	const level = SERVER. requiredHackingSkill;
	const growth = SERVER. serverGrowth;
	const ram = SERVER. maxRam;
	
	return {
		host,
		ip,
		root,
		backdoor,
		organization,
		player,
		cpuCores,
		level,
		money,
		maxMoney,
		Security,
		minSecurity,
		ram,
		growth,
		portsOpen,
		portsNeeded,
		
	}
}

export async function getPlayer( ns){
  const PLAYER = await ns. getPlayer( );
  const money = PLAYER. money;
  const factions = PLAYER. factions;
  const jobs = PLAYER. jobs;
  const location = PLAYER. location;
  
  return {
	money,
	location,
	factions,
	jobs,
  }
}
const serverManager = { 
	getServer,
};
export {serverManager};





