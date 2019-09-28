Component({
  properties: {
    alphabet: Array
  },
  data: {},
  ready() {

  },
  methods: {
    onChange(e) {
      console.log('onChange', e.detail)
    },
    choose(e) {
      console.log(e)
      let cell = e.target.dataset.cell
      let Id = e.target.dataset.id
      let data = {
        cell:cell,
        Id:Id
      }
      this.triggerEvent('choose', data)
    }
  },

})
