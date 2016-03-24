onload=function(){
  getData('/setCookie', setCookie);
  if(document.getElementById('tyke')){
    addBrandEventListeners();
  }else if(document.getElementById('Adult Female')){
    addCategoryEventListeners();
  }
  
}

function setCookie(data){
  console.log("This is in setCookie route, after the readystatechange, Master: " + data);

}
function addBrandEventListeners(){
   document.getElementById("tyke").addEventListener('click', function(e) {
      getData('http://localhost:8080/MetaClothingJava/rest/itemBrand/Tyke', displayItems);
    });

  document.getElementById("babyboo").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemBrand/Baby%20Boo', displayItems);
  });

  document.getElementById("bannanademocracy").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemBrand/Bannana%20Democracy', displayItems);
  });

  document.getElementById("roughrider").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemBrand/Rough%20Rider', displayItems);
  });

  document.getElementById("carterclothing").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemBrand/Carter%20Clothing', displayItems);
  });

  document.getElementById("levimouse").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemBrand/Levi%20Mouse', displayItems);
  });

  document.getElementById("mousesomething").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemBrand/Mouse%20Something', displayItems);
  });

  document.getElementById("straussfrock").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemBrand/Strauss%20Frock', displayItems);
  });

}

function addCategoryEventListeners(){
  document.getElementById("Adult Female").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemCat/Adult%20Female', displayItems);
  });

  document.getElementById("Jr Female").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemCat/Juvenile%20Female', displayItems);
  });

  document.getElementById("Adult Male").addEventListener('click', function(e) {
   getData('http://localhost:8080/MetaClothingJava/rest/itemCat/Adult%20Male', displayItems);
  });

  document.getElementById("Jr Male").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemCat/Juvenile%20Male', displayItems);
  });

  document.getElementById("Adult FemalePrice").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemCatPrice/Adult%20Female', displayItems);
  });

  document.getElementById("Jr FemalePrice").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemCatPrice/Juvenile%20Female', displayItems);
  });

  document.getElementById("Adult MalePrice").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemCatPrice/Adult%20Male', displayItems);
  });

  document.getElementById("Jr MalePrice").addEventListener('click', function(e) {
    getData('http://localhost:8080/MetaClothingJava/rest/itemCatPrice/Juvenile%20Male', displayItems);
  });

}


function displayItems(itemList) {
  console.log("in displayItems");
   var body = document.getElementById("display");
   console.log(body);
   var existingList = document.getElementById("items");
   if (existingList) {
    console.log('in if statement');
     existingList.parentNode.removeChild(existingList);
   }
   var div = document.createElement('table');
   div.setAttribute('id', 'items');
   var trh = document.createElement('tr');
   for(var key in itemList[0]){
      if(key == 'id'){
        continue;
      }
      if(key == 'description'){
        continue;
      }
      var th = document.createElement('th');
      th.innerHTML = key;
      trh.appendChild(th);
   }
   div.appendChild(trh);

  for (var i = 0; i < itemList.length; i++) {
    var tr = document.createElement('tr');
    for(var key in itemList[i]){
      if(key == 'id'){
        continue;
      }
      if(key == 'description'){
        continue;
      }
      var td = document.createElement('td');
      td.innerHTML = itemList[i][key];
      tr.appendChild(td);
    }
    var addCart = document.createElement("div");
    addCart.innerHTML= "Add To Cart";
    addCart.setAttribute('class', 'btn btn-info');
    addCart.setAttribute('role', 'button');
    addCart.id=itemList[i].id;
    tr.appendChild(addCart);
    div.appendChild(tr);
   }
   body.appendChild(div);
 }

