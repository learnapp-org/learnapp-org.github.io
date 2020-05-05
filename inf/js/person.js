var person = $(".person");
var personText = $(".person-text");
var audioHeroCome = new Audio("sounds/hero-come.mp3");
	
function personShow(){
    person.show();
    animate(person,"fadeInRightBig");
}

function personTextShow(){
    personText.show();
    animate(personText,"fadeIn");
}

function personTextHide(){
    animate(personText,"fadeOut");
    setTimeout(function(){
        personText.hide();
    },1000);
}

function personHide(){
     animate(person,"fadeOutRightBig");
     setTimeout(function(){
        person.hide();
    },1000);
}
function personCome(){
    personShow(); 
    audioHeroCome.play();
       setTimeout(function(){
        personTextShow();
    },1000);
}

function personEscape(){
     personTextHide();    
     audioHeroCome.play();
       setTimeout(function(){
        personHide();
    },300);
}

function personSmiling(){
    person[0].classList.add("person-2");
}

function personShy(){
//     person.classList.remove(person.classList.item(1));   
    person[0].classList.add("person-3");   
}