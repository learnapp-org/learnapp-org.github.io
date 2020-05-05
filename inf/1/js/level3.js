window.onload = function() {
	loadData();
	initializeArrowImages();
};

var userChoice = "";
var userMatch = "";
var choicesWithMatches;
var choiceContainerId = 0;
var possibleMatchContainerId = 0;
var userInputDict = [];
var numberOfContainers;

var data = '{"data":[' + '{"choice":"10 Кб","match":"81920 бит" },'
		+ '{"choice":"2 Мб","match":"2048 Кб" },'
		+ '{"choice":"Единицы измерения информации определяют","match":"Информационный объем" },'
		+ '{"choice":"1 Терабайт в ОС Windows равен","match":"931 ГБ" },'
		+ '{"choice":"8 Кб","match":"65536 бит" }]}';
//function disableDiv() {
//	// This will disable everything contained in the div
//	$(".checkButtonDiv").addClass("disabledDiv");
//	document.getElementsByClassName('.checkButtonDiv')[0].style.opacity = 0.4;
//}
//
//function enableDivs() {
//	// This will disable everything contained in the div
//	$(".checkButtonDiv").removeClass("disabledDiv"); //enable touch
//	document.getElementsByClassName('.checkButtonDiv')[0].style.opacity = 1.0;
//}
function suspendBgMusic(audio){
	console.log("postMessage to ",parent);
	parent.postMessage("0.1","*");		
		audio.onended = function(){		
			console.log("postMessage to ",parent);
			parent.postMessage("1","*");
	};
}
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function initiateUserInput(dataDictionary) {
	var i;
	userInputDict = $.extend(true, {}, dataDictionary);

	for (i = 0; i < dataDictionary.length; i++) {
		if (!('isCorrect') in userInputDict[i]) {
			userInputDict[i].match = "";
			userInputDict[i].isCorrect = false;

		} else {
			if (!userInputDict[i].isCorrect) {
				userInputDict[i].match = "";
			}
		}
	}

}

function loadData() {

	//parse JSON object
	var obj = JSON.parse(data);
	choicesWithMatches = obj.data; //the array of choices and corresponding correct answers
	numberOfContainers = choicesWithMatches.length; // the number of cointainers in one column
	initiateUserInput(choicesWithMatches); //prepare object storing user answers

	//add choices and answers to arrays and shuffle both arrays
	var choicesArr = [];
	var choiceMatchesArr = [];
	var i;
	for (i = 0; i < obj.data.length; i++) {
		choicesArr[i] = obj.data[i].choice;
		choiceMatchesArr[i] = obj.data[i].match;
	}

	choicesArr = shuffle(choicesArr);
	choiceMatchesArr = shuffle(choiceMatchesArr);

	//populate corresponding containers with shuffled choices
	for (i = 1; i <= choicesArr.length; i++) {
		$(".column1").append(
				"<div class = 'flip-container' onclick='choiceClicked(" + i
						+ ")' id = 'flip-container" + i + "'> </div>");
		$("#flip-container" + i).append(
				"<div class = 'flipper' id='flippper" + i
						+ "'>   <div class='front' id = 'flipper" + i
						+ "'> <div class = 'back-logo'></div></div></div>");
		$("#flippper" + i).append(
				"<div class='back' id='back" + i
						+ "'>    <div class='choice' id='choice" + i
						+ "'> <p class = 'choiceText' id = '" + i + "'>"
						+ choicesArr[i - 1] + "</p>     </div>  </div>");
	}

	for (i = (choicesArr.length + 1); i <= (choiceMatchesArr.length * 2); i++) {
		$(".column2").append(
				"<div class = 'flip-container' onclick='matchClicked(" + i
						+ ")' id = 'flip-container" + i + "'> </div>");
		$("#flip-container" + i).append(
				"<div class = 'flipper' id='flippper" + i
						+ "'>   <div class='front' id = 'flipper" + i
						+ "'> <div class = 'back-logo'></div></div></div>");
		$("#flippper" + i).append(
				"<div class='back' id='back" + i
						+ "'>    <div class='choiceMatch' id='choice"
						+ (i - choicesArr.length)
						+ "match'> <p class = 'matchText' id = '" + i + "'>"
						+ choiceMatchesArr[i - choicesArr.length - 1]
						+ "</p>     </div>  </div>");
	}
}

function getTextInsideDiv(containerId) {
	var text = document.getElementById(containerId).innerHTML;
	return text;
}

function disableOtherChoices(columnId, containerId) {
	var i;
	for (i = 1; i <= numberOfContainers; i++) {
		$('#flip-container' + i).addClass('disabledDiv');
	}

	$("#flip-container" + containerId).removeClass("disabledDiv"); //enable touch

}

function removeMatch(choiceText) {
	var i, j;
	for (i = 1; i <= numberOfContainers; i++) {
		if (userInputDict[i].choice == choiceText) {
			for (j = numberOfContainers + 1; j < numberOfContainers * 2; j++) {
				if ($('#' + j).html() == userInputDict[i].match) {
					$('#flip-container' + j).removeClass('hover');
				}
			}
			userInputDict[i].match = "";
			break;
		}
	}
}

//the function is called every time a container from left column is called
function choiceClicked(containerId) {
	choiceContainerId = containerId; //remember the container id so that the matchClicked knows last clicked container from left column

	//pause flipping
	var container = document.getElementById('flip-container' + containerId);
	container.classList.toggle('hover');

	//extract the current value inside the container
	userChoice = getTextInsideDiv(containerId);

	if ($('#flip-container' + containerId).hasClass('hover')) {
		disableOtherChoices('column1', containerId);
	} else {
		enableOtherChoices('column1');
		removeMatch(userChoice);
	}
}

function flipAlreadyShownMatches(containerId) {
	var i, j, k;

	for (i = numberOfContainers + 1; i <= numberOfContainers * 2; i++) {
		for (j = 1; j <= numberOfContainers; j++) {
			var matchText = $('#' + i);
			var choiceText = $('#' + j);
			if (userInputDict[j - 1].match != matchText
					&& userInputDict[j - 1] == choiceText) {
				($('#flip-container' + (i - 1)).removeClass('hover'));
			}
		}
	}
}

function addImageBtwContainers(leftColContainerId, rightColContainerId,
		imageSrc) {
	var image = new Image();
	image.src = imageSrc;
	image.id = 'image' + leftColContainerId;
	//$('#image1').css({position: 'relative', height: 1});
	var parentContHeight = ($('.arrowsContainer').height());
	var parentContWidth = ($('.arrowsContainer').width());
	var contHeight = ($('#flip-container' + leftColContainerId).height());

	var cont1TopPosition = $('#flip-container' + leftColContainerId).position().top;
	var cont1LeftPosition = $('#flip-container' + leftColContainerId)
			.position().left;

	var cont2TopPosition = $('#flip-container' + rightColContainerId)
			.position().top;
	var cont2LeftPosition = $('#flip-container' + rightColContainerId)
			.position().left;

	//var arrowTopPosition = (contTopPosition + contHeight/2 - parentContHeight) + 'px';

	var arrowX0 = 0;
	var arrowY0 = cont1TopPosition + contHeight / 4;
	var arrowX1 = cont2TopPosition;
	var arrowY1 = cont2TopPosition + contHeight / 4;
	if (cont2TopPosition - cont1TopPosition != 0) {
		image.height = cont2TopPosition - cont1TopPosition;
	}
	var canvas = document.getElementById('arrowsCanvas');
	var ctx = canvas.getContext('2d');
	ctx.drawImage(image, arrowX0, arrowY0, parentContWidth, image.height);

}

function initializeArrowImages() {
	var i, j;
	var contHeight = ($('#flip-container1').height());
	for (i = 1; i <= numberOfContainers; i++) {
		for (j = 1; j <= numberOfContainers; j++) {
			$('.arrowsContainer').append("<img id='" + i + "-" + j + "'>");
			var img23 = parseInt(j-i+6);
            console.log("image src = ",img23);
            $('#' + i + '-' + j).attr('src', 'images/' + img23 + '.png');
			if (i <= j) {
				$('#' + i + '-' + j).css(
						{
							"position" : "absolute",
							"top" : contHeight / 2 - 5 + (contHeight + (i * 2))
									* (i - 1),
							"visibility" : "hidden"
						});
			} else {
				$('#' + i + '-' + j).css(
						{
							"position" : "absolute",
							"top" : contHeight / 2 - 5 + (contHeight + (i * 2))
									* (j - 1),
							"visibility" : "hidden"
						});
			}
		}
	}
}

function showArrowBtwContainers(leftColContainerId, rightColContainerId) {
	var leftIndex = leftColContainerId;
	var rightIndex = rightColContainerId - numberOfContainers;

	$('#' + leftIndex + '-' + rightIndex).css({
		"visibility" : "visible"
	});
}

function drawArrow(choiceText, matchText) {
	var i, j;

	for (i = 1; i <= numberOfContainers; i++) {
		if ($('#' + i).html() == choiceText) {
			for (j = numberOfContainers + 1; j <= (numberOfContainers * 2); j++) {
				if ($('#' + j).html() == matchText) {
					showArrowBtwContainers(i, j);
				}
			}
		}
	}
}

function findChoiceCont(choiceText) {
	var i;
	for (i = 1; i <= numberOfContainers; i++) {
		if ($('#' + i).html() == choiceText) {
			return i;
		}
	}
}

function findMatchCont(matchText) {
	var i;
	for (i = numberOfContainers + 1; i <= numberOfContainers * 2; i++) {
		if ($('#' + i).html() == matchText) {
			return i;
		}
	}
}

function removeArrowAtContainer(choiceContId, matchContId) {
	$('#' + choiceContId + '-' + (matchContId - numberOfContainers)).css({
		"visibility" : "hidden"
	});
	($('#flip-container' + matchContId).removeClass('hover'));
}

function matchClicked(containerId) {
	possibleMatchContainerId = containerId;
	//pause flipping
	var container = document.getElementById('flip-container' + containerId);

	//if match is already shown, hide it and remove the remembered answer
	if ($('#flip-container' + containerId).hasClass('hover')) {
		container.classList.toggle('hover');
		var text = $('#' + containerId).html();
		var i;

		for (i = 0; i < numberOfContainers; i++) {
			if (userInputDict[i].match == text) {
				var choiceContId = findChoiceCont(userInputDict[i].choice);
				disableOtherChoices('column1', choiceContId);
				removeArrowAtContainer(choiceContId, containerId);
				userInputDict[i].match = "";
			}
		}

	} else { //else remember the user answer
		//extract the current value inside the container
		container.classList.toggle('hover');
		userMatch = getTextInsideDiv(containerId);

		var i;
		for (i = 0; i < choicesWithMatches.length; i++) {
			if (userInputDict[i].choice == userChoice) {

				var oldMatch = userInputDict[i].match;
				var choiceContId = findChoiceCont(userInputDict[i].choice);
				var oldMatchContId = findMatchCont(oldMatch);

				removeArrowAtContainer(choiceContId, oldMatchContId);

				userInputDict[i].match = userMatch; //store the user answer
				drawArrow(userChoice, userMatch);

			}
		}
		enableOtherChoices('column1');
	}

	flipAlreadyShownMatches(containerId);
}

function checkResetButtonPressed(elem) {
	var data = elem.data;
	console.log("data = ", data);
	if (!data || data == "check"){
		checkButtonPressed();
		elem.data = "reset";
//		$(".button-check").removeClass("button-check");
		$(".button-check").addClass("button-reset");
		
	} else if (data == "reset") {
		resetButtonPressed();
		elem.data = "check";
		$(".button-check").removeClass("button-reset");
//		$(".button-check").addClass("button-check");
	}
}

//the function changes the color of containers consisting of choiceText and matchText 
function changeColorInsideDiv() {
	var i;
	for (i = 0; i < numberOfContainers; i++) {

		if (userInputDict[i].color == 'green') {
			var choiceContId = findChoiceCont(userInputDict[i].choice);
			var matchContId = findMatchCont(userInputDict[i].match);
			$('#flip-container' + choiceContId).addClass('disabledDiv');
			$('#flip-container' + matchContId).addClass('disabledDiv');
			$('#back' + choiceContId).addClass('correct');
			$('#back' + matchContId).addClass('correct');

		} else {
			var choiceContId = findChoiceCont(userInputDict[i].choice);
			var matchContId = findMatchCont(userInputDict[i].match);
			$('#flip-container' + choiceContId).addClass('disabledDiv');
			$('#back' + choiceContId).addClass('incorrect');
			$('#back' + matchContId).addClass('incorrect');
		}
		$('#flip-container' + (i + 1)).addClass('hover');
		$('#flip-container' + (i + numberOfContainers + 1)).addClass('hover');
	}

	for (i = numberOfContainers + 1; i <= numberOfContainers * 2; i++) {
		if (!($('#back' + i).hasClass('correct'))) {
			$('#back' + i).addClass('incorrect');
		}
	}
}

function disableAllDivs() {
	var i;
	for (i = 1; i <= numberOfContainers * 2; i++) {
		$('flip-container' + i).addClass('disabledDiv');
	}
}

function checkButtonPressed() {

	var i;
	var j;

	for (i = 0; i < numberOfContainers; i++) {
		if (!('color') in userInputDict[i]) {
			userInputDict[i].color = "";
		}
	}
var col=0;
	for (i = 0; i < numberOfContainers; i++) {
		if (userInputDict[i].choice == choicesWithMatches[i].choice) {
			if (userInputDict[i].match == choicesWithMatches[i].match) {
				userInputDict[i].isCorrect = true;
				userInputDict[i].color = 'green';
				col++;
			} else {
				userInputDict[i].isCorrect = false;
				userInputDict[i].color = 'red';
			}
		}
	}
	changeColorInsideDiv();
	disableAllDivs();
	if(numberOfContainers==col){
        $(".modal-game-over").modal("toggle"); 
        var audioGameOver = new Audio("sounds/notify.mp3");
//		sessionStorage.setItem('res3', 100);
        audioGameOver.play();
        suspendBgMusic(audioGameOver);
	}
}

function resetUserInputDict() {
	console.log(userInputDict);
	var i;
	for (i = 0; i < numberOfContainers; i++) {
		if (!userInputDict[i].isCorrect) {

			var oldMatch = userInputDict[i].match;
			var choiceContId = findChoiceCont(userInputDict[i].choice);
			var oldMatchContId = findMatchCont(oldMatch);
			console.log(choiceContId, oldMatchContId);

			console.log($('#flip-container' + oldMatchContId)[0]);
			//   $('#flip-container' + oldMatchContId)[0].removeClass('hover');

			removeArrowAtContainer(choiceContId, oldMatchContId);

			userInputDict[i].match = "";
		}
	}
}

function resetColors() {
	var i;

	for (i = 0; i < numberOfContainers; i++) {
		if (!userInputDict[i].isCorrect) {
			var choiceContId = findChoiceCont(userInputDict[i].choice);
			$('#back' + choiceContId).removeClass('incorrect');
		}
	}

	for (i = numberOfContainers + 1; i <= numberOfContainers * 2; i++) {
		$('#back' + i).removeClass('incorrect');
	}
}

function enableOtherChoices(columnId) {
	var i;
	for (i = 1; i <= numberOfContainers; i++) {
		if (!($('#back' + i).hasClass('correct'))) {
			$('#flip-container' + i).removeClass('disabledDiv');
		}
	}
}

function flipContainers() {
	var i, j;
	for (i = 1; i <= numberOfContainers * 2; i++) {
		if (!($('#back' + i).hasClass('correct'))) {
			$('#flip-container' + i).removeClass('hover');
		}

	}
}

function resetButtonPressed() {
	// initiateUserInput(choicesWithMatches);

	resetUserInputDict();
	resetColors();
	enableOtherChoices('column1');
	flipContainers();
}
