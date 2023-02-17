const questions = [
  {
    question: `Who did Dad write a letter to when he was in 7 th grade because he had a crush on her?`,
    answer: `Alyssa Milano – Who’s The Boss`
  },
  {
    question: `What holiday is exactly one week before Dad’s birthday?`,
    answer: `National Pizza Day – February 9th`
  },
  {
    question: `What movie character was so frightening that Dad had to leave the movie theater when he was five years old?`,
    answer: `Jawa – Star Wars 1978`
  },
  {
    question: `What hospital was Dad born in?`,
    answer: `Brockton Hospital`
  }
];

const btns = document.querySelectorAll('nav button');
const counts = document.querySelectorAll('.position span');
let curr = 0;
let items;

function displayQuestions(){
  if(questions){
    const wrap = document.querySelector('main');
    const questionList = questions.map(function(q){
      return `
        <div class="item">
          <div class="carousel">
            <div class="carousel-cell ques">${q.question}</div>
            <div class="carousel-cell answ">${q.answer}</div>
          </div>
        </div>`
    });
    wrap.insertAdjacentHTML('beforeend',questionList.join(''));
    items = wrap.querySelectorAll('.item');
    items.forEach(function(i){
      i.classList.add('hide');
    })
    enableFlick(curr);
    updateCount();
  }
}

function enableFlick(c){
  items.item(c).classList.remove('hide');
  const elem = items.item(c).querySelector('.carousel');
  const flkty = new Flickity( elem, {
    cellAlign: 'left',
    contain: true,
    prevNextButtons: false,
    pageDots: false
  });
  // ensure that question shows by default
  flkty.select(0,0,1);
}

function updateCount(){
  counts.item(0).textContent = curr+1;
  counts.item(1).textContent = items.length;
  displayButtons(items);
}

function displayButtons(){
  switch (curr) {
    case 0:
      btns.item(0).disabled = true;
      btns.item(1).disabled = false;
      break;
    case (items.length-1):
      btns.item(0).disabled = false;
      btns.item(1).disabled = true;
      break;
    default:
      btns.item(0).disabled = false;
      btns.item(1).disabled = false;
      break;
  }
}

btns.forEach(function(b,i){
  b.addEventListener('click',function(){
    items.item(curr).classList.add('hide');
    i === 0 ? curr-- : curr++;
    enableFlick(curr);
    updateCount();
  })
})

displayQuestions();