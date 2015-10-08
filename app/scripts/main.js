function timerObj(duration){
	return{
		duration: duration,
		timer: duration,
		interval: 1000,
		isRunning: false,
		intervalHandle: null
	};
}

var catchup = timerObj(25);

function counterObj(){
	return{
		increment: function(timerObj){
			timerObj.timer += 1;
		},
		decrement: function(timerObj){
			timerObj.timer -= 1;
		},
		startTimer: function(timerObj){
			if(!timerObj.isRunning){
				timerObj.isRunning = true;
				timerObj.intervalHandle = setInterval(function(){
					if(timerObj.timer > 0){
						timerObj.timer -= 1;
						console.log(timerObj.timer);
					} else {
						clearInterval(timerObj.intervalHandle);
						timerObj.isRunning = false;
						console.log("Countdown complete");
					}
					
					}, timerObj.interval);
				} else {
					return;
				}
		},
		stopTimer: function(timerObj){
			if(timerObj.isRunning){
				clearInterval(timerObj.intervalHandle);
				timerObj.isRunning = false;
			}else{
				console.log("Timer isn't running!");
				return;
			}
		}
	}
}

var counter = counterObj();