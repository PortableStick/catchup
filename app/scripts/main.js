function timerObj(duration, isCurrent){
	return{
		duration: duration,
		timer: duration * 60,
		interval: 1000,
		isRunning: false,
		intervalHandle: null,
		isCurrentTimer: isCurrent || false,
	};
}

function counterObj(){
	return{
		incrementMinutes: function(timerObj){
			timerObj.timer += 60;
		},
		decrementMinutes: function(timerObj){
			timerObj.timer -= 60;
			if(timerObj.timer < 0){
				timerObj.timer = 0;
			}
		},
		incrementSeconds: function(timerObj){
			timerObj.timer += 1;
		},
		decrementSeconds: function(timerObj){
			timerObj.timer -= 1;
			if(timerObj.timer < 0){
				timerObj.timer = 0;
			}
		},
		startTimer: function(timerObj, pendingTimer){
			var _this = this;
			if(!timerObj.isRunning && timerObj.isCurrentTimer){
				timerObj.isRunning = true;
				console.log(timerObj.timer); //debug
				timerObj.intervalHandle = (function(){
					return setInterval(function(){
					if(timerObj.timer > 0){
						timerObj.timer -= 1;
						console.log(timerObj.timer); //debug
					} else {
						clearInterval(timerObj.intervalHandle);
						timerObj.isRunning = false;
						console.log("Countdown complete"); //debug
						if(pendingTimer){
							_this.resetTimer(timerObj);
							timerObj.isCurrentTimer = false;
							pendingTimer.isCurrentTimer = true;
							_this.startTimer(pendingTimer, timerObj);
						}
					}
					
				}, timerObj.interval);
				})(_this)
			} 
		},
		stopTimer: function(timerObj){
			if(timerObj.isRunning){
				clearInterval(timerObj.intervalHandle);
				timerObj.isRunning = false;
			}else{
				console.log("Timer isn't running!");//debug
				return;
			}
		},
		resetTimer: function(timerObj){
			timerObj.timer = timerObj.duration * 60;
		},
		formatTime: function(timerObj){
			var minutes = (Math.floor(timerObj.timer/60)) < 10 ? "0" + Math.floor(timerObj.timer/60) : Math.floor(timerObj.timer/60),
				seconds = (timerObj.timer % 60) < 10 ? "0" + (timerObj.timer % 60) : timerObj.timer % 60;

			return {minutes: minutes.toString(), seconds: seconds.toString()}; 
		}
	}
}

function pomodoro(){

	return{
		workTimer: timerObj(25, true),
		breakTimer: timerObj(5),
		counterController: counterObj(),
		currentTimer: this.workTimer,
		pendingTimer: this.breakTimer,
		checkCurrent: function(){
			if(this.workTimer.isCurrentTimer){
				this.currentTimer = this.workTimer;
				this.pendingTimer = this.breakTimer;
			} else {
				this.currentTimer = this.breakTimer;
				this.pendingTimer = this.workTimer;
			}
		},
		toggleTimer: function(){
			this.checkCurrent();
			if(this.currentTimer.isRunning){
				this.counterController.stopTimer(this.currentTimer);
			} else {
				this.counterController.startTimer(this.currentTimer, this.pendingTimer);
			}
		},
		updateDOM: function(){
			var	workTime = this.counterController.formatTime(this.workTimer),
				breakTime = this.counterController.formatTime(this.breakTimer);

				$('#workTimer .timer .minutes').html(workTime.minutes);
				$('#workTimer .timer .seconds').html(workTime.seconds);
				$('#breakTimer .timer .minutes').html(breakTime.minutes);
				$('#breakTimer .timer .seconds').html(breakTime.seconds);
		},
		setupDOM: function(){
				var _this = this;

				//initialize timers
				this.updateDOM();

				//event handlers
				$('#toggleButton').click(function(){
					_this.toggleTimer();
					if($(this).html() === "Start"){
						$(this).html("Pause");
					} else {
						$(this).html("Start");
					}
				});

				$('#resetButton').click(function(){
					_this.counterController.resetTimer(_this.breakTimer);
					_this.counterController.resetTimer(_this.workTimer);
				});

				$('#incrementBreakTimer .minutes').click(function(){
					_this.counterController.incrementMinutes(_this.breakTimer);
					_this.updateDOM();
				});
				$('#decrementBreakTimer .minutes').click(function(){
					_this.counterController.decrementMinutes(_this.breakTimer);
					_this.updateDOM();
				});
				$('#incrementBreakTimer .seconds').click(function(){
					_this.counterController.incrementSeconds(_this.breakTimer);
					_this.updateDOM();
				});
				$('#decrementBreakTimer .seconds').click(function(){
					_this.counterController.decrementSeconds(_this.breakTimer);
					_this.updateDOM();
				});

				$('#incrementWorkTimer .minutes').click(function(){
					_this.counterController.incrementMinutes(_this.workTimer);
					_this.updateDOM();
				});
				$('#decrementWorkTimer .minutes').click(function(){
					_this.counterController.decrementMinutes(_this.workTimer);
					_this.updateDOM();
				});
				$('#incrementWorkTimer .seconds').click(function(){
					_this.counterController.incrementSeconds(_this.workTimer);
					_this.updateDOM();
				});
				$('#decrementWorkTimer .seconds').click(function(){
					_this.counterController.decrementSeconds(_this.workTimer);
					_this.updateDOM();
				});

				setInterval(_this.updateDOM.bind(_this), 100);
		}
	}
}

var catchup = pomodoro();

catchup.setupDOM();

