var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var session = require('express-session');
var credentials = require('./public/credentials.js');

require("jsdom").env("", function(err, window) {
  if (err) {
    console.error(err);
    return;
  }

  $ = require("jquery")(window);
});
app.use(session({
  resave: false,
  saveUnitialized: false,
  secret: credentials.cookieSecret
}));

var handlebars = require('express-handlebars')
  .create({
    defaultLayout: 'application'
  });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

// app.set('views', __dirname + '/public');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.get("/", function(req,res){
// 	res.render('test');
// });

//handlebars stuff
var aboutLib = require('./lib/about.js');
var loginLib = require('./lib/login.js');
var storeLib = require('./lib/store.js');
var signupLib = require('./lib/signup.js');
var logoutLib = require('./lib/logout.js');
var editAddressLib = require('./lib/editAddress.js');
var contactLib = require('./lib/contact.js');
var loginLib = require('./lib/login.js');
var checkoutLib = require('./lib/checkout.js');
// var indexLib = require('./lib/index.js');

var cookieParser = require('cookie-parser');

var mailer = require('express-mailer');
mailer.extend(app, {
  from: 'no-reply@example.com',
  host: 'smtp.gmail.com',
  secureConnection: true,
  port: 465,
  transportMethod: 'SMTP',
  auth: {
    user: 'meta.clothes@gmail.com',
    pass: 'strongbad'
  }

});

app.post('/sendEmail', function(req, res, next) {

  app.mailer.send('email', {
    to: 'meta.clothes@gmail.com',
    from: req.body.name,
    subject: req.body.subject,
    body: req.body.message
  }, function(err) {
    if (err) {
      console.log("ERROR: ");
      console.log(err);
      res.send(true);
      return;
    }
    res.send(true);

  });
});


app.use(cookieParser(credentials.cookieSecret));

app.get('/setCookie', function(req, res) {
  if (!req.signedCookies.cart) {
    console.log("there is not a cart Master!");
    res.cookie('cart', [], {
      signed: true
    });
  } else {
    console.log("there is a cart Master!");
    console.log(req.signedCookies.cart.length);
  }
  res.send(true); //change me to whatever is needed
});

app.post('/addToCart', function(req, res) {

  var item = req.body.id;
  var quant = req.body.quantity;
  /*check the cart length, if there is nothing just push in the new item.
    if there is something, compare new item til we find a match, increment the quant of the match
  */
  var int = -1;
  if (req.signedCookies.cart.length > 0) {
    for (var i = 0; i < req.signedCookies.cart.length; i++) {
      console.log("in loop..." + i);
      if (req.signedCookies.cart[i].item === item) {
        int = i;
        break;
      }
    }
    if (int !== -1) {
      req.signedCookies.cart[int].quant = req.signedCookies.cart[int].quant + quant;
    } else {
      req.signedCookies.cart.push({
        item: item,
        quant: quant
      });
    }
  } else {
    console.log("cart was empty, pushing in...");
    req.signedCookies.cart.push({
      id: item,
      quant: quant
    });
  }
  console.log("cart: ");
  console.log(req.signedCookies.cart);
  res.cookie("cart", req.signedCookies.cart, {
    signed: true
  });
  //console.log(req.cook)
  res.send(req.signedCookies.cart.length);
});

app.get('/', function(req, res) {
  console.log("index");
  console.log(req.session.user);
  if (req.signedCookies.cart) {
    res.render('index', {
      session: req.session.user,
      cart: req.signedCookies.cart.length
    });

  } else {
    res.cookie('cart', [], {
      signed: true
    });
    res.render('index', {
      session: req.session.user,
      cart: 0
    });
  }

});

app.get('/contact', function(req, res) {
  console.log("contact");
  res.render('contact', {
    page: contactLib.getContact(),
    session: req.session.user,
    cart: req.signedCookies.cart.length
  });
});

app.get('/about', function(req, res) {
  console.log("about");
  res.render('about', {
    page: aboutLib.getAbout(),
    session: req.session.user,
    cart: req.signedCookies.cart.length
  });
});

app.get('/login', function(req, res) {
  console.log("login in server.js");
  res.render('login', {
    page: loginLib.getLogin(),
    cart: req.signedCookies.cart,
    session: req.session.user,
    cart: req.signedCookies.cart.length
  });
});

app.get('/logout', function(req, res) {
  console.log("logout in server.js");
  req.session.user = null;
  res.render('index', {
    session: req.session.user,
    cart: req.signedCookies.cart.length
  });
});

app.get('/signup', function(req, res) {
  console.log("signup in server.js");
  res.render('signup', {
    page: signupLib.getSignup(),
    cart: req.signedCookies.cart.length
  });
});

app.get('/editAddress', function(req, res) {
  console.log("editAddress in server.js");
  res.render('editAddress', {
    page: editAddressLib.getEditAddress(),
    session: req.session.user,
    cart: req.signedCookies.cart.length
  });
});

app.get('/getSessionId', function(req, res) {
  console.log("in getSessionId in server.js" + req.session.user);
  res.sendStatus(req.session.user);
});

app.get('/getCookie', function(req, res) {
  console.log("getCookie in server.js");
  res.send(req.signedCookies.cart);
});

app.get('/contact', function(req, res) {
  res.render('contact', {
    page: contactLib.getContact(),
    session: req.session.user,
    cart: req.signedCookies.cart.length
  })
});

app.post('/userLogin', function(req, res) {
  req.session.user = req.body.id;
  console.log(req.body.id + " in app.get userLogin");
  res.send(req.body);
});

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function verbData(method, url, callback, obj, validation) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url);
  if (obj) {
    xhr.setRequestHeader('Content-Type', 'application/json');
  }
  xhr.onreadystatechange = function() {
    if (xhr.status < 400 && xhr.readyState == 4) {
      if (xhr.responseText) {
        if (callback) {
          callback(JSON.parse(xhr.responseText));
        }
      } else {
        if (validation) {
          validation();
        }
      }
    } else if (xhr.status > 400) {
      // window.location.href = '/login';
			console.log("else if xhr.status > 400");
    }
  };

  if (obj) {
    console.log(JSON.stringify(obj) + "in verbData");
    xhr.send(JSON.stringify(obj));
  } else {
    xhr.send(null);
  }
}

app.post('/getLogin', function(req, res) {
  console.log('in /getLogin');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/user/' + req.body.email + '/' + req.body.password, function result(callback) {
    res.send(callback);
  });
});

app.post('/getUserId', function(req, res) {
  console.log('in /getUserId: ' + req.body.id);
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/userId/' + req.body.id, function result(callback) {
    res.send(callback);
  });
});

app.post('/getUserCart', function(req, res) {
  console.log('in /getUserCart: ' + req.body.id);
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/cart/' + req.body.id, function result(callback) {
    res.send(callback);
  });
});

app.post('/editUserAddress', function(req, res) {
  var url = 'http://localhost:8080/MetaClothingJava/rest/address';
  verbData('POST', url, function(data) {
    res.send(data);
  }, req.body);
});

app.post('/newSignup', function(req, res) {
  var url = 'http://localhost:8080/MetaClothingJava/rest/createUser';
  verbData('POST', url, function(data) {
    res.send(data);
  }, req.body);
});
//need to finish this one
app.post('/updateCart', function(req, res) {
  console.log('in updateCart; item: ' + req.body.id + " user: " + req.body.userId);
  var url = 'http://localhost:8080/MetaClothingJava/rest/addCart/' + req.body.id + '/' + req.body.userId;
	$.getJSON(url, function result(callback) {
    res.send(callback);
  });
});

//item lists: all, by Category, by Brand
app.get('/allItems', function(req, res) {
  console.log('in /allItems');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/allItems', function result(callback) {
    res.send(callback);
  });
});

app.get('/Tyke', function(req, res) {
  console.log('in /Tyke');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemBrand/Tyke', function result(callback) {
    res.send(callback);
  });
});

app.get('/BabyBoo', function(req, res) {
  console.log('in /BabyBoo');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemBrand/Baby%20Boo', function result(callback) {
    res.send(callback);
  });
});

app.get('/Rough', function(req, res) {
  console.log('in /Rough');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemBrand/Rough%20Rider', function result(callback) {
    res.send(callback);
  });
});

app.get('/Bannana', function(req, res) {
  console.log('in /Bannana');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemBrand/Bannana%20Democracy', function result(callback) {
    res.send(callback);
  });
});

app.get('/Carter', function(req, res) {
  console.log('in /Carter');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemBrand/Carter%20Clothing', function result(callback) {
    res.send(callback);
  });
});

app.get('/Levi', function(req, res) {
  console.log('in /Levi');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemBrand/Levi%20Mouse', function result(callback) {
    res.send(callback);
  });
});

app.get('/Mouse', function(req, res) {
  console.log('in /Mouse');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemBrand/Mouse%20Something', function result(callback) {
    res.send(callback);
  });
});

app.get('/Strauss', function(req, res) {
  console.log('in /Strauss');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemBrand/Strauss%20Frock', function result(callback) {
    res.send(callback);
  });
});

app.get('/AdultF', function(req, res) {
  console.log('in /AdultF');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemCat/Adult%20Female', function result(callback) {
    res.send(callback);
  });
});

app.get('/JuvF', function(req, res) {
  console.log('in /JuvF');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemCat/Juvenile%20Female', function result(callback) {
    res.send(callback);
  });
});

app.get('/AdultM', function(req, res) {
  console.log('in /AdultM');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemCat/Adult%20Male', function result(callback) {
    res.send(callback);
  });
});

app.get('/JuvM', function(req, res) {
  console.log('in /JuvM');
  $.getJSON('http://localhost:8080/MetaClothingJava/rest/itemCat/Juvenile%20Male', function result(callback) {
    res.send(callback);
  });
});
//test method
app.get('/hello', function(req, res) {
  res.send('HOLA HELLO META Clothing');
});

app.get('/store', function(req, res) {
  console.log("store");
  console.log(req.signedCookies.cart.length.toString());
  res.render('store', {
    page: storeLib.getStore(),
    session: req.session.user,
    cart: req.signedCookies.cart.length
  });
});

app.get('/brand', function(req, res) {
  console.log("/brand");
  res.render('brand', {
    page: storeLib.getStore(),
    session: req.session.user,
    cart: req.signedCookies.cart.length
  });
});
app.get('/checkout', function(req, res) {
  res.render('checkout', {
    page: checkoutLib.getCheckout(),
    session: req.session.user,
    cart: req.signedCookies.cart.length
  });
});


app.listen(3001, function() {
  console.log("listening on 3001");
});
