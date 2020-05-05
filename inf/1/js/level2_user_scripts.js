/*jshint browser:true */
/*global $ */
          
          var progress = 0;
          var count = 7;
        var correct = 0; 
        var seconds = 0;
        var timeForTaskInSeconds = 10*60;

        var data = [
            ["Вопрос1", ["Прав1", "Прав2", "Прав3", "Прав4"],
            ["Неправ1"]
            ],
            ["Вопрос2", ["Прав1", "Прав2", "Прав3"],
            ["Неправ1", "Неправ2"]
            ],
            ["Вопрос3", ["Прав1", "Прав2"],
            ["Неправ1", "Неправ2", "Неправ3"]
            ],
            ["Вопрос4", ["Прав1", "Прав2"],
            ["Неправ1", "Неправ2", "Неправ3"]
            ],
            ["Вопрос5", ["Прав1", "Прав2"],
            ["Неправ1", "Неправ2", "Неправ3"]
            ],
          ["Вопрос6", ["Прав1", "Прав2"],
            ["Неправ1", "Неправ2", "Неправ3"]
            ],
                  ["Вопрос7", ["Прав1", "Прав2"],
            ["Неправ1", "Неправ2", "Неправ3"]
            ],
                            ["Вопрос8", ["Прав1", "Прав2"],
            ["Неправ1", "Неправ2", "Неправ3"]
            ],
                            ["Вопрос9", ["Прав1", "Прав2"],
            ["Неправ1", "Неправ2", "Неправ3"]
            ],
            ["Вопрос10", ["Прав1", "Прав2"],
            ["Неправ1", "Неправ2", "Неправ3"]
            ]
            ];
            
            var colorCorrect = "orange";
             var randsQuest = new Array(data.length);
          console.log("randsQuest.length = ",randsQuest.length);
          for(var i=0;i<randsQuest.length;i++){
              randsQuest[i] = i;
          }
            shuffle(randsQuest);
          
          var variants = [1, 2, 3, 4, 5];

          function quantityChange(progress) {
              var counter = document.getElementById("counter");
              counter.innerHTML = progress + "/" + count;
              //$('#counter').html() = counter;
          }
            
          function resetCheckBox(id) {
              var el = document.getElementById(id);
              el.checked = false;
              reset(el);
          }

          function shuffle(a) {
              var j, x, i;
              for (i = a.length; i; i--) {
                  j = Math.floor(Math.random() * i);
                  x = a[i - 1];
                  a[i - 1] = a[j];
                  a[j] = x;
              }
              return a;
          }

          
          changeData(); 
          
          function changeData() {
              if (progress > count) {
                  return;
              }
              console.log("shuffle = ", shuffle(variants));
              quantityChange(progress+1);            
              var item = data[randsQuest[progress]];
              $(".question").text(item[0]);
              //            CORRECT VARIANTS
              var i = 0;
              //           CORRECT ANSWERS
              while (i < item[1].length) {
                  document.getElementById("lb" + variants[i]).innerHTML = item[1][i];
                  document.getElementById("lb" + variants[i]).data = true;
                  resetCheckBox("cb" + variants[i]);
                  i++;
              }
              var k = 0;
              //           WRONG ANSWERS
              while (k < item[2].length) {
                  document.getElementById("lb" + variants[i]).innerHTML = item[2][k];
                  document.getElementById("lb" + variants[i]).data = false;
                  resetCheckBox("cb" + variants[i]);
                  k++;
                  i++;
              }

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
                  }else if(cb){ 
                      document.getElementById("lb" + i).style.color = colorCorrect;
                  }
              }
              if (right) {
                  var audio = new Audio("sounds/correct1.mp3");
                  audio.play();
                  correct++;
                  console.log("correct = ", correct);
              } else {
//                   var audio = new Audio("sounds/error1.mp3");
//                  audio.play();
              }
              
                setTimeout(function(){

                                progress++;
              if (progress < count) {
                  changeData();
                                      for (var i = 1; i <= 5; i++) {
                                 document.getElementById("lb" + i).style.color = "white";
                        }
                  
              } else {
                  console.log("GAME OVER");
                  showResult();
              }
                              },600);
                
              

              return false;
          });
      startTime();
      
function showResult() {
    var res = correct / count * 100;
    console.log("res = " + res);
    var time = document.getElementById('times').innerHTML;
    window.location.href = "result2.html?" + res + "&" + time;
}

function startTime() {
    seconds++;
    var seconds2 = timeForTaskInSeconds - seconds;
    if(seconds2<0){
  	  showResult();return;
  }
    var m = Math.trunc(seconds2 / 60);
    var s = seconds2 % 60;
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