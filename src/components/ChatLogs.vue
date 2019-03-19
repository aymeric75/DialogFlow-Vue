<template>
    <div class="row chatlogs">
      <div class="col">
        <div class="row">
          <div class="col d-flex flex-column">
            <template v-for="message in getMessages">
                <div class="row" style="margin-bottom:20px;min-height:55px;">
                  <div v-bind:class="[message.isUser ? messageUserClass : messageBotClass]" class="col" style="min-height: 100%;">
                    <span class="span_chat" v-html="message.text">
                    </span>                
                  </div>
                </div>
            </template>
          </div>
        </div>
        <div class="loading-dots" v-if="getShowDots">
          <div class="loading-dots--dot" :style="{background: this.$store.state.loading_dots_color}"></div>
          <div class="loading-dots--dot" :style="{background: this.$store.state.loading_dots_color}"></div>
          <div class="loading-dots--dot" :style="{background: this.$store.state.loading_dots_color}"></div>
        </div>
        <div class="scroll_ancer"></div>
      </div>
    </div>
</template>

<script>
  
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'

  import { mapState } from 'vuex'


  export default {

    data: function() {
      return {
          messageBotClass: 'messageBotClass',
          messageUserClass: 'messageUserClass'
      }
    },


    computed: {
      ...mapMutations([
        'pushMessages'
      ]),

      ...mapGetters([
        'getSessionId',
        'getShowChat',
        'getMessages',
        'getShowDots'
      ]),
      ...mapState([
        'messages',
        'loading_dots_color'
      ]),
    },

    watch: {
      messages(newValue, oldValue) {
        if(oldValue.length > 10) {
          newValue.length = 10;
        }
      },
      loading_dots_color(newValue, oldValue) {
        this.$store.state.loading_dots_color = newValue;
      },
    }
}

</script>



<style scoped>

.chatlogs {
  padding: 25px 0;
  margin:0;
}
  
.chatlogs form {

}

.chatlogs > .col {
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
}


.chatlogs {
  background: white;
  overflow: auto;
  border-bottom: 1px solid rgb(245,245,245);
}

.messageUserClass {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.messageUserClass .span_chat {
  background: rgb(245,245,245);
}

.messageBotClass {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.messageBotClass .span_chat {
  border: 1px solid lightgray;
}

.span_chat {
  padding: 15px 20px;
  border-radius: 5px;
  font-size: 13px;
}


@keyframes dot-keyframes {
  0% {
    opacity: 0.4;
    transform: scale(1, 1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2, 1.2);
  }
  100% {
    opacity: 0.4;
    transform: scale(1, 1);
  }
}
.loading-dots {
  text-align: center;
  width: 50px;
}
.loading-dots--dot {
  animation: dot-keyframes 1.5s infinite ease-in-out;
  border-radius: 10px;
  display: inline-block;
  height: 10px;
  width: 10px;
}
.loading-dots--dot:nth-child(2) {
  animation-delay: 0.5s;
}
.loading-dots--dot:nth-child(3) {
  animation-delay: 1s;
}

</style>