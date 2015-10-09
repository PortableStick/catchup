function timerObj(duration){
	return{
		duration: duration,
		timer: duration * 60,
		interval: 1000,
		isRunning: false,
		intervalHandle: null
	};
}

function counterObj(){
	return{
		increment: function(timerObj){
			timerObj.timer += 60;
		},
		decrement: function(timerObj){
			timerObj.timer -= 60;
		},
		startTimer: function(timerObj){
			if(!timerObj.isRunning){
				timerObj.isRunning = true;
				console.log(timerObj.timer);
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
		},
		resetTimer: function(timerObj){
			timerObj.timer = timerObj.duration * 60;
		},
		formatTime: function(timerObj){
			var minutes = (Math.floor(timerObj.timer/60)) < 10 ? "0" + Math.floor(timerObj.timer/60) : Math.floor(timerObj.timer/60),
				seconds = (timerObj.timer % 60) < 10 ? "0" + (timerObj.timer % 60) : timerObj.timer % 60;

			return minutes + ":" + seconds; 
		}
	}
}

function pomodoro(){
	return {
		workTimer: timerObj(25),
		breakTimer: timerObj(5),
		counterController: counterObj()
	}
}

