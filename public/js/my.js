// GET DATA
const getFilmList = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let search = urlParams.get('search');

    if(!search){
        const api = "https://film-test-yoshi.herokuapp.com/film";

        fetch(api)
        .then((response) => response.json())
        .then((res) => {
            localStorage.data = JSON.stringify(res.data);
            display(res);
        })
        .catch((error) => console.log("error ",error ));
    } else {
        const api = "https://film-test-yoshi.herokuapp.com/film/"+search;

        fetch(api)
        .then((response) => response.json())
        .then((res) => {
            localStorage.data = JSON.stringify(res.data);
            display(res);
        })
        .catch((error) => console.log("error ",error ));
    }
}

let display = (result) => {
    on();
    //Building Pagination
    const urlParams = new URLSearchParams(window.location.search);
    document.querySelector("#inputSearch").value = urlParams.get('search');
    let urlSearch = urlParams.get('search')? `search=${urlParams.get('search')}&` : "";
    let accordionListFilm = document.getElementById("accordionListFilm");
    accordionListFilm.innerHTML = "";
    let page = parseInt(urlParams.get('page')) || 1;

    let numberPage = Math.ceil(result.data.length / 10);
    let paginationListFilm = document.getElementById("paginationListFilm");
    paginationListFilm.innerHTML = "";
    let lastPage = page <= 3 ? numberPage < 5 ? numberPage : 5 : page+4 < numberPage? page+2 : numberPage;
    let firstPage = numberPage <=5 ? 1 : page <= lastPage? lastPage-4 : page-2;

    if(page > numberPage || page <= 0){
        // disabled
        accordionListFilm.appendChild(createElement("div", "col-12 text-center fw-light fs-1 mt-5", "NO DATA"));
        return null;
    }

    paginationListFilm.appendChild(createElement("li", `page-item ${page<=1?"disabled":""}`, `<a class="page-link" href="./?${urlSearch}page=${1}">First</a>`));
    paginationListFilm.appendChild(createElement("li", `page-item ${page<=1?"disabled":""}`, `<a class="page-link" href="./?${urlSearch}page=${page-1}"><span aria-hidden="true">&laquo;</span></a>`));
    for(let i = firstPage; i <= lastPage; i++){
        paginationListFilm.appendChild(createElement("li", `page-item ${i==page?"active":""}`, `<a class="page-link" href="./?${urlSearch}page=${i}">${i}</a>`));
    }
    paginationListFilm.appendChild(createElement("li", `page-item ${page>=numberPage?"disabled":""}`, `<a class="page-link" href="./?${urlSearch}page=${page+1}"><span aria-hidden="true">&raquo;</span></a>`));
    paginationListFilm.appendChild(createElement("li", `page-item ${page>=numberPage?"disabled":""}`, `<a class="page-link" href="./?${urlSearch}page=${numberPage}">Last</a>`));


    // Building Accordion list film
    for(let i = (page-1)*10; i <= (page < numberPage ? (page-1)*10+9 : result.data.length-1); i++){
        let accordionChild = document.createElement("div");
        accordionChild.setAttribute("class", "accordion-item");
        accordionChild.innerHTML = `
        <h2 class="accordion-header" id="heading${i}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
            <strong>${result.data[i].title}</strong>
        </button>
        </h2>
        <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div><strong>Genre </strong>: ${result.data[i].genre.join(',')}</div>
                <div><strong>Rating </strong>: ${result.data[i].rating}</div>
                <div><strong>Duration </strong>: ${result.data[i].duration}</div>
                <div><strong>Quality </strong>: ${result.data[i].quality}</div>
                <div class="d-flex justify-content-between flex-md-row flex-column mt-3">
                    <div class="d-flex flex-md-row flex-column my-1 my-md-0">
                        <a href="${result.data[i].watch}" target="_blank" class="my-1 my-md-0 me-md-2">
                            <button type="button" class="btn btn-success ">Watch Movie Now !</button>
                        </a>
                        <a href="${result.data[i].trailer}" target="_blank">
                            <button type="button" class="btn btn-primary ">Watch Trailer</button>
                        </a>
                    </div>
                        <button type="button" class="btn btn-danger" onclick="deleteData(${i})">Delete</button>
                </div>
            </div>
        </div>
        `;
        accordionListFilm.appendChild(accordionChild);
    }
    off();
  }

let createElement = (element, classAtt, innerHtml) => {
    let item = document.createElement(element);
    item.setAttribute("class", classAtt);
    item.innerHTML = innerHtml;
    return item;
}

getFilmList();


//SEARCH DATA
let searchBtn = document.querySelector("#searchBtn");

let searchData = async (e) => {
    e.preventDefault();
    on();
    let searchValue = document.querySelector("#inputSearch").value;
    window.location.href = `./?search=${searchValue}`;
};

searchBtn.addEventListener("click", searchData);

//DELETE DATA
let deleteData = async (index) => {
    on();
    let data = JSON.parse(localStorage.data);
    const api = "https://film-test-yoshi.herokuapp.com/film/";
    let options = {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data[index]),
      };

    try {
        fetch(api, options)
        .then((response) => response.json())
        .then((res) => {
            localStorage.data = JSON.stringify(res.data);
            display(res);
            off();
        })
        .catch((error) => console.log("error ",error ));
    } catch (e) {
        console.error(e);
    }
}

//ADD DATA
let addBtn = document.querySelector("#addFilmBtn");
let addBtnClose = document.querySelector("#addFilmBtnClose");

let addData = async (e) => {
    e.preventDefault();
    on();

    let data = {
        title : document.querySelector("#inputTitle").value,
        genre : document.querySelector("#inputGenre").value.split(","),
        rating : document.querySelector("#inputRating").value,
        duration : document.querySelector("#inputDuration").value,
        quality : document.querySelector("#inputQuality").value,
        trailer : document.querySelector("#inputTrailer").value,
        watch : document.querySelector("#inputWatch").value,
    }
    
    const api = "https://film-test-yoshi.herokuapp.com/film/";
    let options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

    try {
        fetch(api, options)
        .then((response) => response.json())
        .then((res) => {
            localStorage.data = JSON.stringify(res.data);
            display(res);
            addBtnClose.click();
            document.querySelector("#inputTitle").value = "";
            document.querySelector("#inputGenre").value = "";
            document.querySelector("#inputRating").value = "";
            document.querySelector("#inputDuration").value = "";
            document.querySelector("#inputQuality").value = "";
            document.querySelector("#inputTrailer").value = "";
            document.querySelector("#inputWatch").value = "";
        })
        .catch((error) => console.log("error ",error ));
    } catch (e) {
        console.error(e);
    }
}

addBtn.addEventListener("click", addData);

//OVERLAY
function on() {
    document.getElementById("overlay").style.display = "block";
}
  
function off() {
    document.getElementById("overlay").style.display = "none";
}