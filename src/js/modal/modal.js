import {confirmationModal} from "../main.js";

export const openConfirmationModal = () => {
  confirmationModal.classList.add("confirmation-modal--open");
}

export const closeConfirmationModal = () => {
  confirmationModal.classList.remove("confirmation-modal--open");
}