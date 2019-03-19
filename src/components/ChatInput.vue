
<template>
    <div class="row rowInput" v-show="getShowChat" :style="{ backgroundColor: this.$store.state.input_bg_color }">
      <div class="col" style="display:flex;align-items: center;">
        <div class="form-group">
          <form @submit.prevent="submit" @submit="afterSubmit">
			<div class="input-group mb-3">
			  <input type="text" class="form-control" :placeholder="placeholder" :aria-label="placeholder" aria-describedby="basic-addon2" v-model="myinput">
			  <div class="input-group-append">
			    <button class="btn btn-outline-secondary" type="submit" @mouseover="isHover=true;changeIconColor(icon_over_color);" @mouseout="isHover=false;changeIconColor(icon_color);" :style="[isHover ? styleHover : styleNoHover]"><font-awesome-icon icon="paper-plane" /></button>
			  </div>
			</div>
          </form>
        </div>
      </div>
    </div>
</template>



<script>

	import {mapActions} from 'vuex'
	import {mapGetters} from 'vuex'

	import { mapState } from 'vuex'


	export default {

		data: function() {
			return {
				myinput: '',
				inputWidth: '80%',
				placeholder: this.$store.state.placeholder,
				isHover: false,
				styleNoHover: { backgroundColor: this.$store.state.icon_bg_color },
				styleHover: { backgroundColor: this.$store.state.icon_bg_over_color },
				styleIconHover: { backgroundColor: this.$store.state.icon_over_color },
				styleIconNoHover: { backgroundColor: this.$store.state.icon_color }
			}
		},
		computed: {
			...mapGetters([
				'getSessionId',
				'getShowChat',
				'getMessages',
				'getIconColor'
			]),

			...mapState([
				'icon_color',
				'icon_over_color',
				'icon_bg_color',
				'icon_bg_over_color',
				'input_bg_color',
			]),

		},

	    watch: {
	      icon_color(newValue, oldValue) {
	      	this.$store.state.icon_color = newValue;
	      },
	      icon_over_color(newValue, oldValue) {
	      	this.$store.state.icon_over_color = newValue;
	      },
	      icon_bg_color(newValue, oldValue) {
	      	this.styleNoHover.backgroundColor = newValue;
	      },
	      icon_bg_over_color(newValue, oldValue) {
	      	this.styleHover.backgroundColor = newValue;
	      },
	      input_bg_color(newValue, oldValue) {
	      	this.$store.state.input_bg_color = newValue;
	      },
	    },

	    updated: function() {
	    	$('button > svg').css('color', this.$store.state.icon_color);
	    	$('button:hover > svg').css('color', this.$store.state.icon_over_color);
	    	this.placeholder=this.$store.state.placeholder;
	    },


		methods: {

			...mapActions([
				'pushMessages',
				'changeShowDots'
			]),

			changeIconColor(value) {
				$('button > svg').css('color',value);
			},


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
		} /* methods */
	} /* export default */


</script>

<style scoped>

	.rowInput {
	  margin: 0;
	  background: lightgray;
	}

	.form-group {
		margin-bottom: 0;
		width:inherit;
		margin: 0 15px;
		height: 40px;
	}

	form {
		height: 100%;
	}

	.form-control {
		height: 100%;
		width: 80%;
		border:none;
		background:rgb(245,245,245);
		font-size: 13px;
	}

	.input-group {
		height: 100%;
	}

	.input-group-append {
		width: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
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