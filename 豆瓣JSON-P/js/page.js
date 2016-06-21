/*设置一些参数默认值*/
var start = 0;//控制从那一条开始显示，和豆瓣结合起来，豆瓣初始值也是0
var count = 10;//控制每页显示多少条，和豆瓣的接口链接起来，改变每个页面显示的条数
var nowPage = 1;//当前页
var prepage = 5;//每页面显示多少个；
var totalPages = 10;//和豆瓣的页数对接起来，总页数，给一个默认值
var startPage =1;//默认给出第一个页面第一页1
var endPage = 5;//默认值第一页最后一个页面5
//给出函数返回--每页显示的第一条和最后一条的数字。
function pages(pages, page, prepage) {//pages待会需要用totalPage来穿参
    var start = 0;//起始页
    var end = 0;//结束数字
    var n = 0;//少算的偏移量
    var offset = Math.floor(prepage / 2);//偏移量 2
    start = page - offset;//这里的page待会要和nowPage对应的，就是当前页
    if (start < 1) {
        start = 1;
        n = start - (page - offset);
    }
    end = page + offset + n;
    if (end > pages) {
        end = pages;
        start = end - prepage + 1;
        start = start > 0 ? start : 1;
    }
    return [start, end];//返回的start赋值给startPage，end赋值给endPage
}