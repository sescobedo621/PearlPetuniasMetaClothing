onload = function() {
  console.log("editAddress loaded");
  getSessionId();
};

function getSessionId() {
  getData('getSessionId', getUser);
};

function getUser(data) {
  console.log(data);
  var obj = {id: data};
  console.log(obj);
  // var url = 'http://localhost:8080/MetaClothingJava/rest/userId/' + data;
  verbData('POST', 'getUserId', editAddress, obj);
};

function editAddress(user) {
  console.log(user.addresses[0]);

  var form = document.getElementById("editForm");
  var div = document.createElement("div");
  div.setAttribute("class", "form-group");
  var streetAddress = document.createElement("input");
  streetAddress.setAttribute("class", "form-control form");
  streetAddress.type = "text";
  streetAddress.name = "newStreet0"
  streetAddress.value = user.addresses[0].streetAddress;
  streetAddress.placeholder = "Street Address";
  div.appendChild(streetAddress)
  form.appendChild(div);

  var div2 = document.createElement('div');
  div2.setAttribute('class', 'form-group');
  var city = document.createElement("input");
  city.setAttribute("class", "form-control form");
  city.type = "text";
  city.name = "newCity0";
  city.value = user.addresses[0].city;
  city.placeholder = "City";
  div2.appendChild(city);
  form.appendChild(div2);

  var div3 = document.createElement('div');
  div.setAttribute('class', 'form-group');
  var state = document.createElement("input");
  state.setAttribute("class", "form-control form");
  state.type = "text";
  state.name = "newState0";
  state.value = user.addresses[0].stateAbbrev;
  state.placeholder = "State Abbrev";
  div3.appendChild(state);
  form.appendChild(div3);

  var div4 = document.createElement('div');
  div4.setAttribute('class', 'form-group');
  var zip = document.createElement("input");
  zip.setAttribute("class", "form-control form");
  zip.type = "text";
  zip.name = "newZip0";
  zip.value = user.addresses[0].zipcode;
  zip.placeholder = "Zipcode";
  div4.appendChild(zip);
  form.appendChild(zip);

  console.log(user.addresses.length);
  var div5 = document.createElement("div");
  div5.setAttribute('class', 'form-group');
  var submit = document.createElement("button");
  submit.setAttribute("id", "submit");
  submit.setAttribute("class", "btn btn-info")
  var t = document.createTextNode("Update Address");
  submit.appendChild(t);
  div5.appendChild(submit);
  form.appendChild(div5);
  // var shipping = document.getElementById("shipping");
  // shipping.innerHTML = "Shipping Address: ";
  // shipping.insertBefore(form, document.getElementById("editForm"));

  if(user.addresses.length === 1){
    var check = document.getElementById("check");
    var isBilling = document.createElement("input");
    isBilling.setAttribute("type", "checkbox");
    isBilling.checked = true;
    check.innerHTML = "Same as Billing?";
    check.appendChild(isBilling);


    isBilling.addEventListener('click', function(e){
        billingDom();
        isBilling = false;
    });
  }else {
    console.log(user.addresses[1]);
    var editDiv = document.getElementById("edit");
    var form1 = document.getElementById("editForm");
    // var form1 = document.editForm;
    var div1 = document.createElement('div');
    div1.setAttribute('class', 'form-group');
    var streetAddress = document.createElement("input");
    streetAddress.setAttribute("class", "form-control form");
    streetAddress.type = "text";
    streetAddress.name = "newStreet1"
    streetAddress.value = user.addresses[1].streetAddress;
    div1.appendChild(streetAddress);
    editDiv.appendChild(div1);

    var div02 = document.createElement('div');
    div02.setAttribute('class', 'form-group');
    var city = document.createElement("input");
    city.setAttribute("class", "form-control form");
    city.type = "text";
    city.name = "newCity1";
    city.value = user.addresses[1].city;
    div02.appendChild(city);
    editDiv.appendChild(div02);

    var div03 = document.createElement('div');
    div03.setAttribute('class', 'form-group');
    var state = document.createElement("input");
    state.setAttribute("class", "form-control form");
    state.type = "text";
    state.name = "newState1";
    state.value = user.addresses[1].stateAbbrev;
    div03.appendChild(state);
    editDiv.appendChild(div03);

    var div04 = document.createElement('div');
    div03.setAttribute('class', 'form-group');
    var zip = document.createElement("input");
    zip.setAttribute("class", "form-control form");
    zip.type = "text";
    zip.name = "newZip1";
    zip.value = user.addresses[1].zipcode;
    div04.appendChild(zip);
    editDiv.appendChild(div04);
    // form.insertBefore(editDiv, document.getElementById("submit"));
  }

  submit.addEventListener("click", function(e) {
    e.preventDefault();
    var address0 = {
      id: user.addresses[0].id,
      streetAddress: document.editForm.newStreet0.value,
      city: document.editForm.newCity0.value,
      stateAbbrev: document.editForm.newState0.value,
      zipcode: document.editForm.newZip0.value,
      isBilling: true,
      isShipping: true
    };
    if(user.addresses.length == 2) {
      address01 = {
        id: user.addresses[0].id,
        streetAddress: document.editForm.newStreet0.value,
        city: document.editForm.newCity0.value,
        stateAbbrev: document.editForm.newState0.value,
        zipcode: document.editForm.newZip0.value,
        isBilling: false,
        isShipping: true
      };
    var address1 = {
        id: user.addresses[1].id,
        streetAddress: document.editForm.newStreet1.value,
        city: document.editForm.newCity1.value,
        stateAbbrev: document.editForm.newState1.value,
        zipcode: document.editForm.newZip1.value,
        isBilling: true,
        isShipping: false
    }; user.addresses = [address01, address1];
      console.log(user.addresses[0]);
      console.log(user.addresses[1]);
  }else if(!isBilling) {
      address02 = {
      id: user.addresses[0].id,
      streetAddress: document.editForm.newStreet0.value,
      city: document.editForm.newCity0.value,
      stateAbbrev: document.editForm.newState0.value,
      zipcode: document.editForm.newZip0.value,
      isBilling: false,
      isShipping: true
    };
    var addressNew = {
      streetAddress: document.editForm.billingStreet.value,
      city: document.editForm.billingCity.value,
      stateAbbrev: document.editForm.billingState.value,
      zipcode: document.editForm.billingZipcode.value,
      isBilling: true,
      isShipping: false
    }; user.addresses = [address02, addressNew];
    console.log(user.addresses[0]);
    console.log(user.addresses[1]);
  }else {
    user.addresses = [address0];
    console.log(user.addresses[0]);
  }
  
    verbData('POST','editUserAddress', displayUser, user);
  });
};

function billingDom() {
  console.log("in billingDom");

  var editDiv = document.getElementById("edit");
  var form = document.getElementById("editForm");
  // var form = document.editForm;
  var div1 = document.createElement('div');
  div1.setAttribute('class', 'form-group');
  var streetAddress = document.createElement("input");
  streetAddress.setAttribute("class", "form-control form");
  streetAddress.type = "text";
  streetAddress.name = "billingStreet";
  streetAddress.placeholder = "Billing Address";
  div1.appendChild(streetAddress);
  editDiv.appendChild(div1);

  var div2 = document.createElement('div');
  div2.setAttribute('class', 'form-group');
  var city = document.createElement("input");
  city.setAttribute("class", "form-control form");
  city.type = "text";
  city.name = "billingCity";
  city.placeholder = "Billing City";
  div2.appendChild(city);
  editDiv.appendChild(div2);

  var div3 = document.createElement('div');
  div3.setAttribute('class', 'form-group');
  var state = document.createElement("input");
  state.setAttribute("class", "form-control form");
  state.type = "text";
  state.name = "billingState";
  state.placeholder = "Billing State";
  editDiv.appendChild(state);

  var div4 = document.createElement('div');
  div4.setAttribute('class', 'form-group');
  var zip = document.createElement("input");
  zip.setAttribute("class", "form-control form");
  zip.type = "text";
  zip.name = "billingZipcode";
  zip.placeholder = "Billing Zipcode";
  editDiv.appendChild(zip);
  // form.insertBefore(editDiv, document.getElementById("submit"));
}

function displayUser(data) {
  console.log(data);
  var message = document.getElementById("message");
  message.innerHTML = "Update Complete";
}
