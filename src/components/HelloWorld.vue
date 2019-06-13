<template>
  <div >
    <el-container >
        <el-main>
        <carousel></carousel>    
        <el-row>
          <el-col :span="16"><div class="">
            <div class="title1">
              <div class="title_name1">
                <h3>创新创业基地介绍</h3>
              </div>
            </div>
            <el-row >
              <el-col :span="12"><div class="main">
                <div>
                  <img src="../assets/img/pic.png">
                </div>
                <el-row :gutter="20">
                  <el-col :span="12"><div class="doc">
                    <a class="docbtn fl" href="#">
                      <div class="A"></div>
                      <h4>支撑材料</h4>
                    </a>
                    </div></el-col>
                  <el-col :span="12"><div class="doc">
                    <a class="docbtn fr" href="#">
                      <div class="B"></div>
                      <h4>申报书</h4>
                    </a>
                    </div></el-col>
                </el-row>
                </div></el-col>
              <el-col :span="12"><div class="txt">
                <p>
                  成都理工大学（Chengdu University of Technology）坐落于有“锦官城”之称的国家历史文化名城成都，由四川省人民政府和自然资源部、成都市人民政府共建，入选“双一流”世界一流学科建设高校，
                  国家中西部高校基础能力建设工程、卓越工程师教育培养计划、国家建设高水平大学公派研究生项目、国家特色重点学科项目高校，全国深化创新创业教育改革示范高校，中国地球科学高层次人才培养与科学研究基地之一，是以地质、能源、资源科学、核技术、环境科学为优势，以化工、材料等学科专业为特色的重点大学。
                </p>
                <p>
                  1956年国务院批准建立成都地质勘探学院; <span class="more">【<a href="#">详情</a>】</span>
                </p>
                </div></el-col>
            </el-row>
          </div></el-col>
          <el-col :span="8">
            <div class="title2">
              <div class="title_name2">
                <h3>信息公告</h3>
              </div>
            </div>
            <div class="message">
              <ul class="a">
                <li v-for =" item in message">
                  <p class="pt" ><a class="t" href="#" @click="setMessage(item)"><span >{{item.title}}</span></a><span class="date">{{item.datetime}}</span></p>
                </li>
              </ul>
              
            </div>
            <p><span class="more">【<a href="#"  @click="more()">更多</a>】</span></p>
          </el-col>
        </el-row>
        <div class="title3">
              <div class="title_name3">
                <h3>校企合作</h3>
              </div>
        </div>
        <el-row>
          <el-col :span="4"><div class="school">
            <el-card class="card">
            <el-tooltip class="item" effect="dark" content="西南石油大学" placement="top">
              <a href="http://jyzx.swpu.edu.cn/Web" target="_blank"><img src="../assets/img/school1.jpg" alt=""/></a>
            </el-tooltip>
            </el-card>
            </div></el-col>
          <el-col :span="4"><div class="school">
            <el-card class="card">
            <el-tooltip class="item" effect="dark" content="四川师范大学" placement="top">
              <a href="http://www.sicnu.edu.cn/" target="_blank"><img src="../assets/img/school2.jpg" alt=""/></a>
            </el-tooltip>
            </el-card>
            </div></el-col>
          <el-col :span="4"><div class="school">
            <el-card class="card">
            <el-tooltip class="item" effect="dark" content="电子科技大学" placement="top">
              <a href="https://www.uestc.edu.cn/" target="_blank"><img src="../assets/img/school3.jpg" alt=""/></a>
            </el-tooltip>
            </el-card>
            </div></el-col>
          <el-col :span="4"><div class="school">
            <el-card class="card">
            <el-tooltip class="item" effect="dark" content="西华大学" placement="top">
              <a href="http://www.xhu.edu.cn/" target="_blank"><img src="../assets/img/school4.jpg" alt=""/></a>
            </el-tooltip>
            </el-card>
            </div></el-col>
          <el-col :span="4"><div class="school">
            <el-card class="card">
            <el-tooltip class="item" effect="dark" content="四川大学" placement="top">
              <a href="http://www.scu.edu.cn/" target="_blank"><img src="../assets/img/school5.jpg" alt=""/></a>
            </el-tooltip>
            </el-card>
            </div></el-col>
          <el-col :span="4"><div class="school">
            <el-card class="card">
            <el-tooltip class="item" effect="dark" content="成都东软学院" placement="top">
              <a href="https://www.nsu.edu.cn/" target="_blank"><img src="../assets/img/school7.jpg" alt=""/></a>
            </el-tooltip>
            </el-card>
            </div></el-col>
        </el-row>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import Carousel from './Carousel.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      messages:[],
      total:0
    }
  },
  computed:{
    message:function(){
      return this.messages.slice(0,10);
    }
  },
  methods:{
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
            this.$store.dispatch("setMessages",response.data);
            // console.log(this.resource);
          }						
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setMessage(message){
      this.$store.commit('setMessage',message);
      this.$router.push("/detail");
    },
    more(){
      this.$router.push("/message");
    },

  },
  components:{
    Carousel,
  },
  mounted:function(){
    if(this.$store.state.messages.length<=0){
      this.getMessages();
      // console.log("this.messages"+this.messages);
      // console.log("this.messages 获取不到？？");
      // this.$store.dispatch("setMessages",this.messages);
    }else{
      this.messages = this.$store.state.messages;
      this.total = this.$store.state.messages.length;
    }
    // if(this.$store.state.fresh){
    //     this.$store.commit('setFresh',false);
    //   	this.$router.go(0);
    // }
		
		},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.title1{height:36px;border-bottom:3px solid rgb(230, 28, 28);margin:5px;}
.title_name1{float:left;width:180px;height:36px;color:#fff;background-color: rgb(230, 28, 28);padding: 0px;}
.title_name1 h3{ margin-bottom: 0px;font-size: 20px;padding-top:10px}
.title2{height:36px;border-bottom:3px solid rgb(224, 240, 10);margin:5px;}
.title_name2{float:left;width:130px;height:36px;color:#fff;background-color: rgb(224, 240, 10);padding: 0px;}
.title_name2 h3{ margin-bottom: 0px;font-size: 20px;padding-top:10px}
.title3{height:36px;border-bottom:3px solid rgb(6, 214, 86);margin:5px;}
.title_name3{float:left;width:130px;height:36px;color:#fff;background-color:rgb(6, 214, 86);padding: 0px;}
.title_name3 h3{ margin-bottom: 0px;font-size: 20px;padding-top:10px}


.main{margin-top:20px;}
.main  img{width:380px;height:200px;}
.doc{width:200px;height:80px;margin:10px;}
.doc .docbtn{display: block; text-align:center;width:120px;height:80px;border:1px solid #7C7D7F;border-radius: 10px;background-color: aliceblue;}
.doc .docbtn:hover{text-decoration:none;}
.docbtn div{display: inline-block; width:46px;height:46px;margin:5px 0;}
.docbtn .A{background:url(../assets/img/icon_zhicheng_hui.png)}
.docbtn:hover .A{background:url(../assets/img/icon_zhicheng_red.png)}
.docbtn .B{background:url(../assets/img/icon_shenbao_hui.png)}
.docbtn:hover .B{background:url(../assets/img/icon_shenbao_red.png)}
.txt{margin:10px;}
.txt p{text-indent: 2em; line-height: 30px;font-size: 14px;font-family:'宋体';text-align: left;}

.message{
  margin:20px;
}
.message ul.a{
  list-style-type: circle;
}
.message ul li{
  display: block;
  margin:5px;
  text-align: left;
  padding-left: 5px;
}
.message a{
  text-decoration:underline;
  display:block;
}
.message a:link {color:#000000;}      /* 未访问链接*/
.message a:visited {color:rgb(235, 219, 4);}  /* 已访问链接 */
.message a:hover {color:#FF00FF;}  /* 鼠标移动到链接上 */
.message a:active {color:#0000FF;}  /* 鼠标点击时 */

.message .pt{
  /* width:100px; */
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号 */
  white-space: nowrap;/*强制不换行*/
}
.message .t{
  float:left;
  width:200px;
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号 */
  white-space: nowrap;/*强制不换行*/
}
.message .date{
  float:right;
  padding-right: 0px;
  width:75px;
  overflow: hidden; /*自动隐藏文字*/
  white-space: nowrap;/*强制不换行*/
}

.more{
  float:right;
  padding-right: 10px;
}
.fl{
  float:left;
}
.fr{
  float:right;
}
.card{
  margin:3px;
  background-color: aliceblue;
}

.el-container{
  margin:auto;
  width:1200px;
  /* background-color: aliceblue; */
}
</style>
