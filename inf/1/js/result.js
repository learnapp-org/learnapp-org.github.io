
var resWords = ["Плохо","Не плохо","Хорошо","Отлично"]; 
var title = "Задание выполнено";
var audioStars = new Audio('sounds/stars.mp3');

function getTimeFromSeconds(seconds){
    var m = Math.trunc(seconds / 60);
    var s = seconds % 60;
    m = FullTime(m);
    s = FullTime(s);
    return m + ":" + s;
}
        
function FullTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
 
       
function showResult(result,maxTime,currentTime){
    stopTime();
    //currentTime = maxTime - currentTime;
    console.log("showResult");
result = parseInt(result);
    $(".modal-result").modal("toggle");
    $(".result-title").text(title);
animStars(result);    
jQuery(function($) {
    $('.progress').asProgress({
      'namespace': 'progress',
    	  'min': '0',
    	  'max': maxTime,
    	  'speed': '40', // speed of 1/100
    	  'easing': 'ease',
    	  labelCallback(n) {
              var time2 = getTimeFromSeconds(n);
    	    return `${time2}`;
    	  },
    });    
       $('.progress').asProgress('go', currentTime);

  }); 
        } 
        function getColStar(res){
            var colStar = parseInt(res/25);
            console.log("colStar = ",colStar);
            return colStar;
        }
        
function animStars(result){
    var colStar = getColStar(result);
    
       //    RESULT VALUE
     setTimeout(function(){
         var resValue = document.getElementById("result-value");
         resValue.innerHTML = result+"%";
         animate(resValue,"fadeIn");
         
       var resText = document.getElementById("result-text");
         resText.innerHTML = resWords[colStar];
	   animate(resText ,"bounceIn ");
},1200); 
    
    if(colStar==0) return;
    
    audioStars.play();
    var stars = document.getElementsByClassName("stars")[0];
    stars = stars.getElementsByTagName("img");
// STAR 1
    if(colStar>=1)
 setTimeout(function(){
     stars[0].style.opacity='1';
	  animate(stars[0],"rubberBand");
},200);
// STAR 2   
    if(colStar>=2)
 setTimeout(function(){
     stars[1].style.opacity='1';
	  animate(stars[1],"rubberBand");
},800);
//   STAR 3
        if(colStar>=3)
 setTimeout(function(){
     stars[2].style.opacity='1';
	  animate(stars[2],"rubberBand");
},1200);

}