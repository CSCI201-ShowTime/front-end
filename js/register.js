let validFname = false;
let validLname = false;
let validEmail = false;
let validPassword = false;
let validConfirmPassword = false;
document.querySelector("form").onsubmit = function(event) {
	event.preventDefault();
	console.log("submit");
}

// validation of first name
document.querySelector("#fname").onchange = function() {
	let fname = this.value.trim();
	this.value = fname;
	if (fname.length == 0) {
		document.querySelector("#fname-error").style.display = "inline";
		this.classList.add("is-invalid");
		validFname = false;
	} else {
		document.querySelector("#fname-error").style.display = "none";
		this.classList.remove("is-invalid");
		validFname = true;
	}
}

// validation of last name
document.querySelector("#lname").onchange = function() {
	let lname = this.value.trim();
	this.value = lname;
	if (lname.length == 0) {
		document.querySelector("#lname-error").style.display = "inline";
		this.classList.add("is-invalid");
		validLname = false;
	} else {
		document.querySelector("#lname-error").style.display = "none";
		this.classList.remove("is-invalid");
		validLname = true;
	}
}

// validation of email
document.querySelector("#email").onchange = function() {
	let email = this.value.trim();
	this.value = "";
	this.value = email;
}
document.querySelector("#email").oninput = function() {
	let email = this.value.trim();
	if (!validateEmail(email)) {
		document.querySelector("#email-error").style.display = "inline";
		this.classList.add("is-invalid");
		validEmail = false;
	} else {
		document.querySelector("#email-error").style.display = "none";
		this.classList.remove("is-invalid");
		validEmail = true;
	}
}

// validation of password
document.querySelector("#password").oninput = function() {
	let password = this.value;
	let errorMessage = validatePassword(password);
	if ( errorMessage != "true" ) {
		document.querySelector("#password-error").innerHTML = errorMessage;
		document.querySelector("#password-error").style.display = "inline";
		this.classList.add("is-invalid");
		validPassword = false;
	} else {
		if (password.length < 8) {
			document.querySelector("#password-error").innerHTML = "Minimum length: 8!";
			document.querySelector("#password-error").style.display = "inline";
			this.classList.add("is-invalid");
			validPassword = false;
		} else {
			document.querySelector("#password-error").style.display = "none";
			this.classList.remove("is-invalid");
			document.querySelector("#password-note").style.display = "none";
			validPassword = true;
		}
	}
}

// validation of confirm password
document.querySelector("#confirmPassword").oninput = function() {
	if (this.value != document.querySelector("#password").value) {
		document.querySelector("#confirmPassword-error").style.display = "inline";
		this.classList.add("is-invalid");
		validConfirmPassword = false;
	} else {
		document.querySelector("#confirmPassword-error").style.display = "none";
		this.classList.remove("is-invalid");
		validConfirmPassword = true;
	}
}

// validating email function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// validate password and return error message
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
    				return "true";
    			}
    		} else {
    			return "Must contain an number!";
    		}
		} else {
			return "Must contain an uppercase letter!";
		}
	} else {
		return "Must contain a lowercase letter!";
	}
}