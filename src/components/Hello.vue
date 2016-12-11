<template>
  <div class="hello">
    <div>
      ค้นหา <input v-model="searchNote">
    </div>
    <div>Create Note</div>
    <div>name Note</div><input v-model="nameNote">
    <div>content</div><textarea v-model="contentNote"></textarea>
    <button @click="addNote($event, nameNote, contentNote)">addNote</button>
    <!-- <input v-model=""> -->
    <!-- 1 -->
    <!-- <div v-html="toMarkDown(msg)"></div> -->
    <!-- 2 -->
    <button @click="check = false">text</button>
    <button @click="check = true">Markdown</button>
    <!-- <div v-html="compiledMarkdown"></div> -->
    <div v-for="(item, key, index) in messageMarkDown">
      <div @click="nowIndex = index" style="cursor:pointer;" >
        nameNote: {{item.nameNote}}
      </div>
      <div v-if="index === nowIndex">
        <textarea v-model="item.contentNote" v-on:keydown.enter="update(key, item.contentNote)"></textarea>
        <div  v-html="test(item.contentNote)"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* globals marked */
require('highlight.js/styles/mono-blue.css')
import * as firebase from 'firebase'
export default {
  name: 'hello',
  data () {
    return {
      nameNote: '',
      contentNote: '',
      check: false,
      msg: '',
      searchNote: '',
      nowIndex: null,
      databases: firebase.database().ref('messageMarkDown'),
      messageMarkDown: ''
    }
  },
  mounted () {
    var Vm = this
    Vm.databases.limitToLast(40).on('value', function (snapshot) {
      Vm.messageMarkDown = snapshot.val()
    })
  },
  computed: {
    compiledMarkdown: function () {
      if (this.check) {
        return marked(this.msg, {
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: true,
          sanitize: true,
          smartLists: true,
          smartypants: true
        })
      } else {
        return this.msg
      }
    }
  },
  methods: {
    update (key, text) {
      this.databases.child(`${key}`).update({contentNote: text})
    },
    addNote (event, nameNote, contentNote) {
      if (event.shiftKey) {
        contentNote += `\n`
      }
      if (nameNote.trim() !== '' && contentNote.trim() !== '' && !event.shiftKey) {
        event.preventDefault()
        let preInsert = { nameNote: nameNote, contentNote: contentNote }
        this.databases.push(preInsert)
      }
    },
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
    },
    test (text) {
      if (this.check) {
        return marked(text, {
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: true,
          sanitize: true,
          smartLists: true,
          smartypants: true
        })
      } else {
        return text
      }
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
