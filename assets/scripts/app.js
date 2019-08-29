Vue.config.devtools = true

var vm = new Vue({
  el: "#main-form",

  data: function() {
    return {
      formStep: 0,
      showError: false,
      city: "",
      stateAbbreviation: "",
      stateZipCode: "",
      firstName: "",
      lastName: "",
      formStepData: [
        {
          question: "Where do you need your New Windows installed?",
          value: null,
          pattern: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
          errorMessage: "Please, enter a valid US Zip code number."
        },
        {
          question: "How many New Windows do you need installed?",
          value: "",
          pattern: /[a-z0-9]/,
          errorMessage: "Please, select the number of windows."
        },
        {
          question: "How soon do you want to begin your project?",
          value: "",
          pattern: /[a-z0-9]/,
          errorMessage: "Please, select your timeframe urgency."
        },
        {
          question: "Are you interested in financing?",
          value: "",
          pattern: /[a-z0-9]/,
          errorMessage: "Please, select one of the two options"
        },
        {
          question: "What is your project address",
          value: "",
          pattern: /[a-z0-9]/,
          errorMessage: "Please, type your address"
        },
        {
          question: "Almost done",
          firstName: "",
          lastName: "",
          pattern: /[a-z0-9]/,
          errorMessage: "Please, type in your first name and your last name"
        },
        {
          question: "Almost done",
          value: "",
          pattern: /[a-z0-9]/,
          errorMessage: "Please, type in your first name and your last name"
        }
      ]
    }
  },

  methods: {
    increaseFormStep: function() {
      if (
        this.formStepData[this.formStep].pattern.test(
          this.formStepData[this.formStep].value
        )
      ) {
        if (this.formStep === 0) {
          axios
            .get(
              "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                this.formStepData[0].value +
                "&key=AIzaSyAI-0x82SSTmuM_bFWdh26gh4M0II3uVVY"
            )
            .then(function(response) {
              var responseArray = response.data.results[0].address_components
              responseArray.map(function(item) {
                var types = item.types

                types.map(function(type) {
                  if (type === "locality") {
                    vm.city = item.short_name
                  } else if (type === "administrative_area_level_1") {
                    vm.stateAbbreviation = item.short_name
                  }
                })
              })

              vm.stateZipCode = vm.formStepData[0].value
              vm.formStep++
              vm.showError = false
            })
        } else {
          this.formStep++
          this.showError = false
        }
      } else {
        this.showError = true
      }
    },

    resetError: function() {
      this.showError = false
    },

    onSelectRadio: function(event) {
      this.formStepData[this.formStep].value = event.target.value
      this.resetError()
    },

    getFullName: function() {}
  }
})
