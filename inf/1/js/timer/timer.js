var seconds = 0;
var timeForTaskInSeconds;
var audioTimeOver = new Audio('sounds/notify.mp3');
function timeOver() {
	$(".modal-time-over").modal("toggle");
    
    var dialogHelper = $(".uib_w_13");
    if(dialogHelper) dialogHelper.modal("hide");
            audioTimeOver.play();
}
function setTime(timeInSeconds, withDigits) {
	timeForTaskInSeconds = timeInSeconds;
	// create the timer
	$('#timerBG').polartimer({
		timerSeconds : timeInSeconds,
		color : '#112f34',
		opacity : 1,
		callback : function() {
			timeOver();
		}
	});
	// start the timer
	$('#timerBG').polartimer('start');
	if (withDigits) {
		startTime();
	}
}

function startTime() {
	seconds++;
	var seconds2 = timeForTaskInSeconds - seconds;
	if (seconds2 < 0) {
		return;
	}
	var m = Math.trunc(seconds2 / 60);
	var s = seconds2 % 60;
	m = FullTime(m);
	s = FullTime(s);
	document.getElementById('timerDigits').innerHTML = m + ":" + s;
	t = setTimeout('startTime()', 1000);
}

function FullTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}
function stopTime(){
     $('#timerBG').polartimer('pause');
        seconds = timeForTaskInSeconds;
}