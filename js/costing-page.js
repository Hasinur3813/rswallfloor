"use strict";



const page = document.getElementById('costing-idea');
const homeBtn = document.getElementById('home-btn');
const wall = document.getElementById('singleWall');
const allWall = document.getElementById('allWall');
const celing = document.getElementById('celing');
const floor = document.getElementById('floor');
const all = document.getElementById('all');
const resultBtn = document.getElementById('result-btn');
const resultBox = document.getElementById('result-box');
function showCostingIdea(element){
    element.preventDefault();
    document.body.style.overflow = 'hidden';
    page.style.width = '100%';
    page.style.opacity = '1';
    page.style.zIndex = '10';
  }
function closePage(){
    document.getElementById('height').value = '';
    document.getElementById('width').value = '';
    page.style.width = '0';
    page.style.opacity = '0';
    page.style.zIndex = '0';
    document.body.style.overflow = 'auto';
    window.location.reload();
}

// Mapping of Bengali digits to English digits
const bengaliToEnglishMap = {
    '০': '0',
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9'
  };

  resultBtn.addEventListener('click',validateInput);
  let height, width;

  function validateInput() {
    const heightValue = document.getElementById('height').value;
    const widthValue = document.getElementById('width').value;
        height = heightValue;
        width = widthValue;

        // Replace Bengali digits with English digits for height
        for (const key in bengaliToEnglishMap) {
            height = height.replace(new RegExp(key, 'g'), bengaliToEnglishMap[key]);
        };

         // Replace Bengali digits with English digits for widht
         for (const key in bengaliToEnglishMap) {
            width = width.replace(new RegExp(key, 'g'), bengaliToEnglishMap[key]);
        };

        calculateCost();

  };


  function convertNumToBangla(englishNumber) {
    const englishToBengaliMap = {
      '0': '০',
      '1': '১',
      '2': '২',
      '3': '৩',
      '4': '৪',
      '5': '৫',
      '6': '৬',
      '7': '৭',
      '8': '৮',
      '9': '৯'
    };
  
    let bengaliNumber = '';
    for (let i = 0; i < englishNumber.length; i++) {
      const digit = englishNumber[i];
      if (englishToBengaliMap.hasOwnProperty(digit)) {
        bengaliNumber += englishToBengaliMap[digit];
      }
    }
  
    return bengaliNumber;
  }
  

  function calculateCost () {
    wall.innerHTML =  convertNumToBangla(`${(width*height)*140}`)+' টাকা';
    allWall.innerHTML =  convertNumToBangla(`${((width*height)*4)*140}`)+' টাকা';
    celing.innerHTML =  convertNumToBangla(`${(width*height)*140}`)+' টাকা';
    floor.innerHTML =  convertNumToBangla(`${(width*height)*450}`)+' টাকা';
    all.innerHTML =  convertNumToBangla(`${(((width*height)*5)*140)+((width*height)*450)}`)+' টাকা';

    showResult();
  }

  function showResult(){
    resultBox.style.opacity = '1';
    resultBox.style.height = '100%';
    resultBox.style.transform = 'scale(1)';

  }