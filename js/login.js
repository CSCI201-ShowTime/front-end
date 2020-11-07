document.querySelector("form").onsubmit = function(event) {
	event.preventDefault();
	let email = document.querySelector("#email").value;
	let password = document.querySelector("#password").value;
	if (email.indexOf(" ") >= 0) {
		document.querySelector(".error").innerHTML = "You can't have whitespace in email!";
		document.querySelector(".error").style.display = "block";
	} else if (password.length < 8) {
		document.querySelector(".error").innerHTML = "Length of password should be at least 8!";
		document.querySelector(".error").style.display = "block";
	} else {
		document.querySelector(".error").innerHTML = "";
		document.querySelector(".error").style.display = "none";
		let email = $("#email").val();
		let password = $("#password").val();
		$.ajax({
			method: "GET",
			url: "http://localhost:8080/api/auth",
			data: {
	    		email: email,
	    		password: password
			}
		})
		.done(function(results) {
			

		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			if (jqXHR.status == 401) {
				alert( "Unmatched email and password!" );
			} else {
				console.log("error!");
			}
		});
	}
}