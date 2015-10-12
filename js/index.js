
/**
 * 主页的主方法
 */

(function(){
	
	var getEle = function(element) {
		return document.querySelector(element);
	}

	var initNavBtn = function() {
		var leftNav = getEle(".leftNav");
		var navLabel = getEle(".navigation-label");
		var showNav = function() {
			$(".navigation").animate({width: "30%"}, function() {
				leftNav.style.backgroundColor = "#FFF";
				navLabel.style.color = "#000";
			});
		}
		var hideNav = function() {
			$(".navigation").animate({width: ""}, function() {
				leftNav.style.backgroundColor = "#252525";
				navLabel.style.color = "#FFF";
			});
		}
		leftNav.addEventListener("click", function() {
			$(".navigation").stop();
			var navWidth = document.querySelector(".navigation").style.width;
			//通过改变导航页的宽度也显示和隐藏导航页
			if (navWidth == "" || navWidth == "0px" || navWidth != "30%") 
				showNav();
			else 
				hideNav();
		});
		//“了解更多”按钮，点击展开导航页
		// getEle("#learnMore").addEventListener("click", showNav);

		//导航栏链接点击
		var navBtns = document.querySelectorAll(".navigation .nav-li");
		for (var i = 0; i < navBtns.length; i++) {
			navBtns[i].addEventListener("click", function() {
				hideNav();
				$("." + this.id).addClass("selectedPage");
				for (var i = 0; i < navBtns.length; i++) 
					if (navBtns[i] != this) 
						$("." + navBtns[i].id).removeClass("selectedPage");

				//初始化列表页面
				if (this.id == "taskList") {
					//请求后台数据，加载任务列表
					//加载数据成功后，为每个任务卡片添加点击事件
				};
			})
		};
		//列表页滚动时，修改标题高度
		$(".taskLists").scroll(function() {
			if ($(this).scrollTop() > 50) {
				$(".taskListHeader").animate({height: "8%"});
				$(".taskListHeader").addClass("bottomBoxShadow");
				$(".taskLists").animate({top: "8%"});
			} else {
				$(".taskListHeader").animate({height: "20%"}, function() {
					$(this).removeClass("bottomBoxShadow");
				});
				$(".taskLists").animate({top: "20%"});
			}
		});

		var stringsArray = [
			"积土成山，风雨兴焉；积水成渊，蛟龙生焉；积善成德，而神明自得，圣心备焉。",
			"不积跬步，无以至千里；不积小流，无以成江海。",
			"骐骥一跃，不能十步；驽马十驾，功在不舍。锲而舍之，朽木不折；锲而不舍，金石可镂。"
		];
		//动态输出文字
		$("#inputWords").typed({
	        strings: stringsArray,
	        typeSpeed: 100,
	        contentType: 'html',
	        showCursor: true,
	        loop: true,
	        loopCount: true,
	    });

	    var taskCards = document.querySelectorAll(".taskCard");
	    for (var i = 0; i < taskCards.length; i++) {
	    	taskCards[i].addEventListener("click", function() {
	    		// $(".modalPage taskCard").center();
	    		var topVal = ($(window).height() - $(this).height() ) / 2 + $(window).scrollTop() + "px";
	    		var leftVal = ($(window).width() - $(this).width() ) / 2+$(window).scrollLeft() + "px";
	    		$("#taskCard").animate({
	    			position: "absolute",
	    			top: topVal,
	    			left: leftVal
	    		});
	    		$(".modalPage").show();
	    	});
	    };

	    getEle(".closeBtn").addEventListener("click", function() {
	    	$("#taskCard").animate({
	    		position: "absolute",
	    		top: 0,
	    		left: 0
	    	}, function() {
	    		$(".modalPage").hide();
	    	});
	    	// $(".modalPage").show();
	    	// $(".modalPage").hide();
	    })
	}

	var initFn = (function() {
		initNavBtn();
	})();

	jQuery.fn.center = function () {
	    this.css("position","fixed");
	    this.css("top", ( $(window).height() - 500 ) / 2+$(window).scrollTop() + "px");
	    this.css("left", ( $(window).width() - 300 ) / 2+$(window).scrollLeft() + "px");
	    return this;
	}

})();
