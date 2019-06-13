<template>
  <div class="resource" >
    <div class="title2">
      <div class="title_name2">
        <h3>信息公告</h3>
      </div>
    </div> 
    <div class="detail">
      <div class="title">
      <h1>{{message.title}}</h1>
      <p class="date">{{message.datetime}}</p></div>
      <div class="content">
        <!-- <p>{{message.content}}</p> -->
        <div v-html="message.content"></div>
        <p class="more">【<a href="#" @click="back()">返回信息页面</a>】</p>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      message:{}
    }
  },
  methods:{
    back(){
      this.$router.push("/message");//此处返回两步才能返回上一级，原因不明！！！
    }
  },
  mounted:function(){
    this.message = this.$store.state.message;
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
.date{
  text-align: right;
  padding-right: 10px;
}
.detail{
  width:800px;
  margin:auto;
  background-color: aliceblue;
}
.title{
  margin:5px;
  border-bottom:2px solid #d60606;
}
.content{
  text-align: left;
  text-indent:2em;
  /* min-height: 500px; */
}
.more{
  /* float:right; */
  text-align: right;
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
