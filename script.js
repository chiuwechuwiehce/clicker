
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
  let saving = false;
  let deb = false;
  let pickedrands = [];
  // Upgrade Vars
  let upg_x2clickers = 0;
  let upg_x2workers = 0;
// Keypress
document.addEventListener("keyup", function onEvent(event) {
    if (event.key === "z") {
      clickbtn()
    }
});
// Window Events
window.addEventListener('load', function() {
  setTimeout(function(){
    load()
    updateshoptext()
    saving = true
  },10)
})
// Functions

function clickbtn() {
  debounce(function(){
    click(cperclick)
  },25)
}

function debounce(func,delay){
  if (deb == false){
    deb = true
    func();
    setTimeout(function(){
      deb = false
    },delay)
  }
} 

function runinrandomorder(table){
  let stopifnotwork = 0;
  let run_next = true
  while (pickedrands.length != table.length){
    stopifnotwork++
    if (stopifnotwork == 10000){
      console.log('broken')
      return;
    }
    let rand = randInt(table.length - 1)
    for (let i = 0; i < pickedrands.length; i++){
      if (pickedrands[i] == rand){
        run_next = false
      }
    }
    if (run_next == true){
      let runfunc = table[rand];
      runfunc();
      pickedrands.push(rand);
    } else {
      run_next = true
    }
  }
  pickedrands = [];
}

function save() {
  localStorage.setItem('3JDO9JS8RMM27', EnumDataUnresponsive(clicks));
  localStorage.setItem('9BNS55FS8UH66', EnumDataUnresponsive(clickers));
  localStorage.setItem('I93M2WR6UNP74', EnumDataUnresponsive(clickercost));
  localStorage.setItem('8949JfmcjJWU5', EnumDataUnresponsive(cperclick));
  localStorage.setItem('9BN54Jw9MM384', EnumDataUnresponsive(cperclickcost));
  localStorage.setItem('IIOW93N3849N8', EnumDataUnresponsive(workers));
  localStorage.setItem('83nmJW93KK5Ns', EnumDataUnresponsive(workercost));
  localStorage.setItem('3489MNd9njdrE', EnumDataUnresponsive(curupgrade));
  localStorage.setItem('BOOL39JWmWI98', upg_x2clickers);
  localStorage.setItem('BOOL38Md9Mew3', upg_x2workers);
}

function load() {
  if (localStorage.getItem('3JDO9JS8RMM27') !== null) {
    clicks = FixDataUnresponsive(localStorage.getItem('3JDO9JS8RMM27'))
  }
  
  if (localStorage.getItem('9BNS55FS8UH66') !== null) {
    clickers = FixDataUnresponsive(localStorage.getItem('9BNS55FS8UH66'))
  }
  
  if (localStorage.getItem('I93M2WR6UNP74') !== null) {
    clickercost = FixDataUnresponsive(localStorage.getItem('I93M2WR6UNP74'))
  }
  
  if (localStorage.getItem('8949JfmcjJWU5') !== null) {
    cperclick = FixDataUnresponsive(localStorage.getItem('8949JfmcjJWU5'))
  }
  
  if (localStorage.getItem('9BN54Jw9MM384') !== null) {
    cperclickcost = FixDataUnresponsive(localStorage.getItem('9BN54Jw9MM384'))
  }

  if (localStorage.getItem('IIOW93N3849N8') !== null) {
    workers = FixDataUnresponsive(localStorage.getItem('IIOW93N3849N8'))
  }

  if (localStorage.getItem('83nmJW93KK5Ns') !== null) {
    workercost = FixDataUnresponsive(localStorage.getItem('83nmJW93KK5Ns'))
  }

  if (localStorage.getItem('3489MNd9njdrE') !== null) {
    curupgrade = FixDataUnresponsive(localStorage.getItem('3489MNd9njdrE'))
  }

  if (localStorage.getItem('BOOL39JWmWI98') !== null) {
    upg_x2clickers = localStorage.getItem('BOOL39JWmWI98')
  }

  if (localStorage.getItem('BOOL38Md9Mew3') !== null) {
    upg_x2workers = localStorage.getItem('BOOL38Md9Mew3')
  }
  setTimeout(function(){
    updateshoptext()
  },1000)
}

function EnumDataUnresponsive(error) {
  return parseInt(error) * 4814.2845012
}

function FixDataUnresponsive(error) {
  return Math.round(parseInt(error) / 4814.2845012)
}

function updateshoptext() {
  changeElementText('workerst','Worker (makes 1 autoclicker per 10 seconds): '+workercost+' Clicks')
  changeElementText('clickerst','Autoclicker: ' + clickercost + ' Clicks')
  changeElementText('cperclickst','+1 Clicks Per Click: ' + cperclickcost + ' Clicks')
  if (curupgrade == 1) {
    changeElementText('upgrade', 'Make Autoclickers 2x More Efficient: 400 Clicks')
  }
  if (curupgrade == 0) {
    changeElementText('upgrade', 'No Upgrades Yet!')
  }
  if (curupgrade == 2) {
    changeElementText('upgrade', 'x2 Worker Productivity: 7500 Clicks')
  }
  if(workers >= 1 && curupgrade == 0 && upg_x2workers == 0){
    console.log('WORKER')
    curupgrade = 2
    changeElementText('upgrade','x2 Worker Productivity: 7500 Clicks')
  }
}

function randInt(max){
  return Math.floor(Math.random() * (max + 1));
}

function changeClicks(amt) {
  clicks += amt;
  changeElementText('clickscounter', 'Clicks: ' + clicks)
}
function setClicks(amt) {
  clicks = amt;
  changeElementText('clickscounter', 'Clicks: ' + clicks)
}
function resetgame() {
  saving = false
  localStorage.clear();
  setTimeout(function() {
    window.location.reload();
  },1000)
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
  if (item == 'clicker') {
    if (clicks >= clickercost) {
      changeClicks(-clickercost)
      clickers += 1;
      clickercost = Math.round(clickercost*1.5)
      changeElementText('clickerst','Autoclicker: ' + clickercost + ' Clicks')
    }
  } else if (item == 'cperclick') {
    if (clicks >= cperclickcost) {
      changeClicks(-cperclickcost)
      cperclick += 1;
      cperclickcost = Math.round(cperclickcost*1.5)
      changeElementText('cperclickst','+1 Clicks Per Click: ' + cperclickcost + ' Clicks')
    }
  } else if (item == 'crupgrade') {
    if (curupgrade == 1){
      if (clicks >= 400){
        changeClicks(-400)
        upg_x2clickers = 1
        curupgrade = 0
        changeElementText('upgrade','No Upgrades Yet!')
      }
    } else if (curupgrade == 2) {
      if (clicks >= 7500){
        changeClicks(-7500)
        upg_x2workers = 1
        curupgrade = 0
        changeElementText('upgrade','No Upgrades Yet!')
      }
    }
  }
  if (item == 'worker') {
    if (clicks >= workercost) {
      changeClicks(-workercost)
      workers += 1
      workercost = Math.round(workercost*1.5)
      changeElementText('workerst','Worker (makes 1 autoclicker per 10 seconds): '+workercost+' Clicks')
    }
  }
}

function ticker() {
  if (tentick == 10) {
    tentick = 0;
    clickers += workers
    if (upg_x2workers == true) {
      clickers += workers
    }
    if (minutes == 6) {
      if (rush == 0) {
        randrush = randInt(1,5)
      } else {
        rush = 0;
        changeElementText('isrush','x2 Rush: None')
      }
      if (randrush == 5) {
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
  if (upg_x2clickers == true) {
    click(clickers)
  }
  if (saving == true){
    save()
  }
}
function mticker(){
  console.log("ms")
  if(workers >= 1 && curupgrade == 0 && upg_x2workers == 0){
    console.log('WORKER')
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
