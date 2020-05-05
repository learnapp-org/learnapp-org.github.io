//Anim
function animateBunceIn(img) {
	$(img).addClass("animated");
	$(img).addClass("bounceIn");

	setTimeout(function() {
		$(img).removeClass("animated");
		$(img).removeClass("bounceIn");
	}, 1000);
}

function animateBunceOut(img) {
	$(img).addClass("animated");
	$(img).addClass("bounceOutRight");

	setTimeout(function() {
		$(img).removeClass("animated");
		$(img).removeClass("bounceOutRight");
	}, 1000);

	setTimeout(function() {
		//img.style.visibility = "hidden";
		img.parentNode.removeChild(img);
	}, 1000);
}

function animateBunceInLeft(img) {
	//img.style.visibility = "visible";

	$(img).addClass("animated");
	$(img).addClass("bounceInLeft");

	setTimeout(function() {
		$(img).removeClass("animated");
		$(img).removeClass("bounceInLeft");
	}, 1000);
}

function animateBunceInDown(img) {
	// img.style.visibility = "visible";

	$(img).addClass("animated");
	$(img).addClass("bounceInDown");

	setTimeout(function() {
		$(img).removeClass("animated");
		$(img).removeClass("bounceInDown");
	}, 1000);
}

function animateShake(img) {
	$(img).addClass("animated");
	$(img).addClass("shake");

	setTimeout(function() {
		$(img).removeClass("animated");
		$(img).removeClass("shake");
	}, 1000);
}

function animateFlipInX(img) {
	$(img).addClass("animated");
	$(img).addClass("flipInX");

	setTimeout(function() {
		$(img).removeClass("animated");
		$(img).removeClass("flipInX");
	}, 1000);
}

function animate(img,name) {
	$(img).addClass("animated");
	$(img).addClass(name);

	setTimeout(function() {
		$(img).removeClass("animated");
		$(img).removeClass(name);
	}, 1000);
}