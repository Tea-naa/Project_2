const apiKey = 'x13I83XQVmeUEZhY2UOaECB5LU7if6lJ';
const searchButton = document.getElementById('search-button'); 
const clearButton = document.getElementById('clear-button');
const searchInput = document.getElementById('search-input');
const outputAreaDiv = document.getElementById('outputArea');
const translateButton = document.getElementById('translate-button');
const translateInput = document.getElementById('translate-input');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query !== '') {
        findGifs(query); 
    }
});

translateButton.addEventListener('click', (event) => {
    const query = translateInput.value.trim(); 
    if (query !== '') {
        quickGifLookup(query); 
    }
});

clearButton.addEventListener('click', () => {
    outputAreaDiv.innerHTML = '';
});

function findGifs(query) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=20`;

    fetch(url)
    .then(response => response.json()) 
    .then(data => data.data?.length ? displayGifs(data.data) : console.log('No GIFs found'))
    .catch(error => console.error( error));
      
}

function quickGifLookup(query) {
    const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${query}`;

    fetch(url)
    .then(response => response.json())  
    .then(data => data.data?.images ? displaySingleGif(data.data.images.fixed_height.url) : console.log('No GIF found'))
    .catch(error => console.error( error));
}

function displaySingleGif(gifUrl) {  
    outputAreaDiv.innerHTML = '';
    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = "Quick GIF Lookup";
    img.className = 'gif';
    outputAreaDiv.appendChild(img);
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