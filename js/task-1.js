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

function hadleEscapePress(event) {
  if (event.code === 'Escape') {
    closeLightbox();
  }
}

function handleArrowsPress(event) {
  const activeImage = findActiveImage();

  let currentIndex = Number(activeImage.dataset.index);

  switch (event.code) {
    case 'ArrowRight':
      currentIndex += 1;
      break;

    case 'ArrowLeft':
      currentIndex -= 1;
      break;

    default:
  }

  console.log(currentIndex);
  if (currentIndex >= 0 && currentIndex <= 8) {
    const nextImage = document.querySelector(`[data-index="${currentIndex}"]`);

    refs.lightboxImage.src = nextImage.dataset.sourse;
    refs.lightboxImage.alt = nextImage.alt;
    refs.lightboxImage.dataset.index = nextImage.dataset.index;
  }
}

function openLightbox(image) {
  window.addEventListener('keydown', hadleEscapePress);
  // window.addEventListener('keydown', handleLeftArrowPress);
  // window.addEventListener('keydown', handleRightArrowPress);
  window.addEventListener('keydown', handleArrowsPress);

  refs.lightbox.classList.add('is-open');
  refs.lightboxImage.src = image.dataset.sourse;
  refs.lightboxImage.alt = image.alt;
}

function closeLightbox() {
  window.removeEventListener('keydown', hadleEscapePress);
  // window.removeEventListener('keydown', handleLeftArrowPress);
  // window.removeEventListener('keydown', handleRightArrowPress);
  window.removeEventListener('keydown', handleArrowsPress);

  refs.lightbox.classList.remove('is-open');
  refs.lightboxImage.src = '';
  refs.lightboxImage.alt = '';
}

function findActiveImage() {
  const activeImageSourse = refs.lightboxImage.src;
  // console.log(activeImageSourse);

  const imagesRefs = document.querySelectorAll('.gallery__image');
  // console.log(imagesRefs);

  const imagesArr = Array.from(imagesRefs);
  // console.log(imagesArr);

  const imageToFind = imagesArr.find(
    image => image.dataset.sourse === activeImageSourse,
  );

  // console.log(imageToFind);

  return imageToFind;
}
