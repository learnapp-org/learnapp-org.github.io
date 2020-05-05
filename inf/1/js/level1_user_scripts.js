var progress = 0;
var count;
var correct = 0;
var soundFolder = "sounds/";
var soundCorrect = "correct1.mp3";
var soundWrong = "error1.mp3";
var data;
var randsQuest;
var arr;
var idButtons = [];

function suspendBgMusic(audio){
	console.log("postMessage to ",parent);
	parent.postMessage("0.1","*");		
		audio.onended = function(){		
			console.log("postMessage to ",parent);
			parent.postMessage("1","*");
	};
}

function initData(_data, quantityVariants, quantityQuestions) {
	count = quantityQuestions;
	data = _data;
	arr = generateIds(1, quantityVariants);
	randsQuest = generateIds(0, data.length - 1);
	shuffle(randsQuest);
	var str = "";
	for (var i = 0; i < quantityVariants; i++) {
		var idBtn = "btn" + (i + 1);
		str += "<button class='mbutton transition-button' id='" + idBtn
				+ "' onclick='onClickVariant(this)'></button><br/>";
		idButtons.push("#" + idBtn);
	}
	document.getElementById("container-variants").innerHTML = str;
	quantityChange(progress + 1);
	changeData();
}
var helpers;
function setHelpers(_helpers){
	helpers = _helpers;
}

function generateIds(from, to) {
	var length = to - from + 1;
	var array = Array(length);
	var k = 0;
	for (var i = from; i <= to; i++) {
		array[k++] = i;
	}
	shuffle(array);
	return array;
}
function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}

function quantityChange(progress) {
	var counter = document.getElementById("counter");
	counter.innerHTML = progress + "/" + count;
}



function changeData() {
	if (progress >= randsQuest.length) {
		return;
	}
	shuffle(arr);
	animateBunceInDown($(".question"));
	$(".question").text(data[randsQuest[progress]][0]);
	for (var i = 0; i < idButtons.length; i++) {
		$(idButtons[i]).text(data[randsQuest[progress]][arr[i]]);
	}

	var elements = document.getElementsByClassName("mbutton");
	for (var i = 0; i < elements.length; i++) {
		elements[i].style.backgroundImage = 'url(images/card_green.png)';
		elements[i].style.background = "";
		elements[i].disabled = false;
	}
}

function onClickVariant(elem) {
	console.log("onClickVariant ", elem);
	var keyWrong = true;
	var audio = 0;
	if (elem.innerHTML == data[randsQuest[progress]][1]) {
		elem.style.backgroundImage = 'url(images/card_yellow.png)';
		animateBunceIn(elem);
		audio = new Audio(soundFolder + soundCorrect);
		correct++;
		keyWrong=false;
	} else {
		//elem.style.backgroundImage = 'url(images/bg_red2.png)';
		animateShake(elem);
		audio = new Audio(soundFolder + soundWrong);
	}
	if (audio != 0){
		audio.play();
		suspendBgMusic(audio);
	}
	var elements = document.getElementsByClassName("mbutton");
	for (var i = 0; i < elements.length; i++) {
		elements[i].disabled = true;
	}
	setTimeout(function() {
		if(keyWrong && progress < count-1) showHelper(helpers[randsQuest[progress]]);
		next();
	}, 500);
}

function next() {
	progress++;
	if (progress >= count) {
		// GAME OVER
        var res = correct / count * 100;
//        sessionStorage.setItem('res1', res);
		showResult(res,timeForTaskInSeconds,seconds);
        $('#timerBG').polartimer('pause');
		console.log("GAME OVER");
		progress--;
		return;
	}
	quantityChange(progress + 1);

	$("#container-variants").delay(200).animate({
		'opacity' : '0'
	}, 100, function() {
		changeData();
	});
	$("#container-variants").delay(300).animate({
		'opacity' : '1'
	}, 600, null);

}

//function showResult() {
//	var res = correct / count * 100;
//	console.log("res = " + res);
//	var time = document.getElementById('timerDigits').innerHTML;
//	window.location.href = "result.html?" + res + "&" + time;
//}

function showHelper(helperText) {
	if(!helperText) return;
    $(".uib_w_13").modal("toggle");
    $(".text-helper").text(helperText);
}