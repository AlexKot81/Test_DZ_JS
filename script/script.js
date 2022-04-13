const formAddElem = document.forms[0];
const formFindElem = document.forms[1];
const wordElem = formAddElem.text_word;
const transElem = formAddElem.text_trans;
const colorElem = formAddElem.text_color;
const findElem = formFindElem.card_find;
const worksheetElem = document.querySelector('#cards')
let worksheet = [];
let st = 0;
let find_result = [];


function rerender(list_cards){
	worksheetElem.innerText = '';
	for (let i = 0; i< list_cards.length; i++){
		const card = document.createElement('div');
		const c_wordElem = document.createElement('p');
		const closeElem = document.createElement('div');

		closeElem.addEventListener('click', () =>{
			worksheet = worksheet.filter(elem => elem.id !== list_cards[i].id);
			findElem.value = '';
			rerender(worksheet);
		});

		card.addEventListener('dblclick', () =>{
			 if (list_cards[i].lang === 'eng') {
			 	c_wordElem.innerText = list_cards[i].trans;
			 	list_cards[i].lang = 'rus'
			 }else{
			  c_wordElem.innerText = list_cards[i].word;
			 	list_cards[i].lang = 'eng'
			}
		});
				
		card.classList.add('card');
		closeElem.classList.add('close_card');

		card.append(c_wordElem, closeElem);
		worksheetElem.appendChild(card);

		if (list_cards[i].lang === 'eng') {
			 	c_wordElem.innerText = list_cards[i].word;
			 }else{
			  c_wordElem.innerText = list_cards[i].trans;
			};

		closeElem.innerText = '✖';
		card.style.backgroundColor = list_cards[i].color;
	};
	save_data(worksheet, find_result, st);
};

formAddElem.addEventListener('submit', event => {
  event.preventDefault();
  findElem.value = '';
  if (wordElem.value !== '' && transElem.value !== '' && colorElem.value !== '') {
  	st++;
  	worksheet.push({
  	word: wordElem.value,
  	trans: transElem.value,
  	color: colorElem.value,
  	id: st,
  	lang: 'eng'
  })
  rerender(worksheet);
  }else{
  	alert("Заполните все поля");
  } 
});

findElem.addEventListener('input', () =>{
			find_result = worksheet.filter(elem => elem.word.startsWith(findElem.value) || elem.trans.startsWith(findElem.value));
			console.log(find_result);		
			rerender (find_result);	
});

function save_data (w_sheet, f_result, st_st){

}
