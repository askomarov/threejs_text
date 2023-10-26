/* eslint-disable no-param-reassign */
import { translations } from "./translations.js";

// eslint-disable-next-line max-len
// Эта функция выбирает все элементы на странице с атрибутом data-translate, который указывает, какой ключ объекта переводов нужно использовать для данного элемента. Затем она проверяет, есть ли перевод для данного ключа и выбранного языка, и если есть, то изменяет текст элемента на переведенный текст.
const changeLang = (language = "ru") => {
  const pageElements = document.querySelectorAll("[data-translate]");

  document.documentElement.lang = language;

  pageElements.forEach((element) => {
    const key = element.dataset.translate;

    if (translations[language] && translations[language][key]) {
      // element.innerHTML = translations[language][key];
      gsap.to(element, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          // По завершении анимации затухания обновляем содержимое абзаца и анимируем его появление
          element.innerHTML = translations[language][key];
          gsap.to(element, {
            opacity: 1,
            duration: 0.3,
          });
        },
      })
    }

    if (element.placeholder) {
      const placeholderKey = element.getAttribute("data-translate-placeholder");
      if (translations[language] && translations[language][placeholderKey]) {
        element.placeholder = translations[language][placeholderKey];
      }
    }
  });
};

// eslint-disable-next-line max-len
// Этот код выбирает все кнопки выбора языка и добавляет обработчик события на каждую из них. Когда кнопка нажимается, обработчик получает выбранный язык из атрибута data-language кнопки и вызывает функцию перевода страницы для данного языка.
const switherLang = () => {
  // ищем инпут в котором храниться код языка
  const inputLangValue = document.querySelector("input[name='selected-lang']");
  // обработчик события изменения значения инпута через js
  const observer = new MutationObserver((mutationsList) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const mutation of mutationsList) {
      if (
        // eslint-disable-next-line operator-linebreak
        mutation.type === "attributes" &&
        mutation.attributeName === "value"
      ) {
        // вызываем функции при изменении языка
        changeLang(mutation.target.value);
        sessionStorage.setItem("langCode", mutation.target.value);
      }
    }
  });
  // запускаем обработчик изменения значения инпута
  observer.observe(inputLangValue, { attributes: true });
};

export { changeLang, switherLang };
