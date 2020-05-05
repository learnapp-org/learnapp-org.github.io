/* Info: Deploys a movement animation on a target DOMelement based on a sequence of points generated from bezier curves
 *
 * v0.5
 - fixed auto rotation of animated domElement
 - fixed other bugs
 
 * v0.4
 -  implemented showPoints (will draw the points array on a canvas)
 -  implemented 'enablePathDrag' method (will enable dragging of the specified domElement snapped on the path descriped by the pointsArray) (loops when end reach)
 -  implemented 'animateToIndex' method
 -  implemented 'dragDirectionLock' ("forward", "backward", undefined = auto => shortest route);
 -- implemented scaleRatio (fix coord sistem bug that appears when content is scaled)
 -  implemented 'progress' property and 'onUpdateProgress'
 -  refactored various parts of script
 -  added methods : drawPoints(), drawLines(), drawNodes()

 * v0.3
 - implemented config object
 - implemented "useRelativeAnimation" config value => if set true it will translate
    the coordinates relative to animated domElement current position

 * v0.2
 * - onJointReached callback fires now also at the end of animation

 * v0.1 
 *by Oprescul
 * TODO: 
  - make use of config object
    - ability to inverse the animation
    - change index to currentIndex 
    


 *
 */
function BizarAnimator() {
}    

BizarAnimator.buildAnimation = function(domElement, container, pointsArray, pixelsPerSecond)
{    
    //accesible vars
    this.isPlaying = false;
    this.onJointReached = undefined;
    this.onIndexReached = undefined;
    this.onEndReached = undefined;
    this.dragDirectionLock = 'forward';

    this.progress = 0;
    this.onUpdateProgress = undefined;

    this.scaleRatio = 1;
    this.maxIndexDistanceOnDrag = undefined;

        //config object
        this.config = 
        {
            get useRelativeAnimation()
            {
                return useRelativeAnimationValue
            },

            set useRelativeAnimation(value)
            {
                useRelativeAnimationValue = value;
                //update offsets as needed
                if (value == true)
                {
                    //calculate offsets
                    relativeOffsetX = pointsArray[0].x - domElement.position().left;
                    relativeOffsetY = pointsArray[0].y - domElement.position().top;
                }
                else
                {
                    relativeOffsetX = 0;
                    relativeOffsetY = 0;
                }
            },
            "useRotation": false,
            "rotationOffset": 0
           // "debugMode": false
        }

    //internal vars
    var index = 0;
    var instance = this;
    var noJointsToPas = undefined;
    var currentJoint = 0;

    var canvas;
    var context;

    var useRelativeAnimationValue = false;
    var relativeOffsetX = 0;
    var relativeOffsetY = 0;

    //config  
    

    //metrics
        /*These vars will be calculated when they are used. Althou it would be optimal to
         just set them here i cannot keep into account the case when uppon initialization
         of this class the container would be hidden. In this case we don't have access to
         positional metrics because the element is not part of the display tree and therefore all
         positional metrics getters will return 'undefined'*/

    var containerOffsetX;
    var containerOffsetY;

    this.getCurrentIndex = function()
    {
        return index;
    }

    this.prepare = function()
    {
        //send domElement to first coords set       
        domElement.css({left:pointsArray[0].x-relativeOffsetX, top:pointsArray[0].y-relativeOffsetY});

        instance.pause();               
        index = 0;
    }

    var direction;
    var targetIndex;
    var playing = 0;   

    
    this.animateToIndex = function (_targetIndex, speed) //'forward', 'backward', 'undefined - shortest distance' TODO onIndexReach callback
    { 
        

        direction = instance.dragDirectionLock;
        targetIndex = _targetIndex;                        

        //get direction for shortest point route if direction is undefined
        
            //get lowest distance between current index and targetIndex (distance is measured in no. of points between)            
            var maxIndex, forwardDistance, backwardDistance, travelDistance

            maxIndex = pointsArray.length - 1;

            if (targetIndex < index) //e in spate
            {
                forwardDistance = (maxIndex - index) + targetIndex;
                backwardDistance = (index - targetIndex);
            }
            else //e in fata
            {
                forwardDistance = targetIndex - index;
                backwardDistance = (maxIndex - targetIndex) + index;                
            }

        switch(direction) 
        {
            case 'auto':                
                if (forwardDistance <= backwardDistance)
                {
                    direction = 'forward';
                    travelDistance = forwardDistance;
                } 
                else 
                {
                    direction = 'backward';
                    travelDistance = backwardDistance;
                }
            break; 

            case 'forward':              
                travelDistance = forwardDistance;
            break; 

            case 'backward':
                travelDistance = backwardDistance;
            break;
        }

   
        if(instance.maxIndexDistanceOnDrag != undefined)
        {
            if (travelDistance < instance.maxIndexDistanceOnDrag)
            {
                if(instance.isPlaying != true)
                {
                    callAnimator();
                }     
            }
        }
        else
        {
            if(instance.isPlaying != true)
                {
                    callAnimator();
                }     
        }           

        function callAnimator()
        {
            instance.isPlaying = true;

            var returnIndex = requestNewIndex();

            if(returnIndex != undefined)
            {
                tweenToIndex(returnIndex, callAnimator, speed);//, requestNewIndex)
            }
            else
            {
                //index reached                
                instance.isPlaying = false;

                //check if onIndexReached callback is defined and run it
                if(instance.onIndexReached != undefined)
                {
                    instance.onIndexReached()
                }
            }            
        }
        

        function requestNewIndex()
        {            
            var returnIndex;

            if (direction == 'forward')
                    {
                        //req next coord set (forward)
                        if (index != targetIndex)
                        {
                            if (index == pointsArray.length-1) {index = 0} else {index++};
                            returnIndex = index;
                        }
                        else
                        {
                            returnIndex = undefined;
                        }
                    }
                    else //direction = 'backward'                
                    {
                        //req next coord set (backward)
                        if (index != _targetIndex)
                        {
                            if (index == 0) {index = pointsArray.length-1} else {index--};
                            returnIndex = index; 
                        }
                        else
                        {
                            returnIndex = undefined;
                        }
                    } 
            
            return returnIndex;
        }                
    }

    this.play = function (noJoints, direction, looping)
    {
        //default params
        direction = typeof direction !== 'undefined' ? direction : 'forward';
        looping = typeof looping !== 'undefined' ? looping : false;

        noJointsToPas = noJoints;
        
        instance.isPlaying = true;

        animateToNextIndex();
    
        //animate function
        function animateToNextIndex()
        {
            var currentX, currentY;
            if (index == 0)
            {
                currentX= pointsArray[index].x//domElement.position().left;
                currentY = pointsArray[index].y//domElement.position().top
            }
            else
            {
                currentX= pointsArray[index-1].x//domElement.position().left;
                currentY = pointsArray[index-1].y
            }

            var targetX = pointsArray[index].x - relativeOffsetX;
            var targetY = pointsArray[index].y - relativeOffsetY;            

            //calculate duration in order to achieve constant animation speeds trough different bezier curve sectors
            var distance = Math.sqrt(Math.pow((targetX-currentX),2) + Math.pow((targetY-currentY),2));
            var duration = distance/pixelsPerSecond*1000;

            //Check if rotation of domElement is desired
            if(instance.config.useRotation == true)
            {
                //console.log(Tools.getAngleToPoint(domElement, {'x':targetX, 'y':targetY}))
                //TweenLit.rotateTo(domElement, Tools.getAngleToPoint(domElement, {'x':targetX, 'y':targetY})+instance.config.rotationOffset)
                var degrees = Tools.getAngleToPoint({'x':currentX, 'y':currentY}, {'x':targetX, 'y':targetY});
                TweenLit.rotateTo(domElement, degrees+instance.config.rotationOffset, 0);
                
                //Tools.rotateToPoint(domElement, {'x':targetX, 'y':targetY}, instance.config.rotationOffset)
            }
            
            domElement.animate
            (
                {left: targetX, top: targetY},
                {duration: duration,
                 queue: false,
                  easing:"linear",
                 // progress: function(){Tools.rotateToPoint(domElement, {'x':targetX, 'y':targetY}, 90)},
                   complete:requestNewCoordsSet}                              
            )     
        }

        function requestNewCoordsSet()
        {
            if (direction == 'forward')
            {
                if(index == pointsArray.length-1)
                {
                    trace("Animation END");
                    instance.isPlaying = false;
                    
                    //check if callback is defined then run it
                    if(instance.onEndReached!=undefined)
                    {
                        instance.onEndReached();
                    }

                    if(currentJoint === noJointsToPas)
                    {
                        trace("Bezier joint reached");
                        instance.isPlaying = false;

                        //check if callback is defined then run it
                        if(instance.onJointReached!=undefined)
                        {
                            instance.onJointReached()
                        }
                    }
                }
                else
                {
                    if(currentJoint != noJointsToPas)
                    {
                        index++;

                        if(pointsArray[index].isJoint)
                        {
                            currentJoint++;
                        }  
                        animateToNextIndex();
                    }
                    else
                    {
                        trace("Bezier joint reached");
                        instance.isPlaying = false;

                        //check if callback is defined then run it
                        if(instance.onJointReached!=undefined)
                        {
                            instance.onJointReached()
                        }
                    }                
                } 
            }
            else //direction is 'backward' 
            {

            }          
        }        
    }

    this.enablePathDrag = function(animateOnDrag, positionUpdateRate) //lazy distance
    {
        //default params
        animateOnDrag = typeof animateOnDrag !== 'undefined' ? animateOnDrag : false;
        positionUpdateRate = typeof positionUpdateRate !== 'undefined' ? positionUpdateRate : 50;

        var interval;
        var mouseX;
        var mouseY;
        var tempLazyDistance;
        var closestPoint;        

        domElement.on('mousedown', onDomElementDown);
        
        function onDomElementDown(event)
        {
            $(document).on('mouseup', onDomElementUp)

            //get offset of container relative to the document
            containerOffsetX = container.offset().left;
            containerOffsetY = container.offset().top;

            //update mouse pos
            $(document).on('mousemove', updateMousePos);

            interval = setInterval(function(){updateDomElementPosition()}, positionUpdateRate);
        }

        function onDomElementUp()
        {
            //update mouse pos
            $(document).off('mousemove', updateMousePos);
            $(document).off('mouseup', onDomElementUp)

            clearInterval(interval);
        }

        function updateDomElementPosition()
        {
            //assume closest point
            closestPoint = pointsArray[0];
            closestPoint.lazyDistance = Math.pow((mouseX - closestPoint.x), 2) + Math.pow((mouseY - closestPoint.y), 2);
           
            for (var i=1; i < pointsArray.length; i++)                
            {
                tempLazyDistance = Math.pow((mouseX - pointsArray[i].x), 2) + Math.pow((mouseY - pointsArray[i].y), 2);

                if(tempLazyDistance < closestPoint.lazyDistance)
                {
                    closestPoint = pointsArray[i];
                    closestPoint.lazyDistance = tempLazyDistance;                   
                }
            } 

            //we got the closestPoint now; update the index; move the element to closestPoint          
            var targetIndex = pointsArray.indexOf(closestPoint);

            if (!animateOnDrag)
            {
                domElement.css({"left":closestPoint.x+"px", "top":closestPoint.y+"px"});

                //update the index
                index = targetIndex;
            }
            else
            {
                //trace(targetIndex)
                instance.animateToIndex(targetIndex);
            }
        }

        function updateMousePos(event)
        {
            mouseX = (event.pageX - containerOffsetX)/instance.scaleRatio;
            mouseY = (event.pageY - containerOffsetY)/instance.scaleRatio;
        }

    }

    this.pause = function ()
    {
        //stops animate
        domElement.stop();

        instance.isPlaying = false;
    }

    this.resume = function ()
    {
        if (!instance.isPlaying){instance.play()}
        else
        {
            instance.pause(); 
            //trow error
            jQuery.error("The animation you are trying to resume is already playing");
        };        
    }

    this.rewind = function ()
    {
        instance.pause();
        instance.prepare();        
        index = 0;
    }

    this.gotoAndPlay = function ()
    {
        //TODO
        //trow error
        jQuery.error("Coming soon");
    }

    this.gotoAndStop = function ()
    {
        //TODO
        //trow error
        jQuery.error("Coming soon");
    }

    this.setAnimationSpeed = function ()
    {
        //TODO
        //trow error
        jQuery.error("Coming soon");
    }

    this.drawPoints = function ( pointColor, pointRadius )
    {
        trace('drawing')
        if (!canvas) { buildCanvas() };          

        for (var i=0; i < pointsArray.length; i++)
        {
            if(!pointsArray[i].isJoint)
            {                  
                    context.beginPath();
                    context.arc(pointsArray[i].x, pointsArray[i].y, pointRadius, 0, 2 * Math.PI, false);
                    context.fillStyle = pointColor;
                    context.fill();
            }
           
        }                
         
    }

    this.drawLines = function ( lineColor, lineWidth )
    {
        if (!canvas) { buildCanvas() };

        for (var i=0; i < pointsArray.length-1; i++)
        {
            context.beginPath();
            context.moveTo(pointsArray[i].x, pointsArray[i].y);
            context.lineTo(pointsArray[i+1].x, pointsArray[i+1].y);
              context.lineWidth = lineWidth;

              // set line color
              context.strokeStyle = lineColor;
              context.stroke();
        }

           
    }

    this.drawNodes = function ( pointColor, pointRadius )
    {
        if (!canvas) { buildCanvas() };

        for (var i=0; i < pointsArray.length; i++)
        {
            if(pointsArray[i].isJoint)
            {                  
                    context.beginPath();
                    context.arc(pointsArray[i].x, pointsArray[i].y, pointRadius, 0, 2 * Math.PI, false);
                    context.fillStyle = pointColor;
                    context.fill();
            }           
        }             
    }

    //internal methods
    function updateProgress()
    {
        instance.progress = Math.round((index * 100)/pointsArray.length);
        if (instance.onUpdateProgress) {instance.onUpdateProgress()};        
    }

    function buildCanvas()
    {
        var canvasElement = $("<canvas></canvas>");
            canvasElement.css('position','absolute');
            canvasElement.css('top','0px');
            canvasElement.css('left','0px')
            
        
        canvas = canvasElement[0];
        canvas.width = container.width();
        canvas.height = container.height();
        container.append(canvas);
        
        context = canvas.getContext('2d');
    }

    function tweenToIndex(indexValue, onTweenComplete, speed)
    {
        var animateSpeed;
        if(speed!=undefined)
        {
            animateSpeed = speed;
        }
        else
        {
            animateSpeed = pixelsPerSecond;
        }
        var currentX, currentY;
        if (index == 0)
        {
            currentX= pointsArray[index].x//domElement.position().left;
            currentY = pointsArray[index].y//domElement.position().top
        }
        else
        {
            currentX= pointsArray[index-1].x//domElement.position().left;
            currentY = pointsArray[index-1].y
        }

        var targetX = pointsArray[index].x - relativeOffsetX;
        var targetY = pointsArray[index].y - relativeOffsetY;            

        //calculate duration in order to achieve constant animation speeds trough different bezier curve sectors
        var distance = Math.sqrt(Math.pow((targetX-currentX),2) + Math.pow((targetY-currentY),2));
        var duration = distance/animateSpeed*1000;

        //Check if rotation of domElement is desired
        if(instance.config.useRotation == true)
        {
            //console.log(Tools.getAngleToPoint(domElement, {'x':targetX, 'y':targetY}))
            //TweenLit.rotateTo(domElement, Tools.getAngleToPoint(domElement, {'x':targetX, 'y':targetY})+instance.config.rotationOffset)
            var degrees = Tools.getAngleToPoint({'x':currentX, 'y':currentY}, {'x':targetX, 'y':targetY});
            TweenLit.rotateTo(domElement, degrees+instance.config.rotationOffset, 0);
            
            //Tools.rotateToPoint(domElement, {'x':targetX, 'y':targetY}, instance.config.rotationOffset)
        }            

        //Run the animate
        domElement.animate
        (
            {left: targetX, top: targetY},
            {
                duration: duration, queue: false, easing:"linear",
                complete:function(){onTweenComplete(), updateProgress()} }                              
        )     
    }
}  