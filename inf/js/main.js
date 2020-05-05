var backgroundMusic = new Audio('sounds/bg.mp3');
backgroundMusic.loop = true;
backgroundMusic.play();
// var soundOn = parseInt(sessionStorage.getItem('music'));
// console.log("soundOn = ", soundOn);
// if (!soundOn) {
// var check = document.getElementById("checkBox1");
// check.checked = false;
// }else{
//	
// }

animate($("#app1"), "slideInUp");
function onCheckBox(elem) {

	if (elem.checked) {
		backgroundMusic.pause();
		// sessionStorage.setItem('music', 0);
	} else {
		backgroundMusic.play();
		// sessionStorage.setItem('music', 1);
	}
}
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
eventer(messageEvent, function(e) {
	console.log('parent received message!:  ', e.data);
	backgroundMusic.volume = parseFloat(e.data);
}, false);