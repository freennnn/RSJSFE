import { PetCard } from './js/PetCard';
import { Modal } from './js/Modal';
import pets from './pets.json' assert { type: "json"};



window.onload = function() {
    console.log('Hello my Pets lovers');
    pets.forEach(pet => {
        console.log(pet.name, pet.img);
    });

    //let petCards;
    if (pets) {
        window.petCards = generatePetCards(pets);
        renderPetCardElements(window.petCards);
    }
    addPetCardsClickHandler();
     

    // let petCardImage = document.querySelector(".pet-card-1>img");
    // //console.log(petCard);
    // let petsArray = Array.from(pets);
    // console.log(petCardImage.src);
    // petCardImage.src = petsArray[petsArray.length - 5].img;
    // //console.log(petCard,img.src);




}

const renderPetCardElements = (petCards) => {
    let galleryBlock = document.querySelector(".pets-gallery");
    galleryBlock.innerHTML = '';

    galleryBlock.append(...generatePetCardElements(petCards));
}

const generatePetCards = (data) => {
    let petCards = [];
    data.forEach(petCard => {
        petCards.push(new PetCard(petCard));
    });
    return petCards;
}

const generatePetCardElements = (petCards) => {
    let petCardElements = [];
    //let petCardElementsHTML = '';
    petCards.forEach(petCard => {
        //petCardElementsHTML += petCard.generatePetCardElement();
        petCardElements.push(petCard.generatePetCardElement());
    });
    console.log(petCardElements);
    return petCardElements;
}

const addPetCardsClickHandler= () => {
    let petsGallery = document.querySelector(".pets-gallery").addEventListener('click', (e) => {
        console.log("pets gallery clicked");
        console.log(e);
        let petCardDiv = e.target.closest('.pet-card');
        if (petCardDiv) {
            //let clickedPetCard = e.target;
            // console.log(petCardDiv.dataset.id);
            // console.log(window.petCards);
            let petCards = window.petCards;
            let selectedPetCard = petCards.find(obj => obj.id === Number(petCardDiv.dataset.id));
            renderModalWindow(selectedPetCard.generatePetCardModalContent());
        }
    });
}

const renderModalWindow = (content) => {
    let modal = new Modal(['pet-card-modal']);
    modal.buildModal(content);
}