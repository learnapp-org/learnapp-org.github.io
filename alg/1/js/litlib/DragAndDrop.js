/* 
v0.5.5
=DragAndDrop
 - fixed validation issue when auto-tinting (will give feedback only when the user tries to place a draggable object on
    an actual target zone)
- new callbacks and configs and properties:
    # useAutoLabelTint (like the name says) /config
    # tintAmount (the power of tint) /config
    # currentDropValidation (indicates if last drop was a valid or invalid drop)

v0.5
=DragAndDrop
- implemented auto-tint feature for button labels
- code refactoring

v0.4
=switcher
- fixed a validation bug when labels number would exceed 9 labels

v0.3.3
=DragAndDrop
- modified selector for draggable objects (searches for elements containing attribute 'target')
- fixed a bug on drop validation - it didn't keep count of containerDom offsets when comparing coords

v0.3.2
 *  =Switcher: 
 *  - fixed validation bug
 *  - spring cleaning  
    - improved shuffleing (it will reshuffle the array of words when in a rare case the shuffler returns the same initial array)

 *  v0.3
 *  - Working simple drag and drop
 *  - added preffered hittest method attribute (point or rectangle)

 *  v0.2 
 *  =Switcher:
 *  - can now add multiple valid indexes for labels like so index='1~2~5'
 *  - fixed multi-instance bug
 *  - fixed checkButton align for multi-instance
 *  - stability improved
 
 * v0.1 
 * 
 //TODO
  - debug mode

 *  Oprescul
 */ 

function DragAndDrop() {
}


DragAndDrop.build = function(id)
{
    //General error handling TODO    

    this.useAutoLabelTint = false;
    this.onRelease = undefined;
    this.onStartDrag = undefined;
    this.onValidate = undefined;
    this.onDragEnd = undefined;
    this.tintAmount = 0.5;

    this.onInvalidDrop = undefined;

    this.overrideValidDrop = undefined;
    this.overrideInvalidDrop = undefined;

    this.validationValue = false;
    this.currentDropValidation = undefined;
    this.init = undefined;
    this.reload = undefined;
    this.container = $(id);

    var instance = this;

     //globals
     var containerDom  = $(id);

     var currentDragObject = undefined;
     var currentDragOrigX = undefined;
     var currentDragOrigY = undefined;
     var currentDragIndex = undefined;

     var checkButton = containerDom.find("#checkButton");
     var resetButton = containerDom.find("#resetButton");


    //get drag type
    var type = containerDom.attr('type');
    
    switch (type) 
    {
        case "switcher":
            Switcher();
            break;

        case "simple_drag":
            SimpleDrag();
            break;    
    }
    
    function SimpleDrag()
    {
        //console.log("DragAndDrop id="+id+" is initializing");

       /* //default params
        this.validationType = "auto" //auto=on the ly; manual=check buttons

        //callbacks
        this.onDragEnd = undefined;

        this.onStartDrag = undefined;

        this.onReleaseDrag = undefined;

        this.onWrongMatch = undefined;*/


        //accessible methods and props

        this.validationValue = false;   

        //default params END    

        //config vars
        var ghostFadeTime = 200;
        var validationType = this.validationType;

        //defaults
        var hitTestType = containerDom.attr('hitTestType');
        var hitTestMethod = hitTest;

        //internal vars 
        var sourceDragArray = []; 
        var currentDragObject = null;
        var currentGhost = null;

        var targetsArray = [];
        var dropTargetsArray = [];

        //callbacks
        var onDragEndCallback = undefined;
        var onStartDragCallback = undefined;
        var onReleaseDragCallback = undefined;
        var onWrongMatchCallback = undefined;

        var validationType = undefined;

        instance.init = function()
        {
            //setup params
            onDragEndCallback = instance.onDragEnd;
            onStartDragCallback = this.onStartDrag;
            onReleaseDragCallback = this.onRelease;
            onWrongMatchCallback = this.onWrongMatch;

            validationType = instance.validationType;
            //END setup params            

            var sourceTargets = $(id).find($('[target]'))
            
            dropTargetsArray =  $(id).find($('[type="dropTarget"]'))            

            sourceTargets.each
            (
                function()
                {
                    var sourceDragObject = {};
                        sourceDragObject.domElement = $(this);
                        sourceDragObject.origX = $(this).position().left;
                        sourceDragObject.origY = $(this).position().top;
                        sourceDragObject.matchedElement = undefined;
                        sourceDragObject.isMatchValid = undefined;

                    //TOTO attempt to auto-tint images
                    if(instance.useAutoLabelTint)
                    {
                        //get image
                        var originalLabelImage = $(this).find('.sourceLabel');

                        //create new "master" canvas label to clone the original one
                        var labelCanvas = document.createElement('canvas');
                            labelCanvas.width = originalLabelImage[0].width;
                            labelCanvas.height = originalLabelImage[0].height;

                        var labelContex = labelCanvas.getContext('2d');                    
                            labelContex.drawImage(originalLabelImage[0],0,0);
                            //labelContex.globalAlpha = 0.5;

                        var $labelCanvas = $(labelCanvas);
                            $labelCanvas.css('position', 'absolute');
                            $labelCanvas.offset(originalLabelImage.position());                   

                        $(this).prepend(labelCanvas)

                        //remove original label img from dom
                        originalLabelImage.remove();

                        //create 3 image data buffers to hold (button idle, tint1, tint2 - states)
                            //idle state (normal image)
                            var idleStateBuffer = document.createElement('canvas');
                                idleStateBuffer.width = labelCanvas.width;
                                idleStateBuffer.height = labelCanvas.height;

                            var idleStateContext = idleStateBuffer.getContext('2d');
                                idleStateContext.drawImage(labelCanvas,0,0);

                            //tinted state "correct"
                            var correctStateBuffer = document.createElement('canvas');
                                correctStateBuffer.width = labelCanvas.width;
                                correctStateBuffer.height = labelCanvas.height;

                            var correctStateContext = correctStateBuffer.getContext('2d');
                                correctStateContext.fillStyle = '#00FF00'
                                correctStateContext.fillRect(0,0,labelCanvas.width,labelCanvas.height);

                                correctStateContext.globalCompositeOperation = "destination-atop";
                                correctStateContext.drawImage(labelCanvas,0,0);
                                correctStateContext.globalCompositeOperation = "source-over";
                                correctStateContext.globalAlpha = 1-instance.tintAmount; //alpha value seems to be inverted: 1=full transparency; 0=fully opaque 
                                correctStateContext.drawImage(labelCanvas,0,0);

                            //tinted state "wrong"
                            var wrongStateBuffer = document.createElement('canvas');
                                wrongStateBuffer.width = labelCanvas.width;
                                wrongStateBuffer.height = labelCanvas.height;

                            var wrongStateContext = wrongStateBuffer.getContext('2d');
                                wrongStateContext.fillStyle = '#FF0000'
                                wrongStateContext.fillRect(0,0,labelCanvas.width,labelCanvas.height);

                                wrongStateContext.globalCompositeOperation = "destination-atop";
                                wrongStateContext.drawImage(labelCanvas,0,0); 
                                wrongStateContext.globalCompositeOperation = "source-over";
                                wrongStateContext.globalAlpha = 1-instance.tintAmount;     //alpha value seems to be inverted: 1=full transparency; 0=fully opaque
                                wrongStateContext.drawImage(labelCanvas,0,0);


                                sourceDragObject.labelCanvas = labelCanvas;
                                sourceDragObject.labelContex = labelContex;
                                sourceDragObject.correctStateBuffer = correctStateBuffer;
                                sourceDragObject.wrongStateBuffer = wrongStateBuffer;
                                sourceDragObject.idleStateBuffer = idleStateBuffer;
                        }
                        

                        if($(this).attr('target'))
                        {
                           sourceDragObject.target = containerDom.find($(this).attr('target')); 

                           //keep track of targets  DELETE
                           targetsArray.push({domElement:sourceDragObject.target, placeHolder:null}) 
                        }
                        else
                        {
                            sourceDragObject.target = $(null);
                        }

                    //add mouse down events
                    sourceDragObject.domElement.on('mousedown' , onMouseDown);  

                    //push the object into array
                    sourceDragArray.push(sourceDragObject);  

                     //enable GPU rendering for this element: Fixes ipad6 bug - safari will drop gpu rendering on canvas
                     //that has either:context requested, or other drawing instructions
                     $(this).css
                     ({
                            "-webkit-transform": "translateZ(0)"
                     })

                }

            )
        }

        function tintLabel(sourceDragObject, string)
        {
            switch(string)
            {
                case 'correct':
                    sourceDragObject.labelContex.drawImage(sourceDragObject.correctStateBuffer,0,0);
                break;

                case 'wrong':
                    sourceDragObject.labelContex.drawImage(sourceDragObject.wrongStateBuffer,0,0);
                break;
            }
        }
        instance.lock =  function()
        {
             instance.container.addClass('disabled');
        }

        instance.unlock =  function()
        {
             instance.container.removeClass('disabled');
        }

        instance.reload = function()
        {          

            //slide the labels back
            $.each
            (
                sourceDragArray,
                function(index, value)
                {
                    TweenLit.slideTo(sourceDragArray[index].domElement, sourceDragArray[index].origX, sourceDragArray[index].origY, 500)
                    value.matchedElement = undefined;
                    value.isMatchValid = undefined;
                    value.target = $(value.domElement.attr('target'));

                    value.domElement.on('mousedown' , onMouseDown); 
                }
            )

            //reset vars the complete var
            instance.validationValue = false;
            currentDragObject = null;
            targetsArray = [];                
        }


        

        function autoDropValidation(index, event) //event is important (ipad6)
        {
            //get container offsets
            var offsetX = containerDom.offset().left;
            var offsetY = containerDom.offset().top;
     
            //validate drop
                //check for preferred hitTest method
                if (hitTestType == 'point')
                {
                    //using hit test point method
                    hitTestMethod = hitTestPoint;
                    hitTestMethod.params = new Array();
                    hitTestMethod.params[0] = sourceDragArray[index].target;
                    hitTestMethod.params[1] = {x:event.pageX- offsetX, y:event.pageY-offsetY};
                }
                else
                {
                    hitTestMethod = hitTest;
                    hitTestMethod.params = new Array();
                    hitTestMethod.params[0] = currentDragObject;
                    hitTestMethod.params[1] = sourceDragArray[index].target;
                }

                //test if drop is on a registered target (if drop is on ANY target)
                var targetFound = false;
                var targetElement;

                $.each
                (
                    dropTargetsArray,

                    function(index, value)
                    {                        
                        if(hitTestMethod($(value), hitTestMethod.params[1]))
                        {
                            
                            targetFound = true;
                            targetElement = $(value);
                            
                            return false;
                        }
                    }
                )

                if (targetFound)
                {            
                    if(sourceDragArray[index].target[0] == targetElement[0])
                    {
                        //DROP VALID
                        if(instance.overrideValidDrop)
                        {
                            instance.overrideValidDrop()
                        }
                        else
                        {
                            //store the response value for current drop
                            instance.currentDropValidation = true;

                            //disable button
                            currentDragObject.off();

                       //update sourceDrag state
                       sourceDragArray[index].matchedElement = sourceDragArray[index].target;
                       sourceDragArray[index].isMatchValid = true;                                      

                       //slide to target
                       TweenLit.slideTo(currentDragObject, sourceDragArray[index].target.position().left, sourceDragArray[index].target.position().top, 500, 'easeOutExpo')

                       //auto-tint
                       if(instance.useAutoLabelTint){tintLabel(sourceDragArray[index],'correct')}

                       //check for drag end
                       checkDragEnd();
                        }
                    }
                    else
                    {
                        //DROP GRESIT
                        if(instance.overrideInvalidDrop)
                        {
                            instance.overrideInvalidDrop();
                        }
                        else
                        {
                            //store the response value for current drop
                            instance.currentDropValidation = false;

                           //slide back to original coords
                            TweenLit.slideTo(currentDragObject, sourceDragArray[index].origX, sourceDragArray[index].origY, 500, "easeOutBounce");

                            //auto-tint
                            if(instance.useAutoLabelTint){tintLabel(sourceDragArray[index],'wrong')}

                            //run callback
                            if (instance.onInvalidDrop != undefined)
                            {
                                instance.onInvalidDrop();                            
                            } 
                        }                        
                    }
                }
                else
                {
                    //NO DROP ON ANY OF THE TARGETS
                    //slide back to original coords
                    TweenLit.slideTo(currentDragObject, sourceDragArray[index].origX, sourceDragArray[index].origY, 500, "easeOutBounce");
                    
                    //store the response value for current drop
                    instance.currentDropValidation = undefined;
                }

        }


        function onMouseDown(event)
        {
            //add mouse up event
            $(document).on('mouseup', onStageMouseUp);

            //get index of object in sourceDragArray containing this current domElement
            var index = getIndex($(this), sourceDragArray);

            currentDragObject = $(this);

            startDrag(currentDragObject, event);

            //check for ghosts
            if($(this).attr('ghost'))
            {
                currentGhost = $(id+' '+$(this).attr('ghost'));
                currentGhost.stop(true,true).fadeIn(ghostFadeTime);
            }

            //run the callback
            if(onStartDragCallback != undefined)
            {
                onStartDragCallback();
            }
        }

        function onStageMouseUp(event)  //simple drag
        {
            //stopDrag
            $(document).off('mousemove');

            //remove event
            $(document).off('mouseup' , onStageMouseUp);

            //get index of object in sourceDragArray containing this current domElement
            var index = getIndex(currentDragObject, sourceDragArray);

            //check if currentDrag is set
            if(currentDragObject!=null)
            {
                //check if it has a ghost and fade it out
                if(currentGhost!=null)
                {
                    currentGhost.stop(true,true).fadeOut(ghostFadeTime);
                }
            }

            autoDropValidation(index,event);

            //reset currentDragObject
            currentDragObject = null;

            //run the callback
            if(onReleaseDragCallback != undefined)
            {
                onReleaseDragCallback();
            }  
        }

        function startDrag(object, event)
        {
            object.stop();

            object.parent().append(object)

            var id = object.attr('id');

            var offset = {}
                offset.x = event.pageX - object.offset().left + containerDom.offset().left;
                offset.y = event.pageY - object.offset().top + containerDom.offset().top;                

            $(document).on('mousemove', function (event)
                {                    
                    onDragMove(object, offset, event)
                });
        }

        
        function onDragMove(object, offset, event)
        {
          object.css({
                        top: event.pageY - offset.y, //keep into account document offsetTop
                        left: event.pageX - offset.x //keep into account document offsetTop
                    });
        }

        function getIndex(objectValue, inObjectArray)
        {
            var foundIndex = null;

            $.each
            (
                inObjectArray,

                function(index, value)
                {
                    if(value.domElement[0] == objectValue[0])
                    {
                        foundIndex = index;
                        return
                    }
                }
            )           

            if(foundIndex != null){return foundIndex}
            else
            {
                //trow error
                jQuery.error("DOM element not found in sourceTargets")
            }
        }

        function checkDragEnd()
        {
            var dragEnd = true;

            $.each
            (
                sourceDragArray,

                function(index, value)
                {
                    if((value.target[0]) && (!value.isMatchValid)){dragEnd = false}
                }
            )

            if(dragEnd == true)
            {
                instance.validationValue = true;
                if(instance.onDragEnd != undefined)
                {                    
                    instance.onDragEnd();                    
                }
                else
                {
                    //trace("NOT calling callback")
                }                
            }
        }
    }

    function Switcher()
    {
        //TODO lock drag       
        //TODO reset button ? do we need?

        //check if mandatory attributes are defined
        if ( (containerDom.attr('width')) && (containerDom.attr('height')) )
        {
            containerDom.width(containerDom.attr('width'));
            containerDom.height(containerDom.attr('height'));
        }
        else
        {
            //trow error
            jQuery.error("You must specify the 'width' and 'height' attribute of your drag and drop container")
        }

        //verify for check and reset buttons
        if (containerDom.find("#checkButton").length <= 0)        
        {
            //trow error
            jQuery.error("I cannot find id '#checkButton'. Make sure you have this element present in your drag container ")
        }

        //vars
        var labelObjectArray = [];
        var buttonsArray = [];

        //callbacks 
        var onValidateCallback = undefined;

        //config vars
        var labelPadding = 5;//px
        var labelAlphaOnDrag = 1;

        instance.init = function()
        {
            //just in case our drag is hidden we need to show it for a brief period in order to have access to elements metrics
            //we append it temporarly to a div that is not hidden
            
            //TODO i think it may be done better without using parrent container or maybe without appending ?
            var parentContainer = containerDom.parent();
            var tempContainer = $("<div id='tempDiv' style='visibility: hidden'></div>");
                tempContainer.append(containerDom);

            $('body').append(tempContainer);
           
            //setup params
            onValidateCallback = instance.onValidate;
            onStartDragCallback = this.onStartDrag;
            onReleaseDragCallback = this.onReleaseDrag;
            onWrongMatchCallback = this.onWrongMatch;
            //END setup params 

            //add events for check and reset
            checkButton.on('mousedown', validationButtonHandler);
            // resetButton.on('mousedown', resetButtonHandler);

            //disable validation button
            disableButton(checkButton);
           
            //align validation buttons
            alignValidationButtons();

            var labelBackgroundSource = containerDom.find("#labelBackground");                
            var labelWidth = labelBackgroundSource.width();
            var labelHeight = labelBackgroundSource.height();

            containerDom.find("label").each
            (
                function(index)
                {
                    var labelBackground = new NinePatch(labelBackgroundSource, {x:10,y:10,width:labelWidth-20,height:labelHeight-20});

                    var labelObject = {};
                        //extract text
                        labelObject.text = $(this).text();  

                        //define the label button container                     
                        labelObject.labelContainer = $("<div id="+"switcherLabel"+index+" class='labelContainerDiv'></div>");
                            //append it
                            containerDom.append(labelObject.labelContainer);

                        //append the text
                        labelObject.labelContainer.html("<span class='labelSpan'>"+labelObject.text+"</span>");                       

                        //resize the nine patch background now that we have the label divs created
                        var labelSpan = labelObject.labelContainer.find("span");
                        var canvasWidth = labelSpan.outerWidth();
                        var canvasHeight = labelSpan.outerHeight();                       
                       
                        labelBackground.setCanvasWidth(canvasWidth);
                        labelBackground.setCanvasHeight(canvasHeight);

                        labelObject.labelContainer.width(canvasWidth);
                        labelObject.labelContainer.height(canvasHeight);

                        //store the additional info
                        labelObject.width = canvasWidth;
                        labelObject.height = canvasHeight;
                        
                        //extract indexes
                            //we are goin to work with strings like "1~2~5"
                            //we need to separate the numbers from the coma and push those into vectors

                        labelObject.index = new Array();
                        var indexString = $(this).attr('index');

                        var stringArray = indexString.split('~');

                        //parse to float numbers
                        for (var j=0; j < stringArray.length; j++)
                        {
                            stringArray[j] = parseFloat(stringArray[j]);

                            labelObject.index.push(stringArray[j]);
                        }

                        labelObject.labelBackground = labelBackground.getContainer();

                        //append bg
                        labelSpan.before(labelBackground.getContainer());

                        //push to vectors
                        labelObjectArray.push(labelObject);
                        buttonsArray.push(labelObject.labelContainer); //easier to work with this in some methods

                        //assign mouse event
                        labelObject.labelContainer.on('mousedown' , onMouseDown);  
                }
            )

            //shuffle array (it is contained in a loop to prevent a rare case when shuffleing will return an valid array)
            var prevalidationResponse = true;
            do 
            {
               shuffle(labelObjectArray);
               prevalidationResponse = preValidation();
               
            } while (prevalidationResponse == true);

           

            //arrange labels
            arangeLabels ();

            //put the container back
            parentContainer.append(containerDom);
        }

        function onMouseDown (event)
        {
            //add mouse up event
            $(document).on('mouseup', onStageMouseUp);           

            currentDragObject = $(this);
            currentDragOrigX = $(this).attr('origX');
            currentDragOrigY = $(this).attr('origY');

            startDrag($(this), event);  
            $(this).stop();
            TweenLit.alphaTo($(this), labelAlphaOnDrag, 100);         
        }

        function onStageMouseUp(event)
        {
            stopDrag();
            currentDragObject.stop();
            TweenLit.alphaTo(currentDragObject, 1, 100); 

            //remove event
            $(document).off('mouseup' , onStageMouseUp);

            //run the callback
            if(instance.onRelease != undefined)
            {
                instance.onRelease();
            }

            //drop validation
            var hitTarget = undefined;

            var offsetX = containerDom.offset().left;
            var offsetY = containerDom.offset().top;

            $.each
            (
                buttonsArray,
                function(index, value)
                {
                    if(value.attr('id') != currentDragObject.attr('id'))
                    {
                        if(hitTestPoint(value, {x:event.pageX - offsetX, y:event.pageY-offsetY}))
                        {
                            hitTarget = value;

                            return false
                        }
                    }                  
                }
            )           

            if(hitTarget == undefined)
            {
                //invalid drop - no switch needed - slide back
                TweenLit.slideTo(currentDragObject, currentDragOrigX, currentDragOrigY, 500, "easeOutBounce");
            }
            else
            {
                //we have valid drop

                //enable validation buts
                enableButton(checkButton);
                enableButton(resetButton);

                //switch back
                switchLabelsIndex(currentDragObject, hitTarget);
                arangeLabels();
            }

        }

        function validate()
        {
            var validationResponse = preValidation();            

            if (validationResponse)
            {
                //validationResponse true   
                instance.validationValue = true;
                //lock the drag
                lockDrag();
            }
            else
            {
                //validationResponse false
                instance.validationValue = false;
            }

            //check for handler
            if(onValidateCallback != undefined)
            {
                //calling callback
                onValidateCallback();
            }
        }

        function preValidation()
        {
            var validationResponse = true;
            var currentIndex = 1;
            
            $.each
            (               
                labelObjectArray,
                function(index, value)
                {

                    var isIndexFound = false;

                    for (var i=0; i<value.index.length ; i++)
                    {

                        if(value.index[i] == currentIndex)
                        {
                           isIndexFound = true;
                           //console.log('index found')

                           break;
                           //return false;
                        }
                        
                    }

                    if(!isIndexFound)
                    {
                        //console.log("breaking each loop")
                        validationResponse = false;

                        //break the "each" loop
                        return false;
                    }
                    else
                        {
                            //console.log("not breaking each loop")
                            currentIndex++
                        }
                }
            )
            
            return validationResponse

        }

        function switchLabelsIndex(a, b)
        {
            var indexA
            var indexB

            $.each
            (
                labelObjectArray,
                function(index, value)
                {
                    if(a.attr('id') == value.labelContainer.attr('id'))
                    {
                        indexA = index;

                        return false;
                    }
                }
            )

            $.each
            (
                labelObjectArray,
                function(index, value)
                {
                    if(b.attr('id') == value.labelContainer.attr('id'))
                    {
                        indexB = index;

                        return false;
                    }
                }
            )

            //switch them
            var tempObject = labelObjectArray[indexA];
            labelObjectArray[indexA] = labelObjectArray[indexB];
            labelObjectArray[indexB] = tempObject;
        }

        function arangeLabels () //by labelObjectArray index order
        {
            var posX = 0;
            var posY = 0;

            $.each
            (
                labelObjectArray,
                function(index, value)
                {
                    TweenLit.slideTo(value.labelContainer, posX, posY, 500);

                    //store the position
                    value.labelContainer.attr('origX', posX);
                    value.labelContainer.attr('origY', posY);

                    //increment pos for next label button
                    posX += value.width + labelPadding;

                    if(labelObjectArray[index+1])
                    {
                        //verify if we need to skip to next row
                        if(posX+labelObjectArray[index+1].width > containerDom.width())
                        {
                            posX = 0;
                            posY += value.height + labelPadding;                       
                        }
                    }
                    
                }
            )
        }

        function startDrag(object, event)
        {
            object.stop();
            object.parent().append(object);

            var offset = {}
                offset.x = event.pageX - object.offset().left + containerDom.offset().left;
                offset.y = event.pageY - object.offset().top + containerDom.offset().top;          

            $(document).on('mousemove', function (event)
                {                    
                    onDragMove(object, offset, event)
                });
        }

        function stopDrag()
        {
            $(document).off('mousemove');
        }

        function onDragMove(object, offset, event)
        { 
          object.css({
                        top: event.pageY - offset.y, //keep into account document offsetTop
                        left: event.pageX - offset.x //keep into account document offsetTop

                    });
          if ((event.pageX-containerDom.offset().left < 0) ||
                (event.pageY-containerDom.offset().top < 0) ||
                (event.pageX > containerDom.width() + containerDom.offset().left) ||
                (event.pageY > containerDom.height() + containerDom.offset().top))
          {
            var e = $.Event( "mouseup", { pageX: event.pageX, pageY: event.pageY } );
            // Triggers it on the body.
            $(document).trigger(e);
          }
        }

        function alignValidationButtons()
        {
            checkButton.css({position: 'absolute', right:"75px", top: containerDom.height() + 10})
            resetButton.css({position: 'absolute', right:"147px", top: containerDom.height() - 35})
        }

        function disableButton(target)
        {
            target.css({opacity: 0.5});
            target.addClass('disabled');
        }

        function enableButton(target)
        {
            target.css({opacity: 1});
            target.removeClass('disabled');
        }

        function validationButtonHandler(event)
        {
            //start validation
            validate();
            disableButton($(this));
        }

        function resetButtonHandler(event)
        {
            //TODO
        }

        function lockDrag()
        {
            $.each
            (
                labelObjectArray,
                function(index, value)
                {
                    value.labelContainer.off();
                    value.labelBackground.css({opacity: 0.8})
                }
            )
        }
    }
}







function hitTest(a, b) {
//edit v0.1
    if ($(a).is(b))
        {
            return false
        };

        var aTop = a.offset().top;

        var aLeft = a.offset().left;

        var aBottom = a.offset().top + a.height()-0;

        var aRight = a.offset().left + a.width()-0;

                    

        var bTop = b.offset().top;

        var bLeft = b.offset().left;

        var bBottom = b.offset().top + b.height();

        var bRight = b.offset().left + b.width();



        return !( bLeft > aRight || bRight < aLeft || bTop > aBottom || bBottom < aTop);

    };

function hitTestPoint(object, point) {   


        var aTop = object.position().top;

        var aLeft = object.position().left;

        var aRight = aLeft + object.width();

        var aBottom = aTop + object.height();                    

        var pointTop = point.y;

        var pointLeft = point.x;

        return !(pointLeft > aRight || pointLeft < aLeft || pointTop > aBottom || pointTop < aTop);

    };



function clamp( min , x , max ) {

        if(x < min) return min;

        if(x > max) return max;

        return x;

    };

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

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



