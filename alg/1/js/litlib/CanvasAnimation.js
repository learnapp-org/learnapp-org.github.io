
function CanvasAnimation(props) {

    var canvasId = props.canvasId;
    var animationLib = props.animationLib;
    var stageWidth = props.stageWidth;
    var stageHeight = props.stageHeight;
    var fps = props.fps;
    //var classX =  moon_shadow.lib;
    //var scale = props.scale;

    var canvas, stage, exportRoot, scaleX, scaleY;

    
    //init
    canvas = document.getElementById(canvasId); 

    exportRoot = new lib[animationLib];  

    scaleX = canvas.width/stageWidth;
    scaleY = canvas.height/stageHeight;    

    stage = new createjs.Stage(canvas);
    stage.addChild(exportRoot);

    //console.log(stage, stage.stageHeight)

    stage.scaleX = scaleX;
    stage.scaleY = scaleY;
    
    stage.update();

    createjs.Ticker.setFPS(fps);
    createjs.Ticker.addEventListener("tick", stage);

    this.play = function()
    {
        exportRoot.mc.play();
    }

    this.stop = function ()
    {
        exportRoot.mc.stop();
    }

    this.gotoAndStop = function (n)
    {
        exportRoot.mc.gotoAndStop(n);
    }

    this.gotoAndPlay = function (n)
    {
        exportRoot.mc.gotoAndPlay(n);
    }
}    