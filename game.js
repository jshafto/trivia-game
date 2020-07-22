import {getClue as getClueFromCallback} from './callback-version.js';
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const value = document.getElementById('value');
const categoryTitle = document.getElementById('category-title');
const invalidCount = document.getElementById('invalid-count');

document.addEventListener('DOMContentLoaded', () =>{
    document
    .getElementById('use-callback')
    .addEventListener('click', ()=>{
        getClueFromCallback((error,clue)=>{
            if(error){
                console.error(error);
            }
            else{
                question.innerHTML = clue.question;
                answer.innerHTML = clue.answer;
                value.innerHTML = clue.value;
                categoryTitle.innerHTML = clue.category.title;
                // console.log(clue);
                if (clue.invalid_count > 0) {
                    invalidCount.innerHTML = "invalid";
                }else{
                    invalidCount.innerHTML = 'valid';
                }

            }
        })
    })

})
