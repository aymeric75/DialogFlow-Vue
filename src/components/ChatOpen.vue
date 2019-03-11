<template>
    <div class="row openchat">
      <div class="col">
        <button type="button" class="btn btn-outline-secondary" @click="showChat(true);showButton(false);">LiveChat Service Client</button>
      </div>
    </div>
</template>


<script>


	import {mapActions} from 'vuex'

	export default {
		methods: {
		  ...mapActions([
		    'showChat',
		    'showButton'
		  ]),
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
}

</style>