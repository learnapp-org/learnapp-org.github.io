var answers = [];
var values = [341,195,195];
var maxSize = 2048;
var randRanges = [6,256];
var soundFolder = "sounds/";
var soundCorrect = "correct1.mp3";
var soundWrong = "error1.mp3";
var progress=0;var maxProgress=3;
var mb = "Мб";

initData();

function suspendBgMusic(audio){
	console.log("postMessage to ",parent);
	parent.postMessage("0.1","*");		
		audio.onended = function(){		
			console.log("postMessage to ",parent);
			parent.postMessage("1","*");
	};
}
animateBunceInLeft($(".mytable1"));
animateBunceInDown($("#question-description"));
function initData(data){
	var vals = document.getElementsByClassName("vals");
for(var i=0;i<maxProgress;i++){
    answers[i] = getRandom(randRanges[0],randRanges[1]);
    values[i] = parseInt(maxSize/answers[i]);
    $("#lab"+(i+1)).text(answers[i]+" "+mb);
    vals[i].innerHTML = answers[i]+" "+mb;
}
}
/*var pos = 0;
    var textView = document.getElementById("question-description");
var text = "Асель занимается танцами. Для" +
		" самостоятельных занятий ей нужно записать несколько музыкальных" +
		" мелодий на мобильный телефон. Как помочь Асель, если известно, что на " +
		"мобильном телефоне свободно 2 Гб памяти? Сколько файлов можно " +
		"записать, если каждый музыкальный файл имеет объем 6 Мб; 10,5 Мб?";
fadeText();
function fadeText(){
textView.innerHTML = "";
    for (var i = 0; i < text.length; i++) {
        setTimeout('appendText('+i+')', i*50);
	}
//	console.log(str);    
}

function appendText(){
    textView.innerHTML += text.charAt(pos++);
}*/

function getRandom(min, max) {
    var res = Math.random() * (max - min) + min;
      res = parseInt(res*10);
    res = parseFloat(res/10);
  return res;
}

console.log("getRandom = ",getRandom(6,256));

function check(elem,id){
	var input = 0;    
	if(id==0){
		input = document.getElementById("answer1"); 
	}else if(id==1){
		input = document.getElementById("answer2"); 		
	}else if(id==2){
		input = document.getElementById("answer3"); 		
	}
if(input){
	var value = parseInt(input.value);
    console.log("value = ",value);

    var audio = 0;
    if(value==values[id]){
       //CORRECT
        audio = new Audio(soundFolder+soundCorrect);
        elem.style.visibility="hidden";
        input.disabled = true;

        animateBunceIn(input);
        progress++;
        if(progress==maxProgress){
//            GAME OVER
            setTimeout(function() {

//    			sessionStorage.setItem('res4', 100);
            $(".modal-game-over-2").modal("toggle"); 
            var audioGameOver = new Audio("sounds/notify.mp3");
            audioGameOver.play();
            suspendBgMusic(audioGameOver);
		}, 1000);
        }
    }else{
        //WRONG
        audio = new Audio(soundFolder+soundWrong);
        animateShake(input);
    }
    
    if(audio!=0){
    	audio.play();
        suspendBgMusic(audio);
    } 
}

}

function showInfo(){
 	$(".modal-info").modal("toggle");
 	 var audioGameOver = new Audio("sounds/notify.mp3");
     audioGameOver.play();
     suspendBgMusic(audioGameOver);
}

//function disableDiv(divId){
//		// This will disable everything contained in the div
//		$("#" + divId).addClass("disabledDiv");
//	}
//
//	function enableDivs(){
//		// This will disable everything contained in the div
//		var divsToEnable = ['imageWithDescriptionContainer1', 'imageWithDescriptionContainer2'];
//	
//		var i;
//		for(i = 0; i < divsToEnable.length; i++){
//			$("#" + divsToEnable[i]).removeClass("disabledDiv");	//enable touch
//			document.getElementById(divsToEnable[i]).style.opacity = 1.0;
//		}
//	}
//
//
//	function startAgainPressed(){
//		enableDivs();	//enable the previously disabled divs with - and + buttons
//
//		document.getElementById('filesCounter').innerHTML = 0;	//zero out the files counter
//		document.getElementById("demo").innerHTML = 0.0;	//zero out the percentage number
//
//		var elem = document.getElementById("myBar");	//refresh the green bar
//		elem.style.width = 0.0 + '%';
//	}
//
//	//The function controls the behavior of '+' button
//	function increaseBar(event, size) {
//		//determine the caller of the function
//		var target = event.target || event.srcElement;
//		var callerId = target.id
//
//		var parentDivId = document.getElementById(callerId).parentElement.className;
//		var parentDivIdOfParentDivId = document.getElementsByClassName(parentDivId)[0].parentElement.className;
//	
//		if (parentDivIdOfParentDivId == "imageWithDescriptionContainer1"){
//			document.getElementById('imageWithDescriptionContainer2').style.opacity = 0.5;
////			document.getElementById('imageWithDescriptionContainer3').style.opacity = 0.5;
//			disableDiv('imageWithDescriptionContainer2');
////			disableDiv('imageWithDescriptionContainer3');
//		}else if (parentDivIdOfParentDivId == "imageWithDescriptionContainer2"){
//			document.getElementsByClassName('imageWithDescriptionContainer1')[0].style.opacity = 0.5;
////			document.getElementsByClassName('imageWithDescriptionContainer3')[0].style.opacity = 0.5;
//			disableDiv('imageWithDescriptionContainer1');
////			disableDiv('imageWithDescriptionContainer3');
//		}
////        else if (parentDivIdOfParentDivId == "imageWithDescriptionContainer3"){
////			document.getElementById('imageWithDescriptionContainer1').style.opacity = 0.5;
////			document.getElementById('imageWithDescriptionContainer2').style.opacity = 0.5;
////			disableDiv('imageWithDescriptionContainer1');
////			disableDiv('imageWithDescriptionContainer2');
////		}
//
//		var countFiles = parseInt(document.getElementById('filesCounter').innerHTML);	//current number of files on a disk
//		var elem = document.getElementById("myBar");									//the green bar showing progress
//		var width = parseFloat(document.getElementById("demo").innerHTML);				//current number of the green bar
//		var overallSize = 512;															//size of a disk
//		var incrementBy = parseFloat(size/(overallSize/100)).toPrecision(3);			//percentage to decrease by the green bar value
//
//		//determine if the disk is full
//		width = parseFloat(width) + parseFloat(incrementBy);
//		if (width >=100) {
////			clearInterval(id);
//		} else {
//			width = width.toPrecision(3);
//
//			elem.style.width = width + '%';
//			document.getElementById("demo").innerHTML = width * 1.0 + '%';
//
//			countFiles++;
//			document.getElementById('filesCounter').innerHTML = countFiles;
//		}
//	}
//
//	//The function controls the behavior of '-' button
//	function decreaseBar(event, size) {
//		var countFiles = parseInt(document.getElementById('filesCounter').innerHTML);	//current number of files on a disk
//		var elem = document.getElementById("myBar");									//the green bar showing progress
//		var width = parseFloat(document.getElementById("demo").innerHTML);				//current number of the green bar
//		var overallSize = 2000;															//size of a disk
//		var incrementBy = parseFloat(size/(overallSize/100)).toPrecision(3);			//percentage to decrease by the green bar value
//
//		//determine if the disk is empty
//		width = parseFloat(width) - parseFloat(incrementBy);
//		
//		if (width.toPrecision(3) < 0.0) {
//			return;
//		} else {
//			width = width.toPrecision(3);
//			elem.style.width = width + '%';
//			document.getElementById("demo").innerHTML = width * 1.0 + '%';
//
//			countFiles--;
//			document.getElementById('filesCounter').innerHTML = countFiles;
//		}
//	}
//
//	function showInfo(){
//		$(".modal-info").modal("toggle");
//	}