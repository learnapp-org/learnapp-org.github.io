var load = document.createElement("div");
load.id = "load-screen";
load.style = "position:fixed; z-index:9999; top:0; right:0; width:100%; height:100%;";
var bg = document.createElement("div");
bg.style = "position:absolute; top:0; right:0; width:100%; height:100%; background:#000; opacity:1;";
var loader = document.createElement("div");
loader.style = "position: absolute;	left: 50%;	top: 50%;	width: 150px;	height: 150px;	background-image: url(css/loader.gif);	background-repeat: no-repeat;	background-position: center; background-size: contain; margin:-75px 0 0 -75px;";
load.appendChild(bg);
load.appendChild(loader);
document.body.insertBefore(load, document.body.firstChild);
window.addEventListener("load", function() {
	       var loadScreen = document.getElementById("load-screen");
			document.body.removeChild(loadScreen);
            console.log("loaded");
});
document.onselectstart = noselect;
document.oncontextmenu = noselect;
function noselect() {
	return false;
};