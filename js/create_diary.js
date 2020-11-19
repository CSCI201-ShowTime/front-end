document.querySelector("form").onsubmit = function(e) {
	e.preventDefault();
	let title = document.querySelector("#title").value.trim();
	let date = new Date(document.querySelector("#date").value);
	let content = document.querySelector("#content").value;
	if (title.length == 0) {
		document.querySelector("#title + .error").style.display = "block";
	} else {
		document.querySelector("#title + .error").style.display = "none";
	}
	if (isNaN(date.getTime())) {
		document.querySelector("#date + .error").style.display = "block";
	} else {
		document.querySelector("#date + .error").style.display = "none";
	}
	if (content.length == 0) {
		confirm("Are you sure you want to create an empty diary?");
	}
	
	$.get("/api/userid", {}, function(data){
  		$.ajax({
		method: "POST",
		url: "/api/event/diary",
		// Fixed: contentType must be explicitly defined if submitted as a form
		// form auto-submits as "application/x-www-form-urlencoded"
		contentType: "application/json",
		// Fixed: for JSON, data must be explicitly parsed
		data: JSON.stringify({
//			eventid: ,
    		userid: data,
    		start: date,
			end: date,
    		title: title,
			description: content,
			visibility: 1,
			type: "diary",
			location: "Los Angeles"
		})
		})
		.done(function( data, textStatus, jqXHR ) {
			// on success logic, redirect?			
			window.location.href = "/timeline";
		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			alert("Or here");
			if (jqXHR.status == 401) {
				alert( "Unmatched email and password!" );
			} else {
				console.log("error!");
			}
		});
	});
}

document.querySelector("#title").onchange = function() {
	let title = document.querySelector("#title").value.trim();
	if (title.length != 0) {
		document.querySelector("#title + .error").style.display = "none";
	}
	document.querySelector("#title").value = title;
}

document.querySelector("#date").onchange = function() {
	let date = new Date(document.querySelector("#date").value);
	if (isNaN(date.getTime())) {
		document.querySelector("#date + .error").style.display = "block";
	} else {
		document.querySelector("#date + .error").style.display = "none";
	}
}