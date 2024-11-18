import {confirmationModal} from "../main.js";
import {deleteAllTransactions} from "../data/transactions.js";

export const openConfirmationModal = () => {
  confirmationModal.classList.add("confirmation-modal--open");
  confirmationModal.querySelector(".confirmation-modal__button--confirm").removeEventListener("click", deleteAllTransactions);
  confirmationModal.querySelector(".confirmation-modal__button--confirm").addEventListener("click", deleteAllTransactions);
}

export const closeConfirmationModal = () => {
  confirmationModal.classList.remove("confirmation-modal--open");
}