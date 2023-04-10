import { Pet } from './js/Pet';
import { Modal } from './js/Modal';
import petsJSON from './pets.json' assert { type: "json"};

const desktopStartWidth = 1099.9;
const tabletStartWidth = 650.9;
let pets = [];
let petCardElements = [];
let currentGalleryItemCount = 0;
let currentPetCardElements = [];
let previousPetCardElements = [];

const mediaTabletAndDown = window.matchMedia(`(max-width: ${desktopStartWidth}px)`);
const mediaMobileOnly = window.matchMedia(`(max-width: ${tabletStartWidth}px)`);


window.onload = function() {
    console.log('Hello my Pets lovers');
    // petsJSON.forEach(pet => {
    //     console.log(pet.name, pet.img);
    // });

    setUpMediaQueries();


    //let petCards;
    if (petsJSON) {
        pets = generatePetCards(petsJSON);
        petCardElements = generatePetCardElements(pets);
        //renderPetCardElements(pets);
    }
    onScreenMediaChange();
    addPetCardElementsClickHandler();
    addPetGalleryButtonsClickHandlers()
     

    // let petCardImage = document.querySelector(".pet-card-1>img");
    // //console.log(petCard);
    // let petsArray = Array.from(pets);
    // console.log(petCardImage.src);
    // petCardImage.src = petsArray[petsArray.length - 5].img;
    // //console.log(petCard,img.src);




}

function setUpMediaQueries() {
    console.log('setUpMediaQueries');
    mediaTabletAndDown.addEventListener("change", onScreenMediaChange);
    mediaMobileOnly.addEventListener("change", onScreenMediaChange);
}

function onScreenMediaChange(e) {
    console.log("onScreenMediaChange");
    let newGalleryItemCount = 3;
    if (mediaMobileOnly.matches) {
        newGalleryItemCount = 1;
    } else if (mediaTabletAndDown.matches) {
        newGalleryItemCount = 2;
    } else {
        newGalleryItemCount = 3;
    }
    console.log("newGalleryItemCount");
    if (currentGalleryItemCount !== newGalleryItemCount) {
        currentGalleryItemCount = newGalleryItemCount;
        setGallery();
    }

}

function setGallery() {
    console.log("Redrawing the gallery");
    let galleryBlock = document.querySelector(".pets-gallery");
    galleryBlock.innerHTML = '';

    previousPetCardElements = currentPetCardElements;
    currentPetCardElements = getNextPetCardElements();

    galleryBlock.append(...currentPetCardElements); 
}

function scrollGalleryLeft() {
    removePetGalleryButtonsClickHandlers();

    let galleryElement = document.querySelector(".pets-gallery");
    let elementPositions = [];
    let galleryWidth = galleryElement.offsetWidth;

    for (let i=0; i < currentPetCardElements.length; i++) {
        let el = currentPetCardElements[i];
        elementPositions.push(el.offsetLeft);
    }

    let nextPetCardElements = [];
    if (previousPetCardElements.length > 0) {
        nextPetCardElements = previousPetCardElements;
    } else {
        nextPetCardElements = getNextPetCardElements();
    }

    for (let i = 0; i < currentPetCardElements.length; i++) {
        let el = currentPetCardElements[i];
         el.style.position = "absolute";
         //el.style.left = `-${elementPositions[i]}px`;
         el.style.left = `${elementPositions[i] + galleryWidth}px`;
        console.log(el.style);
    }

    // for (let i = 0; i < nextPetCardElements.length; i++) {
    //     let el = nextPetCardElements[i];
    //      el.style.position = "relative";
    //      //el.style.left = `-${elementPositions[i]}px`;
    //      el.style.left = `${elementPositions[i] - galleryWidth}px`;
    //     console.log(el.style);
    // }
    galleryElement.append(...nextPetCardElements);

    let wrapper = document.querySelector(".pets-gallery-wrapper");
    wrapper.scroll({
        left: galleryWidth,
        behavior: 'auto',
    });
    wrapper.scroll({
        left: 0,//galleryWidth,
        behavior: 'smooth',
    });
    // setTimeout(() => {
    //     console.log("scrolling back");
    //     //wrapper.scrollLeft = 0;
    //     wrapper.scroll({
    //         left: 0,//galleryWidth,
    //         behavior: 'smooth',
    //     });
    // }, 1000);

  // because no on scroll end event
  setTimeout(() => {
    currentPetCardElements.forEach(el => {
        el.style.position = "relative";
        el.style.left = 0;
    });
    currentPetCardElements.forEach(el => el.remove());
    previousPetCardElements = [];//currentPetCardElements;
    currentPetCardElements = nextPetCardElements;
    addPetGalleryButtonsClickHandlers();
}, 1000);

}

function scrollGalleryRight() {
    removePetGalleryButtonsClickHandlers();
    //we only need to remember 1 step - otherwise we will rung out of pets for generateNext (since we only have 8 overall)
    previousPetCardElements = [];
    console.log("scrollGalleryRight");
    let galleryElement = document.querySelector(".pets-gallery");
    let elementPositions = [];
    let galleryWidth = galleryElement.offsetWidth;

    for (let i=0; i < currentPetCardElements.length; i++) {
        let el = currentPetCardElements[i];
        elementPositions.push(el.offsetLeft);
    }

    let nextPetCardElements = getNextPetCardElements();
    for (let i = 0; i < nextPetCardElements.length; i++) {
        let el = nextPetCardElements[i];
        el.style.position = "absolute";
        el.style.left = `${elementPositions[i] + galleryWidth}px`;
        console.log(el.style);
    }

    galleryElement.append(...nextPetCardElements);

    let wrapper = document.querySelector(".pets-gallery-wrapper");

    wrapper.scroll({
        left: galleryWidth,
        behavior: 'smooth',
    });

    //because no on scroll end event
    setTimeout(() => {
        nextPetCardElements.forEach(el => {
            el.style.position = "relative";
            el.style.left = 0;
        });
        currentPetCardElements.forEach(el => el.remove());
        previousPetCardElements = currentPetCardElements;
        currentPetCardElements = nextPetCardElements;
        addPetGalleryButtonsClickHandlers();
    }, 1000);

  
    //galleryElement.style.leftScr
    // currentPetCardElements.forEach(el => {
    //     el.style.left = `-${galleryWidth}px`;
    // });

    // for (let i = 0; i < nextPetCardElements.length; i++) {
    //      let el = nextPetCardElements[i];
    //      console.log(el.style.left);
    //     // console.log(elementPositions[i]);
    //     el.style.left = `${elementPositions[i]}px`;
    //      console.log(el.style.left);
    //     // console.log(el.style);
    // }


}

function getNextPetCardElements() {
    let nonTakenElements = petCardElements.filter (function (el) {
        return !(previousPetCardElements.includes(el) || currentPetCardElements.includes(el))
    });
    return nonTakenElements.sort(() => .5 - Math.random()).slice(0,currentGalleryItemCount);

}


const renderPetCardElements = (pets) => {
    let galleryBlock = document.querySelector(".pets-gallery");
    galleryBlock.innerHTML = '';

    galleryBlock.append(...generatePetCardElements(pets));
}

const generatePetCards = (petsJSON) => {
    let pets = [];
    petsJSON.forEach(petJSON => {
        pets.push(new Pet(petJSON));
    });
    return pets;
}

const generatePetCardElements = (pets) => {
    let petCardElements = [];
    //let petCardElementsHTML = '';
    pets.forEach(pet => {
        //petCardElementsHTML += petCard.generatePetCardElement();
        petCardElements.push(pet.generatePetCardElement());
    });
    console.log(petCardElements);
    return petCardElements;
}

const addPetCardElementsClickHandler = () => {
    console.log("addPetCardElementsClickHandler");
    document.querySelector(".pets-gallery").addEventListener('click', (e) => {
        console.log("pets gallery clicked");
        console.log(e);
        let petCardElement = e.target.closest('.pet-card');
        if (petCardElement) {
            //let clickedPetCard = e.target;
            // console.log(petCardDiv.dataset.id);
            // console.log(window.petCards);
            let selectedPet = pets.find(obj => obj.id === Number(petCardElement.dataset.id));
            renderModalWindow(selectedPet.generatePetCardModalContent());
        }
    });
}

function rightClickFunc(event) {
    scrollGalleryRight();
}

function leftClickFunc(event) {
    scrollGalleryLeft();
}

function addPetGalleryButtonsClickHandlers() {
    document.querySelector(".pets-gallery-block__left-nav-item").addEventListener('click', leftClickFunc);
    document.querySelector(".pets-gallery-block__right-nav-item").addEventListener('click', rightClickFunc);
}

function removePetGalleryButtonsClickHandlers() {
    document.querySelector(".pets-gallery-block__left-nav-item").removeEventListener('click', leftClickFunc);
    document.querySelector(".pets-gallery-block__right-nav-item").removeEventListener('click', rightClickFunc);
}

const renderModalWindow = (content) => {
    let modal = new Modal(['pet-card-modal']);
    modal.buildModal(content);
}