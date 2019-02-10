const table = document.querySelector('.pedigreetable');
const colors = ['azure', 'beige', 'coral', 'darkseagreen', 'mediumorchid', 'silver', 'teal'];

let ancestorQuantity = 0;
let summ = []; //arrays of all lines of ancestor


table.addEventListener('click', function(event){
  if(!event.target.classList.contains('inactive') && !event.target.classList.contains("blocked") ) {
    event.target.classList.toggle("selected-td");
    event.target.classList.toggle(colors[ancestorQuantity]);
  
    if(event.target.classList.contains('selected-td')) {
      if(event.target.classList.contains('f1') || event.target.classList.contains('f2') 
         || event.target.classList.contains('f3') || event.target.classList.contains('f4')) {
  
          let inactive = document.querySelectorAll('.m1, .m2, .m3, .m4');
          for (let item of inactive) {
            if(!item.classList.contains("blocked")) item.classList.add("inactive");
          }
      }
      else {
        let inactive = document.querySelectorAll('.f1, .f2, .f3, .f4');
        for (let item of inactive) {
          if(!item.classList.contains("blocked")) item.classList.add("inactive");
        }
      }
    }
  }
})

function createLine(row) { //creat massive ot current choosen ancestors and push to summ
  const selectedTd = row.querySelectorAll('.selected-td');
  let summ = [];

  for (var i = 0; i < selectedTd.length; i++) {
    if (selectedTd[i].classList.contains('f1') || selectedTd[i].classList.contains('m1') )  {
      summ.push(1);
    }
    else if(selectedTd[i].classList.contains('f2') || selectedTd[i].classList.contains('m2') ) {
      summ.push(2);
    }
    else if(selectedTd[i].classList.contains('f3') || selectedTd[i].classList.contains('m3')){
      summ.push(3);
    }
    else {
      summ.push(4);
    }
  }
  return summ.sort();
}


function addAncestor() {
  if (ancestorQuantity > colors.length) {
    document.querySelector('#pedigree-script-result')
      .innerHTML = "Количество предков более " + colors.length + " не поддерживается в настоящее время";
  }
  else {
    getCoefficient();

    const selectedTd = document.querySelectorAll('.selected-td');
    for (var i = 0; i < selectedTd.length; i++) {
      selectedTd[i].classList.add("blocked");
      selectedTd[i].classList.remove("selected-td");
    }

    const inactive = document.querySelectorAll('.inactive');
    for (var i = 0; i < inactive.length; i++) {
      inactive[i].classList.remove("inactive");
    }

    ancestorQuantity++;
  }
}


function getCoefficient() {  //get coefficient for one ancestor
  const rowFemale = document.querySelector("#rowfemale");
  const rowMale = document.querySelector("#rowmale");

  let madamGen = createLine(rowFemale);
  let sirGen = createLine(rowMale);
  let result = [];

  for (let fem of madamGen) {
    for (let sir of sirGen) {
      result.push(Math.pow(0.5, fem + sir - 1) * 100 );
    }
  }
  result.length == 0 ? false : summ.push(result);
}


function count() { //final result
  getCoefficient();

  if(summ.length == 0) return;

  const inactive = document.querySelectorAll('.inactive');
  for (var i = 0; i < inactive.length; i++) {
    inactive[i].classList.remove("inactive");
  }
  const allTd = document.querySelectorAll('td');
  for (var i = 0; i < allTd.length; i++) {
    if(allTd[i].classList.contains("selected-td") ) allTd[i].classList.remove("selected-td");
    if(!allTd[i].classList.contains("blocked") ) allTd[i].classList.add("blocked");
  }

  summ = summ.map( arr => arr.reduce((sum, current) => {
    return sum + current;
  }));
  let total = summ.reduce((sum, current) => {
    return sum + current;
  }).toFixed(2);

  document.querySelector('#inbreeding-script-result').innerHTML = "Степень инбридинга:<br>"

  for (let i = 0; i < summ.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = "- " + "по " + (i + 1) + " предку: " + summ[i].toFixed(3) + "%;<br>";
    document.querySelector('#inbreeding-script-result').appendChild(li);
  }

  document.querySelector('#inbreeding-script-result').innerHTML += "Общий инбридинг: <br>" + total + "%"

  document.querySelector('#add-ancestor').classList.add("unclickable");
}


function clearAll() {
  document.querySelector('#inbreeding-script-result').innerHTML = '';

  const allTd = document.querySelectorAll('td');
  for (var i = 0; i < allTd.length; i++) {
    if(allTd[i].classList.contains("selected-td") ) allTd[i].classList.remove("selected-td");
    if(allTd[i].classList.contains("blocked") ) allTd[i].classList.remove("blocked");
    if(allTd[i].classList.contains("inactive") ) allTd[i].classList.remove("inactive");

    for (let color of colors) {
      if(allTd[i].classList.contains(color) ) allTd[i].classList.remove(color);
    }
  }
  document.querySelector('#add-ancestor').classList.remove("unclickable");

  ancestorQuantity = 0;
  summ = []; 
}