import { changeLang, switherLang } from "./langSwitcher/translate.js";
let languageCode = navigator.language.substr(0, 2).toLowerCase() || "ru";
if (!sessionStorage.getItem("langCode")) {
  sessionStorage.setItem("langCode", languageCode);
} else {
  languageCode = sessionStorage.getItem("langCode");
}
changeLang(languageCode);
switherLang();

const initLangSwitcher = (initialValue) => {
  const langSwitcher = document.querySelector(".lang-switcher");
  const langSwitcherTrigger = langSwitcher.querySelector(
    ".lang-switcher__button"
  );
  const buttonSwitchText = langSwitcher.querySelector(
    ".lang-switcher__button-lang"
  );
  const langOptionsList = langSwitcher.querySelector(
    ".lang-switcher__langs-list"
  );
  const langOption = langSwitcher.querySelectorAll(
    ".lang-switcher__lang-list-item"
  );
  const selectHidden = langSwitcher.querySelector("input[type=hidden]");
  let clickOutsideHandler;

  if (langSwitcher) {
    // переопределяем кнопку выбора если есть начальный язык
    if (initialValue) {
      langOption.forEach((item) => {
        if (item.dataset.value === initialValue) {
          selectHidden.value = item.dataset.value;
          buttonSwitchText.textContent = item.dataset.value.toUpperCase();
        }
      });
    }
    langSwitcherTrigger.addEventListener("click", () => {
      langOptionsList.classList.toggle("active");
      if (langOptionsList.classList.contains("active")) {
        clickOutsideHandler = (event) => {
          if (!langSwitcher.contains(event.target)) {
            langOptionsList.classList.remove("active");
            window.removeEventListener("click", clickOutsideHandler);
          }
        };
        window.addEventListener("click", clickOutsideHandler);
      }
    });
    langOption.forEach((item) => {
      item.addEventListener("click", () => {
        selectHidden.value = item.dataset.value;
        buttonSwitchText.textContent = item.dataset.value.toUpperCase();
        langOptionsList.classList.remove("active");

        langOption.forEach((itemAgain) => {
          itemAgain.classList.remove("selected");
        });
        item.classList.add("selected");
        window.removeEventListener("click", clickOutsideHandler);
      });
    });
  }
};
// export { initLangSwitcher };
initLangSwitcher(languageCode);
