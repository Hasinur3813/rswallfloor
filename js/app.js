'use strict';

// counting function

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
arrow.onclick = toggleMenu;

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
