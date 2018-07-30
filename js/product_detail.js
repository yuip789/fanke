/**
 * Created by web-01 on 2017/12/6.
 */
//console.log(sessionStorage['pid']);
$(function(){
    //加载页面发送ajax
    function loadProduct(pid){
    $.ajax({
        type:"get",
        url:"data/06_product_details.php",
        data:{pid:pid},
        success:function(data){
            var $titleL=$("#product>div:nth-child(2)>h4")
            var $title=$("#product_text>div:first-child>h3");
            var $price=$("#product_text>div:nth-child(2)>h3");
            var $number=$("#product_number span");
            $titleL.html(data.title);
            $title.html(data.title);
            $price.html("价格￥"+data.price);
            $number.html(data.number);
        }
    })
    //加载图片
    $.ajax({
        type:"get",
        url:"data/07_product_pic.php",
        data:{pid:pid},
        success:function(data){
            console.log(data);
            var $smUl=$("#product_img_sm>ul"),$md=$("#product_img_md"),$lg=$("#product_img_lg");
            var $lgImg=$("#product_img_lg>img");
            var html="";
            var htmlMd="";
            var htmlLg="";
            for(var pic of data ){
                html+=`<li><img src="${pic.sm}"class="${pic.pid}" alt=""/></li>`;
                htmlMd+=`<img src="${pic.md}" class="${pic.pid}" alt=""/><div id="img_move"></div>`;
                htmlLg+=`<img src="${pic.lg}" class="${pic.pid}" alt=""/>`;
            }
            $smUl.html(html);//加载小图
            $md.html(htmlMd);//加载中图
            $lg.html(htmlLg);//加载大图
            //小图移入显示中图,大图
            $smUl.on("mouseover","li",function(e){
                // console.log(1);
               //记住此照片的pid
                var pid=$(e.target).attr("class");
                //找中图片中class=pid的图片，设置其z-index,设置其兄弟z-index为0;
                $("#product_img_md>img[class="+pid+"]").css("display","block")
                    .siblings("img").css("display","none");
                $("#product_img_lg>img[class="+pid+"]").css("display","block")
                    .siblings().css("display","none");
            })
            //中图移入显示移动块跟大图
            $md.on("mouseover",function(){
                $lg.show();
                $("#img_move").show();
            });
            $md.on("mouseout",function(){
                $lg.hide();
                $("#img_move").hide();
            });
            $md.mousemove((e)=>{
                
                var top=e.pageY-$md.offset().top-100;
                var left=e.pageX-$md.offset().left-100;
                  if(top>200){top=200}
                  else if(top<0){top=0};
                  if(left>200){left=200}
                  else if(left<0){left=0};
                $("#img_move").css({top:top+"px",left:left+"px"});
                $("#product_img_lg>img").css({left:(-100/40*left)+"px",top:(-100/40*top)+"px"});
            });
        }
    })
}
var pid=sessionStorage["pid"];
loadProduct(pid);
})