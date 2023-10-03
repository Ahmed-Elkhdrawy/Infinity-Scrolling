// Get Elements
const imagesContainer  = document.getElementById('images-container');
const loader = document.getElementById('loader');

// Create Variables
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
let count = 30;
const apiKey = 'fVC2R6csDmqx4OciuSJzsUeVhVakuP0L4asLeih63Wg';
// const apiKey = '-KrR7V-yOtsMWTbAuJTgG8Rt7TQwaMNJez8hRcAvbFs';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.style.visibility = "hidden";
        initialLoad = false;
        count = 30;
    }
}

// Helper Function to set attributs
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & Photos, Add To DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run Function For Each Object In photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        item.classList.add('img-box')
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src:  photo.urls.regular ,
            alt: photo.alt_description ,
            title: photo.alt_description ,
        });
        // Create <div> to display photo title and description
        const div = document.createElement('div');
        div.classList.add('discr');
        div.textContent = photo.alt_description;
        div.style.bottom = div.height;
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> and <div> inside <a>, Then put both inside imagesContainer element
        item.append(img, div);
        imagesContainer.appendChild(item);
    });
}

// Get Fotos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch (apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom op page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        loader.style.visibility = "visible";
        ready = false;
        getPhotos();
    }
});
// On Load
getPhotos(); 