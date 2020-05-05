var progress = 0;
var correct = 0;
var soundFolder = "sounds/";
var soundCorrect = "correct1.mp3";
var soundWrong = "error1.mp3";
var data;
var arr;
var idButtons = [];
var answers = [];
animateBunceInDown($("#task-description"))
function initData(keyAddAttr, _data, _answers) {
	data = _data;
	answers = _answers;
	var firstRows = 0;
	var str = "<div class='table-skip'><div class='col-xs-1'></div><table class='col-xs-10'>";
	if (keyAddAttr) {
		str += "<tr>";
		for (var i = 0; i < data[firstRows].length; i++) {
			str += "<td><label>" + data[firstRows][i] + "</label></td>";
		}
		str += "</tr>";
		firstRows++;
	}
	for (var i = firstRows; i < data.length; i++) {
		str += "<tr>";
		for (var j = 0; j < data[firstRows].length; j++) {
			var id = "input" + (i + 1) + "" + (j + 1);
			if (data[i][j]) {
				// DISABLED
				str += "<td><input type='text' value='" + data[i][j]
						+ "' disabled></td>";
			} else {
				// EDITED
				if (j == 3) {
					str += "<td><div class='mtooltip'><input id='"
							+ id
							+ "' type='text'><span class='tooltiptext'>Пример: 0,0...</span></div></td>";
				} else {
					str += "<td><input id='" + id + "' type='text'></td>";
				}

				idButtons.push("#" + id);
			}

		}
		str += "</tr>";
	}
	str += "</table><div class='col-xs-1'></div>";
	document.getElementById("container-table-skip").innerHTML = str;
}

function suspendBgMusic(audio) {
	console.log("postMessage to ", parent);
	parent.postMessage("0.1", "*");
	audio.onended = function() {
		console.log("postMessage to ", parent);
		parent.postMessage("1", "*");
	};
}

function check() {
	var audio = 0;
	var keyCorrect = true;
	for (var i = 0; i < idButtons.length; i++) {
		if ($(idButtons[i])[0].value == answers[i]) {
			$(idButtons[i])[0].classList.add("input-correct");
		} else {
			$(idButtons[i])[0].classList.add("input-wrong");
			animateShake($(idButtons[i])[0]);
			keyCorrect = false;
		}
	}
	if (keyCorrect) {
		// CORRECT
		audio = new Audio(soundFolder + soundCorrect);
		setTimeout(function() {
			$(".modal-game-over-2").modal("toggle");
			var audioGameOver = new Audio("sounds/notify.mp3");
			audioGameOver.play();
			suspendBgMusic(audioGameOver);
//			sessionStorage.setItem('res2', 100);
		}, 1000);

	} else {
		// WRONG
		audio = new Audio(soundFolder + soundWrong);
	}

	if (audio != 0) {
		audio.play();
		suspendBgMusic(audio);
	}
}
function reset() {
	console.log("reset");
	for (var i = 0; i < idButtons.length; i++) {
		$(idButtons[i])[0].value = "";
		$(idButtons[i])[0].classList.remove("input-correct");
		$(idButtons[i])[0].classList.remove("input-wrong");
	}
}

//function showResult() {
//	var res = correct / count * 100;
//	console.log("res = " + res);
//	
//	// var time = document.getElementById('times').innerHTML;
//	// window.location.href = "result.html?" + res + "&" + time;
//}

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

function showInfo() {
	$(".modal-info").modal("toggle");
}