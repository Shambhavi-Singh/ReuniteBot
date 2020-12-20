let scrolllock = false;

function getCards(offset){
    
    if(!offset){
        offset=0;
    }
    fetch("http://localhost:3000/wantMoreData?"+'offset='+offset).then(response => response.json())
    .then(data => loadPostIntoSection(data))
}

function loadPostIntoSection(postsArray){
    let html=""
    postsArray.forEach(function(post,index){
        html+= '<div class="post-card">';
        html+='<header class="post-header">';
        html +='<h3> '+post.username+' <h3>';
        html+="</header>"
        html +='<p class="post-body">'+post.text+'</p>'
        html +="</div>"
    })
    createLoadingElement();
    setTimeout(function(){
        document.querySelector(".post-container").insertAdjacentHTML("beforeend",html);
        destroyLoadingElement();
        scrolllock = false;
    },2000);
    
}

window.onscroll = function(){
    if(scrolllock) return;
    if(this.innerHeight +this.pageYOffset >= document.body.scrollHeight){
        let Postlength = document.querySelectorAll('.post-card').length;
        this.getCards(Postlength);
        scrolllock = true;
    }
}

function createLoadingElement(){
    let p = document.createElement('p');
    p.innerText = "Loading...";
    p.classList.add('loading-element')
    document.querySelector('.post-container').insertAdjacentElement("beforeend",p);

}

function destroyLoadingElement(){
    document.querySelector(".loading-element").remove();
}
getCards();