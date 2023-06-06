function moneyFormat( amt){
  var realAmt = Math.abs( amt);
  var letters = [ "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd"];
  var letter = "";
  var mult = 1;
  var i = 0;
  console.log( realAmt);
  while( i < letters.length){
    if ( realAmt/(1000**(i+1)) > 1){
      letter = letters[ i];
      mult = 1000**(i+1);
    }
    i++;
  }
  var ret = ""+ (Math.floor(( amt/ mult)* 10)/ 10)+ letter;
  return ret;
}
