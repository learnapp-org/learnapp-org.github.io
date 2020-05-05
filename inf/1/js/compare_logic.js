/**
 * Created by lion on 19.09.2016.
 */
var variationRadius = 150, variationScale = 3, xlen = 1, ylen = 1, ansArray = [], variationShow = false;
var rands = [];
   $("#my_overlay").hide();
function openVariation(event) {
    
    $("#my_overlay").show();
    
	var event = event || window.event, elem = event.srcElement || event.target;

	if (variationShow) {
		var nodelist1 = document.getElementsByClassName("variationstyle");
		for (var i = 0; i < nodelist1.length; i++) {
			nodelist1[i].style.visibility = "hidden";
			move(nodelist1[i]).translate(0, 0).scale(0).end();
		}

		variationShow = false;
		return;
	}
	variationShow = true;

	var nodelist = document.getElementsByClassName(elem.id + '-variation');

	var listLen = nodelist.length;
	var ugl = 2 * Math.PI / listLen;

	for (var i = 0; i < nodelist.length; i++) {
		var node = nodelist[i].style.visibility = "visible";
		var u = i * ugl;
		var x = variationRadius * Math.cos(u);
		var y = variationRadius * Math.sin(u);
		move(nodelist[i]).translate(x, y).scale(variationScale).end();
	}
}

var oldRes = 0;
function hideVariation(event) {    
    $("#my_overlay").hide();
	var event = event || window.event, elem = event.srcElement || event.target;

    console.log("hideVariation");
	variationShow = false;

	var elemclass = elem.className;
	var image = document.getElementById(elemclass.substr(0, elemclass
			.indexOf('-')));
	var oldsrc = image.innerHTML;
	image.innerHTML = elem.innerHTML;
	if (oldsrc == "?") {
		elem.remove();
	} else {
		elem.innerHTML = oldsrc;
	}

	var nodelist = document.getElementsByClassName(elemclass);
	for (var i = 0; i < nodelist.length; i++) {
		nodelist[i].style.visibility = "hidden";
		move(nodelist[i]).translate(0, 0).scale(0).end();
	}

	var res = getResult();
	$('.progress').asProgress('go', res+'%');
    var audio = 0;
    if(oldRes<res){
        //PROGRESS
        audio = new Audio("sounds/correct1.mp3");
    }else if(oldRes>res){
        //REGRESS
        audio = new Audio("sounds/error1.mp3");
    }
       if(audio!=0) 
       {audio.play();
    	   suspendBgMusic(audio);
       }
	oldRes=res;
	if (checkResult()) {
		setTimeout(function() {
//			sessionStorage.setItem('res5', 100);
            $(".modal-game-over-2").modal("toggle"); 
            var audioGameOver = new Audio("sounds/notify.mp3");
            audioGameOver.play();
            suspendBgMusic(audioGameOver);
		}, 1000);
	}
}

function checkResult() {
	for (var i = 0; i < ylen; ++i) {
		for (var j = 0; j < xlen; ++j) {
			var elemId = "" + j + i;
			if (document.getElementById(elemId) == null)
				continue;
			var imgName = document.getElementById(elemId).innerHTML;
			if (ansArray[i] != imgName)
				return false;
		}
	}
	return true;
}

function getResult(){
	var correct = 0;
	for (var i = 0; i < ylen; ++i)
		for (var j = 0; j < xlen; ++j) {
			var elemId = "" + j + i;
			if (document.getElementById(elemId) == null)
				continue;
			var imgName = document.getElementById(elemId).innerHTML;
			if (ansArray[i] == imgName) correct++;
	}
	console.log("correct = ",correct);
	var res= correct/ansArray.length*100;
	return parseFloat(res);
}

function gameConfig(tbl) {

	ylen = tbl.ylen;
	xlen = tbl.xlen;
	variationRadius = tbl.variationRadius;
	variationScale = tbl.variationScale;
	ansArray = tbl.ansArray;

	var box = document.getElementById("box");
	// table generate
	var table = document.createElement("table"), tbody = document
			.createElement("tbody");
	table.appendChild(tbody);
	var textBefores = tbl.befores;
	var textAfters = tbl.afters;
	for (var i = 0; i < ylen; ++i) {
		var row = document.createElement("tr");
		for (var j = 0; j < xlen; ++j) {
			var cell = document.createElement("td");
			cell.id = i + " " + j;
            switch(j){
                case 0: cell.innerHTML = textBefores[i]; break;
                case 1: cell.classList.add("quest"); break;
                case 2: cell.innerHTML = textAfters[i]; break;
            }
			row.appendChild(cell);
		}
		tbody.appendChild(row);
	}
	if (box.childNodes.length == 1)
		box.removeChild(box.firstChild);
	box.appendChild(table);

	// fill table
	for (var i = 0; i < tbl.ansArray.length; i++) {
		var x = 1;// arr[i].x;
		var y = i;// arr[i].y;
		var imageArr = tbl.images;
		var iaLen = imageArr.length;

		var td = document.getElementById(y + " " + x);
		// image box
		var img = document.createElement("h3");
		var mainImageId = "" + x + y;
		img.id = mainImageId;
		var imageIndex = Math.round((iaLen - 1) * Math.random());
		img.innerHTML = imageArr[0];
		img.setAttribute("style", tbl.style);
		img.onclick = openVariation;
		td.appendChild(img);

		// variation list
		for (var j = 0; j < iaLen; j++) {
			if (j == 0)
				continue;

			var altimg = document.createElement("h3");
			altimg.innerHTML = imageArr[j];
			altimg.classList.add(mainImageId + "-variation");
			altimg.classList.add("variationstyle");
			altimg.onclick = hideVariation;

			td.appendChild(altimg);
		}
	}
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
// GENERATE VALUES
var eq = "=";
var gt = "&gt;";
var lt = "&lt;";
var minBit = 256;
var minByte = 50;
var minKbyte = 1;
var maxBit = 30720;
var maxByte = 20480;
var maxKbyte = 20;
var rangeBit = 128;
var rangeByte = 10;
var rangeKbyte = 0.5;
var compares = [ eq, eq, gt, gt, lt, lt ];
shuffle(compares);
var bit = "бит";
var byte = "байт";
var kbyte = "Кбайт";
var fixed = 3;
var quants = [ bit, byte, kbyte ];
var values1 = [];
var values2 = [];
for (var i = 0; i < compares.length; i++) {
	shuffle(quants);
	generateValues(quants[0], quants[1], compares[i]);
}


function generateValues(keyValue1, keyValue2, compare) {
	var value1 = getValue1(keyValue1);
	var value2 = parseFloat(getValue2(keyValue1, keyValue2, value1));
	if (compare != eq) {
		var range = parseFloat(getRangeValue(keyValue2));		
		switch (compare) {
		case gt:
			value2 = value2 - range;
			break;
		case lt:
			value2 = value2 + range;
			break;
		}
		if(value2.toFixed(3) != value2) value2 = value2.toFixed(3);

	}
	var finalVal1 = value1 + " " + keyValue1;
	var finalVal2 = value2 + " " + keyValue2;
	if (valueExist(values1, finalVal1) && valueExist(values2, finalVal2)) {
		generateValues(keyValue1, keyValue2, compare);
		return;
	}
	values1.push(finalVal1);
	values2.push(finalVal2);
//	console.log("RESULT: " + finalVal1 + " " + compare + " " + finalVal2);
}
function valueExist(array, value) {
	if (array.indexOf(value) != -1)
		return true;
	return false;
}

function getRangeValue(keyValue) {
	switch (keyValue) {
	case bit:
		return getRandom(0, rangeBit, bit);
	case byte:
		return getRandom(0, rangeByte, byte);
	case kbyte:
		return getRandom(0, rangeKbyte, kbyte);
	}
	return 0;
}
function getValue2(keyValue1, keyValue2, value) {
	var res = 0;
	switch (keyValue1) {
	case bit:
		switch (keyValue2) {
		case byte:
			res = bitToByte(value);
			break;
		case kbyte:
			res = bitToKbyte(value);
			break;
		}
		break;
	case byte:
		switch (keyValue2) {
		case bit:
			res = byteToBit(value);
			break;
		case kbyte:
			res = byteToKbyte(value);
			break;
		}
		break;
	case kbyte:
		switch (keyValue2) {
		case bit:
			res = kbyteToBit(value);
			break;
		case byte:
			res = kbyteToByte(value);
			break;
		}
		break;
	}
	return res;
}
function getValue1(keyVal) {	
	switch (keyVal) {
	case bit:
		return getRandom(minBit, maxBit, bit);
	case byte:
		return getRandom(minByte, maxByte, byte);
	case kbyte:
		return getRandom(minKbyte, maxKbyte, kbyte);
	}
}

function getRandom(min, max, val) {
	var rand = Math.random() * (max - min) + min;
	if (val == kbyte && rand > 0 && rand < 1)
		return rand.toFixed(fixed);
	return Math.round(rand);
}

function bitToByte(val) {
	return val / 8;
}
function byteToBit(val) {
	return val * 8;
}
function byteToKbyte(val) {
	var res = val / 1024;
	if (Math.round(res) == res)
		return res;
	return res.toFixed(fixed);
}
function kbyteToByte(val) {
	return val * 1024;
}
function bitToKbyte(val) {
	var res = bitToByte(val);
	res = byteToKbyte(res);
	return res;
}
function kbyteToBit(val) {
	var res = kbyteToByte(val);
	res = byteToBit(res);
	return res;
}

$('.progress').asProgress({
    'namespace': 'progress'
  });

function suspendBgMusic(audio){
	console.log("postMessage to ",parent);
	parent.postMessage("0.1","*");		
		audio.onended = function(){		
			console.log("postMessage to ",parent);
			parent.postMessage("1","*");
	};
}
/*    $('.progress').asProgress('start');
  $('.progress').asProgress('finish');
  $('.progress').asProgress('go', 50);
  $('.progress').asProgress('go', '50%');
$('.progress').asProgress('stop');
$('.progress').asProgress('reset'); */


//function showResult(keyFinish) {
//	if(keyFinish){
//		var time = document.getElementById('times').innerHTML;
//		$(".modal-text-go").text("Оставшееся время: "+time);
//	}else{
//		$(".modal-title-go").text("Время вышло");
//		$(".modal-text-go").text("К сожалению вы проиграли");
//	}
//	
//	$(".modal-game-over").modal("toggle");
//	// var time = document.getElementById('times').innerHTML;
//	// window.location.href = "result.html?" + res + "&" + time;
//}