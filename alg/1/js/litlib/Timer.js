/*
 * 
 * v0.1 
 */
 //
function Timer() {
}

var timerOn = false;

Timer.countDown = function (timeDiv,time,func)
    {
        timerOn = true;
        var timeCount = time;
        var minStr,secStr,timeStr;
        countTime();
        function countTime()
        {
            if (timerOn == true)
            {
                timeCount -= 1;
                if (timeCount > 0)
                {
                    minStr = Math.floor(timeCount/60);
                    secStr = timeCount % 60;
                    if (secStr >= 10)
                    {
                        timeStr = "0"+minStr+":"+secStr;
                    }else
                    {
                        timeStr = "0"+minStr+":0"+secStr;
                    }
                    timeDiv.text(timeStr);
                    setTimeout(countTime,1000);
                }else
                {
                    timeDiv.text("00:00");
                    timerOn = false;
                    func();
                }
            }
        }   
    }

Timer.pause = function ()
    {
        timerOn = false;
    }

