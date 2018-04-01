function printMe() {
	var xhttpr = new XMLHttpRequest();
	xhttpr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("printMe").innerHTML = this.responseText;
		}
		// (this.readyState == 4 && this.status == 200) ? document.getElementById("printMe").innerHTML = this.responseText; : console.log("an error has occured");
	};
	xhttpr.open("GET", "./misc/stuff.txt", true);
	xhttpr.send();
}
