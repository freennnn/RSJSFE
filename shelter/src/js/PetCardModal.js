import { Modal } from './Modal';
import { PetCard } from './PetCard';

export class PetCardModal extends Modal {
    constructor (classes, petCard) {
        super([...classes, 'pet-card-modal']);
        self.petCard = petCard;
    }
}