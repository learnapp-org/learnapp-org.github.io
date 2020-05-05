/*jshint browser:true */
/*global $ */

    /*
      hook up event handlers 
      */
    function register_event_handlers() {

        window.onload = init;

        //console.log(1);



        function init() {

            var progress = 0;
            var count = 5;
            var correct = 0; //
            var counter = (progress + 1) + "/" + count;
            console.log(1);
            document.getElementById('counter').innerHTML = counter;

            startTime();

            function showResult() {
                var res = correct / count * 100;
                console.log("res = " + res);
                var time = document.getElementById('times').innerHTML;

                window.location.href = "result.html?" + res + "&" + time;
            }

            /* button  Проверить */
            $(document).on("click", ".uib_w_14", function(evt) {

                var right = true;
                for (var i = 1; i <= 5; i++) {
                    var cb = document.getElementById("cb" + i).checked;
                    var data1 = document.getElementById("lb" + i).data;

                    if (data1 != cb) {
                        right = false;
                        break;
                    }
                }
                if (right) {
                    correct++;
                    console.log("correct = ", correct);
                } else {

                }
                progress++;
                if (progress < data.length) {
                    changeData();
                } else {
                    console.log("GAME OVER");
                    showResult();
                }
                return false;
            });
        }


    }
    
document.addEventListener("app.Ready", register_event_handlers, false);

var seconds = 0;

function startTime() {
    seconds++;
    var m = Math.trunc(seconds / 60);
    var s = seconds % 60;
    m = FullTime(m);
    s = FullTime(s);
    document.getElementById('times').innerHTML = m + ":" + s;
    t = setTimeout('startTime()', 1000);
}

function FullTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}