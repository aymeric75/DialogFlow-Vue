
<template>
    <div class="row rowInput" v-show="getShowChat">
      <div class="col" style="display:flex;align-items: center;">
        <div class="form-group">
          <form @submit.prevent="submit" @submit="afterSubmit">
			<div class="input-group mb-3">
			  <input type="text" class="form-control" :placeholder="placeholder" :aria-label="placeholder" aria-describedby="basic-addon2" v-model="myinput">
			  <div class="input-group-append">
			    <button class="btn btn-outline-secondary" type="submit"><font-awesome-icon icon="paper-plane" :style="{ color: iconColor }" /></button>
			  </div>
			</div>
          </form>
        </div>
      </div>
    </div>
</template>


<script>

	import JQuery from 'jquery'
	let $ = JQuery


	import {mapActions} from 'vuex'
	import {mapGetters} from 'vuex'

	export default {

		data: function() {
			return {
				myinput: '',
				iconColor: 'rgb(15,204,185)',
				inputWidth: '80%',
				placeholder: 'Écrivez ici...',
				default_error_message: "Je n'ai pas compris, veuillez reformuler"
			}
		},
		computed: {
			...mapGetters([
				'getSessionId',
				'getShowChat',
				'getMessages'
			]),

		},
		methods: {

			...mapActions([
				'pushMessages'
			]),

		    submit: function() {
				var vm = this;
				// COOKIE 
				if ( vm.myinput.replace(/\s/g, '').length )
				{
					vm.pushMessages({'isUser':true,'text':vm.myinput});
					$.ajax({
					  url: "https://api.dialogflow.com/v1/query?v=20170712",
					  type: "POST",
					  dataType: 'json',
					  tryCount : 0,
					  retryLimit : 3,
					  data: JSON.stringify({
					    'query':vm.myinput,
					    'lang':'fr',
					    'sessionId': this.$store.getters.getSessionId,
					    'timezone':'Europe/Paris'
					  }),
					  headers: {
					    'Authorization' : 'Bearer 5ea0abfbb3684b40896389aec2ceb8ea',
					    'Content-Type' : 'application/json'
					  }
					  ,
					  success: function(data) {
					    var speech = data.result.fulfillment.speech;
					    if( !speech.replace(/\s/g, '').length ) {
					    	vm.pushMessages({'isUser':false,'text':vm.default_error_message});
					    } else {
					    	vm.pushMessages({'isUser':false,'text':speech});
					    }
					  },

					  error : function(xhr, textStatus, errorThrown ) {
				          this.tryCount++;
				          if (this.tryCount <= this.retryLimit) {
				              $.ajax(this);
				              return;
				          } else {
				          	vm.pushMessages({'isUser':false,'text':vm.default_error_message});
				          }
				          return;
					  }

					});
				}
		    },

		    afterSubmit: function() {
		      this.myinput = "";
		    },
		}
	}


</script>

<style scoped>

	.rowInput {
	  //background: gray;
	}

	.form-group {
		margin-bottom: 0;
		width:inherit;
		margin: 0 15px;
	}

	.form-control {
		height: 100%;
		width: 80%;
		border:none;
		background:rgb(245,245,245);
	}

	.input-group {
		height: 55px;
	}

	.input-group-append {
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		background:rgb(219,219,219);
	}

	button {
		border:none;
		height:100%;
		width:100%;
	}

	svg {
		font-size: 155%;
	}

</style>