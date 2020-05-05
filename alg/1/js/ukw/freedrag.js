/**
 Drag and drop v1.0
 date: 19-11-2014
 
	Params:
	drag_parent = parent of the drag (container div);
	drag_elements - drag elements - eg: $(".drag");
	drop_elements - drag elements - eg: $(".drop");
	
	Other js imports:
	jquery-shuffle.js
	
	Known issues:
	
	New features:
	1. centerOnDrag - centers drag on mouse down;
	2. hitWithPointer - check hitTest by mouse pointer;
 
 */
function freedrag(drag_parent,drag_elements,drop_elements) 
{
	var _this = $(this);//instantiaza clasa in variabila _this, folosita ptr dispatch
	
	var indexArr = [];
	var topArr = [];
	var leftArr = [];
	var firstDragInit = true;
	var offX;
	var offY;
	var current_drag;
	var found = false;
	var opacityOff = 0.6;
	
	//if hitTest with mouse position:
	var hitWithPointer = true;
	var pointerX = -100;
	var pointerY = -100;
	
	var centerOnDrag = true;
	
	//variabile ce se pot modifica:
	var showTargetShadow = false; //arata targetul la drag
	var raspunsuriArr = [];

	/* var answerData = drop_elements.data('corect');
	//trace("answerData"+answerData);
	var answerArr = answerData.split(","); */
	
	//main;
	//shufflePositions();
	//public functions:
	this.enable = function()
	{
		dragOn();
	}
	this.disable = function()
	{
		dragOff();
	}
	this.resetCurrent = function() 
	{
		
	}
	//private functions:
	function dragOn()
	{
		drag_elements.on("mousedown",objectDown);
	}
	function dragOff()
	{
		drag_elements.off("mousedown",objectDown);
	}
	function shufflePositions()
	{
		//Attention: Uses jquery-shuffle.js or shuffle array prototype function;
		if (firstDragInit == true)
		{
			firstDragInit = false;
			drag_elements.each(function(index)
			{
				indexArr[index] = index; //init indexArr 
				topArr[index] = $(drag_elements[index]).position().top;
				leftArr[index] = $(drag_elements[index]).position().left;
			});
		}
		indexArr.shuffle();

		drag_elements.each(function(index)
		{
			$(this).data("top",topArr[indexArr[index]]);
			$(this).data("left",leftArr[indexArr[index]]);
			$(this).css({
				'top':topArr[indexArr[index]],
				'left':leftArr[indexArr[index]],
				'z-index':'2'
			});	
		});
	}
	function objectDown(event) {
		event.preventDefault();
		if (current_drag)
		{
			if (current_drag!= $(event.currentTarget)){
				current_drag.css('z-index','2');	
			}
		}
		current_drag = $(event.currentTarget);
		var e = $.Event("customevent", { str: "drag" } );
		_this.trigger(e);
		
		if(!current_drag) current_drag = $(event.target);
		if ((current_drag.data('left') == undefined ))
		{
			current_drag.data('left' , current_drag.position().left);
			current_drag.data('top' , current_drag.position().top);
		};
		current_drag.css('z-index','998');
		
		if (centerOnDrag)
		{
			pointerX = event.pageX;
			pointerY = event.pageY;
			var newTop = pointerY - Math.round(current_drag.find('.drag_img').height()/2);
			var newLeft = pointerX - Math.round(current_drag.find('.drag_img').width()/2);
			current_drag.css({
				'top' : newTop,
				'left': newLeft
			});	
		}
		
		offX = event.pageX ? event.pageX : event.originalEvent.pageX;
		offY = event.pageY ? event.pageY : event.originalEvent.pageY;
		offX = current_drag.offset().left - offX;
		offY = current_drag.offset().top - offY;
		offX = offX - drag_parent.offset().left;
		offY = offY - drag_parent.offset().top;
		
		if (showTargetShadow)
		{
			drop_elements.css({ opacity: '0.2'});	
		}
		
		current_drag.find('.drag_gresit').hide();
		current_drag.find('.drag_img').show();
						
		$(document).on('mousemove', objectMove);
		$(document).on('mouseup', objectUp);
	};

	function objectMove(event) {	
		try{
			var top = event.pageY ? event.pageY : event.originalEvent.pageY;
			top = top + offY;
			top = clamp( 0 , top , drag_parent.height() - current_drag.height());
		}catch(err){}
		try{		
			var left = event.pageX ? event.pageX : event.originalEvent.pageX;
			left = left + offX; 
			left = clamp( 0 , left , drag_parent.width() - current_drag.width() );
		}catch(err){}
		
		if (hitWithPointer)
		{
			pointerX = event.pageX;
			pointerY = event.pageY;
		}
		current_drag.css({
			'top' : top,
			'left': left
		});			
	};
	function objectUp(event) 
	{
		$(document).off('mousemove', objectMove)
		$(document).off('mouseup', objectUp);

		found = false;
		
		drop_elements.each(function(index)
		{
			if (hitTest(current_drag, $(this)))
			{
				var e = $.Event("customevent", { str: "hit", target: $(this), drag: current_drag, coord: [current_drag.position().left,current_drag.position().top] } );
				_this.trigger(e);
				return false;
			}
		});
		if (!found)
		{
			goBack(null,true);
		}
	};
	
	function inArray(search,arr)
	{
		for(var i=0;i< arr.length;++i)
		{
			if (search == arr[i])
			{
				return i;
			}
		}
		return -1;
	}
	function getObjects(obj, key, val) {
		var objects = [];
		for (var i in obj) {
			if (!obj.hasOwnProperty(i)) continue;
			//trace("obj[i]"+obj[i]);
			if (typeof obj[i] == 'object') {
				objects = objects.concat(getObjects(obj[i], key, val));
			} else if (i == key && obj[key] == val) {
				objects.push(obj);
			}
		}
		return objects;
	}
	function checkEnd()
	{
		if (!checkBtn.hasClass("enabled"))
		{
			//_this.trigger("customevent","checkend");
			enableCheck();	
		}
	}
	this.resetDragPos=function()
	{
		current_drag.delay(delay).animate({
			'left': current_drag.data('left'),
			'top': current_drag.data('top')
		},300);
		//goBack(true);	
	}
	function enableDragF()
	{
		drag_elements.each(function(index)
		{
			if(!$(this).hasClass("ok"))
			$(this).removeClass("disable").addClass("enable");
		});
	}
	function disableDragF()
	{
		drag_elements.removeClass("enable").addClass("disable");
	}
	var temp;
	var delay = 200;
	function goBack(disableDrag,noDelay)
	{
		disableDragF();
		if (noDelay)
		{
			delay = 0;
		}else
		{
			delay = 200;
		}
		temp = current_drag;
		pointerX = pointerY = -100;
		//current_drag.css('z-index','2');
		//_this.trigger("customevent","goback");
		if (typeof disableDrag === "undefined" || disableDrag === null) 
		{ 
			disableDrag = false;
		}
		
		//verifica daca are gazda si o sterge/ii sterge si vizitatorul gazdei
		if (current_drag.data("gazda") != "")
		{
			var gazda = current_drag.data("gazda");
			gazda.data("vizitator","");
			current_drag.data("gazda","");
		}
		//current_drag.find('.drag_img').show();
		current_drag.delay(delay).animate({
			'left': current_drag.data('left'),
			'top': current_drag.data('top')
		},300, function(){
			//setTimeout(resetDragImg,2000);
			//current_drag.css('z-index','2');
			$(this).css('z-index','2');
			$(this).find('.drag_gresit').hide();
			$(this).find('.drag_img').show();
			if (disableDrag == false){
				//drag_elements.on('mousedown', objectDown);
			}
			enableDragF();
		});
	}
	function resetDragImg()
	{
		drag_elements.each(function(index)
		{
			if (!$(this).hasClass("ok"))
			{
				$(this).find('.drag_gresit').hide();
				$(this).find('.drag_img').show();
			}	
		});
	}
	//check if all placed for drag without check button:
	function checkEndOnSpot()
	{
		/* drag_elements.each(function(index)
		{
			if (!$(this).hasClass("corect")
			{
				return false;
			}
		}); */
		
		//_this.trigger("customevent","end");
	}
	
	//check button functions:
	function enableCheck()
	{
		checkBtn.on("click", checkDrag);
		checkBtn.css('opacity','1').show().addClass("enabled");
	}
	function disableCheck()
	{
		checkBtn.off("click", checkDrag);
		checkBtn.css('opacity',opacityOff).hide().removeClass("enabled");;
	}
	function checkDrag(event)
	{
		disableCheck();
		dragOff();
		//_this.trigger("customevent","checkdrag");
		var corecte = 0;
		drop_elements.each(function(index)
		{
			//if ($(this).data('corect') == $(this).data("vizitator").data("corect"))
			if ($(this).data('corect') == $(this).data("vizitator").data("corect"))
			{
				$(this).data("vizitator").hide();//addClass('corect');
				
				$(this).html('<span class="corect">'+$(this).data("vizitator").text()+'</span>');
				
				corecte++;	
			}else
			{
				$(this).data("vizitator").hide();//addClass('gresit');
				
				$(this).html('<span class="gresit">'+$(this).data("vizitator").text()+'</span>');
			}
		});
		
		if (corecte == drop_elements.length)
		{
			var e = $.Event("customevent", { str: "corect" } );
			_this.trigger(e);
			//raspunsuriArr[currentInt-1] = true;
			//animCorect();
		}else
		{
			var e = $.Event("customevent", { str: "gresit" } );
			_this.trigger(e);
			//animGresit();
			//checkNext();
		}
	}
	//Other functions: 
	function clamp( min , x , max ) {
		if(x < min) return min;
		if(x > max) return max;
		return x;
	};

	function hitTest(a, b) 
	{
		if (hitWithPointer){
			var aTop = pointerY;
			var aLeft = pointerX;
			var aBottom = pointerY;
			var aRight = pointerX;
		}else{
			var aTop = a.offset().top;
			var aLeft = a.offset().left;
			var aBottom = a.offset().top + a.height();
			var aRight = a.offset().left + a.width();
		}
		
		var bTop = b.offset().top;
		var bLeft = b.offset().left;
		var bBottom = b.offset().top + b.height();
		var bRight = b.offset().left + b.width();
		
		return !( bLeft > aRight || bRight < aLeft || bTop > aBottom || bBottom < aTop);
	};
}