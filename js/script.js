//Categories
const loadCategories = () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayCategories(data.data.news_category))
      .catch((error) => console.log(error));
};
const displayCategories = (categories) =>{
    // console.log(categories);
    const categoryContainer = document.getElementById("category-container");
    categories.forEach(category => {
        // console.log(category);
        const li = document.createElement('li');
        li.classList.add("nav-item");
        li.innerHTML = `
        <a onclick="loadNews('${category.category_id}')" class="nav-link py-2" href="#" style="padding: 0 35px;">${category.category_name}</a>
        `;
        categoryContainer.appendChild(li);
    });
};
const loadNews = (id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayNews(data.data));
};
const displayNews = showNews =>{
    const newsContainer = document.getElementById("news-container");
    newsContainer.textContent = '';
    //ekta div naw no found data liko shownews er length check koro .then d-none add/rm koro
    showNews.forEach(news => {
        console.log(news);
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        createDiv.innerHTML = `
        <div class="card mb-3 p-lg-4 p-1 p-md-1" onclick="loadDetails('${news.category_id}')" data-bs-toggle="modal" data-bs-target="#newsModal">
            <div class="row g-0">
              <div class="col-md-2 text-center">
                <img src="${
                  news.thumbnail_url
                }" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title pb-2 text-center text-md-center text-lg-start">${
                    news.title
                  }</h5>
                  <p class="card-text py-2">${news.details.slice(0, 250)}</p>
                  <div class="d-flex flex-column flex-sm-column flex-lg-row align-items-center justify-content-between mt-lg-5">
                     <div class="d-flex py-2">
                        <div class="author-img pe-3">
                            <img style="width: 40px; height: 40px;" class="rounded-pill" src="${
                              news.author.img
                                ? news.author.img
                                : "No Image Found"
                            }"> 
                        </div>
                        <div class="auhtor-info"> 
                            <h6>${
                              news.author.name
                                ? news.author.name
                                : "No Name Found"
                            }</h6>
                            <p>${
                              news.author.published_date
                                ? news.author.published_date
                                : "No Date Found"
                            }</p>
                        </div>
                      </div>
                      <div class="view pe-2 py-2">
                        <h6>Views: ${
                          news.total_view ? news.total_view : "No View Found"
                        }</h6>
                      </div>
                      <div>
                        <button class="btn btn-primary pe-2 py-2">Read More</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(createDiv);
    });
};
const loadDetails = id =>{
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data[0]));
};
const displayDetails = details =>{
  console.log(details);
  const modalTitle = document.getElementById("newsModalLabel");
  modalTitle.innerText = details.title;
  const modalCotainer = document.getElementById("modal-container");
  modalCotainer.innerHTML = `
  <h4>Author Name: ${details.author.name ? details.author.name : 'No Name Found'}</h4>
  <p>Publish Date: ${details.published_date ? details.published_date : 'No Date Found'}</p>
  <p>Badge: ${details.rating.badge ? details.rating.badge : 'No Badge Found'}</p>
  <p>Rating: ${details.rating.number ? details.rating.number : 'No Rating Found'}</p>
  `;
}
loadCategories();