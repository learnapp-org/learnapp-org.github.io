(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 169,
	height: 175,
	fps: 24,
	color: "#FFFFFF",
	manifest: []
};

// stage content:
(lib.canvas = function() {
	this.initialize();

	// Layer 1
	this.mc = new lib.arte_2211();
	this.mc.setTransform(160.8,-215.1,1,1,0,0,0,96.8,-302.9);

	this.addChild(this.mc);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(152.4,101.9,57.8,44.6);


// symbols:
(lib.arte_2214 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#232323").ss(0.5,0,0,22.9).p("Ag/gcQACgYAcgQQAhgTAlAUIARAQQAQAUgKAYIgZBAQgYAmgfgfQgLgSgLgVQgWgnABgOg");
	this.shape.setTransform(0,-0.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0932D").s().p("AgUBAIgWgnQgWgnABgOQACgYAcgQQAhgTAlAUIARAQQAQAUgKAYIgZBAQgNAVgQAAQgLAAgPgOg");
	this.shape_1.setTransform(0,-0.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1,p:{scaleY:1,y:-0.7}},{t:this.shape,p:{scaleY:1,y:-0.7}}]}).to({state:[{t:this.shape_1,p:{scaleY:0.79,y:-2.4}},{t:this.shape,p:{scaleY:0.79,y:-2.4}}]},2).to({state:[{t:this.shape_1,p:{scaleY:1.078,y:-0.1}},{t:this.shape,p:{scaleY:1.078,y:-0.1}}]},2).to({state:[{t:this.shape_1,p:{scaleY:0.9,y:-1.4}},{t:this.shape,p:{scaleY:0.9,y:-1.4}}]},2).to({state:[{t:this.shape_1,p:{scaleY:0.973,y:-0.9}},{t:this.shape,p:{scaleY:0.973,y:-0.9}}]},1).to({state:[{t:this.shape_1,p:{scaleY:0.684,y:-3.2}},{t:this.shape,p:{scaleY:0.684,y:-3.2}}]},2).to({state:[{t:this.shape_1,p:{scaleY:0.913,y:-1.3}},{t:this.shape,p:{scaleY:0.913,y:-1.3}}]},2).wait(2));

	// Layer 1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#730111").s().p("AgVBBQgshUACgWQACgXAcgKQAggMAmAUIAPADQAPAIgEAZQgEAegIANIgRAtQgNAVgQAAQgLAAgPgOg");
	this.shape_2.setTransform(0,0.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(13));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.4,-9.6,14.9,18.2);


(lib.arte_2213 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHASQgGgFgCgIQgCgHADgHQAEgIAGgCQAFgDAGAFQAHAEACAJQACAHgDAHQgDAJgHABIgEABQgDAAgFgDg");
	this.shape.setTransform(16.9,1.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282425").s().p("AgCA7QgTgBgNgSQgMgTABgWQACgZAOgRQAPgQARABQATABANASQAMASgBAXQgBAZgPAQQgOAQgQAAIgCAAg");
	this.shape_1.setTransform(18.8,-0.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgEAUQgGgCgEgHQgDgJACgGQACgJAHgEQAGgEAFABQAHADADAHQADAIgCAHQgCAIgGAFQgFADgDAAIgEgBg");
	this.shape_2.setTransform(-17,1.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282425").s().p("AgdArQgPgQgBgZQgBgXAMgSQANgTATgBQARAAAPAQQAOARACAZQABAWgMATQgNASgTABIgCABQgQAAgOgRg");
	this.shape_3.setTransform(-18.8,0.3);

	this.addChild(this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-23.5,-6.2,47,12.5);


(lib.arte_2212 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2 copy
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282425").s().p("AhSgmQAchCA6AHQAkAEAYAZQAWAXAHAvQAGAyhchhQhbhjAYDzQgyhGAchDg");
	this.shape.setTransform(17.7,-2.7,0.926,0.898,0,0,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282425").s().p("AgQACQhNAwAIgzQAGgoAVgVQAWgWAhgEQA2gFAaA6QAaA8guBAQgFiKhEAzg");
	this.shape_1.setTransform(17.5,-2.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#282425").s().p("AgZAuQhGAIALg8QAGgjAVgVQAWgWAhgEQA2gFAZA6QAbA8gvBAQgfg8gzARg");
	this.shape_2.setTransform(17.2,-2.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282425").s().p("Ag9BdQgyhGAchDQAchCA6AHQAkAEAYAZQAWAXAGAhQAOBMhCAkQgTALgXAAQgaAAgggMg");
	this.shape_3.setTransform(17,-1.9,0.926,0.898,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[]},1).wait(39));

	// Layer 2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282425").s().p("AhSgmQAchCA6AHQAkAEAYAZQAWAXAHAvQAGAyhchhQhbhjAYDzQgyhGAchDg");
	this.shape_4.setTransform(-17.2,-2,0.926,0.898);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282425").s().p("AhMgjQAag6A2AFQAhAEAWAWQAVAVAGAoQAIAzhNgwQhEgzgFCKQguhAAag8g");
	this.shape_5.setTransform(-17.2,-1.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#282425").s().p("AhMgjQAZg6A2AFQAhAEAWAWQAVAVAGAjQALA8hGgIQgzgRgfA8QgvhAAbg8g");
	this.shape_6.setTransform(-17.1,-1.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#282425").s().p("Ag9BdQgyhGAchDQAchCA6AHQAkAEAYAZQAWAXAGAhQAOBMhCAkQgTALgXAAQgaAAgggMg");
	this.shape_7.setTransform(-17.1,-1.4,0.926,0.898);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4}]}).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[]},1).wait(39));

	// Layer 3
	this.instance = new lib.arte_2213();
	this.instance.setTransform(-0.4,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:-1.8},59).to({x:1.6,y:0.6},63).to({x:-1.2,y:-2.3},47).to({x:-0.4,y:-0.5},40).wait(1));

	// Layer 1
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#282425").s().p("AhQgMQAtAVAkgBQAkgBAsgWQgdAfg0AAQg2AAgagcg");
	this.shape_8.setTransform(-18.2,8.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#282425").s().p("AhQgPQArAXAlABQAkABAtgVQgaAbg2AAQg0AAgdgfg");
	this.shape_9.setTransform(18.2,7.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#282425").s().p("AAHgeQANATgIARQgHATgTAHQAegZgJglg");
	this.shape_10.setTransform(16.2,-13.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#282425").s().p("AARgfQAKAZgMASQgMASgXACQAogTgDgsg");
	this.shape_11.setTransform(19,-14.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#282425").s().p("AgVAQQAggBALggQAAATgNAKQgJAGgHAAQgHAAgHgCg");
	this.shape_12.setTransform(21.6,-12.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#DBEFFC").s().p("Ag7A+QgUgbACgqQACgkAXgXQAVgVAfgCQAfgCAXAaQAWAaACAnQgEgcgRgUQgRgUgWAAQgYAAgSAZQgSAYAAAhQAAAZAKAVQAKAUAQAKQgigEgTgYgAA8BJIgEAIIgEACg");
	this.shape_13.setTransform(17.2,-1.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgnBPQgpgZADg+QACgjAXgXQAVgWAfgCQAxgDAVA4QAXA4glA+QgcAKgXAAQgYAAgUgMg");
	this.shape_14.setTransform(17.2,-1.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#282425").ss(1.5,0,0,22.9).p("AA8BZQAnhEgYg9QgXg+g1AEQggACgXAXQgZAZgCAnQgDBEAsAbQApAaA9gXg");
	this.shape_15.setTransform(17.2,-2.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#4E4E50").s().p("AgmBeQhCgkAOhLQAGgiAWgXQAYgZAkgEQA6gHAcBCQAcBDgyBGQggAMgaAAQgXAAgTgLg");
	this.shape_16.setTransform(16.6,-3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#282425").s().p("AgLAHQgIgSANgUQgJAmAeAZQgTgHgHgSg");
	this.shape_17.setTransform(-16.2,-13.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#282425").s().p("AgOAMQgMgSAKgZQgDAsAoATQgXgCgMgSg");
	this.shape_18.setTransform(-19,-14);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#282425").s().p("AgHAMQgOgKAAgTQALAgAgABQgHACgGAAQgJAAgHgGg");
	this.shape_19.setTransform(-21.6,-12.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#DBEFFC").s().p("AAhA8QAKgVAAgaQAAgggSgYQgSgZgYAAQgWAAgRAUQgRAUgEAcQACgnAWgaQAXgaAfACQAfACAVAVQAXAXACAjQACArgUAaQgTAZgjAEQARgKAKgUgAg3BRIgEgIIAIAKg");
	this.shape_20.setTransform(-17.2,-1.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("Ag3BRQglg+AXg4QAVg4AxADQAfACAVAWQAXAWACAkQADA9gpAZQgUANgYAAQgXAAgcgKg");
	this.shape_21.setTransform(-17.2,-1.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#282425").ss(1.5,0,0,22.9).p("Ag7BZQgnhEAYg+QAXg9A1ADQAgADAXAXQAZAZACAnQADBEgsAbQgpAag9gXg");
	this.shape_22.setTransform(-17.2,-1.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#4E4E50").s().p("Ag9BdQgyhGAchDQAchCA6AHQAkAEAYAZQAWAXAGAhQAOBMhCAkQgTALgXAAQgaAAgggMg");
	this.shape_23.setTransform(-16.6,-2.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]}).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},60).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},62).wait(88));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.6,-22.3,58,32.4);


(lib.arte_2211 = function() {
	this.initialize();

	// ochi
	this.instance = new lib.arte_2212();
	this.instance.setTransform(32.7,-53.4,1,1,0,0,0,2.5,-2.3);

	// gura
	this.gura = new lib.arte_2214();
	this.gura.setTransform(30.2,-37.5,1,1,0,0,0,-0.3,-0.1);

	this.addChild(this.gura,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(3.9,-73.4,57.8,44.6);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;