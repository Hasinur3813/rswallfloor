'use strict';


const preLoader = document.querySelector('.preloader');


// Function to hide the preloader
// function hidePreloader() {
//     preLoader.style.display = 'none';
//     document.body.style.overflow = 'auto';
// }

// window.addEventListener('load',()=>{
//     hidePreloader();
// })


// top header controls

const topHeader = document.querySelector('.top-header');
function closeTopBar(){
    topHeader.style.opacity = '0';
    setTimeout(()=>{
        topHeader.style.display = 'none';
    },500)
}

const navItem = document.querySelectorAll('.nav-menu-item');

navItem.forEach(item => {
    item.addEventListener('click', () => {
        // Remove the 'active' class from all items
        navItem.forEach(otherItem => {
            otherItem.classList.remove('activeNav');
        });

        // Add the 'active' class to the clicked item
        item.classList.add('activeNav');
    });
});

// counting function for counter area

const counterElement = document.querySelectorAll('.element span');


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
};

counting();

// toggle menu for dropdown items

const arrow = document.querySelector('.fa-angle-down');
const dropdownBox = document.querySelector('.dropdown-items');
// arrow.onclick = toggleMenu;

// show and hide dropdown by clicking on arrow button
function toggleMenu(){
    dropdownBox.classList.toggle('showDropdown');
    arrow.classList.toggle('rotateAngle');
    removeDropdown();
};

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
};

let photoGallery = document.querySelector('.photo_gallery');

let i = 1;
// Call the appendImages function every second
let interval = setInterval(appendImages, 10);
let photoToRender = 20;

function appendImages() {
    if (i <= photoToRender) {
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
};

const modalBox = document.getElementById('modal-box');
const imageNumber = document.querySelector('.image-number');
const modalImage = document.getElementById('modal-image');
const imageOverlay = document.querySelector('.image-overlay');


// function for opeing the modal box for portfolio

function openModal(){
    modalBox.style.opacity = '1';
    modalBox.style.zIndex = '1';
    modalBox.style.pointerEvents ='fill';
    document.body.style.overflow = 'hidden';
    document.addEventListener('contextmenu', preventContextMenu);
    window.addEventListener('keydown', slidingByArrow);
}
// function for closing the modal
function closeModal(){
    modalBox.style.opacity = '0';
    modalBox.style.zIndex = '-1';
    modalBox.style.pointerEvents ='none';
    document.body.style.overflow = 'auto';
    document.removeEventListener('contextmenu', preventContextMenu);
    window.removeEventListener('keydown', slidingByArrow);
    imageOverlay.style.opacity = '1';
}
// Keyboard arrow navigation
function slidingByArrow(event){
    if (event.key === 'ArrowLeft') {
        // Navigate to the previous image
        plusSlide(-1);
    } else if (event.key === 'ArrowRight') {
        // Navigate to the next image
        plusSlide(1);
    }
}
   
// function for prevent the context menu for the image safety
function preventContextMenu(event){
    event.preventDefault();
}

let slideIndex = 1;

// show the clicked image in the modal box
function currentSlide (n){
    slideIndex = n;
    showSlide(slideIndex);
   
}

// function for control sliding by prev and next button
function plusSlide(n){
    // block the display for the image loading animation until the image is loaded
    imageOverlay.style.opacity = '1';
    // sliding the next image
    showSlide(slideIndex += n);
}
// show slide with some of the conditions
function showSlide(n){
    const thumbnailBox = document.querySelectorAll('.thumbnail-box');
    
    if(n > thumbnailBox.length){
        slideIndex = thumbnailBox.length;
        let mainImgSource = `./portfolio/portfolio/portfolio(${slideIndex}).jpg`;
        modalImage.src = mainImgSource;

        // set the opacity -0 for the imge overlay when the image is loaded
        modalImage.addEventListener('load', ()=>{
            imageOverlay.style.opacity = '0';
            modalImage.alt = `portfolio${slideIndex}.jpg`;
            imageNumber.innerHTML = `${slideIndex}/${thumbnailBox.length}`;
        });
        

    } else if( n < 1){
        slideIndex = 1;
        let mainImgSource = `./portfolio/portfolio/portfolio(${slideIndex}).jpg`;
        modalImage.src = mainImgSource;
        
        // set the opacity -0 for the imge overlay when the image is loaded
        modalImage.addEventListener('load', ()=>{
            imageOverlay.style.opacity = '0';
            modalImage.alt = `portfolio${slideIndex}.jpg`;
            imageNumber.innerHTML = `${slideIndex}/${thumbnailBox.length}`;
        });
     
    }else{
        let mainImgSource = `./portfolio/portfolio/portfolio(${n}).jpg`;
        modalImage.src = mainImgSource;
        
        // set the opacity -0 for the imge overlay when the image is loaded
        modalImage.addEventListener('load', ()=>{
            imageOverlay.style.opacity = '0';
            modalImage.alt = `portfolio${slideIndex}.jpg`;
            imageNumber.innerHTML = `${n}/${thumbnailBox.length}`;
        });
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
        ctx.drawImage(watermark, 400,300, 300, 200);
        ctx.globalAlpha = 1;

            // Add background to the text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Background color (black with 50% opacity)
        ctx.fillRect(0, canvas.height - 32, canvas.width, 32);
          // Add text at the bottom of the image
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial'; 
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, canvas.height - 10);

        // Convert the canvas to a data URL
    const watermarkedImage = canvas.toDataURL(`./portfolio/portfolio/portfolio(${slideIndex}).jpg`, 1.0); // Adjust format and quality as needed
        return watermarkedImage;
};

function download(){
    const watermarkedImage =  addWatermarkAndDownload();
    imgDownloadLink.href = watermarkedImage;
    imgDownloadLink.download = `portfolio(${slideIndex})`;
}

// Function to prevent the default context menu behavior
function preventContextMenu(event) {
    event.preventDefault();
}

// prevent context menu for the homepage images
window.addEventListener('load', ()=>{
    const imageElements = document.querySelectorAll('.item');
    imageElements.forEach(function(imageElement) {
        imageElement.addEventListener('contextmenu', preventContextMenu);
    });
});


// controls for the video gallery
let videoGallery = document.querySelector('.video_gallery');
const videoModalBox = document.querySelector('.video-modal');
const modalVideo = document.getElementById('modal-video');
const loader = document.querySelector('.loading_animation');

let videoToRender = 6;

// append the each video tho the video gallery
function apendVideo(){
    if(!videoGallery.classList.contains('hasVideo')){
        for(let i = 1; i<=videoToRender; i++){
            let div = document.createElement('div');
            div.classList.add('col-4', 'col-md-3', 'mb-3', 'video', 'rounded-2');
            let video = document.createElement('video');
            video.src = `./portfolio/video/portfolio_video${i}.mp4`;
            video.classList.add('w-100');
            video.muted = false;
            video.autoplay = false;
            div.appendChild(video);
            videoGallery.appendChild(div);
            videoGallery.classList.add('hasVideo');
            
            video.addEventListener('loadeddata', checkIfAllVideosLoaded);
        }
    }
  
    const video = document.querySelectorAll('video');
    // function for showing the videos to the modal box
    showVideoToModal(video);
};

let videoCount = 0;

function checkIfAllVideosLoaded(){
    const video = document.querySelectorAll('video');
    videoCount++;
    if(videoCount == video.length-1){
        // hide the loading anmation
        loader.style.opacity = '0';
        loader.style.zIndex = '-1';
    }
}

const modalClose = document.getElementById('video-modal-close').onclick = ()=>{
    videoModalBox.classList.remove('show_content');
    modalVideo.pause();
};
  
const photoBtn = document.getElementById('photo');
const videoBtn = document.getElementById('video');

function addVideoToGallery(item){
        item.classList.add('btnBackground');
        photoBtn.classList.remove('btnBackground');
        photoGallery.style.display = 'none';
        videoGallery.style.display = 'flex';
        videoGallery.classList.add('show_content');
        apendVideo();
}

function showVideoToModal(video){
    video.forEach(vid =>{
        vid.addEventListener('click',()=>{
            let vidSrc = vid.src;
            modalVideo.src= vidSrc;
            modalVideo.muted = false;
            videoModalBox.classList.add('show_content');
        })
    });
};

photoBtn.onclick = ()=>{
    photoBtn.classList.add('btnBackground');
    videoBtn.classList.remove('btnBackground');
    videoGallery.classList.remove('show_content');
    videoGallery.style.display = 'none';
    photoGallery.style.display = 'flex';
}