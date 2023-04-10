export class Pet {
    constructor ({ id, name, img, type, breed, description, age, inoculations, diseases, parasites }) {
        this.id = id;
        this.name = name;
        this.urlToImg = img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;;
    }

    generatePetCardElement() {
        let template = '';
        let petCardDiv = document.createElement('div');
        petCardDiv.className = "pet-card";
        petCardDiv.setAttribute("data-id", this.id);

        this.urlToImg && (template += `<img class="pet-card__photo" src="${this.urlToImg}" alt="Pet photo">`);
        this.name && (template += `<p class="pet-card__title">${this.name}</p>`);

        template += `<div class="pet-card__more-button"><button class="button button_secondary">Learn more</button></div>`
    
        petCardDiv.innerHTML = template;
        console.log(petCardDiv);
        return petCardDiv;
    }

    generatePetCardModalContent() {

        let petContentDiv = document.createElement('div');
        petContentDiv.className = "pet-modal-content";
        petContentDiv.setAttribute("data-id", this.id);

        let template = '';
        let urlToModalImg = this.urlToImg.replace('/pets/pets', '/pets/modal')
        urlToModalImg && (template += `<img class="pet-modal__photo" src="${urlToModalImg}" alt="Pet photo">`);
        
        template += `<div class="pet-modal__text-content">`;
        template += `<h3 class="pet-modal__title">${this.name}</h3>`;
        template += `<h4 class="pet-modal__sub-title">${this.type} - ${this.breed}</h4>`;
        template += `<h5 class="pet-modal__description">${this.description}</h5>`;
        template += `<ul class="pet-modal__med-list">`;
        template += `<li class="pet-modal__med-list-item"><b>Age:</b> ${this.age}</li>`;
        template += `<li class="pet-modal__med-list-item"><b>Inoculations:</b> ${this.inoculations.join("; ")}</li>`;
        template += `<li class="pet-modal__med-list-item"><b>Diseases:</b> ${this.diseases.join("; ")}</li>`;
        template += `<li class="pet-modal__med-list-item"><b>Parasites:</b> ${this.parasites.join("; ")}</li>`;
        template += `</ul`;
        template += `</div>`;
            
        petContentDiv.innerHTML = template;
        console.log(petContentDiv);
        return petContentDiv;
    }

}