const loadAllCategory = (category_id) => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllCategory(data.data.news_category,
        ))
        .catch(error => console.log(error));
}
const displayAllCategory = categories => {
    //console.log(categories);
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('flex')
        // console.log(category);
        categoryDiv.innerHTML = `
        <a class="nav-link py-2 fw-semibold " href="#" onclick="loadSingleCategory('${category.category_id}')">${category.category_name}</a>
        `;

        categoryContainer.appendChild(categoryDiv);
    });

}
const loadSingleCategory = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySingleCategory(data.data))
        .catch(error => console.log(error))

}
const displaySingleCategory = newslist => {
    // console.log(newslist);
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML = ``;
    newslist.forEach(allNews => {
        const newsDiv = document.createElement('div');
        // console.log(allNews);

        newsDiv.innerHTML = `
        <div class="card mb-3" style="width:100%; height: 18.8rem;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${allNews.thumbnail_url
            }" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8"">
                <div class="card-body">
                    <h5 class="card-title">${allNews.title
            }</h5>
                    <p class="card-text my-4" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%; height: 4rem;">${allNews.details}</p>
                    <div class="d-flex align-items-center justify-content-between my-4">
                        <div class="d-flex align-items-center">
                            <img style="width:50px; height: 50px;" class="rounded-circle" src="${allNews.author.img}" alt="">
                            <div class="d-block -g-2"> 
                            <p>${allNews.author.name}</p>
                            <p>${allNews.author.published_date}</p>
                            </div>
                            
                        </div>
                        <span>${allNews.total_view}</span>
                        <button onclick="loadDetail('${allNews._id}')" type="button" class="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#newsDetailModal" >Details</button>
                    </div>
                </div>
            </div>

        </div>

    </div>
     `;
        newsContainer.appendChild(newsDiv);
    })

}

const loadDetail = (news_id) => {

    const url = ` https://openapi.programming-hero.com/api/news/${news_id}`;


    fetch(url)
        .then(res => res.json())
        .then(data => displayDetail(data.data[0]))
        .catch(error => console.log(error));
}
const displayDetail = details => {
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = details.title;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <p>${details.details} </p>
    `;
}
loadAllCategory();