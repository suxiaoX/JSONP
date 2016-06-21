/*生成页面*/
function showPage(data){
	var loading = document.querySelector("#loading");
	loading.style.display = "none";
	var bookList = document.querySelector("#book-list");//显示的书籍列表
	var bookNumbers = bookList.getElementsByTagName("li");//获取书籍列表所有的li
	var page = document.querySelector("#page");//显示页数的div
	var loading = document.querySelector("#loading");//显示搜索结果
	var title = document.getElementById("title");//显示搜索结果--数字。
	
	var str = '';//赋值给书籍列表-bookList
	for(var i = 0;i<data.books.length;i++){
		str += '<li><img class = "fl" src="'+ data.books[i].image +'"/><div class="fl"><p><span>[书籍]</span><a style="color: #00BFFF;" target = "_blank" href ="'+data.books[i].alt+'"> '+ data.books[i].title  +'</a></p><p><span>评分：</span><span class="red">'+ data.books[i].rating.average+'</span>( '+ data.books[i].rating.numRaters + '评价 )</span><span>'+ data.books[i].author[0] +'/'+ data.books[i].publisher + '/' + data.books[i].pubdate.substring(0,4) +'</span></p><p>'+ data.books[i].binding + ' -- <span class="red">' + data.books[i].price +'</span></p><p class="book-summary">'+ data.books[i].summary +'</p></div><div class = "line"></div></li>';
	}
	bookList.innerHTML = str;
	//书籍创建成功
	//字符串截取，防止简介说明过长
	var bookSummary = bookList.querySelectorAll(".book-summary")
	for(var i = 0;i<bookSummary.length;i++){
		bookSummary[i].innerHTML = bookSummary[i].innerHTML.substring(0,90)+"...";
	}
	
	//头部搜索出来的数据信息
	var titleStr = '';			
	totalPages = Math.ceil(data.total/count);//每页10条的话，总共有多少页！！！
	titleStr = '<span>每页显示'+data.count +'条</span><span>第'+ nowPage+"/"+ totalPages +'页</span><span>共'+ data.total +'条相关书籍信息</span>'
	title.innerHTML = titleStr;
	var arr = pages(totalPages,nowPage,5);//改变的是第一个和最后一个
	startPage = arr[0];//改变页面显示值
	endPage = arr[1];
	changePage();
	clickPage();
//	loadingNone();
}
/*生成页数标签*/

function changePage(){
    var page = document.querySelector("#page");
    
    var str = '';
    str = '<a href = "javascrip:;" id = "prevpage">上一页</a>';
    for(var i = startPage;i<=endPage;i++){
    	if(i == nowPage){
    		str+='<a href = "javascrip:;" class = "active">'+ i + '</a>';
    		continue;
    	}
    	str += '<a href = "javascrip:;">'+ i + '</a>';
    }
    str += '<a href = "javascrip:;" id = "nextpage">下一页</a>'
    page.innerHTML = str;  
}
/*点击切换页面*/
function clickPage(){
	var pageA = page.getElementsByTagName("a");
	var prevPage = document.querySelector("#prevpage");
    var nextPage = document.querySelector("#nextpage");
    //每个a添加点击事件
    for(var i = 1;i<pageA.length-1;i++){
    	pageA[i]._page = i;
    	pageA[i].onclick = function(){
			nowPage = this._page+startPage-1;
			search();
    	}
    }
    prevPage.onclick = function(){
    	nowPage--;
    	if(nowPage<1){
    		nowPage=1;
    	}
    	search();
    }
    nextPage.onclick = function(){
    	nowPage++;
    	if(nowPage>=endPage){
    		nowPage = endPage
    	}
    	search();
    }
}

function loadingNone(){
	var loading = document.querySelector("#loading")
	loading.style.display = "block";
}
