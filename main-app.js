var mainApp = new Vue({
  el: '#main-app',
  data: {
    initialTime: 60,
    currentTimer: undefined,
    timers: []
  },
  mounted: function () {

    for (let i = 0; i < 3; i++) {
      this.addTimer();
    }

    this.timer();
  },
  methods: {
    addTimer: function () {

      this.timers.push({
        id: this.timers.length,
        time: this.initialTime
      })
    },
    toggleTimer: function (timer) {
      
      if(this.currentTimer && this.currentTimer === timer) {
        this.currentTimer = undefined;
      } else {
        this.currentTimer = timer;
      }
    },
    timer: async function () {
      
      while(true)	{
        if(this.currentTimer) {
          this.currentTimer.time--;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  },
  filters: {
    formatTime: function (value) {
      var signal = value < 0 ? '-' : '';
      value = Math.abs(value);
      
      var minutes = Math.floor(value / 60);
      var seconds = value % 60;
     
      minutes = ("" + minutes).padStart(2, '0');
      seconds = ("" + seconds).padStart(2, '0');
      return signal + minutes + ":" + seconds;
    }
  }
});

