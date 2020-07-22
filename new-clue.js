export async function newClue(obj){
    let myInit = { method: 'POST'};
    myInit.body = JSON.stringify(obj);
    myInit.headers = {'Content-Type': 'application/json'}
    // console.log(myInit);
    let response = await fetch('https://jservice.xyz/api/clues', myInit);
    // console.log(response);
}
