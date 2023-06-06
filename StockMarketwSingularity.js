export async function main( ns){
	
	ns.disableLog("ALL");
	ns.clearLog();
	ns.tail();
	
	var stocks = ns.stock.getSymbols();
	var lastTick = [];
	
	while ( true){
		
		var curTick = [];
		
		for ( var i = 0; i< stocks.length; i++){
				// Collect Forecast ( Stock value Growing/ Shrinking)
			curTick.push([ stocks[i],[
				await ns.stock.getForecast( stocks[i])
			]]);
		};
		
		if (lastTick.length == 0){
			lastTick = curTick;
		}
		for ( var i = 0; i< curTick.length; i++){
				// Get Player's position in stock.
			var position = ns.stock.getPosition(curTick[i][0]);
			if ( position[0] > 0){
					// If the Player has purchased the stock
				if(curTick[i][1][0] < .589){
						// And it is below threshold. Sell it.
					var sellPrice = await ns. stock. sellStock( curTick[i][0], position[0]);
					ns.print(`Sold ${ position[0]} shares of ${ curTick[i][0]} for $ ${ moneyFormat(( sellPrice- position[1])* position[0])} profit.`);
				}
			} else {
				if( lastTick[i][1][0] < .5 && curTick[i][1][0] > .63){
						// If the Player has not purchased stock: * Check Stock Forecast * purchase Max.
					var money = await ns.getPlayer().money- 100000;
					var askPrice = Math. ceil( await ns.stock.getAskPrice( curTick[i][0])+100);
					var shares = Math. max( await ns. stock. getMaxShares( curTick[i][0]), Math. abs( Math. floor( money/ askPrice)))
					askPrice = await ns. stock. buyStock( curTick[i][0], shares);
					if ( askPrice != 0 ){
						ns.print(`Purchased ${ Math. floor( money/ askPrice)} shares of ${ curTick[i][0]} for $ ${ moneyFormat( shares* askPrice)}.`);
					}
				}
			};
		};
		
		lastTick = curTick;
		await ns.sleep(6000);
	}
}
function moneyFormat( amt){
  var realAmt = Math.abs( amt);
  var letters = [ "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd"]; // Scientific Notation Increments
  var letter = "";
  var mult = 1;
  var i = 0;
  console.log( realAmt);
  while( i < letters.length){
    if ( realAmt/(1000**(i+1)) >= 1){
      letter = letters[ i];
      mult = 1000**(i+1);
    }
    i++;
  }
  var ret = ""+ (Math.floor(( amt/ mult)* 10)/ 10)+ letter;
  return ret;
}
//.3>---
//.3<--
// .5>-
// .5<+ 
//.7>++
//.7<+++
