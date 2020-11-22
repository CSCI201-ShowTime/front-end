var isClicked = false;

document.querySelector("#editButton").onclick = function() {
    $("#info-form input, #info-form textarea").attr("readonly", false);
    $("#editButton, #pwdButton").fadeOut("slow", function() {
        $("#save").fadeIn("fast");
    });
}

document.querySelector("#info-form").onsubmit = function(e) {
    e.preventDefault();
    $("#info-form input, #info-form textarea").attr("readonly", true);
    $("#save").fadeOut("slow", function() {
        $("#editButton, #pwdButton").fadeIn("fast");
    });
    // more ajax processing



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
    let oldPass = $("#old").val();
    let newPass = $("#new").val();
    // Validation


    // ajax

    // fade Out
    $(this).fadeOut('slow', function() {
        $("#old").val("");
        $("#new").val("");
    });
});

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
