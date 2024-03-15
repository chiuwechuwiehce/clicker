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
// Keypress
// Functions
function changeClicks(amt){
  clicks += amt;
  changeElementText('clickscounter', 'Clicks: ' + clicks)
}
document.addEventListener("keydown", function(event){
  if(event.key = 'p'){
    changeClicks(10000)
  }
});
function resetgame(){
  changeClicks(-clicks)
  upg_x2clickers = false
  rush = 0
  cperclick = 1
  clickers = 0
  clickercost = 20
  cperclickcost = 40
  tentick = 0
  minutes = 0
  tick = 0
  randrush = 0
  curupgrade = 1
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
    }
  }
  if(item == 'worker'){
    if(clicks >= workercost){
      changeClicks(-500)
      workers += 1
      workercost = workercost*1.5
      changeElementText('workerst','Worker (makes 1 autoclicker per 10 seconds): '+workercost+' Clicks')
    }
  }
}
function ticker() {
  if(tentick == 10){
    tentick = 0;
    clickers += workers
    if(minutes == 6){
      if(rush == 0){
        randrush = Math.random(1,10)
      } else {
        rush = 0;
        changeElementText('isrush','x2 Rush: None')
      }
      if(randrush == 10){
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
  changeElementText('clickers','Autoclickers: '+clickers)
  changeElementText('cperclick','Clicks Per Click: '+cperclick)
}
// Code
setInterval("ticker()", 1000)
