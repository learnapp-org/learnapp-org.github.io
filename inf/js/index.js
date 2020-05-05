var audioEffect = 0;
var soundFolder = "sounds/";
var soundMush = "ukus.mp3";
var soundMakaka = "makaka.mp3";
var soundFrog = "frog.mp3";
var soundShrub = "shrub.mp3";
var soundTabletFinded = "tablet_finded.mp3";

var backgroundMusic = new Audio('sounds/bg_intro.mp3');
backgroundMusic.loop = true;
backgroundMusic.play(); 

function onClickMush(elem) {
	playEffect(soundMush);
	console.log("ONCLICK mush ");
	var shape = document.getElementById("shape");
	console.log("", shape);
	var background = document.getElementById("background");
	shape.classList.add("shape2");
	background.classList.add("background2");
	setTimeout(function() {
		shape.classList.remove("shape2");
		background.classList.remove("background2");
	}, 3500);
}

function onClickShrub(elem) {
	//        if(elem.id="shrub1"){
	////            FIND TABLET 
	//        }else{
	//        }
	playEffect(soundShrub);
	animate(elem, "fadeOut");
	setTimeout(function() {

		elem.style.visibility = "hidden";
	}, 1000);
}

function onClickMakaka(elem) {
	animate(elem, "swing");
	playEffect(soundMakaka);
}

function onClickTablet(elem) {
	animate(elem, "flip");
	playEffect(soundTabletFinded);
	setTimeout(function() {
		window.location.href = "main.html";
	}, 1500);
}

function onClickFrog(elem) {
	animate(elem, "slideInDown");
	playEffect(soundFrog);
}
function playEffect(soundName) {
    audioEffect = new Audio(soundFolder + soundName);
	audioEffect.play();
backgroundMusic.pause();
        console.log("on started");
    audioEffect.onended = function(){
backgroundMusic.play();
        console.log("on ended");
    };
}