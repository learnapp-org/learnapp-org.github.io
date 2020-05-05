var loc = window.location.href;
if (loc.indexOf("?") != -1) {
	var app = loc.substr(loc.indexOf("?") + 1, loc.length);
	var iframe = document.getElementById("iframe-applet");
	iframe.src = "1/" + app + ".html";
}