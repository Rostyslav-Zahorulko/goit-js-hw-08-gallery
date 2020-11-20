import images from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImage: document.querySelector('.lightbox__image'),
  lightboxCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
};

function createGalleryItem(item) {
  const galleryItemRef = document.createElement('li');
  const galleryItemLinkRef = document.createElement('a');
  const galleryItemLinkImageRef = document.createElement('img');

  galleryItemRef.classList.add('gallery__item');

  galleryItemLinkRef.classList.add('gallery__link');
  galleryItemLinkRef.href = item.original;

  galleryItemLinkImageRef.classList.add('gallery__image');
  galleryItemLinkImageRef.src = item.preview;
  galleryItemLinkImageRef.alt = item.description;
  galleryItemLinkImageRef.dataset.sourse = item.original;
  galleryItemLinkImageRef.dataset.index = images.indexOf(item);

  galleryItemLinkRef.appendChild(galleryItemLinkImageRef);
  galleryItemRef.appendChild(galleryItemLinkRef);

  return galleryItemRef;
}

const galleryItemArr = images.map(image => createGalleryItem(image));

refs.gallery.append(...galleryItemArr);

const galleryImagesRefs = document.querySelectorAll('.gallery__image');
const galleryImagesArr = Array.from(galleryImagesRefs);

refs.gallery.addEventListener('click', handleOnGalleryClick);
refs.lightboxCloseBtn.addEventListener('click', handleOnLightboxCloseBtnClick);
refs.lightboxOverlay.addEventListener('click', handleOnLightboxOverlayClick);

function handleOnGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  openLightbox(event.target);
}

function handleOnLightboxCloseBtnClick() {
  closeLightbox();
}

function handleOnLightboxOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeLightbox();
  }
}

function handleKeybordKeyPress(event) {
  let currentIndex = findActiveImageIndex();

  switch (event.code) {
    case 'ArrowRight':
      currentIndex += 1;
      break;

    case 'ArrowLeft':
      currentIndex -= 1;
      break;

    case 'Escape':
      closeLightbox();
      break;

    default:
  }

  changeActiveImage(currentIndex);
}

function openLightbox(image) {
  window.addEventListener('keydown', handleKeybordKeyPress);

  refs.lightbox.classList.add('is-open');
  refs.lightboxImage.src = image.dataset.sourse;
  refs.lightboxImage.alt = image.alt;
}

function closeLightbox() {
  window.removeEventListener('keydown', handleKeybordKeyPress);

  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
}

function findActiveImageIndex() {
  const activeImageSourse = refs.lightboxImage.src;
  const imageToFind = galleryImagesArr.find(
    image => image.dataset.sourse === activeImageSourse,
  );
  const indexToFind = imageToFind.dataset.index;

  return Number(indexToFind);
}

function changeActiveImage(index) {
  if (index >= 0 && index <= galleryImagesArr.length - 1) {
    const nextImage = document.querySelector(`[data-index="${index}"]`);

    refs.lightboxImage.src = nextImage.dataset.sourse;
    refs.lightboxImage.alt = nextImage.alt;
  }
}
