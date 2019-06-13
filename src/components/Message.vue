<template>
  <div class="resource" >
    <div class="title2">
      <div class="title_name2">
        <h3>信息公告</h3>
      </div>
    </div> 
    <carousel1></carousel1>  
    <div class="message">
      <ul class="a">
        <li v-for ="item in messsage">
          <p><a class="" href="#" @click="setMessage(item)" >{{item.title}}</a><span class="date">{{item.datetime}}</span></p>
        </li>
      </ul>
    </div>
    <el-pagination 
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
      prev-text="上一页"
      next-text="下一页"
			:total="total">
		</el-pagination>
  </div>
</template>

<script>
import Carousel1 from './Carousel1.vue'
export default {
  name: 'Message',
  data () {
    return {
      msg: 'Welcome to 信息页面',
      currentPage:1,
			pageSize:5,
      total:0,
      messages:[],
    }
  },
  components:{
    Carousel1,
  },
  computed:{
    messsage:function(){//计算当前页显示的信息
      let s =this.pageSize;
      let c = this.currentPage;
      let start = s*(c-1);
      return this.messages.slice(start,(start+s));
    }
  },
  methods:{
      
			handleSizeChange(val) {//修改每页显示信息条数
        this.pageSize = val;
        this.currentPage = 1;
			},
			handleCurrentChange(val) {//修改当前页码
        this.currentPage=val;
      },
      setMessage(message){
        this.$store.commit('setMessage',message);
        this.$router.push("/detail");
      },
			getMessages(){
				var api = this.$store.state.baseUrl+'message/getAll.action';
				this.$http.post(api, {
					})
					.then((response) =>{
						console.log(response.data);
						if(response.data==null){
							this.msg="获取信息失败！";
						}else{
              this.messages = response.data;
              this.total = response.data.length;
             // console.log(this.resource);
						}						
					})
					.catch(function (error) {
						console.log(error);
					});
			}	
		},
		mounted:function(){
      if(this.$store.state.messages.length<=0){
          this.getMessages();
          this.$store.dispatch("setMessages",this.messages);
      }else{
        this.messages = this.$store.state.messages;
        this.total = this.$store.state.messages.length;
      }
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.resource{
  margin-top: 60px;
  margin:auto;
  width:1200px;
}
.title2{height:50px;border-bottom:3px solid rgb(224, 240, 10);margin:10px;}
.title_name2{margin:auto;width:200px;height:50px;color:#fff;background-color: rgb(224, 240, 10);padding: 0px;}
.title_name2 h3{ margin-bottom: 0px;font-size: 35px;padding-top:5px}
.message{
  margin:20px;
}
.message ul.a{
  list-style-type:circle;
}
.message ul li{
  display: block;
  margin:5px;
  text-align: left;
  padding-left: 10px;
}
.message a{
  text-decoration:underline;
}
.message a:link {color:#000000;}      /* 未访问链接*/
.message a:visited {color:rgb(235, 219, 4);}  /* 已访问链接 */
.message a:hover {color:#FF00FF;}  /* 鼠标移动到链接上 */
.message a:active {color:#0000FF;}  /* 鼠标点击时 */

.message .date{
  float:right;
  padding-right: 0px;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
