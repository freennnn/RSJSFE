import { Pet } from './js/Pet';
import { Modal } from './js/Modal';
import petsJSON from './pets.json'; //Commented due to Babel not supporting it: assert { type: "json"}
//import './sass/style.scss';

const desktopStartWidth = 1099.9;
const tabletStartWidth = 650.9;
let pets = [];
let petCardElements = [];
let currentGalleryItemCount = 0;
let currentPetCardElements = [];
let previousPetCardElements = [];

const mediaTabletAndDown = window.matchMedia(`(max-width: ${desktopStartWidth}px)`);
const mediaMobileOnly = window.matchMedia(`(max-width: ${tabletStartWidth}px)`);

/*
let petsJSON = [
    {
      "id": 1,
      "name": "Jennifer",
      "img": "src/assets/images/pets/pets/jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": 2,
      "name": "Sophia",
      "img": "src/assets/images/pets/pets/sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": 3,
      "name": "Woody",
      "img": "src/assets/images/pets/pets/woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "id": 4,
      "name": "Scarlett",
      "img": "src/assets/images/pets/pets/scarlett.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": 5,
      "name": "Katrine",
      "img": "src/assets/images/pets/pets/katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": 6,
      "name": "Timmy",
      "img": "src/assets/images/pets/pets/timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "id": 7,
      "name": "Freddie",
      "img": "src/assets/images/pets/pets/freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "id": 8,
      "name": "Charly",
      "img": "src/assets/images/pets/pets/charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ];
*/

console.log(petsJSON);
//et webpackPetsJSON = JSON.parse(petsJSON);

window.onload = function() {
    console.log('Hello my Pets enthusiast');
    // petsJSON.forEach(pet => {
    //     console.log(pet.name, pet.img);
    // });

    setUpMediaQueries();


    //let petCards;
    if (petsJSON) {
        console.log(petsJSON);
        console.log(typeof petsJSON);
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
    console.log(petsJSON);
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