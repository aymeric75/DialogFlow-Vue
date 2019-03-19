<template>
    <div class="row openchat">
      <div class="col">
        <button type="button" class="btn btn-outline-secondary" @click="click" @mouseover="isHover=true;" @mouseout="isHover=false;" v-bind:style="[isHover ? styleHover : styleNoHover]">
	        <span class="spinner-border" role="status" v-if="showSpinner" :style="{ color: this.$store.state.openchat_loader_color }">
				<span class="sr-only">Loading...</span>
			</span>
	        <span class="text" v-html="this.$store.state.chatbox_title"></span>
    	</button>
      </div>
    </div>
</template>




<script>

	import { mapActions } from 'vuex'
	import { mapGetters } from 'vuex'
	import { mapState } from 'vuex'

	export default {
		data: function() {
			return {
				showSpinner: false,
				isHover: false,
				styleNoHover: {color: this.$store.state.openchat_text_color ,backgroundColor: this.$store.state.openchat_bg_color},
				styleHover: { color: this.$store.state.openchat_text_over_color, backgroundColor : this.$store.state.openchat_bg_over_color },
			}
		},

		computed: {
			...mapGetters([
				'getOCtextColor',
				'getOCbgColor'
			]),
			...mapState([
				'openchat_text_color',
				'openchat_bg_color',
				'openchat_text_over_color',
				'openchat_bg_over_color',
				'openchat_loader_color'
			]),
		},

	    watch: {
	      openchat_text_color(newValue, oldValue) {
	      	this.styleNoHover.color = newValue;
	      },
	      openchat_bg_color(newValue, oldValue) {
	      	this.styleNoHover.backgroundColor = newValue;
	      },
	      openchat_text_over_color(newValue, oldValue) {
	      	this.styleHover.color = newValue;
	      },
	      openchat_bg_over_color(newValue, oldValue) {
	      	this.styleHover.backgroundColor = newValue;
	      },
	      openchat_loader_color(newValue, oldValue) {
	      	this.$store.state.openchat_loader_color = newValue;
	      }
	    },

		methods: {
		  ...mapActions([
		    'showChat',
		    'showButton'
		  ]),
		  click: function() {

		  	var vm = this;
		  	this.showSpinner = true;
		  	setTimeout(function() {
		  		vm.showSpinner = false;
		  		vm.showChat(true);
		  		vm.showButton(false);
		  		},
		  		1000
		  	);
		  },
		}
	}

</script>

<style scoped>
	
.openchat {
  position: absolute !important;
  bottom: 0;
  width: 100%;
}

button {
	width:100%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 46px;
	position: relative;
	border: none;
}

.text {
	font-weight: bold;
	font-size: 15px;
}

.spinner-border {
	position: absolute;
	left: 10px;
}

</style>