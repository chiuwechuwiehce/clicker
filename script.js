function updateshoptext(){
  changeElementText('workerst','Worker (makes 1 autoclicker per 10 seconds): '+workercost+' Clicks')
  changeElementText('clickerst','Autoclicker: ' + clickercost + ' Clicks')
  changeElementText('cperclickst','+1 Clicks Per Click: ' + cperclickcost + ' Clicks')
}
  // Vars
  let randrush = 0;
  let rush = 0;
  let clicks = 0;
  let cperclick = 1;
  let clickers = 0;
  let clickercost = 20;
  let cperclickcost = 40;
  let tentick = 0;
  let minutes = 0;
  let curupgrade = 1;
  let workercost = 500;
  let workers = 0;
  // Upgrade Vars
  let upg_x2clickers = false;
  let upg_x2workers = false;
// Keypress
document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "z") {
        click(cperclick)
    }
});
// Functions
function changeClicks(amt){
  clicks += amt;
  changeElementText('clickscounter', 'Clicks: ' + clicks)
}
function setClicks(amt){
  clicks = amt;
  changeElementText('clickscounter', 'Clicks: ' + clicks)
}
function resetgame(){
  window.location.reload();
}
function changeElementText(id,text){
  document.getElementById(id).innerHTML = text
}
function click(amt) {
  changeClicks(amt)
  if(rush == 1){
    changeClicks(amt)
  }
};
function buy(item) {
  if(item == 'clicker'){
    if(clicks >= clickercost){
      changeClicks(-clickercost)
      clickers += 1;
      clickercost = Math.round(clickercost*1.5)
      changeElementText('clickerst','Autoclicker: ' + clickercost + ' Clicks')
    }
  } else if(item == 'cperclick'){
    if(clicks >= cperclickcost) {
      changeClicks(-cperclickcost)
      cperclick += 1;
      cperclickcost = Math.round(cperclickcost*1.5)
      changeElementText('cperclickst','+1 Clicks Per Click: ' + cperclickcost + ' Clicks')
    }
  } else if(item == 'crupgrade'){
    if(curupgrade == 1){
      if(clicks >= 400){
        changeClicks(-400)
        upg_x2clickers = true
        curupgrade = 0
        changeElementText('upgrade','No Upgrades Yet!')
      }
    } else if(curupgrade == 2){
      if(clicks >= 7500){
        changeClicks(-7500)
        upg_x2workers = true
        curupgrade = 0
        changeElementText('upgrade','No Upgrades Yet!')
      }
    }
  }
  if(item == 'worker'){
    if(clicks >= workercost){
      changeClicks(-workercost)
      workers += 1
      workercost = Math.round(workercost*1.5)
      changeElementText('workerst','Worker (makes 1 autoclicker per 10 seconds): '+workercost+' Clicks')
    }
  }
}

function save(){
  let num1 = clicks * 1432
  let reg1 = num1.toString() + '|';
  let num2 = clickers * 1432
  let reg2 = num2.toString() + '|';
  let num3 = cperclick * 1432
  let reg3 = num3.toString() + '|';
  let num4 = workers * 1432
  let reg4 = num4.toString() + '|';
  let num5 = upg_x2clickers * 909320
  let reg5 = num5.toString() + '|';
  let num6 = upg_x2workers * 909320
  let reg6 = num6.toString() + '|';
  let num7 = curupgrade * 909320
  let reg7 = num7.toString() + '|';
  let num8 = clickercost * 1432
  let reg8 = num8.toString() + '|';
  let num9 = cperclickcost * 1432
  let reg9 = num9.toString() + '|';
  let num10 = workercost * 1432
  let reg10 = num10.toString();
  let savecode = reg1 + reg2 + reg3 + reg4 + reg5 + reg6 + reg7 + reg8 + reg9 + reg10;
  changeElementText('savecode',savecode);
}

function load(){
  let code = document.getElementById('inputload').value;
  console.log(code)
  let tablecode = code.split('|');
  let c1 = tablecode[0];
  let c2 = tablecode[1];
  let c3 = tablecode[2];
  let c4 = tablecode[3];
  let c5 = tablecode[4];
  let c6 = tablecode[5];
  let c7 = tablecode[6];
  let c8 = tablecode[7];
  let c9 = tablecode[8];
  let c10 = tablecode[9];
  let ovr1 = parseInt(c1) / 1432
  let ovr2 = parseInt(c2) / 1432
  let ovr3 = parseInt(c3) / 1432
  let ovr4 = parseInt(c4) / 1432
  let ovr5 = parseInt(c5) / 909320
  let ovr6 = parseInt(c6) / 909320
  let ovr7 = parseInt(c7) / 1432
  let ovr8 = parseInt(c8) / 1432
  let ovr9 = parseInt(c9) / 1432
  let ovr10 = parseInt(c10) / 1432
  for(let i = 0; i < tablecode.length; i++){
    let elem = tablecode[i]
    let checked = parseInt(elem) / 1432
    if(checked % 1 != 0){
      changeElementText('loadcodest','INVALID CODE')
      return;
    }
  }
  setClicks(ovr1)
  clickers = ovr2;
  cperclick = ovr3;
  workers = ovr4;
  upg_x2clickers = ovr5;
  upg_x2workers = ovr6;
  curupgrade = ovr7;
  clickercost = ovr8;
  cperclickcost = ovr9;
  workercost = ovr10;
  changeElementText('loadcodest','CODE LOADED')
  updateshoptext()
}

function ticker() {
  if(tentick == 10){
    tentick = 0;
    clickers += workers
    if(upg_x2workers == true){
      clickers += workers
    }
    if(minutes == 6){
      if(rush == 0){
        randrush = Math.random(1,5)
      } else {
        rush = 0;
        changeElementText('isrush','x2 Rush: None')
      }
      if(randrush == 5){
        rush = 1;
        changeElementText('isrush','x2 Rush: Active')
      }
      minutes = 0;
    } else {
      minutes += 1;
    }
  } else {
    tentick += 1;
  }
  click(clickers)
  if(upg_x2clickers == true){
    click(clickers)
  }
}
function mticker(){
  if(workers >= 1 && curupgrade == 0 && upg_x2workers == false){
    curupgrade = 2
    changeElementText('upgrade','x2 Worker Productivity: 7500 Clicks')
  }
  changeElementText('clickers','Autoclickers: '+clickers)
  changeElementText('cperclick','Clicks Per Click: '+cperclick)
  changeElementText('workers','Workers: '+workers)
}
// Code
setInterval("ticker()", 1000)
setInterval("mticker()",1)
