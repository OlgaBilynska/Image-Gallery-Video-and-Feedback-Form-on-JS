// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
console.log(galleryItems);

const makeGalleryMarkup = images => {
    return images.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
   <a class="gallery__link" href="${original}"> 
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>
    `;
})
.join('');
}

const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = makeGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

const options = {
    captionsData: 'alt',
    captionDelay: 250,
};

const lightbox = new SimpleLightbox('.gallery a', options);

