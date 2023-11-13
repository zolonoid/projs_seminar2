"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое id.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];



class ElementWrapper {
  #element;

  constructor(parentElement, tagName, ...classes) {
    this.#element = document.createElement(tagName);
    parentElement.append(this.#element);
    if (classes.length > 0)
      this.#element.classList.add(...classes);
  }

  get element() {
    return this.#element;
  }
}


class Review extends ElementWrapper {
  static #lastId = 0;

  constructor(parentElement, text) {
    super(parentElement, "p", "review");
    this.element.setAttribute("id", ++Review.#lastId);
    this.element.textContent = text;
  }
}


class Reviewer extends ElementWrapper {
  #text;
  #error;
  #button;
  #addReviewHandler;

  constructor(parentElement, addReviewHandler) {
    super(parentElement, "div", "reviewer");
    this.#addReviewHandler = addReviewHandler;
    this.#createInput();
    this.#createError();
    this.#createButton();
  }

  #createInput() {
    this.#text = new ElementWrapper(this.element, "textarea", "reviewer__text");
    this.#text.element.rows = 5;
  }

  #createError() {
    this.#error = new ElementWrapper(this.element, "p", "reviewer__error");
    this.#error.element.setAttribute("hidden", "hidden");
    this.#error.element.textContent = "*Отзыв должен быть не менее 50 символов в длину и не более 500";
  }

  #createButton() {
    this.#button = new ElementWrapper(this.element, "button", "reviewer__button");
    this.#button.element.textContent = "Отправить отзыв";
    this.#button.element.addEventListener("click", this.#onClickButton.bind(this));
  }

  #onClickButton() {
    const review = this.#text.element.value;
    if (review.length < 50 || review.length > 500)
      this.#addReviewFail();
    else
      this.#addReviewSuccess();
  }

  #addReviewSuccess() {
    const review = this.#text.element.value;
    this.#text.element.value = "";
    this.#error.element.setAttribute("hidden", "hidden");
    this.#addReviewHandler(review);
  }

  #addReviewFail() {
    this.#error.element.removeAttribute("hidden");
  }
}


class Product extends ElementWrapper {
  #title;
  #reviewer;
  #reviewContainer;
  #reviews = [];

  constructor(parentElement, name, reviews) {
    super(parentElement, "div", "product");
    this.#createTitle(name);
    this.#reviewContainer = new ElementWrapper(this.element, "div");
    this.#addReviews(reviews);
    this.#reviewer = new Reviewer(this.element, this.#addReviewHandler.bind(this));
  }

  #createTitle(name) {
    this.#title = new ElementWrapper(this.element, "h2", "product__title");
    this.#title.element.textContent = name;
  }

  #addReviewHandler(text) {
    this.#reviews.push(new Review(this.#reviewContainer.element, text));
  }

  #addReviews(reviews) {
    for (const review of reviews) {
      this.#addReviewHandler(review.text);
    }
  }
}


class App extends ElementWrapper {
  #products = [];

  constructor() {
    super(document.querySelector("body"), "div", "app");
  }

  init(data) {
    for (const item of data) {
      this.#products.push(new Product(this.element, item.product, item.reviews));
    }
  }
}


const app = new App();
app.init(initialData);
