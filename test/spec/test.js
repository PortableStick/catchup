(function () {
  'use strict';


  describe('The catchup object holds the app data', function(){

  	var catchup = timerObj(25);

  	it('should initialize the duration to 25', function(){
  		expect(catchup.duration).to.equal(25);
  	});

    it('should have a timer property set to the duration', function(){
      expect(catchup.timer).to.equal(25);
    });

    it('should have an interval setting of 1000', function(){
      expect(catchup.interval).to.equal(1000);
    });

    it('should contain a boolean indicating whether or not it is running', function(){
      expect(catchup.isRunning).to.be.false;
    });

  });


  describe('The counter object should hold the app behavior',  function(){

      var counter = counterObj();

    it('should have a method to increment the timer object by 1', function(){

      counter.increment(catchup);
      expect(catchup.timer).to.equal(26);

    });

    it('should have a method to decrement the timer object by 1', function(){

      counter.decrement(catchup);
      expect(catchup.timer).to.equal(25);

    });


    it('should have a method that starts the countdown timer', function(){
      expect(counter.startTimer).to.not.be.null;
    });

    it('should have a method that stops the countdown timer', function(){
      expect(counter.stopTimer).to.not.be.null;
    });


  });




})();
