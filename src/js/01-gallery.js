// Add imports above this line
import { galleryItems } from './gallery-items';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = makeGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

galleryContainer.addEventListener('click', onImageClick);

function makeGalleryMarkup(images) {
    return images.map(({preview, original, description}) => {
        return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </li>
          `  ;
    }).join('');
};

let instance;

function onImageClick(event) {
    event.preventDefault();


    if (event.target.nodeName !== 'IMG') {
        return;
    }  

    const imgEl = event.target;
    const imgSource = imgEl.dataset.source;

    instance = basicLightbox.create(`
        <img src="${imgSource}" alt="${imgEl.alt}" width="800" height="600">
    `,
        {
            onShow: (instance) =>
                window.addEventListener('keydown', onEscKeyPress),
            onClose: (instance) =>
                window.removeEventListener('keydown', onEscKeyPress),
        },
    ) 
    instance.show()
}

 function onEscKeyPress(event) {
    if (event.key === 'Escape') {
        instance.close();
    }
    }
