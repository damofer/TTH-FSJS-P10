'use strict';

const express = require('express');
const router = express.Router();
const moment = require('moment');
const Book = require('../models').Book;
const Loan = require('../models').Loan;
const title = "Books";
const content = 'books';
const columns = ["Title","Author","Genre","Year Released"];
			
			 	
router.get('/', (req, res, next) => {

	let bookQuery;
	if (req.query.search === undefined) {
        bookQuery = Book.findAndCountAll({
            order: [
                ['title', 'ASC']
            ],
            limit: 10,
            offset: (req.query.page * 10) - 10,
        });
    }
	if (req.query.filter === 'overdue') {
        bookQuery = Book.findAndCountAll({
            distinct: 'title',
            order: [
                ['title', 'ASC']
            ],
            // limit: 10,
            // offset: (req.query.page * 10) - 10,
            include: {
                model: Loan,
                where: {
                    return_by: {
                        lt: today
                    },
                    returned_on: null
                }
            }
        });
    }

    if (req.query.filter === 'checked_out') {
        bookQuery = Book.findAndCountAll({
            distinct: 'title',
            order: [
                ['title', 'ASC']
            ],
            limit: 10,
            offset: (req.query.page * 10) - 10,
            include: {
                model: Loan,
                where: {
                    returned_on: null
                }
            }
        });
    }

     bookQuery.then(books => {

        currentPage = req.query.page;
        filter = req.query.filter;
        search_title = req.query.title;
        author = req.query.author;
        genre = req.query.genre;
        first_published = req.query.first_published;

        const columns = [
            "Title",
            "Author",
            "Genre",
            "First Published"
        ];

        let bookData = books.rows.map(book => {
            return book.get({
                plain: true
            });
        });

        const count = Math.ceil(books.count / 10);

        const title = "Books";

        res.render('all', {
            count,
            currentPage,
            filter,
            bookData,
            columns,
            title,
            content,
            search_title,
            author,
            genre,
            first_published,
            search
        });

    }).catch(error => {
        res.status(500).send(error);
    });
    res.render('main_view',{title,content,columns});


});
router.get('/create', (req, res, next) => {
    res.render('books_create');
});


module.exports = router;