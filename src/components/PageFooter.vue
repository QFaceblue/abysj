<template>
	<div>
		<footer class="foot" >
			<div class="footermain container">
				<div class=" fl">
					<p>Copright@&nbsp;2019&nbsp;<a href="">成都理工大学</a>&emsp;版权所有&emsp;假装有备案:5408666666</p>
					<p><a href="#">联系我们</a>&emsp;|&emsp;<a href="#">书记信箱</a>&emsp;|&emsp;<a href="#">校长信箱</a>&emsp;|</p>
				</div>
				<div class=" fr">
					<p class="fr"><a href="#">管理登陆</a>&emsp;&emsp;访问量：23654892</p></br>
					<p class="fr">技术支持：&emsp;<a href="#">复制粘贴科技有限公司</a></p>
				</div>
			</div>
		</footer>
	</div>
</template>
<script>
	export default{
		name:"PageFooter"
	}
</script>
<style >

	footer{display: block;}
	.container { margin: 0 auto; }
	.fl { float: left; margin-left:60px}
	.fr { float: right; margin-right:60px} 
	.foot{width: 100%;height:120px;background-color: #262626;margin-top: 0px;display:block;}
	.foot .footermain{width:1200px;line-height:50px;color:#fff;}
	.foot .footermain a{color:#fff;}
	.foot .footermain p{font-size: 13px;font-family: "宋体";}
</style>