// HOW TO USE AT THE END
function player(callBack)
{

	
	var hasBackground=true;//daca avem imagine de background ptr mascota
	var TEST=true;//if true- nu playeaza audio si nu se intampla nimic: ptr pozitionare si fixuri
	var canvas_name='canvas';//daca e nevoie sa schimbam numele canvasului in caz ca exista deja unul numit asa
	var audio;
	var soundPath = "sounds/ART_121_06_EN.mp3";
	var playerPlay = $("#playerplay");
	
	function startAudio(e)
	{
		$('#bubbleIntro').fadeIn("slow");
		if (playerPlay)
		{
			playerPlay.hide();
		}
		audio = new Audio();
		audio.addEventListener('ended', endSoundHandler);
		
		audio.src = soundPath;
		audio.load();
		audio.play();
		exportRoot.mc.gura.play();
	}
	function endSoundHandler(e)
	{
		audio.removeEventListener('ended', endSoundHandler);
		
		exportRoot.mc.gura.gotoAndStop(0);
		$('#bubbleIntro').fadeOut("slow");
		if (callBack)
		{
			$("#"+canvas_name).fadeOut("slow",callBack);
		}else{
			$("#"+canvas_name).fadeOut("slow");
		}
		if(hasBackground)
		{
			$('#bgCanvas').fadeOut("slow");
		}
	}
	
	//Init Canvas:
	var canvas, stage, exportRoot;
	function init() 
	{
		canvas = document.getElementById(canvas_name);
		exportRoot = new lib.canvas();

		stage = new createjs.Stage(canvas);
		stage.addChild(exportRoot);
		stage.update();

		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage);
	}
	
	init();
	//EOF Init Canvas;
	
	exportRoot.mc.gura.gotoAndStop(0);

	var i = 0,
    iOS = false,
    iDevice = ['iPad', 'iPhone', 'iPod'];

	for ( ; i < iDevice.length ; i++ ) {
	    if( navigator.platform === iDevice[i] ){ iOS = true; break; }
	}

	function isiPhone()
	{
		return (
			//Detect iPhone
			(navigator.platform.indexOf("iPhone") != -1) ||
			//Detect iPod
			(navigator.platform.indexOf("iPod") != -1)
		);
	}
	

	playerPlay.show();	
	playerPlay.on("click", startAudio);
	//Detect if iOS device:
	/*if (isiPhone() != -1 && iOS)
	{

		playerPlay.show();	
		playerPlay.on("click", startAudio);
	}else{

		if(!TEST)
		{
			startAudio(null);
		}
		else
		{
			$('#bubbleIntro').show()
		}
		
	}
	*/
	
}



/*
========HTML========

	<script src="anim/easeljs-0.7.0.min.js"></script>
		<script src="anim/tweenjs-0.5.0.min.js"></script>
		<script src="anim/movieclip-0.7.0.min.js"></script>
		<script src='anim/canvas.js'></script>
		<script src='anim/player.js'></script>




<div id='bgCanvas'></div>
<canvas id="canvas" width="132" height="174" style="position:absolute;bottom: 0px;left:0px;"></canvas>
<div id='bubbleIntro'>
	<div id='fundalBubbleIntro'></div>
	<div id='textBubbleIntro'>Welcome, my little friend! Are you ready to play a musical instrument?<br/> Let’s begin!</div>
</div>
<div id='playerplay'></div>


========CSS========
#bgCanvas
{
	position: absolute;
	bottom: 0px;
	left:0px;
	width: 162px;
	height: 174px;
	background: url('../anim/bgCanvas.png') no-repeat;
}
#playerplay
{
	position: absolute;
	top: 421px;
  	left: 43px;
	width: 100px;
	height: 100px;
	background: url('../anim/playerplay.png') no-repeat;
}
#bubbleIntro
{
	position: absolute;
	top: 120px;
  	left: 120px;
	width: 338px;
	height: 274px;	
	display: none
}
	
#fundalBubbleIntro
{
	position: absolute;
	top:0px;
	left:0px;
	width: 338px;
	height: 274px;
	background: url('../anim/fundalBubbleIntro.png') no-repeat;
}
#textBubbleIntro
{
	position: absolute;
	top: 70px;
	left: 57px;
	width: 228px;
	font-size: 20px;
	direction: ltr;
}

========JS========
var introplayer = new player(FIRST_FUNCTION_TO_RUN_AFETER_AUDIO_OVER);
*/