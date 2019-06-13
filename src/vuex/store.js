import Vue from 'vue'
import Vuex from 'vuex'
// import VueCookies from 'vue-cookies'
Vue.use(Vuex);

let store = new Vuex.Store({
	// 三大将
	state:{
		userInfo:{},//记录用户信息
		isLogin:false,//是否登陆
		loginway:'login',//记录选择方式
		baseUrl:'http://localhost:8888/cdut_bysj/',
		//fresh:false,
		messages:[],//记录所有信息
		message:{},//记录选择信息
		shopcart:[],//记录购物车
		num: 0,//记录已选资源数量
		userindex:'1',//记录用户页面Index
		asklabid:0,//记录用户申请实验室号
		activeName:0,//记录当前显示的实验室
	},
	getters: {
		
	  },
	// 修改state的唯一方法 是提交mutations
	mutations:{
		//设置用户信息
		getUserInfo(state,user){
			state.userInfo = user;
			console.log(state.userInfo);
		},
		setLogin(state,login){
			state.isLogin =login;
		},
		setLoginway(state,type){
			state.loginway =type;
		},
		// setFresh(state,type){
		// 	state.fresh =type;
		// },
		setMessages(state,message){
			state.messages = message;
		},
		setMessage(state,msg){
			state.message = msg;
		},
		setShopcart(state,cart){
			state.shopcart = cart;
		},
		setAsklabid(state,labid){
			state.asklabid = labid;
		},
		shopcart_num(state,num){
			state.num = num;
		},
		setUserindex(state,index){
			state.userindex = index;
		},
		setActiveName(state,index){
			state.activeName = index;
		},
	},
	actions:{
		getUserInfo({commit},user){
			commit('getUserInfo',user);
		},
		setMessages({commit},message){
			commit('setMessages',message);
		},
		setShopcart({commit},cart){
			commit('setShopcart',cart);
		},
		shopcart_num({commit},num){
			commit('shopcart_num',num)
		}
	}
});
export default store;