function getData(url, callback, validation) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url);

  xhr.onreadystatechange = function() {
    if (xhr.status < 400 && xhr.readyState == 4) {
      if(xhr.responseText){
        callback(JSON.parse(xhr.responseText));
        console.log(JSON.parse(xhr.responseText));
      }else{
      if(validation){
        validation();
      }
    }

    }else if(xhr.status == 500){
        window.location.href = '/login';
     }
  };

  xhr.send(null);
}

function verbData(method, url, callback, obj, validation) {
  var xhr = new XMLHttpRequest();

  xhr.open(method, url);
  if (obj) {
    xhr.setRequestHeader('Content-Type', 'application/json');

    // xhr.setRequestHeader('Accept', 'application/json');
  }
  xhr.onreadystatechange = function() {
    if (xhr.status < 400 && xhr.readyState == 4) {
      if(xhr.responseText){
        if (callback) {
          callback(JSON.parse(xhr.responseText));
        }
      }else{
          if(validation){
             validation();
          }
        }
     }else if(xhr.status > 400){
        window.location.href = '/login';
     }
  };

  if (obj) {
    console.log(JSON.stringify(obj) + "in verbData");
    xhr.send(JSON.stringify(obj));
  } else {
    xhr.send(null);
  }

}


function listUsers(data) {
  console.log(data + "in listUsers");

}
function getSession(data){
  return data;
}
function createSession(data) {
  console.log(data.id + " in CreateSession" + data);
  loginData('POST', '/userLogin', data);
}

function loginData(method, url, object) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);

  if (object) {
    xhr.setRequestHeader('Content-Type', 'application/json');
  }

  xhr.onreadystatechange = function() {
    console.log(object + "line 81 user object");
    if (xhr.readyState == 4 && xhr.status < 400) {
         var user = JSON.parse(xhr.responseText);
          console.log(user.id + "line 84 printing json.parse");

        if(user){
          window.location.href = '/';
        }
    }
  };
  xhr.send(JSON.stringify(object));
}
