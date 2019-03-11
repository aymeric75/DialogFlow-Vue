<template>
    <div class="row chatlogs">
      <div class="col">
        <div class="row">
          <div class="col">
            <template v-for="message in getMessages">
                <div class="row" style="margin-bottom:20px;min-height:55px;">
                  <div v-bind:class="[message.isUser ? messageUserClass : messageBotClass]" class="col" style="min-height: 100%;">
                    <span class="span_chat">
                      {{ message.text }}  
                    </span>                
                  </div>
                </div>
            </template>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
  
  import {mapMutations} from 'vuex'
  import {mapGetters} from 'vuex'


  export default {

    data: function() {
      return {
          messageBotClass: 'messageBotClass',
          messageUserClass: 'messageUserClass'
      }
    },


    computed: {
      ...mapMutations([
        'turnShowChatFalse',
        'pushMessages'
      ]),

      ...mapGetters([
        'getSessionId',
        'getShowChat',
        'getMessages'
      ])
    },


    methods: {
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

.chatlogs > col {
  height: 100%;
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
}

</style>