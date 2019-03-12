<template>
    <div class="row openchat">
      <div class="col">
        <button type="button" class="btn btn-outline-secondary" @click="click">
	        <span class="spinner-border" role="status" v-if="showSpinner">
				<span class="sr-only">Loading...</span>
			</span>
	        <span class="text">LiveChat Service Client</span>
    	</button>
      </div>
    </div>
</template>


<script>

	import {mapActions} from 'vuex'
	export default {
		data: function() {
			return {
				showSpinner: false
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
		  }
		}
	}

</script>

<style scoped>
	
.openchat {
  position: absolute;
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
}

.text {
	font-weight: bold;
}

.spinner-border {
	position: absolute;
	left: 10px;
}

</style>