const express = require("express");
const jwt = require("jsonwebtoken");
const { default: axios } = require("axios");

const { bookModel } = require("../Models/bookModel");
const { authorMiddleware } = require("../Middlewares/authorMiddleware");
require("dotenv").config();

const bookRouter = express.Router();

//To Add New Book in DB, title & genre & description & price & pages & imageLink need as a req.body & token need as a headers authorization
bookRouter.post("/add", authorMiddleware, async (req, res) => {
  try {
    const published = new Date().getFullYear();
    req.body = { ...req.body, likes: [], published };
    let books = new bookModel(req.body);
    await books.save();
    res.send({ msg: "Book Added Successfully", books });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error!!" });
  }
});

//To Update Book, bookId need as a id in params & req.body & token need as a headers authorization
bookRouter.patch("/update/:id", authorMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    let book = await bookModel.findByIdAndUpdate(
      { _id: id, author_id: req.body.author_id },
      req.body
    );
    res.send({ msg: "Book Updated Successfully", book });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error!!", add: 123 });
  }
});

//To do like or unlike a book, bookId need as a id in params & token need as a headers authorization
bookRouter.patch("/likes/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        res.status(400).send({ msg: "You are not authorized, Please Login" });
      } else {
        let book = await bookModel.findOne({ _id: id });
        if (book) {
          let arr = book.likes;
          if (arr.includes(decoded._id)) {
            arr = arr.filter((ele) => ele !== decoded._id);
            let book = await bookModel.findByIdAndUpdate(
              { _id: id },
              { likes: arr }
            );
            res.send({ msg: "You unliked the book." });
          } else {
            arr.push(decoded._id);
            let book = await bookModel.findByIdAndUpdate(
              { _id: id },
              { likes: arr }
            );
            res.send({ msg: "You liked the book." });
          }
        } else {
          res.status(400).send({ msg: "Book Id is Wrong!!" });
        }
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error!!" });
  }
});

//To Delete the book, bookId need as a id in params & token need as a headers authorization
bookRouter.delete("/delete/:id", authorMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    let book = await bookModel.findByIdAndDelete({
      _id: id,
      author_id: req.body.author_id,
    });
    res.send({ msg: "Book Deleted Successfully", book });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error!!", add: 123 });
  }
});

//To get all book nothing needs, To filter you can pass (page & limit) || genre || title || author_name as a query
bookRouter.get("", async (req, res) => {
  const { page, limit, genre, title, author_name } = req.query;
  try {
    let query = {};
    let skipping = 0;
    let limits = 0;

    if (page && limit) {
      limits = +limit;
      skipping = (Number(page) - 1) * Number(limit);
    }

    if (genre) {
      query.genre = genre;
      console.log(genre);
    }

    if (title) {
      query.title = { $regex: new RegExp(title, "i") };
    }

    if (author_name) {
      query.author_name = { $regex: new RegExp(author_name, "i") };
    }

    let books = await bookModel.find(query).skip(skipping).limit(limits);
    let total = await bookModel.countDocuments(query);
    res.send({ msg: "Getting Books Successfully", total, books });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error!!" });
  }
});

//To get specific author's published book, Login as a author and pass the token as a headers authorization
bookRouter.get("/get", authorMiddleware, async (req, res) => {
  try {
    let books = await bookModel.find({ author_id: req.body.author_id });
    res.send({ msg: "Getting Book Successfully", books });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error!!" });
  }
});

//To get the specific books collection or any recommendation from ChatGPT(ChatBot)
bookRouter.get("/chatbot", async (req, res) => {
  try {
    const Response = await axios.post(
      process.env.GPTURL,
      {
        model: process.env.GPTMODEL,
        messages: [
          {
            role: "user",
            content: `BookHub is an online platform where users can view and purchase books, as well as authors can publish their own books for sale.\nIf a user has a question or issue related to BookHub, please email support@bookhub.com or provide me name and phone our team will react to you soon...\n,Remember You are BookHub Customer Care Support Executive and You are developed by Manikant kumar and give a short response in good manner.\nIf user will ask to suggest me some books and if in the user's query there is an author name or book name then give me response only his author name or book title , don't give me another text or sentence and if no author name or book name then give me response only "all".\nHere is the user question. "${req.body.user}"`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GPTKEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let gptResponse = Response.data.choices[0].message.content;
    console.log(gptResponse);

    if (gptResponse === "all") {
      const randomNumber = Math.floor(Math.random() * (50 - 1)) + 1;
      const books = await bookModel.find().skip(randomNumber).limit(10);
      res.send(books);
    } else if (gptResponse.length >= 30) {
      res.send(gptResponse);
    } else {
      const books = await bookModel.find({
        $or: [
          { title: { $regex: new RegExp(gptResponse, "i") } },
          { author_name: { $regex: new RegExp(gptResponse, "i") } },
        ],
      }).limit(10);
      res.send(books);
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error!!" });
    console.log(error);
  }
});

//To get the Dynamic Books Content for User read from the ChatGPT
bookRouter.get('/bookcontent',async(req,res)=>{
  try {
    const Response = await axios.post(
      process.env.GPTURL,
      {
        model: process.env.GPTMODEL,
        messages: [
          {
            role: "user",
            content: `Please generate book story or poem on real based data in 400-500 words according to books title name in simple english words. Remember you don't have to tell the book author or written person name. \nHere is the Book name. "${req.body.booktitle}"`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GPTKEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let gptResponse = Response.data.choices[0].message.content;
    res.send(gptResponse);

  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error!!" });
    console.log(error);
  }
})

module.exports = { bookRouter };
