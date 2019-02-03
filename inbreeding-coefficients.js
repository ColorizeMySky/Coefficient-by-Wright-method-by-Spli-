const table = document.querySelector('.pedigreetable');

const colors = ['azure', 'beige', 'coral', 'darkseagreen', 'mediumorchid', 'silver', 'teal'];
let ancestorQuantity = 0;

table.addEventListener('click', function(event){
  event.target.classList.toggle("selected-td");
  event.target.classList.toggle(colors[ancestorQuantity]);
  event.target.style.backgroundColor = colors[ancestorQuantity];

  if(event.target.classList.contains('selected-td')) {
    if(event.target.classList.contains('f1') || event.target.classList.contains('f2') 
       || event.target.classList.contains('f3') || event.target.classList.contains('f4')) {

        let inactive = document.querySelectorAll('.m1, .m2, .m3, .m4');
        for (let item of inactive) {
          item.classList.add("inactive");
        }
    }
    else {
      let inactive = document.querySelectorAll('.f1, .f2, .f3, .f4');
      for (let item of inactive) {
        item.classList.add("inactive");
      }
    }
  }
})

function addAncestor() {
  if (ancestorQuantity > colors.length) {
    document.querySelector('#pedigree-script-result')
      .innerHTML = "Количество предков более " + colors.length + " не поддерживается в настоящее время";
  }
}