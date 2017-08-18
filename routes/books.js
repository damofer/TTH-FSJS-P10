'use strict';

const express = require('express');
const router = express.Router();
const moment = require('moment');
const Book = require('../models').Book;
// const Loan = require('../models').Loan;
const title = "Books";
const content = 'books';
const columns = ["Title","Author","Genre","Year Released"];
			
			 	
router.get('/', (req, res, next) => {

	 var books = Book.findAll().then(response => {
        console.log(response);
          res.render('main_view',{
                title:title,
                content:content,
                columns:columns,
                books:response
            });

    });
    
 
});
router.get('/create', (req, res, next) => {
    res.render('books_create',{
        title:title,
        content:content,
        columns:columns
    
    });
});


module.exports = router;