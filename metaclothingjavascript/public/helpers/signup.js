onload = function() {
    console.log("signup loaded");
    var isEmployee = document.getElementById("isEmployee").checked;
    var isBilling = document.getElementById("isBilling").checked;
    var billing = document.getElementById('isBilling');
    var isShipping = true;

    billing.addEventListener('click', function(e){
     // e.preventDefault();
        billingDOM();
        billing.checked = false;
        isBilling = false;
    });


    document.getElementById("submit").addEventListener('click', function(e) {
        e.preventDefault();
        var address = {
          streetAddress: document.signupForm.streetAddress.value,
          city: document.signupForm.city.value,
          stateAbbrev: document.signupForm.stateAbbrev.value,
          zipcode: document.signupForm.zipcode.value,
          isBilling: isBilling,
          isShipping: true
        };
        var user = {
          name: document.signupForm.name.value,
          email: document.signupForm.email.value,
          password: document.signupForm.password.value,
          employee: isEmployee,

        };

        if(!isBilling){
          var address2 = {
            streetAddress: document.signupForm.billingStreet.value,
            city: document.signupForm.billingCity.value,
            stateAbbrev: document.signupForm.billingState.value,
            zipcode: document.signupForm.billingZipcode.value,
            isBilling: true,
            isShipping: false
          };
          user.addresses = [address, address2];
        }
        else{
          user.addresses = [address];
        }
        console.log(user);
        verbData('POST', 'newSignup', createSession, user, emailValidation);

      });
    }
function billingDOM(){
  var billingDiv = document.getElementById("billing");
  var form = document.signupForm;
  var streetAddress = document.createElement("input");
  streetAddress.type = "text";
  streetAddress.name = "billingStreet";
  streetAddress.placeholder = "Billing Address";

  billingDiv.appendChild(streetAddress);

  var city = document.createElement("input");
  city.type = "text";
  city.name = "billingCity";
  city.placeholder = "Billing City";

  billingDiv.appendChild(city);

  var state = document.createElement("input");
  state.type = "text";
  state.name = "billingState";
  state.placeholder = "Billing State";

  billingDiv.appendChild(state);

  var zip = document.createElement("input");
  zip.type = "text";
  zip.name = "billingZipcode";
  zip.placeholder = "Billing Zipcode";

  billingDiv.appendChild(zip);
  form.insertBefore(billingDiv, document.getElementById("submit"));

}
function emailValidation(){
  console.log("in emailValidation");
  var form = document.getElementById("signupForm");
  var email = document.createElement("p");
  email.setAttribute("class", "invalid");
  email.innerHTML = "this email already has an account";
  form.insertBefore(email, document.getElementById("password"));

  // var name = document.signupForm.name;
  // if(nameValidation(name)){
  //   console.log("name validation working");
  // }
}
