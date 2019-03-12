
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
				'pushMessages',
				'changeShowDots'
			]),

		    submit: function() {
				var vm = this;

				var options = {
				    container: '.chatlogs',
				    easing: 'ease-in',
				    offset: 100,
				    force: true,
				    cancelable: true,
				    onStart: function(element) {
				      // scrolling started
				    },
				    onDone: function(element) {
				      // scrolling is done
				    },
				    onCancel: function() {
				      // scrolling has been interrupted
				    },
				    x: false,
				    y: true
				};

				// COOKIE 

				if ( vm.myinput.replace(/\s/g, '').length )
				{
					vm.pushMessages({'isUser':true,'text':vm.myinput});
					vm.$scrollTo('.scroll_ancer', 300, options);
					$.ajax({
					  url: "https://api.dialogflow.com/v1/query?v=20170712",
					  type: "POST",
					  dataType: 'json',
					  tryCount : 0,
					  retryLimit : 3,
					  data: JSON.stringify({
					    'query':vm.myinput,
					    'lang': this.$store.state.language,
					    'sessionId': this.$store.getters.getSessionId,
					    'timezone': this.$store.state.timezone
					  }),
					  headers: {
					    'Authorization' : 'Bearer '+this.$store.state.auth_key,
					    'Content-Type' : 'application/json'
					  }
					  ,
					  success: function(data) {
					    var speech = data.result.fulfillment.speech;
					    if( !speech.replace(/\s/g, '').length ) {
					    	vm.changeShowDots(true);
						  	setTimeout(function() {
						  		vm.pushMessages({'isUser':false,'text': vm.$store.state.default_error_message});
						  		vm.$scrollTo('.scroll_ancer', 300, options);
						  		vm.changeShowDots(false);

						  		},
						  		1000
						  	);

					    } else {

					    	vm.changeShowDots(true);
						  	setTimeout(function() {
						  		vm.pushMessages({'isUser':false,'text':speech});
						  		vm.$scrollTo('.scroll_ancer', 300, options);
						  		vm.changeShowDots(false);
						  		},
						  		1000
						  	);
					    };
					    
					  },

					  error : function(xhr, textStatus, errorThrown ) {
				          this.tryCount++;
				          if (this.tryCount <= this.retryLimit) {
				              $.ajax(this);
				              return;
				          } else {
					    	vm.changeShowDots(true);
						  	setTimeout(function() {
						  		vm.pushMessages({'isUser':false,'text': vm.$store.state.default_error_message});
						  		vm.$scrollTo('.scroll_ancer', 300, options);
						  		vm.changeShowDots(false);
						  		},
						  		1000
						  	);
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