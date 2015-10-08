(function () {
  'use strict';


  describe('The catchup object holds the timer data', function(){

  	var catchup = timerObj(25);

  	it('should initialize the duration to 25', function(){
  		expect(catchup.duration).to.equal(25);
  	});

    it('should have a timer property equal to the number of seconds in the duration as minutes (duration * 60)', function(){
      expect(catchup.timer).to.equal(25 * 60);
    });

    it('should have an interval setting of 1000', function(){
      expect(catchup.interval).to.equal(1000);
    });

    it('should contain a boolean indicating whether or not it is running', function(){
      expect(catchup.isRunning).to.be.false;
    });

  });


  describe('The counter object should hold the timer behavior',  function(){

      var counter = counterObj(),
          catchup = timerObj(25);

    it('should have a method to increment the timer object by 1 minute', function(){

      counter.increment(catchup);
      expect(catchup.timer).to.equal(26 * 60);

    });

    it('should have a method to decrement the timer object by 1 minute', function(){

      counter.decrement(catchup);
      expect(catchup.timer).to.equal(25 * 60);

    });


    it('should have a method that starts the countdown timer', function(){
      expect(counter.startTimer).to.not.be.null;
    });

    it('should have a method that stops the countdown timer', function(){
      expect(counter.stopTimer).to.not.be.null;
    });

    it('should have a method that formats the timer into minutes and seconds', function(){
      expect(counter.formatTime(catchup)).to.equal('25:00');
      catchup.timer -= 40;
      expect(counter.formatTime(catchup)).to.equal('24:20');
      catchup.timer -= 60;
      expect(counter.formatTime(catchup)).to.equal('23:20');
      catchup.timer -= 82;
      expect(counter.formatTime(catchup)).to.equal('21:58');
      catchup.timer = 344;
      expect(counter.formatTime(catchup)).to.equal('05:44')
    });


  });




})();
