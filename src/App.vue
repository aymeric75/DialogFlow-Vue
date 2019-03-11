<template>
  <div id="app" class="container">
    <chat-box v-show="getShowChat"></chat-box>
    <chat-open v-show="getShowButton"></chat-open>
  </div>
</template>

<script>

  import JQuery from 'jquery'
  let $ = JQuery


  import ChatBox from './components/ChatBox.vue'
  import ChatOpen from './components/ChatOpen'

  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'

  export default {
    name: 'App',

    components: {
      'chat-box': ChatBox,
      'chat-open' : ChatOpen
    },
    computed: {
      ...mapGetters([
        'getShowChat',
        'getShowButton'
      ]),

    },
    methods: {
      ...mapMutations([
        'turnShowChatFalse',
        'pushMessages',
        'setSessionId'
      ]),
    },

    mounted: function() {
      this.setSessionId();
    }

  }
</script>

<style>

#app {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 25%;
  height: 550px;
  border-radius: 5px;
}

</style>
