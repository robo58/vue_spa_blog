import Vue from 'vue'
import store from '~/store'
import router from '~/router'
import i18n from '~/plugins/i18n'
import App from '~/components/App'
import VueSimpleAlert from 'vue-simple-alert'
import '~/plugins'
import '~/components'

Vue.use(VueSimpleAlert)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  store,
  router,
  ...App
})
