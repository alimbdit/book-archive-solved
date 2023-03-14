//------------- handle search button-----------
const searchBook = () => {
  const searchField = document.getElementById("search-input");
  const searchText = searchField.value;
  searchField.value = "";
  const errorText = document.getElementById('error');
  errorText.innerText = '';

  if (searchText) {
    // ----------load data----------
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        return displaySearchResult(data)
      });
  } else {
    // const searchResult = document.getElementById("search-result");
    // searchResult.innerText = "";
    errorText.innerText = 'search field can not be empty';
    document.getElementById("search-result").innerText = '';
    document.getElementById('total-books').innerText = '';
  }
};

// ----------display search result data----------
const displaySearchResult = (booksList) => {
  const myBooks = booksList.docs
  // console.log(myBooks);
  const searchResult = document.getElementById("search-result");
  searchResult.innerText = "";

  const errorText = document.getElementById('error');
  errorText.innerText = '';

  const bookCount = document.getElementById('total-books');
  bookCount.innerHTML = '';
  
  if(myBooks.length>0){
    bookCount.innerHTML =`<h3 class="text-center text-secondary">Total books found ${booksList.numFound}</h3>`;

    const books = myBooks;
    books.forEach((book) => {
      // console.log(book);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
          <div class="card">
              <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top w-50 mx-auto" alt="...">
              <div class="card-body text-center">
                <h5 class="card-title"> Name: ${book.title}</h5>
                <h6> Author: ${book.author_name}</h6>
                <p>Publisher: <small> ${book.publisher? book.publisher[0] : "No publisher found"} </small></p>
                <small> First Published Year: ${book.first_publish_year}</small>
              </div>
          </div>
          `;
      searchResult.appendChild(div);
    });
  }
  else{
    errorText.innerText = 'write the correct book name';
    document.getElementById("search-result").innerText = '';
    document.getElementById('total-books').innerText = '';
  }


};
