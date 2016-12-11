<template>
  <div class="hello">
    <textarea v-model="msg"></textarea>
    <!-- <div v-html="toMarkDown(msg)"></div> -->
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
/* globals marked */
require('highlight.js/styles/mono-blue.css')
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.msg, {
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: true,
        sanitize: true,
        smartLists: true,
        smartypants: true
      })
    }
  },
  methods: {
    toMarkDown (value) {
      return marked(value, {
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: true,
        sanitize: true,
        smartLists: true,
        smartypants: true,
        highlight: function (code) {
          return require('highlight.js').highlightAuto(code).value
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
