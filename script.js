let x = 0;
function clickMe(){
    
    
    if(x==1){
    const parentDelete = document.getElementById("text")
    const childDelete = document.querySelector("span")
    parentDelete.removeChild(childDelete)
    x=0
    }
    x=1
    searchWords()
}
function searchWords(){
    let word = document.getElementById("search").value
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) =>{
        return response.json();
    })
    .then((data)=>{
        let parents = document.getElementById("text")
        parents.insertAdjacentHTML("beforeend",`<span></span>`)
        parents = document.querySelector("span")
        const arrayData = data[0]
        parents.insertAdjacentHTML("beforeend",`<h1>Your Word --- ${arrayData.word}</h1>`)
        for(let firstKeys in arrayData.phonetics)
        for(let secondKeys in arrayData.phonetics[firstKeys]){
            if(secondKeys!="license"&& secondKeys!="sourceUrl" && arrayData.phonetics[firstKeys][secondKeys] != "")
                
                if(secondKeys=="audio")
                    parents.insertAdjacentHTML("beforeend",`<p>Audio <br> <audio controls src ="${arrayData.phonetics[firstKeys][secondKeys]}"></p>`)
            else{

                parents.insertAdjacentHTML("beforeend",`<p>Phonetic --- ${arrayData.phonetics[firstKeys][secondKeys]}</p>`)
            }
        }
        for(let firstKeys in arrayData.meanings)
            for(let secondKeys in arrayData.meanings[firstKeys]){
                console.log(arrayData.meanings[firstKeys][secondKeys]);
                if(arrayData.meanings[firstKeys][secondKeys].lenght !=0)
                    {   switch(secondKeys){
                        case "partOfSpeech": 
                            parents.insertAdjacentHTML("beforeend",`<p>Part of Speech --- ${arrayData.meanings[firstKeys][secondKeys]}</p>`)
                            break;
                        case "definitions":
                            parents.insertAdjacentHTML("beforeend",`<p>Definitions</p>`)
                            for(let definitionKeys in arrayData.meanings[firstKeys].definitions)
                                parents.insertAdjacentHTML("beforeend",`<p>${arrayData.meanings[firstKeys].definitions[definitionKeys].definition}</p>`)
                        break;
                        default:
                            parents.insertAdjacentHTML("beforeend",`<p>${secondKeys} <br> ${arrayData.meanings[firstKeys][secondKeys]}</p>`)
                            break;
                    }


                       
                    }
                   
        }
      
    })
}

submit.onclick = clickMe;

let i = 1

function favoriteWord(){

    let word = document.getElementById("search").value
    i++;
    document.getElementsByClassName("favoriteWord")[0].insertAdjacentHTML("beforeend",`<button onclick = favoriteWordSearch(${i}) id = "favoriteWord${i}" value = "${word}">${word}</button>`)
    localStorage.setItem(i,word)
    
}
favorite.onclick = favoriteWord

function favoriteWordSearch(i){
    if(x==1){
        const parentDelete = document.getElementById("text")
        const childDelete = document.querySelector("span")
        parentDelete.removeChild(childDelete)
        x=0
        }
    x=1
    let word = document.getElementById(`favoriteWord${i}`).value
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) =>{
        return response.json();
    })
    .then((data)=>{
        let parents = document.getElementById("text")
        parents.insertAdjacentHTML("beforeend",`<span></span>`)
        parents = document.querySelector("span")
        const arrayData = data[0]
        console.log(arrayData);
        parents.insertAdjacentHTML("beforeend",`<h1>Your Word --- ${arrayData.word}</h1>`)
        for(let firstKeys in arrayData.phonetics)
        for(let secondKeys in arrayData.phonetics[firstKeys]){
            if(secondKeys!="license"&& secondKeys!="sourceUrl" && arrayData.phonetics[firstKeys][secondKeys] != "")
                
                if(secondKeys=="audio")
                    parents.insertAdjacentHTML("beforeend",`<p>Audio <br> <audio controls src ="${arrayData.phonetics[firstKeys][secondKeys]}"></p>`)
            else{

                parents.insertAdjacentHTML("beforeend",`<p>Phonetic --- ${arrayData.phonetics[firstKeys][secondKeys]}</p>`)
            }
        }
        for(let firstKeys in arrayData.meanings)
            for(let secondKeys in arrayData.meanings[firstKeys]){
                console.log(arrayData.meanings[firstKeys][secondKeys]);
                if(arrayData.meanings[firstKeys][secondKeys].lenght !=0)
                    {
                        switch(secondKeys){
                            case "partOfSpeech": 
                                parents.insertAdjacentHTML("beforeend",`<p>Part of Speech --- ${arrayData.meanings[firstKeys][secondKeys]}</p>`)
                                break;
                            case "definitions":
                                parents.insertAdjacentHTML("beforeend",`<p>Definitions</p>`)
                                for(let definitionKeys in arrayData.meanings[firstKeys].definitions)
                                    parents.insertAdjacentHTML("beforeend",`<p>${arrayData.meanings[firstKeys].definitions[definitionKeys].definition}</p>`)
                                break;
                            default:
                                parents.insertAdjacentHTML("beforeend",`<p>${secondKeys} <br> ${arrayData.meanings[firstKeys][secondKeys]}</p>`)
                                break;
                            }

                    }

        }
      
    })
}
let numberlastkeys=0;
for(let i =0;i<localStorage.length;i++)
{
    numberlastkeys = 20+localStorage.key(i)
    document.getElementById("favoritelist").insertAdjacentHTML("beforeend",`<li><button onclick = favoriteWordSearch(${numberlastkeys}) id = "favoriteWord${numberlastkeys}" value = "${localStorage.getItem(localStorage.key(i))}">${localStorage.getItem(localStorage.key(i))}</button></li>`)
    
}
