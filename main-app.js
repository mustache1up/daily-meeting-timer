var mainApp = new Vue({
  el: '#main-app',
  data: {
    initialTime: 60,
    currentTimer: undefined,
    mainTimerInitialTime: (15 * 60),
    mainTimer: {},
    timers: []
  },
  mounted: function () {

    var localTimers = JSON.parse(localStorage.getItem("timers"));
    if (localTimers) {
      localTimers = localTimers.filter(x => x.name?.trim())
      localTimers.forEach(x => x.time = this.initialTime)
    }
      
    if (localTimers?.length > 0) {
      this.timers = localTimers;
    } else {
      this.timers = Array.from({length: 3}, () => this.emptyTimer())
    }

    this.mainTimer = {
      time: this.mainTimerInitialTime,
      active: false
    }

    this.startTimer();
  },
  watch: {
    timers: {
      handler: function (val, oldVal) {
        this.updateLocalStorage();
      },
      deep: true
    },
  },
  methods: {
    emptyTimer: function () {
      return {
        name: "",
        time: this.initialTime
      };
    },
    addTimer: function () {

      this.timers.push(this.emptyTimer());
    },
    updateLocalStorage: function () {
      
      localStorage.setItem("timers", JSON.stringify(this.timers));
    },
    toggleTimer: function (timer) {

      this.mainTimer.active = true;
      
      if(this.currentTimer && this.currentTimer === timer) {
        this.currentTimer = undefined;
      } else {
        this.currentTimer = timer;
      }
    },
    startTimer: async function () {
      
      while(true)	{
        if(this.currentTimer) {
          this.currentTimer.time--;
        }
        if(this.mainTimer.active) {
          this.mainTimer.time--;
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

