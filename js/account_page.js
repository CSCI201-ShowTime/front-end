var isClicked = false;

document.querySelector("#editButton").onclick = function() {
    $("#fname, #lname").attr("readonly", false);
    $("#editButton, #pwdButton").fadeOut("slow", function() {
        $("#save").fadeIn("fast");
    });
}

document.querySelector("#info-form").onsubmit = function(e) {
    e.preventDefault();
    // $("#info-form input, #info-form textarea").attr("readonly", true);

    // AJAX 
    var fname = $.trim($('#fname').val());
    var lname = $.trim($('#lname').val());

  userInfo.fname = fname;
  userInfo.lname = lname;
    if (fname.length != 0 && lname.length != 0) {
      userUpdate(userInfo.fname, userInfo.lname, userInfo.email, userInfo.password).done(doneUserUpdate);
    }
}

$("#password-form").on("click", function(event) {
    event.stopPropagation(); 
});

$("#change-password").on("click", function(event) {
    $(this).fadeOut("slow");
});

$("#pwdButton").on("click", function() {
    $("#change-password").fadeIn("slow");
})

$("#change-password").on("submit", function(event) {
    event.preventDefault();
    let newPass = $("#new").val();
    let confirmPass = $("#confirm").val();
    // Validation
    if (validatePassword(newPass) && newPass == confirmPass) {
      let encodedNewPass = CryptoJS.MD5(newPass + "ShoWTimE").toString();

      // AJAX, requires MD5 hashing
      userUpdate(userInfo.fname, userInfo.lname, userInfo.email, encodedNewPass).done(function(data, textStatus, jqXHR) {
        // fade Out
        $(this).fadeOut('slow', function() {
            $("#confirm").val("");
            $("#new").val("");
        });
      });
    }
});


function validatePassword(password) {
  let lowercaseLetters = /[a-z]/g;
  let uppercaseLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;
  if (password.match(lowercaseLetters)) {
    if (password.match(uppercaseLetters)) {
      if (password.match(numbers)) {
          if (/\s/.test(password)) {
            return "No whitespace allowed!";
          } else {
            return true;
          }
        } else {
          return false;
        }
    } else {
      return false;
    }
  } else {
    return false;
  }
}



// AJAX request to user/PUT
function userUpdate(fname, lname, email, pswrd) {
    return $.ajax({
        method: "PUT",
        url: "/api/user",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            id: userInfo.id,
            fname: fname,
            lname: lname,
            email: email,
            password: pswrd
        })
    });
}

// on success AJAX to user/PUT, ...
function doneUserUpdate(data, textStatus, jqXHR) {
    $('#fname').val(data.fname);
    $('#lname').val(data.lname);
    // $('#email').val(data.email);
    $("#fname, #lname").attr("readonly", true);
    $("#save").fadeOut("slow", function() {
        $("#editButton, #pwdButton").fadeIn("fast");
    });
  userInfo.fname = data.fname;
  userInfo.lname = data.lname;
};

function changeEditButton(){
  enableDisplay("change_profile");
  document.getElementById("fName").value = document.getElementById("name").innerHTML;
  document.getElementById("fEmail").value = document.getElementById("email").innerHTML;
  document.getElementById("fInfo").value = document.getElementById("info").innerHTML;
  document.getElementById("fName").setAttribute("placeholder", document.getElementById("name").innerHTML);
}
// document.getElementById("pwdButton").onclick=function(){
//   enableDisplay("change_password");
//   //"password"
// }

function enableDisplay(str) {
  if(!isClicked){
    document.getElementById(str).style.display = "block";
    isClicked = true;
  }
  else{
    document.getElementById(str).style.display = "none";
    isClicked = false;
  }

}
function alertt(){
  alert("Hoho");
}
function getInnerVal(str){
  return document.getElementById(str).innerHTML();
}

function ajaxGet(endpointUrl, returnFunction){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', endpointUrl, true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState = XMLHttpRequest.DONE){
      if(xhr.status == 200){
        returnFunction(xhr.responseText);
      }
      else{
        alert('AJAX Error');
        console.log(xhr.status);
      }
    }
  }
  xhr.send;
}

const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');

file.addEventListener('change', function(){
    //this refers to file
    const choosedFile = this.files[0];

    if (choosedFile) {

        const reader = new FileReader(); //FileReader is a predefined function of JS

        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);
    }
});
