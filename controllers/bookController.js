const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId;


const getAllBooks = async (req, res) => {
  //#swagger.tags=['Books']
  const database = mongodb.getDatabase().db('project2');
  const books = database.collection('books');
  const result = await books.find();
  result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  });
};

const getSingleBook = async (req, res) => {
  //#swagger.tags=['Books']
  const database = mongodb.getDatabase().db('project2');
  const books = database.collection('books');
  const bookId = new ObjectId(req.params.id);
  const result = await books.find({ _id: bookId });
  result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books);
  });
};

const createBook = async (req, res) => {
  //#swagger.tags=['Books']
  const database = mongodb.getDatabase().db('project2');
  const books = database.collection('books');
  const book = {
    title: req.body.title,
    author: req.body.author,
    publishDate: req.body.publishDate,
    genre: req.body.genre,
    subgenre: req.body.subgenre,
    ageClass: req.body.ageClass,
    wordCount: req.body.wordCount
  }
  const response = await books.insertOne(book);
  if (response.acknowledged) {
    res.status(204).send();
    console.log(`The new book was added under ID ${response.insertedId}`);
  } else {
    res.status(500).json(response.error || 'An error occured.')
  }
}

const updateBook = async (req, res) => {
  //#swagger.tags=['Books']
  const database = mongodb.getDatabase().db('project2');
  const books = database.collection('books');
  const bookId = new ObjectId(req.params.id)
  const book = {
    title: req.body.title,
    author: req.body.author,
    publishDate: req.body.publishDate,
    genre: req.body.genre,
    subgenre: req.body.subgenre,
    ageClass: req.body.ageClass,
    wordCount: req.body.wordCount
  }
  const response = await books.replaceOne({ _id: bookId }, book);
  if (response.modifiedCount > 0) {
    res.status(204).send();
    console.log(`The book was updated.`);
  } else {
    res.status(500).json(response.error || 'An error occured.')
  }
}

const deleteBook = async (req, res) => {
  //#swagger.tags=['Books']
  const database = mongodb.getDatabase().db('project2');
  const books = database.collection('books');
  const bookId = new ObjectId(req.params.id)
  const response = await books.deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
    res.status(204).send();
    console.log(`The book was deleted.`);
  } else {
    res.status(500).json(response.error || 'An error occured.')
  }
}

module.exports = { getAllBooks, getSingleBook, createBook, updateBook, deleteBook };
