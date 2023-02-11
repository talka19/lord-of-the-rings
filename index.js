const loadBtn = document.querySelector(".load-button");
const charterList = document.querySelector(".js-list");
let page = 1;
loadBtn.addEventListener("click", changePage);

function loadApi(page = 1) {
    const options = {
        headers: {
         Authorization: "Bearer wntV7kfKpnG-UwOW9IaD",
        },
    };
    
    return fetch(`https://the-one-api.dev/v2/character?limit=150&page= ${page}`, options)
    .then((res) => {
        if(!res.ok){
         throw new Error(res.statusText);
        }
        console.log(res); 
        return res.json();
    })
}

loadApi()
.then((res) => {renderCharacterList(res.docs);
    loadBtn.hidden = false;
})
.catch(console.log);

function renderCharacterList(arrayObj) {
    const list = arrayObj.map(({name, race}) => {
        return `<li class ="">
        <h2>${name}</h2>
        <p>${race}</p>
        </li>`;
    }).join('');
    charterList.insertAdjacentHTML("beforeend", list);
}

function changePage() {
    page += 1;
 loadApi(page)
 .then((res) => {renderCharacterList(res.docs);
    if(res.page === res.pages) {
        loadBtn.hidden = true; 
    }
 })
 .catch(console.log);
}