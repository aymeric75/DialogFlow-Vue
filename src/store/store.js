import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const store = new Vuex.Store({
	state: {
		showChat : false,
		showButton : true,
		messages : [],
		sessionId: '',
		timezone: 'timezone',
		language: 'fr',
		showDots: false,

		faq_url: '',
		auth_key: '',
		default_error_message: "Je n'ai pas compris, veuillez consulter notre <a href='"+this.faq_url+"'>faq</a>",
		chatbox_title: 'LiveChat Service',

		openchat_text_color : 'transparent',  // NO HOVER
		openchat_bg_color : 'lightgray', // NO HOVER

		openchat_text_over_color : 'red',
		openchat_bg_over_color : 'orange',

		openchat_loader_color: 'grey',

		icon_color: 'cyan',
		icon_over_color: 'red',
		icon_bg_color: 'black',
		icon_bg_over_color: 'grey',
		input_bg_color: 'lightgray',
		loading_dots_color: 'cyan'
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
		getOCtextColor: state => {
			return state.openchat_text_color;
		},
		getOCbgColor: state => {
			return state.openchat_bg_color;
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
		setAuth_key: (state, payload) => {
			state.auth_key = payload;
		},
		setOCtextColor: (state, payload) => {
			state.openchat_text_color = payload;
		}


	},

	// openchat_text_color

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
		setAuth_key: ( { commit }, payload ) => {
			commit('setAuth_key', payload)
		},
		setOCtextColor: ( { commit }, payload ) => {
			commit('setOCtextColor', payload)
		},
	},
});
