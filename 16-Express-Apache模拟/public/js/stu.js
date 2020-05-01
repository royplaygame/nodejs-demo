var stus = new Array();
stus[0] = "谭福";
stus[1] = "王一鸣";
stus[2] = "葛万杰";
stus[3] = "马昂";
stus[4] = "吴世龙";
stus[5] = "马怡航";
stus[6] = "郑玉亮";
stus[7] = "郝争光";
stus[8] = "张朝山";
stus[9] = "苏培浩";



// 获取名称
var nametxt = $(".name");
// 参加抽取的总数
var pcount = stus.length - 1;
// 运行标记
var flag = true;

// 定时器标记
var t;

// 抽中学生索引
var index = 0

//开始抽奖方法
function start() {
	if(flag) {
		flag = false;
		// 改变按钮样式和内容
		$("#btntxt").removeClass("start").addClass("stop").html('停止');
		// 循环显示名称
		tackeName();
	} else {
		flag = true;
		// 改变按钮样式和内容
		$("#btntxt").removeClass("stop").addClass("start").html('开始');
		// 停止抽奖
		clearInterval(t);
		//重新设置抽奖
		pcount = stus.length - 1;
		// 定时器值清零
		t = 0;
		//防止重复抽中,删除抽中的学生
		stus.splice(index, 1);
	}
}

// 循环抽取名单
function tackeName() {
	index = Math.floor(Math.random() * pcount);
	nametxt.html(stus[index]);
	t = setTimeout(tackeName, 0);
}

// 回车控制开始和停止
$(document).keyup(function(event) {
	if(event.keyCode == 32 || event.keyCode == 13) {
		start();
	}
});