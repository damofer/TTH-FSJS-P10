'use strict';

const express = require('express');
const router = express.Router();
const moment = require('moment');
const Loan = require('../models').Loan;
// const Loan = require('../models').Loan;
const title = "Loans";
const content = 'loans';
const columns = ["Book","Patron","Loaned on","Return by", "Return on"];
			
			 	
router.get('/', (req, res, next) => {

	 var loan = Loan.findAll().then(response => {
        console.log(response); 
          res.render('main_view',{
                title:title,
                content:content,
                columns:columns,
                loans:response
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