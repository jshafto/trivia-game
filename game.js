import {getClue as getClueFromCallback} from './callback-version.js';
import {getClue as getClueFromPromise} from './promise-version.js';
import {getClue as getClueFromAsyncFunction} from './async-await-version.js';
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const value = document.getElementById('value');
const categoryTitle = document.getElementById('category-title');
const invalidCount = document.getElementById('invalid-count');
const checkResponse = document.getElementById('check-response');
let textarea = document.getElementById('player-response');
let score = document.getElementById('score');
let playerScore = 0;

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

}



document.addEventListener('DOMContentLoaded', () =>{
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
    })

})
