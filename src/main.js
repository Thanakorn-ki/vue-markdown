// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyD2ajJBLhTQUYY2CvDtOXE7UNMQASJITRQ',
  authDomain: 'testfinal-b6c2e.firebaseapp.com',
  databaseURL: 'https://testfinal-b6c2e.firebaseio.com',
  storageBucket: 'testfinal-b6c2e.appspot.com',
  messagingSenderId: '305484729447'
}
firebase.initializeApp(config)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
Vue.filter('searctext', function (value) {
  console.log(value)
  return value
})
Vue.filter('searctext')
