$(function(){
	
	var bgW = 1920;
	var bgH = 1080;
	var relW = 1440;
	var relH = 900;
	var actW = 1280;
	var actH = 800;

	function updateSize() {
		var w = $(window).width();
		var h = $(window).height();
		var propW, calcPropW, propH, calcPropH, calcW, calcH, finPropW, finPropH;

		if(w < relW || h < relH) {
			if(h/w >= relH/relW){
				propW = bgW/relW;
				calcPropW = actW/relW;
				calcW = w*calcPropW;
				finPropW = calcW/actW;

				$(".bg-resizable").css({
					"background-size": w*propW + "px auto"
				});

				$(".fg-resizable").css({
					"transform": "scale3d(" + finPropW + ", "+ finPropW +", " + finPropW + ")"
				});
			} else {
				propH = bgH/relH;
				calcPropH = actH/relH;
				calcH = h*calcPropH;
				finPropH = calcH/actH;

				$(".bg-resizable").css({
					"background-size": "auto " + h*propH + "px"
				});

				$(".fg-resizable").css({
					"transform": "scale3d(" + finPropH + ", "+ finPropH +", " + finPropH + ")"
				});
			}
		}
	}

	updateSize();
	$(window).on("resize", function(){
		updateSize();
	});
});