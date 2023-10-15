'use strict';


const navItem = document.querySelectorAll('.nav-menu-item');

navItem.forEach(item => {
    item.addEventListener('click', () => {
        // Remove the 'active' class from all items
        navItem.forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        // Add the 'active' class to the clicked item
        item.classList.add('active');
    });
});

// counting function for counter area

const counterElement = document.querySelectorAll('.element span');

counting();
function counting(){
    counterElement.forEach(number =>{
        const target = number.getAttribute('data-target');
        let count = 0;
        let counting = setInterval(() =>{
            if(count == target){
                count = 0;
                clearInterval(counting);
            }else{
                if(target != '7'){
                    count+= 5;
                    number.innerHTML = count+'+';
                }else{
                    count++;
                    number.innerHTML = count;
                }
            }
        },10)
    })
}

// toggle menu for dropdown items

const arrow = document.querySelector('.fa-angle-down');
const dropdownBox = document.querySelector('.dropdown-items');
// arrow.onclick = toggleMenu;

// show and hide dropdown by clicking on arrow button
function toggleMenu(){
    dropdownBox.classList.toggle('showDropdown');
    arrow.classList.toggle('rotateAngle');
    removeDropdown();
}

// remove dropdown by clicking on window
function removeDropdown(){
    function hideDropdown(event){
        if(!dropdownBox.contains(event.target) && !arrow.contains(event.target)){
            dropdownBox.classList.toggle('showDropdown');
            arrow.classList.remove('rotateAngle'); 
            window.removeEventListener('click',hideDropdown);
        }
    }
    window.addEventListener('click',hideDropdown);
}

let photoGallery = document.querySelector('.photo_gallery');

let i = 1;

function appendItem() {
    if (i <= 30) {
        let div = document.createElement('div');
        div.classList.add('col-md-3', 'col-4', 'mb-3','thumbnail-box');
        let item = `<img src="./portfolio/thumbnail/thumbnail(${i}).jpg" onclick="openModal();currentSlide(${i})" alt="portfolio${i}.jpg" class="w-100 item">`;
        div.innerHTML = item;
        photoGallery.appendChild(div);
        
        i++; // Increment i to append the next item in the next iteration
    } else {
        clearInterval(interval); // Stop the interval when i reaches 51 (after 50 items)
        i = 1;
    }
}

// Call the appendItem function every second
const interval = setInterval(appendItem, 100);

// function for opeing the modal box for portfolio

function openModal(){
    modalBox.style.opacity = '1';
    modalBox.style.zIndex = '1';
    modalBox.style.pointerEvents ='fill';
    document.body.style.overflow = 'hidden';
    document.addEventListener('contextmenu', preventContextMenu);
    console.log('event added')
}

function preventContextMenu(event){
    event.preventDefault();
}
// function for closing the modal

function closeModal(){
    modalBox.style.opacity = '0';
    modalBox.style.zIndex = '-1';
    modalBox.style.pointerEvents ='none';
    document.body.style.overflow = 'auto';
    document.removeEventListener('contextmenu', preventContextMenu);
    console.log('event removed')

}

const modalBox = document.getElementById('modal-box');
const imageNumber = document.querySelector('.image-number');
const modalImage = document.getElementById('modal-image');

let slideIndex = 1;

// show the clicked image in the modal box
function currentSlide (n){
    slideIndex = n;
    showSlide(slideIndex);
   
}

// function for control sliding by prev and next
function plusSlide(n){
    showSlide(slideIndex += n);
}
// show slide with some of the conditions
function showSlide(n){
    const thumbnailBox = document.querySelectorAll('.thumbnail-box');
    
    if(n > thumbnailBox.length){
        slideIndex = thumbnailBox.length;
        let mainImgSource = `./portfolio/thumbnail/thumbnail(${slideIndex}).jpg`;
        modalImage.src = mainImgSource;
        modalImage.alt = `portfolio${slideIndex}.jpg`;
        imageNumber.innerHTML = `${slideIndex}/${thumbnailBox.length}`;
    } else if( n < 1){
        slideIndex = 1;
        let mainImgSource = `./portfolio/thumbnail/thumbnail(${slideIndex}).jpg`;
        modalImage.src = mainImgSource;
        modalImage.alt = `portfolio${slideIndex}.jpg`;
        imageNumber.innerHTML = `${slideIndex}/${thumbnailBox.length}`;
    }else{
        let mainImgSource = `./portfolio/thumbnail/thumbnail(${n}).jpg`;
        modalImage.src = mainImgSource;
        modalImage.alt = `portfolio${slideIndex}.jpg`;
        imageNumber.innerHTML = `${n}/${thumbnailBox.length}`;
    }  
};

const imgDownloadLink = document.getElementById('imgDownload');

// onclick function for downloading the portfolio images
imgDownloadLink.onclick = download;

// Function to add the watermark to the image and initiate the download
function addWatermarkAndDownload() {
    const watermark = new Image();
        watermark.src = './img/logo.png';

        // Create a canvas element to overlay the watermark
    const canvas = document.createElement('canvas');
        canvas.width = modalImage.naturalWidth;
        canvas.height = modalImage.naturalHeight; 
    const ctx = canvas.getContext('2d');
    const text = "RS 3d wallpaper & floor; +880 1772 132818";

        // Draw the original image on the canvas
        ctx.drawImage(modalImage, 0,0);

        // Draw the watermark on top of the original image
        ctx.globalAlpha = 0.3;
        ctx.drawImage(watermark, 150,100, 250, 150);
        ctx.globalAlpha = 1;

            // Add background to the text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Background color (black with 50% opacity)
        ctx.fillRect(0, canvas.height - 32, canvas.width, 32);
          // Add text at the bottom of the image
        ctx.fillStyle = 'white';
        ctx.font = '22px Arial'; 
        ctx.fillWeight = '600';
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, canvas.height - 10);

        // Convert the canvas to a data URL
    const watermarkedImage = canvas.toDataURL(`./portfolio/portfolio(${slideIndex}).jpg`, 1.0); // Adjust format and quality as needed
        return watermarkedImage;
}

function download(){
    const watermarkedImage =  addWatermarkAndDownload();
    imgDownloadLink.href = watermarkedImage;
    imgDownloadLink.download = `portfolio(${slideIndex})`;
}

// Get a NodeList of all the image elements you want to target
const imageElements = document.querySelectorAll('.item'); // Replace with your image selector

// Function to prevent the default context menu behavior
function preventContextMenu(event) {
    event.preventDefault();
    // You can perform a custom action here or simply prevent the context menu from appearing.
}

// Loop through each image element and attach the event listener
item.forEach(function(imageElement) {
    imageElement.addEventListener('contextmenu', preventContextMenu);
});