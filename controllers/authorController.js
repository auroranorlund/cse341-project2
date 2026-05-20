const mongodb = require('../data/database')
const ObjectId = require('mongodb').ObjectId;


const getAllAuthors = async (req, res) => {
  //#swagger.tags=['Authors']
  const database = mongodb.getDatabase().db('project2');
  const authors = database.collection('authors');
  const result = await authors.find();
  result.toArray().then((authors) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  });
};

const getSingleAuthor = async (req, res) => {
  //#swagger.tags=['Authors']
  const database = mongodb.getDatabase().db('project2');
  const authors = database.collection('authors');
  const authorId = new ObjectId(req.params.id);
  const result = await authors.find({ _id: authorId });
  result.toArray().then((authors) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(authors);
  });
};

const createAuthor = async (req, res) => {
  //#swagger.tags=['Authors']
  const database = mongodb.getDatabase().db('project2');
  const authors = database.collection('authors');
  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    deathDate: req.body.deathDate,
    publishedWorks: req.body.publishedWorks
  }
  const response = await authors.insertOne(author);
  if (response.acknowledged) {
    res.status(204).send();
    console.log(`The new author was added under ID ${response.insertedId}`);
  } else {
    res.status(500).json(response.error || 'An error occured.')
  }
}

const updateAuthor = async (req, res) => {
  //#swagger.tags=['Authors']
  const database = mongodb.getDatabase().db('project2');
  const authors = database.collection('authors');
  const authorId = new ObjectId(req.params.id)
  const author = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    deathDate: req.body.deathDate,
    publishedWorks: req.body.publishedWorks
  }
  const response = await authors.replaceOne({ _id: authorId }, author);
  if (response.modifiedCount > 0) {
    res.status(204).send();
    console.log(`The author was updated.`);
  } else {
    res.status(500).json(response.error || 'An error occured.')
  }
}

const deleteAuthor = async (req, res) => {
  //#swagger.tags=['Authors']
  const database = mongodb.getDatabase().db('project2');
  const authors = database.collection('authors');
  const authorId = new ObjectId(req.params.id)
  const response = await authors.deleteOne({ _id: authorId });
    if (response.deletedCount > 0) {
    res.status(204).send();
    console.log(`The author was deleted.`);
  } else {
    res.status(500).json(response.error || 'An error occured.')
  }
}

module.exports = { getAllAuthors, getSingleAuthor, createAuthor, updateAuthor, deleteAuthor };
