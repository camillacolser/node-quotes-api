const express = require("express");
const app = express();

let quotes = require("./quotes.json");

const middleware = express.json()

app.use(middleware)

app.get('/', function(request, response) {
  response.send('/quotes/17 should return one quote, by id')
});

app.get("/quotes", function(request, response){
  response.json(quotes);
});

app.post('/quotes', function(request, response) {
  const quote = request.body

  if (notValidRequest(quote)) {
    return response.status(400).send({success: false})
  }

  quotes.push(quote)
  response.status(201).send({success: true})
})

function notValidRequest(quote) {
  return quote.id == undefined ||
  quote.author == undefined || 
  quote.body == undefined
}

app.put('/quotes/:id', function(request, response) {
  const id = request.params.id  
  quotes = quotes.map(function (quote) {
    if (quote.id == id) {
      return {
        id: parseInt(id),
        author: request.body.author,
        quote: request.body.quote
      }
    } else {
      return quote
    }
  })

  response.send({success: true})
})

app.delete('/quotes/:id', function(request, response) {
  const id = request.params.id
  const quotesFiltered = quotes.filter(function (quote) {
    return quote.id != id
  })
  quotes = quotesFiltered

  response.send({success: true})
})

app.listen(3000, () => console.log("Listening on port 3000"));
