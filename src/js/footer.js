import { footerYear } from "./main.js";

const setFooterYear = () => {
  const now = new Date();
  footerYear.textContent = now.getFullYear();
}

export default setFooterYear;