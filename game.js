import {getClue as getClueFromCallback} from './callback-version.js';
import {getClue as getClueFromPromise} from './promise-version.js';
import {getClue as getClueFromAsyncFunction} from './async-await-version.js';
import {newClue} from './new-clue.js';

const question = document.getElementById('question');
const answer = document.getElementById('answer');
const value = document.getElementById('value');
const categoryTitle = document.getElementById('category-title');
const invalidCount = document.getElementById('invalid-count');
const checkResponse = document.getElementById('check-response');
let textarea = document.getElementById('player-response');
let score = document.getElementById('score');
let playerScore = 0;
if(localStorage.getItem('playerScore')){
    playerScore = Number(localStorage.getItem('playerScore'));
}
if(localStorage.getItem('clue')){
    setInnerHtml(JSON.parse(localStorage.getItem('clue')));
}

function setInnerHtml(clue){
    question.innerHTML = clue.question;
    answer.innerHTML = clue.answer;
    value.innerHTML = clue.value;
    categoryTitle.innerHTML = clue.category.title;
    checkResponse.classList.remove('is-hidden');
    answer.classList.add('is-hidden');
    // console.log(clue);
    if (clue.invalid_count > 0) {
        invalidCount.innerHTML = "invalid";
    }else{
        invalidCount.innerHTML = 'valid';
    }

    // store entire clue in local
    localStorage.setItem('clue',JSON.stringify(clue));
}



document.addEventListener('DOMContentLoaded', () =>{
    score.innerHTML = playerScore;
    document
    .getElementById('use-callback')
    .addEventListener('click', ()=>{
        getClueFromCallback((error,clue)=>{
            if(error){
                console.error(error);
            }
            else{
                setInnerHtml(clue);

            }
        })
    })
    document
    .getElementById('use-promise')
    .addEventListener('click', ()=>{
        getClueFromPromise()
        .then(clue=>setInnerHtml(clue))
        .catch(message=> console.log(message))
    })

    document
    .getElementById('use-async-await')
    .addEventListener('click', async () => {
        try {
            let clue = await getClueFromAsyncFunction();
            setInnerHtml(clue);

        }
        catch (e) {
            console.error(e);
        }
    })


    document
    .getElementById('check-response')
    .addEventListener('click', ()=> {

        if (textarea.value.trim() === answer.innerHTML.trim()) {
            playerScore += Number(value.innerHTML);
        }else{
            playerScore -= Number(value.innerHTML);
        }
        answer.classList.remove('is-hidden');
        score.innerHTML = playerScore;
        localStorage.setItem('playerScore', playerScore);
    })

    document
    .getElementById('submit')
    .addEventListener('click', event=> {
        event.preventDefault();
        let newObj = {};
        newObj.answer = document.getElementById('new-answer').value;
        newObj.question = document.getElementById('new-question').value;
        newObj.value = Number(document.getElementById('new-value').value);
        newObj.categoryId = Number(document.getElementById('new-category').value);
        newClue(newObj);
    })

})
