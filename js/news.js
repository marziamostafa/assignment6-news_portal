const loadAllCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllCategory(data.data.news_category,
        ))
        .catch(error => console.log(error));
}
const displayAllCategory = categories => {
    //console.log(categories[7]);

    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('flex')
        //console.log(category);
        categoryDiv.innerHTML = `
        <a class="nav-link py-2 fw-semibold " href="#" onclick="loadSingleCategory('${category.category_id}'),toggleSpinner(${true})">${category.category_name}</a>
        `;

        categoryContainer.appendChild(categoryDiv);
    });

}

//showing all news according to the category
const loadSingleCategory = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => (displaySingleCategory(data.data)))
        .catch(error => console.log(error))

}
const displaySingleCategory = newslist => {
    const showNewsNo = document.getElementById('news-list')
    const showNewsDiv = document.createElement('div');
    showNewsNo.innerHTML = ``;
    if (newslist.length === 0) {
        showNewsDiv.innerHTML = `
    <p class="fs-3">No news found</p>
    `;
        showNewsNo.appendChild(showNewsDiv);
    }
    else {
        showNewsDiv.innerHTML = `
    <p class="fs-3">${newslist.length} news found</p>
    `;
        showNewsNo.appendChild(showNewsDiv);
    }
    //console.log(newslist.length);
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ``;
    newslist.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    //console.log(newslist);
    // const home = document.getElementById('home');

    // home.textContent = `

    //      `;
    newslist.forEach(allNews => {
        const newsDiv = document.createElement('div');


        newsDiv.innerHTML = `
                <div class="card mb-3" style="max-width: 540px; ">
                <div class="row g-0">
                  <div class="col-md-5">
                  <img src="${allNews.thumbnail_url
            }" class="img-fluid rounded-start h-100 w-100" alt="..." style:"height:400px;">
                  </div>
                  <div class="col-md-7 ">
                    <div class="card-body">
                    <h5 class="card-title">${allNews.title
            }</h5>
            <p class="card-text mt-4"style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis">${allNews.details}</p >
            <div class="d-flex align-items-center justify-content-between mt-4">

                <div class="d-flex align-items-center justify-content-center ">
                    <img style="width:40px; height: 40px;" class="rounded-circle" src="${allNews.author.img ? allNews.author.img : 'Not found'}" alt="">
                        <div class="d-flex flex-column" style="width:100px; height: 50px;">
                            <small>${allNews.author.name ? allNews.author.name : "Not found"}</small>
                            <small>${allNews.author.published_date ? allNews.author.published_date : 'Not found'}</small>
                        </div>

                </div>
                <span><i class="fa-solid fa-eye"></i><b>${allNews.total_view ? allNews.total_view : 'Not found'}</b></span>
                <h2 class="fs-6" data-bs-toggle="modal" data-bs-target="#newsDetailModal" > <i  onclick="loadDetail('${allNews._id}')" class="fa-solid fa-arrow-right "></i></h2>
            </div>
                    </div >
                  </div >
                </div >
              </div >
    `;
        newsContainer.appendChild(newsDiv);
    })
    //spinner stopped
    toggleSpinner(false);
}
//showing news details
const loadDetail = (news_id) => {

    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetail(data.data[0]))
        .catch(error => console.log(error));
}
const displayDetail = details => {
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerHTML = `<p>Author: ${details.author.name ? details.author.name : 'author name not found'}
   </p> `;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <p><b>Published on: ${details.author.published_date ? details.author.published_date : 'no date found'} <br>Rating:${details.rating.number}<br>Views:${details.total_view ? details.total_view : 'Not found'}</b></p>
    <p>${details.details} </p>
    `;
}

//adding spinner
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

loadAllCategory();
loadSingleCategory('08');

