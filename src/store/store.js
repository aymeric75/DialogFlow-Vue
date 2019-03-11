import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const store = new Vuex.Store({
	state: {
		showChat : false,
		showButton : true,
		messages : [],
		sessionId: '',
	},

	getters: {

		getSessionId: state => {
			return state.sessionId;
		},
		getShowChat: state => {
			return state.showChat;
		},
		getShowButton: state => {
			return state.showButton;
		},
		getMessages: state => {
			return state.messages;
		}
	},

	mutations: {

		showChat: (state, payload) => {
			state.showChat = payload;
		},
		showButton: (state, payload) => {
			state.showButton = payload;
		},
		pushMessages: (state, payload) => {
			state.messages.push(payload);
		},
		setSessionId: state => {
			state.sessionId = Math.random().toString(36).substring(2, 10)+'-'+Math.random().toString(36).substring(2, 6)+'-'+Math.random().toString(36).substring(2, 6)+'-'+Math.random().toString(36).substring(2, 6)+'-'+Math.random().toString(36).substring(2, 18);
		}
	},

	actions: {

		pushMessages: ( { commit }, payload ) => {
			commit('pushMessages', payload)
		},
		showChat: ( { commit }, payload ) => {
			commit('showChat', payload)
		},
		showButton: ( { commit }, payload ) => {
			commit('showButton', payload)
		}
	}
});