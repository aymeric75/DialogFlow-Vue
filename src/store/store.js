import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const store = new Vuex.Store({
	state: {
		showChat : false,
		showButton : true,
		messages : [],
		sessionId: '',
		auth_key: '5ea0abfbb3684b40896389aec2ceb8ea',
		timezone: 'timezone',
		language: 'fr',
		faq_url: 'https://www.random.org/faq/',
		default_error_message: "Je n'ai pas compris, veuillez consulter notre <a href='"+this.faq_url+"'>faq</a>",
		showDots: false
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
		},
		getShowDots: state => {
			return state.showDots;
		},
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
		},
		changeShowDots: (state, payload) => {
			state.showDots = payload;
		},
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
		},
		changeShowDots: ( { commit }, payload ) => {
			commit('changeShowDots', payload)
		},
	}
});