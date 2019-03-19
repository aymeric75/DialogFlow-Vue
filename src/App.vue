<template>
  <div id="app" class="container">
    <chat-box v-show="getShowChat"></chat-box>
    <chat-open v-show="getShowButton"></chat-open>
  </div>
</template>
<script>


  import ChatBox from './components/ChatBox.vue'
  import ChatOpen from './components/ChatOpen'

  import {mapActions} from 'vuex'
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
      ]),
      ...mapActions([
        'pushMessages',
        'changeShowDots',
        'setAuth_key',
        'setOpenchat',
        'setOCtextColor',
        'setSessionId'
      ]),

    },

/*    mounted: function() {
      this.setSessionId();
    },*/

    created() {
      this.setSessionId();
      this.$http.get('', {
        params: {
          'userToken': '1',
          'faq_url': '1',
          'openchat_text_color' : '1',
          'openchat_bg_color' : '1',
          'openchat_text_over_color' : '1',
          'openchat_bg_over_color' : '1',
          'openchat_loader_color' : '1',
          'icon_color' : '1',
          'icon_over_color' : '1',
          'icon_bg_color' : '1',
          'icon_bg_over_color' : '1',
          'input_bg_color' : '1',
          'loading_dots_color' : '1',
          'chatbox_title' : '1',
          'placeholder' : '1'
        }
      })
        .then(response => {

          var server_resp = response.body;
          this.setAuth_key(server_resp.userToken);


          if( server_resp.chatbox_title!=null && server_resp.chatbox_title!='' )
          {
            this.$store.state.chatbox_title = server_resp.chatbox_title;
          } else {
            this.$store.state.chatbox_title = 'LiveChat';
          }

          if( server_resp.openchat_text_color!=null && server_resp.openchat_text_color!='' )
          {
            this.setOCtextColor(server_resp.openchat_text_color);
          } else {
            this.setOCtextColor('black');
          }


          if( server_resp.openchat_bg_color!=null && server_resp.openchat_bg_color!='' )
          {
            this.$store.state.openchat_bg_color = server_resp.openchat_bg_color;
          } else {
            this.$store.state.openchat_bg_color = 'lightgray';
          }

          if( server_resp.openchat_text_over_color!=null && server_resp.openchat_text_over_color!='' )
          {
            this.$store.state.openchat_text_over_color = server_resp.openchat_text_over_color;
          } else {
            this.$store.state.openchat_text_over_color = 'white';
          }

          if( server_resp.openchat_bg_over_color!=null && server_resp.openchat_bg_over_color!='' )
          {
            this.$store.state.openchat_bg_over_color = server_resp.openchat_bg_over_color;
          } else {
            this.$store.state.openchat_bg_over_color = 'gray';
          }


          if( server_resp.openchat_loader_color!=null && server_resp.openchat_loader_color!='' )
          {
            this.$store.state.openchat_loader_color = server_resp.openchat_loader_color;
          } else {
            this.$store.state.openchat_loader_color = 'gray';
          }


          if( server_resp.icon_color!=null && server_resp.icon_color!='' )
          {
            this.$store.state.icon_color = server_resp.icon_color;
          }  else {
            this.$store.state.icon_color = 'cyan';
          }

          if( server_resp.icon_over_color!=null && server_resp.icon_over_color!='' )
          {
            this.$store.state.icon_over_color = server_resp.icon_over_color;
          }  else {
            this.$store.state.icon_over_color = 'cyan';
          }

          if( server_resp.icon_bg_color!=null && server_resp.icon_bg_color!='' )
          {
            this.$store.state.icon_bg_color = server_resp.icon_bg_color;
          }  else {
            this.$store.state.icon_bg_color = 'black';
          }


          if( server_resp.input_bg_color!=null && server_resp.input_bg_color!='' )
          {
            this.$store.state.input_bg_color = server_resp.input_bg_color;
          }  else {
            this.$store.state.input_bg_color = 'black';
          }

          if( server_resp.icon_bg_over_color!=null && server_resp.icon_bg_over_color!='' )
          {
            this.$store.state.icon_bg_over_color = server_resp.icon_bg_over_color;
          }  else {
            this.$store.state.icon_bg_over_color = 'black';
          }

          if( server_resp.loading_dots_color!=null && server_resp.loading_dots_color!='' )
          {
            this.$store.state.loading_dots_color = server_resp.loading_dots_color;
          } else {
            this.$store.state.loading_dots_color = 'cyan';
          }


          if( server_resp.placeholder!=null && server_resp.placeholder!='' )
          {
            this.$store.state.placeholder = server_resp.placeholder;
          } else {
            this.$store.state.placeholder = 'Enter your text...';
          }

        });


        $('#app').parent().css('z-index','9999');

    },  /* created */

  }
</script>

<style>

#app {
  width: 25%;
  height: 550px;
  border-radius: 5px;
  position: fixed;
  bottom: 35px;
  right: 30px;
  padding-bottom: 0 !important;
}

@media ( max-width: 1025px ) {  
  #app {
    width: 55%;
  }     
}

@media ( max-width: 767px ) {  
  #app {
    width: 85%;
  }     
}

</style>
