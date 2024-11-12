import {rootElement, walletIcon} from "../main.js";

export const switchToLightMode = () => {
  rootElement.style.setProperty("--darkColor", "#f0ebd8");
  rootElement.style.setProperty("--lightColor", "#0d1321");
  walletIcon.style.setProperty("stroke", "#0d1321");
}

export const switchToDarkMode = () => {
  rootElement.style.setProperty("--darkColor", "#0d1321");
  rootElement.style.setProperty("--lightColor", "#f0ebd8");
  walletIcon.style.setProperty("stroke", "#f0ebd8");
};