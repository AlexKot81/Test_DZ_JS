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
			rerender (find_result);	
});

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
			};
			rerender(worksheet);
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
	save_data(worksheet, st);
};

function save_data (w_sheet, st_st){
		if (w_sheet.length === 0){
    localStorage.removeItem('w_Sheet');
  		}else{
  			localStorage.setItem('w_Sheet', JSON.stringify(w_sheet));
  	};
  	localStorage.setItem('st_St', st_st);
};

function set_data (){
    st = localStorage.getItem('st_St');
    let w_Sheet = JSON.parse(localStorage.getItem('w_Sheet'))
    
    if (st === null){
      st = 0;
    };
    
    if (w_Sheet !== null){
      worksheet = w_Sheet;
  };
  rerender(worksheet);
};

 set_data();

