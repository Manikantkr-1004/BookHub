import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private titleService: Title){
    this.titleService.setTitle('BookHub - Best Book Platform for seller & Reader');
  }

  bookData = [
    {
      "_id": "655dcc8460e83885dae15455",
      "author_id": "655cf1fdc7861f693f55b4fc",
      "author_name": "Ravi Sharma",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/invisible-man.jpg",
      "pages": 581,
      "title": "Invisible Man",
      "published": 1952,
      "price": 162,
      "genre": "Folk Tales",
      "description": "Commentary is a political satire by Fyodor Dostoevsky, addressing revolutionary and nihilistic ideologies in 19th-century Russia. offering a rich portrait of 19th-century.",
      "likes": []
    },
    {
      "_id": "655dcc8460e83885dae15456",
      "author_id": "655da5bad8a80b0f05cd18fc",
      "author_name": "Chandu Kesariya",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/absalom-absalom.jpg",
      "pages": 313,
      "title": "Absalom, Absalom!",
      "published": 1936,
      "price": 189,
      "genre": "Magical Realism",
      "description": "Absalom, Absalom! is a Southern Gothic novel that explores the complex relationships and history of the Sutpen family in the American South.",
      "likes": []
    },
    {
      "_id": "655dcc8460e83885dae1545a",
      "author_id": "655da5bad8a80b0f05cd18fc",
      "author_name": "Chandu Kesariya",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/gypsy-ballads.jpg",
      "pages": 218,
      "title": "Gypsy Ballads",
      "published": 1928,
      "price": 216,
      "genre": "Religious Literature",
      "description": "Gypsy Ballads is a collection of poetry that reflects the life and culture of the Spanish Romani people, offering a vivid portrayal of their experiences.",
      "likes": []
    },
    {
      "_id": "655dcc8460e83885dae15457",
      "author_id": "655da5bad8a80b0f05cd18fc",
      "author_name": "Chandu Kesariya",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/the-sound-and-the-fury.jpg",
      "pages": 326,
      "title": "The Sound and the Fury",
      "published": 1929,
      "price": 157,
      "genre": "Fiction",
      "description": "The Sound and the Fury is a modernist novel that delves into the lives of the Compson family in Mississippi, employing a stream-of-consciousness narrative.",
      "likes": []
    },
    {
      "_id": "655dcc8460e83885dae15449",
      "author_id": "655cf1fdc7861f693f55b4fc",
      "author_name": "Ravi Sharma",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/don-quijote-de-la-mancha.jpg",
      "title": "Don Quijote De La Mancha",
      "pages": 1056,
      "published": 1610,
      "price": 145,
      "genre": "Folk Tales",
      "description": "Don Quijote De La Mancha, written by Miguel de Cervantes, is a timeless satirical novel that follows the misadventures of the delusional knight, Don Quixote.",
      "likes": []
    },
    {
      "_id": "655dcc8460e83885dae1544a",
      "author_id": "655cf1fdc7861f693f55b4fc",
      "author_name": "Ravi Sharma",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/the-canterbury-tales.jpg",
      "pages": 544,
      "title": "The Canterbury Tales",
      "published": 1450,
      "price": 212,
      "genre": "Magical Realism",
      "description": "Geoffrey Chaucer's The Canterbury Tales is a classic work of medieval literature, presenting a diverse collection of stories told by pilgrims on their way to Canterbury Cathedral.",
      "likes": []
    },
    {
      "_id": "655dcc8460e83885dae1544b",
      "author_id": "655cf1fdc7861f693f55b4fc",
      "author_name": "Ravi Sharma",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/stories-of-anton-chekhov.jpg",
      "pages": 194,
      "title": "Stories",
      "published": 1886,
      "price": 198,
      "genre": "Fiction",
      "description": "Anton Chekhov's Stories offer a compelling glimpse into the complexities of human nature through a series of poignant and thought-provoking short stories.",
      "likes": []
    },
    {
      "_id": "655dcc8460e83885dae1544c",
      "author_id": "655cf1fdc7861f693f55b4fc",
      "author_name": "Ravi Sharma",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/nostromo.jpg",
      "pages": 320,
      "title": "Nostromo",
      "published": 1904,
      "price": 155,
      "genre": "Fairy tales",
      "description": "Nostromo by Joseph Conrad is a political novel set in the fictional South American country of Costaguana, exploring themes of imperialism, revolution, and corruption.",
      "likes": []
    },
    {
      "_id": "655dcc8460e83885dae15454",
      "author_id": "655cf1fdc7861f693f55b4fc",
      "author_name": "Ravi Sharma",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/middlemarch.jpg",
      "pages": 800,
      "title": "Middlemarch",
      "published": 1871,
      "price": 207,
      "genre": "Religious Literature",
      "description": "Middlemarch, written by George Eliot, is a social novel that intricately weaves together the lives of its characters in a provincial town, offering a rich portrait of 19th-century English society.",
      "likes": []
    },
    {
      "_id": "655dcc8460e83885dae1544e",
      "author_id": "655cf1fdc7861f693f55b4fc",
      "author_name": "Ravi Sharma",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/jacques-the-fatalist.jpg",
      "pages": 596,
      "title": "Jacques the Fatalist",
      "published": 1796,
      "price": 176,
      "genre": "Religious Literature",
      "description": "Jacques the Fatalist and His Master by Denis Diderot is a philosophical novel that challenges traditional narrative conventions, presenting a series of interconnected stories and reflections.",
      "likes": []
    },
    {
      "_id": "655dcc8460e83885dae1545c",
      "author_id": "655da5bad8a80b0f05cd18fc",
      "author_name": "Chandu Kesariya",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/love-in-the-time-of-cholera.jpg",
      "pages": 368,
      "title": "Love in the Time of Cholera",
      "published": 1985,
      "price": 193,
      "genre": "Magical Realism",
      "description": "Love in the Time of Cholera explores the enduring love between Florentino Ariza and Fermina Daza over the span of decades, amidst the backdrop of a cholera epidemic.",
      "likes": []
    },
    {
      "_id": "655dcc8460e83885dae1545d",
      "author_id": "655da5bad8a80b0f05cd18fc",
      "author_name": "Chandu Kesariya",
      "imageLink": "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/images/faust.jpg",
      "pages": 158,
      "title": "Faust",
      "published": 1832,
      "price": 220,
      "genre": "Fiction",
      "description": "Faust, a classic drama, tells the timeless tale of the scholar Faust who makes a pact with the devil, Mephistopheles, in exchange for limitless knowledge and worldly pleasures.",
      "likes": []
    }
  ]

  faqData = [
    {title:'What is BookHub?',des:'BookHub is a Book platform specially for those who love reading and author can sell his books as a publisher on this platform for earning.'},
    {title:'Why do we purchase book from this platform?',des:'Here you will get best books in affordable prices as well as you can read that books in free on this platform so i think it is enough for your query.'},
    {title:'Who can sell books here?',des:'Anyone who wants to sells his books, you just need to signup as a author and after doing login, you can publish your books for sell.'},
    {title:'What payment methods do you accept?',des:'We accept all payment methods like COD, Net banking, Credit/Debit Card, UPI, QR Code, Wallets and more.'},
    {title:'How this platform is unique?',des:'BookHub platform is unique because it is integrated ChatGPT AI Model, for your query or suggestions as a ChatBot and user can read any book content summary based on chatgpt current data.'}
  ]
}
