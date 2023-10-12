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




function closeModal(){
    modalBox.style.opacity = '0';
    modalBox.style.zIndex = '-1';
    modalBox.style.pointerEvents ='none';
    document.body.style.overflow = 'auto';
    slideIndex = 1;
}

const modalBox = document.getElementById('modal-box');
const imageNumber = document.querySelector('.image-number');
const modalImage = document.getElementById('modal-image');


function openModal(){
    modalBox.style.opacity = '1';
    modalBox.style.zIndex = '1';
    modalBox.style.pointerEvents ='fill';
    document.body.style.overflow = 'hidden';
}
let slideIndex = 1;

function currentSlide (n){
    slideIndex = n;
    showSlide(slideIndex);
   
}

function showSlide(n){
        const thumbnailBox = document.querySelectorAll('.thumbnail-box');
        let mainImgSource = `./portfolio/thumbnail/thumbnail(${n}).jpg`;
            modalImage.src = mainImgSource;
            modalImage.alt = `portfolio${slideIndex}.jpg`;
        imageNumber.innerHTML = `${n}/${thumbnailBox.length}`
}

function plusSlide(n){
    const thumbnailBox = document.querySelectorAll('.thumbnail-box');
    let mainImgSource = `./portfolio/thumbnail/thumbnail(${slideIndex+=n}).jpg`;
    modalImage.src = mainImgSource;
    modalImage.alt = `portfolio${slideIndex}.jpg`;
    imageNumber.innerHTML = `${slideIndex}/${thumbnailBox.length}`;
    console.log(slideIndex)
}