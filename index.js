const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require('./Modules/replaceTemplate');
const slugify = require('slugify');

// this codes executes once we start the program
const overview = fs.readFileSync(
  `${__dirname}/Template/overview.html`,
  `utf-8`
);
const product = fs.readFileSync(`${__dirname}/Template/product.html`, `utf-8`);
const card = fs.readFileSync(`${__dirname}/Template/card.html`, `utf-8`);

const data = fs.readFileSync(`${__dirname}/Data/data.json`, `utf-8`);
const dataObject = JSON.parse(data);
console.log(`${dataObject}`);

const slugs = dataObject.map((value) =>
  slugify(value.productName, { lower: true })
);

console.log(slugs);

// creating Web server

const server = http.createServer((req, res) => {
  // respond to client

  const { query, pathname } = url.parse(req.url, true);

  // home page and over-view page
  if (pathname === `/` || pathname === `/overview`) {
    res.writeHead(200, {
      //   an http header is a piece of information we want to send back
      'Content-type': 'text/html',
      'My-Own-Header': 'Says Rico',
    });

    // loop thru our data object
    const cardhtml = dataObject
      .map((value) => replaceTemplate(card, value))
      .join('');
    const output = overview.replace('{%PRODUCT_CARDS%}', cardhtml);
    console.log(`------<> ${cardhtml} --------<>`);
    res.end(`${output}`);
  }
  // product page
  else if (pathname === `/product`) {
    res.writeHead(200, {
      //   an http header is a piece of information we want to send back
      'Content-type': 'text/html',
      'My-Own-Header': 'Says Rico',
    });
    const productFromData = dataObject[query.id];
    const output = replaceTemplate(product, productFromData);
    res.end(`${output}`);
  } else if (pathname === `/api`) {
    //   telling browser that we are sending a json
    res.writeHead(200, {
      'Content-type': 'application/json',
      'My-Own-Header': 'Says Rico',
    });
    //   reading the data file
    res.end(`${data}`);
  } else {
    res.writeHead(404, {
      //   an http header is a piece of information we want to send back
      'Content-type': 'text/html',
      'My-Own-Header': 'Says Rico',
    });
    res.end(`<h1>page not found</h1>`);
  }

  // res.end(`hello from the server`)
});

// listen to request from client

server.listen(5000, `127.0.0.1`, () => {
  console.log(`server listening on port ----> 5000 🤪`);
});
