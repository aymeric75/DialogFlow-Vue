<template>
  <div class="row rowChatBox">
    <div class="col colChatBox">
      <div class="row row-closeButton">
        <div class="col">
          <span>{{ title }}</span>
          <button type="button" class="close close-button" aria-label="Close" @click="showChat(false);showButton(true);">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <chat-logs></chat-logs>
      <chat-input></chat-input>
    </div>
  </div>
</template>


<script>
  
  import ChatLogs from './ChatLogs.vue'
  import ChatInput from './ChatInput.vue'
  import {mapActions} from 'vuex'

  export default {
    data: function(){
      return {
        title: 'LiveChat Service Client'
      }
    },
    components: {
      'chat-logs' : ChatLogs,
      'chat-input' : ChatInput
    },
    methods: {
      ...mapActions([
        'showChat',
        'showButton'
      ]),
    }


  }


</script>



<style scoped>



  .close-button:focus {
    outline:none;
  }

  
  div.rowChatBox {
    //background: lightgray;
    height:100%;
    //padding: 20px 10px;
    -webkit-box-shadow: 0px 0px 5px 0px lightgrey;
    -moz-box-shadow: 0px 0px 5px 0px lightgrey;
    box-shadow: 0px 0px 5px 0px lightgrey;
  }

  div.colChatBox {
    height: 100%;
    padding: 0;
  }

  .chatlogs {
    height: 70%;
  }

  .rowInput {
    height: 20%;
  }


  .row-closeButton {
    height: 10%;
    margin: 0;
    border-bottom: 1px solid rgb(245,245,245);
  }

  .row-closeButton div {
    display: flex;
  }

  .row-closeButton div span {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .row-closeButton div button {
    width: 5%;
  }


</style>