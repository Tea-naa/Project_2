const apiKey = 'x13I83XQVmeUEZhY2UOaECB5LU7if6lJ';
const searchButton = document.getElementById('search-button'); 
const clearButton = document.getElementById('clear-button');
const searchInput = document.getElementById('search-input');
const outputAreaDiv = document.getElementById('outputArea');
const translateButton = document.getElementById('translate-button');
const translateInput = document.getElementById('translate-input');


//search btn
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    console.log(query);
    window.alert(`GIFs searched for: "${query}"`);
    if (query !== '') {
        findGifs(query); 
    }
});

// translate btn
translateButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    const query = translateInput.value.trim(); 
    console.log(query);
    if (query !== '') {
        quickGifLookup(query); 
    }
});
//clear btb
clearButton.addEventListener('click', () => {
    console.log('cleared search');
    outputAreaDiv.innerHTML = '';
});

// search input
function findGifs(query) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=20`;
    console.log(url);
    fetch(url)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data);
        data.data?.length ? displayGifs(data.data) : console.log('No GIFs found')
    })
    .catch(error => console.error( error));    
}

// translate input -nav
function quickGifLookup(query) {
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${query}`;
    console.log(url);
    fetch(url)
    .then(response => {
        console.log(response);
        return response.json(); 
    })   
    .then(data => {
        console.log(data);
        data.data?.images ? displaySingleGif(data.data.images.fixed_height.url) : console.log('No GIF found')
    })
    .catch(error => console.error( error));
}


/// display functions/ create img element 
function displaySingleGif(gifUrl) {  
    outputAreaDiv.innerHTML = '';
    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = "Quick GIF Lookup";
    img.className = 'gif';
    outputAreaDiv.appendChild(img);
    console.log(gifUrl);
}
function displayGifs(gifs) { 
    outputAreaDiv.innerHTML = ''; 
    gifs.forEach(gif => {  
        const img = document.createElement('img'); 
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title; 
        img.className = 'gif'; 

        outputAreaDiv.appendChild(img);  
    });
}