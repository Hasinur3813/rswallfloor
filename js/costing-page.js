"use strict";

// Getting references to HTML elements
const page = document.getElementById('costing-idea');
const homeBtn = document.getElementById('home-btn');
const wall = document.getElementById('singleWall');
const allWall = document.getElementById('allWall');
const celing = document.getElementById('celing');
const floor = document.getElementById('floor');
const all = document.getElementById('all');
const resultBtn = document.getElementById('result-btn');
const resultBox = document.getElementById('result-box');
const resultBoxColumn = document.querySelector('.result-box-column');

// Error handling elements
const errorPage = document.querySelector('.error-popup');
const popupContent = document.querySelector('.popup-content');

// Function to show costing idea page
function showCostingIdea(element) {
    element.preventDefault();
    document.body.style.overflow = 'hidden';
    page.style.width = '100%';
    page.style.opacity = '1';
    page.style.zIndex = '10';
}

// Function to close costing idea page and reset values
function closePage() {
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

// Event listener for result button
resultBtn.addEventListener('click', validateInput);

// Variables for height and width
let height, width;

// Regular expression for valid input (English and Bengali digits)
const validInputRegEx = /^[\d\u09E6-\u09EF]+$/;

// Function to validate input values
function validateInput() {
    const heightValue = document.getElementById('height').value.trim();
    const widthValue = document.getElementById('width').value.trim();

    if (validInputRegEx.test(heightValue) && validInputRegEx.test(widthValue)) {
        height = heightValue;
        width = widthValue;

        // Replace Bengali digits with English digits for height
        for (const key in bengaliToEnglishMap) {
            height = height.replace(new RegExp(key, 'g'), bengaliToEnglishMap[key]);
        };

        // Replace Bengali digits with English digits for width
        for (const key in bengaliToEnglishMap) {
            width = width.replace(new RegExp(key, 'g'), bengaliToEnglishMap[key]);
        };

        calculateCost();
    } else {
        // Display error popup for invalid input
        errorPage.style.display = 'flex';
        popupContent.style.transform = 'scale(1)';
        popupContent.style.opacity = '1';
    }
}

// Function to convert English number to Bengali
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

// Function to calculate and display cost
function calculateCost() {
    wall.innerHTML = convertNumToBangla(`${(width * height) * 140}`) + ' টাকা';
    allWall.innerHTML = convertNumToBangla(`${((width * height) * 4) * 140}`) + ' টাকা';
    celing.innerHTML = convertNumToBangla(`${(width * height) * 140}`) + ' টাকা';
    floor.innerHTML = convertNumToBangla(`${(width * height) * 450}`) + ' টাকা';
    all.innerHTML = convertNumToBangla(`${(((width * height) * 5) * 140) + ((width * height) * 450)}`) + ' টাকা';

    showResult();
}

// Function to display result box
function showResult() {
    resultBoxColumn.style.display = 'flex';
}

// Function to close error popup
function closePopup() {
    errorPage.style.display = 'none';
    popupContent.style.transform = 'scale(0)';
    popupContent.style.opacity = '0';
}
