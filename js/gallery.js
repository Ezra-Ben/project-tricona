 document.addEventListener('DOMContentLoaded', () =>
    {
 const images = document.querySelectorAll('.img-grid img');
 const lightbox = document.querySelector('.lightbox');
 const lightboxImg = document.getElementById('lightbox-img');
 const closeButton = document. querySelector('.lightbox-close');
 let currentImageIndex = 0; // Keep track of the current image index
 
 //Show image in lightbox when clicked
 images.forEach((image, index) =>{
    image.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = image.dataset.lightboxSrc;
        currentImageIndex = index; //Update current image index
    } );

 } );

 //Create and add navigation buttons(Next and Prev)
 const nextBtn = document.createElement('span');
 nextBtn.innerHTML = '>';
 nextBtn.classList.add('lightbox-nav', 'lightbox-next');
 lightbox.appendChild(nextBtn);

 const prevBtn = document.createElement('span');
 prevBtn.innerHTML = '<';
 prevBtn.classList.add('lightbox-nav', 'lightbox-prev');
 lightbox.appendChild(prevBtn);
 
 //Show the image based on the index
 function showImage(index){
    if (index < 0) {
        index = images.length - 1;
    }
    else if (index >= images.length){
        index = 0;
    }
    lightboxImg.src = images[index].dataset.lightboxSrc;//Use data-lightbox-src
    currentImageIndex = index;
 }

// Next button functionality
  nextBtn.addEventListener('click', () => {
    showImage(currentImageIndex + 1);
});

// Prev button functionality
   prevBtn.addEventListener('click', () => {
    showImage(currentImageIndex - 1);
});
 
        // Close lightbox on click of close button
        closeButton.addEventListener('click', () =>
        {
            lightbox.style.display = 'none';

        });
     
        // Close lightbox if clicked outside the image
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox)
            {
                lightbox.style.display = 'none';
            }
            
        });
});
 