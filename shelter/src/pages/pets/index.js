import { Pet } from '../../js/Pet';
import { Modal } from '../../js/Modal';
import petsJSON from '../../pets.json';

//console.log(petsJSON);
//et webpackPetsJSON = JSON.parse(petsJSON);

const desktopStartWidth = 1099.9;
const tabletStartWidth = 650.9;
let pets = [];
let petCardElements = [];
let currentGalleryItemCount = 0;
let currentPetCardElements = [];
let currentFirstPetCardIndex = 0;
let currentPetCardIndexes = [];
let previousPetCardElements = [];

const mediaTabletAndDown = window.matchMedia(`(max-width: ${desktopStartWidth}px)`);
const mediaMobileOnly = window.matchMedia(`(max-width: ${tabletStartWidth}px)`);



window.onload = function() {
    console.log('Pets page js in here too!');

    setUpMediaQueries();
    //let petCards;
    if (petsJSON) {
        // console.log(petsJSON);
        // console.log(typeof petsJSON);
        pets = generatePetCards(petsJSON);
        petCardElements = generatePetCardElements(pets);
        //renderPetCardElements(pets);
    }


    onScreenMediaChange();
    addPetCardElementsClickHandler();
}

function setUpMediaQueries() {
    console.log('setUpMediaQueries');
    mediaTabletAndDown.addEventListener("change", onScreenMediaChange);
    mediaMobileOnly.addEventListener("change", onScreenMediaChange);
}


function onScreenMediaChange(e) {
    console.log("onScreenMediaChange");
    let newGalleryItemCount = 8;
    if (mediaMobileOnly.matches) {
        newGalleryItemCount = 3;
    } else if (mediaTabletAndDown.matches) {
        newGalleryItemCount = 6;
    } else {
        newGalleryItemCount = 8;
    }
    if (currentGalleryItemCount !== newGalleryItemCount) {
        currentGalleryItemCount = newGalleryItemCount;
        console.log(`newGalleryItemCount ${currentGalleryItemCount}`);
        setGallery();
    }

}

function setGallery() {

    //case for screen size/number of visible items shown
    console.log(currentFirstPetCardIndex % currentGalleryItemCount);
    if (currentFirstPetCardIndex % currentGalleryItemCount !== 0) {
        currentFirstPetCardIndex = currentFirstPetCardIndex - currentFirstPetCardIndex % currentGalleryItemCount;
        console.log(`new first Index ${currentFirstPetCardIndex}`);
    }

    console.log(`Redrawing the gallery at index = ${currentFirstPetCardIndex} and count= ${currentGalleryItemCount}`);
    let galleryBlock = document.querySelector(".pets-gallery");
    galleryBlock.innerHTML = '';

    //previousPetCardElements = currentPetCardElements;
    currentPetCardElements = getNextPetCardElements();
    console.log(currentPetCardElements);
    galleryBlock.append(...currentPetCardElements); 

    updateNavigationButtons();

}

function getNextPetCardElements() {
    return petCardElements.slice(currentFirstPetCardIndex, currentFirstPetCardIndex+currentGalleryItemCount);

    /*
    let nonTakenElements = petCardElements.filter (function (el) {
        return !(previousPetCardElements.includes(el) || currentPetCardElements.includes(el))
    });
    return nonTakenElements.sort(() => .5 - Math.random()).slice(0,currentGalleryItemCount);
    */
}


const generatePetCards = (petsJSON) => {
    let pets = [];
    //console.log(petsJSON);
    petsJSON.forEach(petJSON => {
        pets.push(new Pet(petJSON));
    });
    return pets;
}

const generatePetCardElements = (pets) => {
    let petCardElements = [];
    //let petCardElementsHTML = '';
    //generating 48 petCardElements by the task requirements
    for (let i = 0; i < 6; i++) {
        let newBatch = [];
        pets.forEach(pet => {
            //petCardElementsHTML += petCard.generatePetCardElement();
            newBatch.push(pet.generatePetCardElement("../../../"));
            //petCardElements.push(pet.generatePetCardElement("../../../"));
        });
        shuffleArray(newBatch);
        //newBatch.forEach(el => console.log(el.dataset));
        petCardElements.push.apply(petCardElements, newBatch);
        //petCardElements.forEach(el => console.log(el.dataset));
        //console.log(petCardElements);
    }

    //console.log(petCardElements);
    return petCardElements;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const addPetCardElementsClickHandler = () => {
    console.log("addPetCardElementsClickHandler");
    document.querySelector(".pets-gallery").addEventListener('click', (e) => {
        //console.log("pets gallery clicked");
        //console.log(e);
        let petCardElement = e.target.closest('.pet-card');
        if (petCardElement) {
            //let clickedPetCard = e.target;
            // console.log(petCardDiv.dataset.id);
            // console.log(window.petCards);
            let selectedPet = pets.find(obj => obj.id === Number(petCardElement.dataset.id));
            renderModalWindow(selectedPet.generatePetCardModalContent("../../../"));
        }
    });
}

const renderModalWindow = (content) => {
    let modal = new Modal(['pet-card-modal']);
    modal.buildModal(content);
}


const updateNavigationButtons = () => {
    console.log("updateNavigationButtons");
    let firstPageButton = document.querySelector(".navigation-button-first-page");
    let previousPageButton = document.querySelector(".navigation-button-previous-page");
    let currentPageButton = document.querySelector(".navigation-button-current-page");
    let nextPageButton = document.querySelector(".navigation-button-next-page");
    let lastPageButton = document.querySelector(".navigation-button-last-page");


    currentPageButton.textContent = currentFirstPetCardIndex/currentGalleryItemCount + 1;

    if (currentFirstPetCardIndex / currentGalleryItemCount >= 1) {
        console.log("previousPageButton enable");
        previousPageButton.addEventListener('click', previousPageButtonClicked);
        previousPageButton.classList.remove("navigation-button_disabled");
    } else {
        previousPageButton.removeEventListener('click', previousPageButtonClicked);
        previousPageButton.classList.add("navigation-button_disabled");
    }

    if (currentFirstPetCardIndex + currentGalleryItemCount < petCardElements.length - 1) {
        console.log("nextPageButton enable");
        nextPageButton.addEventListener('click', nextPageButtonClicked);
        nextPageButton.classList.remove('navigation-button_disabled');
    } else {
        nextPageButton.classList.add("navigation-button_disabled");
        nextPageButton.removeEventListener('click', nextPageButtonClicked);
    }

    if (currentFirstPetCardIndex > 0) {
        firstPageButton.addEventListener('click', firstPageButtonClicked);
        firstPageButton.classList.remove("navigation-button_disabled");
    } else {
        firstPageButton.removeEventListener('click', firstPageButtonClicked);
        firstPageButton.classList.add("navigation-button_disabled");
    }

    if (currentFirstPetCardIndex + currentGalleryItemCount < petCardElements.length) {
        lastPageButton.addEventListener('click', lastPageButtonClicked);
        lastPageButton.classList.remove("navigation-button_disabled");
    } else {
        lastPageButton.removeEventListener('click', lastPageButtonClicked);
        lastPageButton.classList.add("navigation-button_disabled");
    }
}

function previousPageButtonClicked() {
    currentFirstPetCardIndex -= currentGalleryItemCount;
    setGallery();
}

function nextPageButtonClicked() {
    currentFirstPetCardIndex += currentGalleryItemCount;
    setGallery();
}

function firstPageButtonClicked() {
    currentFirstPetCardIndex = 0;
    setGallery();
}

function lastPageButtonClicked() {
    currentFirstPetCardIndex = petCardElements.length - currentGalleryItemCount;
    setGallery();
}