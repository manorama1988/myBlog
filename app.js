let cardTitle = document.querySelector('.card-title');
let cardDescription = document.querySelector('.card-description');
let cardImage = document.querySelector('.card-image');
let cardCategory = document.querySelector('.card-category');
let postBtn = document.querySelector('.btn');


const postData = async () => {
    const response = await axios.request({
        method: "post",
        url: "https://peerup-web-dev-srv.herokuapp.com/parse/classes/PostIt",
        headers: {
          "X-Parse-Application-Id": "MVV6avFp",
          "Content-Type": "application/json",
        },
        data: {
          title: cardTitle.value,
          description: cardDescription.value,
          category: cardCategory.value,
          image: cardImage.value,
        },
    });

    await getData();
    cardTitle.value = " ";
    cardDescription.value = " ";
    cardImage.value = " ";
    cardCategory.value = " ";

};


const getData = async () =>{
    const response = await axios.request({
        method: "get",
        url: "https://peerup-web-dev-srv.herokuapp.com/parse/classes/PostIt",
        headers: {
          "X-Parse-Application-Id": "MVV6avFp",
          "Content-Type": "application/json",
        },
      });

      response.data.results.forEach((data) => display(data));         
      console.log(response.data.results);
}

postBtn.addEventListener('click', postData);

function display(data){
    console.log(data.createdAt);
    const div = document.createElement('div');
    div.innerHTML = `

    <div class="card-post">
    <div class="card-post-detail">
        <div class="card-post-image">
        <img src="${data.image}" />
        </div>
        <div class="card-post-content">
            <div class="card-post-text">
                <h2 class="card-post-title">${data.title}</h2>
                <p class="card-post-date">${data.title}</p>
            </div>
            <div class="card-post-description">
                <p class="description">${data.description}</p>
            </div>
            <div class="card-post-category">
                <button class="category">${data.category}</button>
            </div>
        </div>
    </div>
</div>


    `;
        document.querySelector('.autocomplete').appendChild(div); 
};