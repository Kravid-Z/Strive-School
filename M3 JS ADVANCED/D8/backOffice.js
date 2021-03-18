console.log("backOffice => connected");
/** PRODUCT => OBJECT MODEL
{
                "_id": "5d318e1a8541744830bef139", //SERVER GENERATED
                "name": "app test 1",  //REQUIRED
                "description": "somthing longer", //REQUIRED
                "brand": "nokia", //REQUIRED  //------->>>>> category for me
                "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80", //REQUIRED
                "price": 100, //REQUIRED
                "userId": "admin", //SERVER GENERATED
                "createdAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
                "updatedAt": "2019-07-19T09:32:10.535Z", //SERVER GENERATED
                "__v": 0 //SERVER GENERATED
            }

            booksUrl =  https://striveschool-api.herokuapp.com/books

            fetch(books)

            fetch(""){
                method:"POST",
                body: JSON.stringfy(),
                headers: {"Content-Type:" "application/json",
            }
            if (response.ok){alert("book added to store")}else {aler("error some went wrong")}
 */

//<----------------------------------------------------------------------------------------&&------------------------------------------------------------------------>

/** BackOffice Template
-----Template card-product----------
book = {
            asin: "1940026091"
            category: "scifi"
            img: "https://images-na.ssl-images-amazon.com/images/I/91xrEMcvmQL.jpg"
            price: 7.81
            title: "Pandemic (The Extinction Files, Book 1)"
}


-----Template card-product----------
`<div class="col">
    <div class="card mb-3" style="max-width: 440px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img class="img-fluid" src=${book.imageUrl}alt="Book Cover">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${book.name}</h5>
              <p class="card-text">${book.description}</p>
              <p> <span>${book.brand}</span><span>${book.price}</span> </p> 
              <!--book.brand === book.category from the other API-->
              <p class="card-text"><small class="text-muted">Last updated: ${book.updatedAt}</small></p>
            </div>
          </div>
        </div>
      </div>
</div>`
-----End template card-product--------  

 */

let books;
let bookSelected;
let newBookStore;
const urlPostMethod = "https://striveschool-api.herokuapp.com/api/product/";
const booksUrl = "https://striveschool-api.herokuapp.com/books";
const choiceList = document.querySelector("select");
const optionsTags = document.getElementsByTagName("option");
const bookPreviewCol = document.querySelector("#bookPreview");
//Inputs Form
const inputPrice = document.querySelector("#price");
const inputDescription = document.querySelector("#description");
const asinBook = document.querySelector("#asinBook");
const buttonAddToStore = document.querySelector("#addToStore");

const createOptionBook = (book) => {
  return ` <option value="${book.asin}"> ${book.title}</option>`;
};

const populatechioceList = (prev, book) => {
  return prev + createOptionBook(book);
};

const renderBookPreview = (value) => {
  bookPreviewCol.innerHTML = "";
  console.log(value);
  bookSelected = books.filter((book) => book.asin === value);
  console.log(bookSelected);
  inputPrice.setAttribute("placeholder", `${bookSelected[0].price}`);
  let renderCardPreview = ` <div class="col ">
                                <div class="card mb-3" style="max-width: 440px;">
                                    <div class="row no-gutters">
                                      <div class="col-md-4">
                                        <img class="img-fluid" src="${bookSelected[0].img}" alt="Book Cover">
                                      </div>
                                      <div class="col-md-8">
                                        <div class="card-body text-center py-0">
                                          <h5 class="card-title">${bookSelected[0].title}</h5>
                                          <small class="card-text mb-0">Dummy description : This a great Betseller</small>
                                          <div>
                                            <button type="button" class="btn btn-outline-warning btn-sm my-1"> <span class="px-2"><i class="fas fa-shopping-cart"></i></span> <span class="lead" > ${bookSelected[0].price} €</span></button> 
                                          </div>
                                          <div class ="text-monospace"> Category: ${bookSelected[0].category}</div>
                                          <!--book.brand === book.category from the other API-->
                                          <p class="card-text"><small class="text-muted">Last updated: Dummy Time 14:50</small></p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                            </div>`;
  // if (bookSelected[0].title.length > 40) {
  //     const h5CardTitle = document.querySelector(".card-title")
  //     h5CardTitle.classList.add("text-truncate")
  // }

  bookPreviewCol.innerHTML = renderCardPreview;

  newBookStore = {
    name: bookSelected[0].title,
    // description: inputDescription.value,
    description: "",
    brand: bookSelected[0].category, //------->>>>> category for my book Store
    imageUrl: bookSelected[0].img,
    // price: inputPrice.value,
    price: "",
    //   ? inputPrice.value
    //   : parseInt(inputPrice.placeholder),
  };
  //   buttonAddToStore.addEventListener(onclick, () => sendDataServer(newBookStore));
  console.log(newBookStore);
};

const getBooksfromApi = () => {
  fetch(booksUrl)
    .then((response) => response.json())
    .then((_books) => {
      books = _books;

      const listOptions = _books.reduce(
        (prev, book) => populatechioceList(prev, book),
        ""
      );
      choiceList.innerHTML = "";
      choiceList.innerHTML = listOptions;
    });
};

const showAlertForm = (string, objectNewBook) => {
  let keysBook = Object.keys(objectNewBook);
  selectedKey = keysBook.filter((key) => key === string);
  alert(`We sorry seems ${selectedKey[0]} is not set up`);
  //console.log("Create a Nice Modal"); // Template for modal is in backoffice.html ready to setup
};

const checkPriceAndDescription = async () => {
  try {
    newBookStore.description = await inputDescription.value;
    newBookStore.price = await inputPrice.value;
    if (newBookStore.description && newBookStore.price) {
      console.log("Send Data");
      //Send Data
      fetch(urlPostMethod, {
        method: "POST",
        body: JSON.stringify(newBookStore),
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDUxZThjMTg5YzI2ZjAwMTU3ZjljMjgiLCJpYXQiOjE2MTU5ODA3MzgsImV4cCI6MTYxNzE5MDMzOH0.7ecaHsVow0aLX_UvZMM5X65HUmrVhWqs445ZEX-G258",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          alert("Book Added To Store");
        }
      });
    } else {
      newBookStore.description
        ? newBookStore.description
        : showAlertForm("description", newBookStore);
      newBookStore.price
        ? newBookStore.price
        : showAlertForm("price", newBookStore);
    }
  } catch (error) {
    console.log(error);
  }
};

const sendDataServer = (e) => {
  e.preventDefault();
  console.log("default Prevented");
  if (newBookStore) {
    console.log(newBookStore);
    checkPriceAndDescription();
  }
};

window.onload = () => {
  getBooksfromApi();
};
