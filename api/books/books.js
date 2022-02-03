const express = require('express');
const router = express.Router();
let Authors = require("./Authors.json");


router.get("/books/:bookid", (req, res) => {
    const book = Authors.find(book => book.id === Number(req.params.bookid));
    if (!book){
        res.status(400).send("Book not found!");
    }
    
    res.status(200).json(book);
})

router.patch("/books/:bookid", (req, res) => {
    const book = Authors.find(book => book.id === Number(req.params.bookid));
    if (!book){
        res.status(400).send("Book not found!");
    }

    const {author, year} = req.body;
    const details = {
        author,
        year
    }

    book.author = details.author;
    book.year = details.year;

    res.status(200).json(book);
})

router.post("/books", (req, res) => {
    try{
        console.log(req.body)
        const {author, book_name, pages, year} = req.body;
        const book = {
            author,
            book_name,
            pages,
            year
        }

        if (!author) throw new Error("Author name is required!");
        if (!book_name) throw new Error("Book name is required!");
        if (!pages) throw new Error("Page numbers are required!");
        if (!year) throw new Error("Year is required!");

        Authors.push(book);
        res.status(200).json(book);
    }
    catch (err) {
        res.status(400).send(`Invalid Request: ${err.toString()}`)
    }
})

router.delete("/books/:bookid", (req, res) => {
    const book = Authors.find(book => book.id === Number(req.params.bookid));
    
    if (!book){
        res.status(400).send("Book doesn't exist!");
    }

    Authors = Authors.filter(book => book.id !== Number(req.params.bookid));

    for (let i = book.id; i < Authors.length; i++){
        Authors[i].id = Authors[i].id - 1;
    }

    res.status(200).json(book);  
})

module.exports = router;