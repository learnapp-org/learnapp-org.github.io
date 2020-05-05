
var backgroundMusicOn;
var soundsOn;
var hoverAudioElement;
var correctAnswerSound;
var incorrectAnswerSound;
var nextButtonPressSound;
var dragAndDropSound;
var correctSound;
var incorrectSound;
var backgroundAudioElement;

$(window).load(function() {

	var url = window.location.href;
	if (url.indexOf('?') != -1) {
		var backgroundMusic = url.substring(url.indexOf('?') + 1, url.indexOf('&'));
		var sounds = url.substring(url.indexOf('&') + 1, url.length);

		if (backgroundMusic == 'true'){
			backgroundMusicOn = true;
		} else {
			backgroundMusicOn = false;
		}

		if (sounds == 'true'){
			soundsOn = true;
		} else {
			soundsOn = false;
		}
	}


	function initializeSound(id, src){
		$('body').append('<audio class = "audio-sound" id="' + id + '"></audio>');
		var soundElem = $('body').find('#' + id);
		soundElem.attr('src', src);

		return soundElem;
	}

	function loadSounds(){

	//background music
	backgroundAudioElement = document.createElement('audio');
	backgroundAudioElement.id = 'background-audio';
	
	if (_time == 60){
		backgroundAudioElement.setAttribute('src', '../sounds/sfx/01/tasks-background-music-1minute.mp3');
	} else {
		backgroundAudioElement.setAttribute('src', '../sounds/sfx/01/tasks-background-music-2minutes.mp3');
	}

	backgroundAudioElement.setAttribute('autoplay', 'autoplay');
	if (!backgroundMusicOn){
		backgroundAudioElement.pause();
	}
	
	//sounds setup
	hoverAudioElement = initializeSound('button-hover-sound', '../sounds/sfx/01/hover-sound.mp3');
	correctAnswerSound = initializeSound('hero-correct-voice', '../sounds/sfx/01/hero-correct-sound.mp3');
	incorrectAnswerSound = initializeSound('hero-incorrect-voice', '../sounds/sfx/01/hero-incorrect-sound.mp3');
	nextButtonPressSound = initializeSound('next-button-press-sound', '../sounds/sfx/01/next-button-press-sound.mp3');
	dragAndDropSound = initializeSound('drag-and-drop-sound', '../sounds/sfx/01/drag-and-drop-sound.mp3');
	correctSound = initializeSound('correct-sound', '../sounds/sfx/01/correct-sound.mp3');
	incorrectSound = initializeSound('incorrect-sound', '../sounds/sfx/01/incorrect-sound.mp3');


	if (!soundsOn){
		$("body").find(".audio-sound").each(function(i, element){
			$(element).prop('muted', true);
		});
	}

	$('.mbutton').hover(function (){
		hoverAudioElement.trigger('play');
	},
	function (){
		hoverAudioElement.load();
	});

	correctAnswerSound = document.getElementById('hero-correct-voice');
	incorrectAnswerSound = document.getElementById('hero-incorrect-voice');
	nextButtonPressSound = document.getElementById('next-button-press-sound');
	dragAndDropSound = document.getElementById('drag-and-drop-sound');
	correctSound = document.getElementById('correct-sound');
	incorrectSound = document.getElementById('incorrect-sound');
}


//turn on and off sounds
$('#sounds-btn').click(function(e){
	console.log(soundsOn);
		//if music is on, turn it off
		if (soundsOn){
			$("body").find(".audio-sound").each(function(i, element){
				$(element).prop('muted', true);
			});
			soundsOn = false;
		} else {   //if sounds off, turn them on
			$("body").find(".audio-sound").each(function(i, element){
				$(element).prop('muted', false);
			});
			soundsOn = true;
		}
	});


//turn on and off background music
$('#music-btn').click(function(e){
		//if music is on, turn it off
		console.log(backgroundMusicOn);
		if (backgroundMusicOn){
			backgroundAudioElement.pause();
			backgroundMusicOn = false;
		} else {   //if music is off, turn it on
			backgroundAudioElement.play();
			backgroundMusicOn = true;
		}
	});



$('#menu-btn').click(function(e){
	
		if (soundsOn){
			nextButtonPressSound.play();
		}
		window.location.href = "../categories.html?"+backgroundMusicOn+"&"+soundsOn;	
		
});



loadSounds();

});



