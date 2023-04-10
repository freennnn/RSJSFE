import { Modal } from './Modal';
import { Pet } from './Pet';

export class PetCardModal extends Modal {
    constructor (classes, pet) {
        super([...classes, 'pet-card-modal']);
        self.pet = pet;
    }
}