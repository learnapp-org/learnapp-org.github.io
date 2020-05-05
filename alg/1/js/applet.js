touchMove = function(event) {
	event.preventDefault();
}


$(window).load(function() {
               
    var introplayer = new player(enterStage);
               
    function enterStage()
    {
        $("#masca").hide();
    }
               
    $("#masc").hide();
    $("#bgCanvas").hide();
    $("#playerplay").hide();
    $("#bubbleIntro").hide();
               
               
    $("#container").show();
               
               
               
               function check()
               {
               $("#bg").hide();
               }
});