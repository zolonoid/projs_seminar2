"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {
    #books = null;

    constructor(books) {
        this.#books = new Set(books);
        if (this.#books.size !== books.length)
            throw new Error("Массив books содержит дубликаты.");
    }

    get allBooks() {
        return Array.from(this.#books);
    }

    addBook(title) {
        if (this.hasBook(title))
            throw new Error("Книга с таким названием уже существует.");
        this.#books.add(title);
    }

    removeBook(title) {
        if (!this.hasBook(title))
            throw new Error("Книги с таким названием не существует.");
        this.#books.delete(title);
    }

    hasBook(title) {
        return this.#books.has(title);
    }
}


const library=new Library(['Book 1','Book 2','Book 3']);
console.log(library.allBooks);
library.addBook('Book 4');
console.log(library.allBooks);
library.removeBook('Book 2');
console.log(library.allBooks);
console.log(library.hasBook('Book 1'));
