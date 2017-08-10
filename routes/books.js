'use strict';

const express = require('express');
const router = express.Router();

const title = "Books";
const content = 'books';
const columns = ["Title","Author","Genre","Year Released"];
			
			 	
router.get('/', (req, res, next) => {

    res.render('main_view',{title,content,columns});
});
router.get('/create', (req, res, next) => {
    res.render('books_create');
});


module.exports = router;