
    function timerObj(duration, isCurrent) {
        return {
            duration: duration,
            timer: duration * 60,
            interval: 1000,
            isRunning: false,
            intervalHandle: null,
            isCurrentTimer: isCurrent || false
        };
    }

    function counterObj() {
        return {
            incrementMinutes: function(currentTimerObj) {
                currentTimerObj.timer += 60;
            },
            decrementMinutes: function(currentTimerObj) {
                currentTimerObj.timer -= 60;
                if (currentTimerObj.timer < 0) {
                    currentTimerObj.timer = 0;
                }
            },
            incrementSeconds: function(currentTimerObj) {
                currentTimerObj.timer += 1;
            },
            decrementSeconds: function(currentTimerObj) {
                currentTimerObj.timer -= 1;
                if (currentTimerObj.timer < 0) {
                    currentTimerObj.timer = 0;
                }
            },
            startTimer: function(currentTimerObj, pendingTimer) {
                var context = this;
                if (!currentTimerObj.isRunning && currentTimerObj.isCurrentTimer) {
                    currentTimerObj.isRunning = true;
                    currentTimerObj.intervalHandle = (function() {
                        return setInterval(function() {
                            if (currentTimerObj.timer > 0) {
                                currentTimerObj.timer -= 1;
                            } else {
                                clearInterval(currentTimerObj.intervalHandle);
                                currentTimerObj.isRunning = false;
                                if (pendingTimer) {
                                    context.resetTimer(currentTimerObj);
                                    currentTimerObj.isCurrentTimer = false;
                                    pendingTimer.isCurrentTimer = true;
                                    context.startTimer(pendingTimer, currentTimerObj);
                                }
                            }
                        }, currentTimerObj.interval);
                    }(context));
                }
            },
            stopTimer: function(currentTimerObj) {
                if (currentTimerObj.isRunning) {
                    clearInterval(currentTimerObj.intervalHandle);
                    currentTimerObj.isRunning = false;
                } else {
                    return;
                }
            },
            resetTimer: function(currentTimerObj) {
                currentTimerObj.timer = currentTimerObj.duration * 60;
            },
            formatTime: function(currentTimerObj) {
                var minutes = (Math.floor(currentTimerObj.timer / 60)) < 10 ? '0' + Math.floor(currentTimerObj.timer / 60) : Math.floor(currentTimerObj.timer / 60),
                    seconds = (currentTimerObj.timer % 60) < 10 ? '0' + (currentTimerObj.timer % 60) : currentTimerObj.timer % 60;
                return {
                    minutes: minutes.toString(),
                    seconds: seconds.toString()
                };
            }
        };
    }

    function pomodoro() {

        return {
            workTimer: timerObj(25, true),
            breakTimer: timerObj(5),
            counterController: counterObj(),
            currentTimer: this.workTimer,
            pendingTimer: this.breakTimer,
            checkCurrent: function() {
                if (this.workTimer.isCurrentTimer) {
                    this.currentTimer = this.workTimer;
                    this.pendingTimer = this.breakTimer;
                } else {
                    this.currentTimer = this.breakTimer;
                    this.pendingTimer = this.workTimer;
                }
            },
            toggleTimer: function() {
                this.checkCurrent();
                if (this.currentTimer.isRunning) {
                    this.counterController.stopTimer(this.currentTimer);
                } else {
                    this.counterController.startTimer(this.currentTimer, this.pendingTimer);
                }
            },
            updateDOM: function() {
                var workTime = this.counterController.formatTime(this.workTimer),
                    breakTime = this.counterController.formatTime(this.breakTimer);

                $('#workTimer .timer .minutes').html(workTime.minutes);
                $('#workTimer .timer .seconds').html(workTime.seconds);
                $('#breakTimer .timer .minutes').html(breakTime.minutes);
                $('#breakTimer .timer .seconds').html(breakTime.seconds);
            },
            setupDOM: function() {
                var context = this;

                //initialize timers
                this.updateDOM();

                //event handlers
                $('#toggleButton').click(function() {
                    context.toggleTimer();
                    if ($(this).html() === 'Start') {
                        $(this).html('Pause');
                    } else {
                        $(this).html('Start');
                    }
                });

                $('#resetButton').click(function() {
                    context.counterController.resetTimer(context.breakTimer);
                    context.counterController.resetTimer(context.workTimer);
                });

                $('#incrementBreakTimer .minutes').click(function() {
                    context.counterController.incrementMinutes(context.breakTimer);
                    context.updateDOM();
                });
                $('#decrementBreakTimer .minutes').click(function() {
                    context.counterController.decrementMinutes(context.breakTimer);
                    context.updateDOM();
                });
                $('#incrementBreakTimer .seconds').click(function() {
                    context.counterController.incrementSeconds(context.breakTimer);
                    context.updateDOM();
                });
                $('#decrementBreakTimer .seconds').click(function() {
                    context.counterController.decrementSeconds(context.breakTimer);
                    context.updateDOM();
                });

                $('#incrementWorkTimer .minutes').click(function() {
                    context.counterController.incrementMinutes(context.workTimer);
                    context.updateDOM();
                });
                $('#decrementWorkTimer .minutes').click(function() {
                    context.counterController.decrementMinutes(context.workTimer);
                    context.updateDOM();
                });
                $('#incrementWorkTimer .seconds').click(function() {
                    context.counterController.incrementSeconds(context.workTimer);
                    context.updateDOM();
                });
                $('#decrementWorkTimer .seconds').click(function() {
                    context.counterController.decrementSeconds(context.workTimer);
                    context.updateDOM();
                });

                setInterval(context.updateDOM.bind(context), 100);
            }
        };
    }

    $(document).ready(function() {
        var catchup = pomodoro();
        catchup.setupDOM();
    });

