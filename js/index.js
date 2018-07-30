
$(function(){
   //轮播
    var $bannerImg=$("#banner>ul.banner-img"),$bannerInd=$("#banner>ul.banner-ind");
    var moved=0,LIWIDTH=1200,canMove=true,timer=null;
    $.ajax({
        type:"get",
        url:"data/04_index_carousel.php",
        success:function(data){
            var html="";
            for(var b of data){
                html+=`
                <li><a href="javascript:"><img src=${b.img} alt=${b.title} /></a></li>
                `;
            }
            html+=`<li><a href="javascript:"><img src=${data[0].img} alt=${data[0].title} /></a></li>`;//图片加载完

            $bannerImg.html(html);
            $bannerInd.html("<li></li>".repeat(data.length))
                .children().first().addClass("ind");
            $bannerImg.css("width",(data.length+1)*LIWIDTH);//设置ul宽度
            function autoMove(){
                if(canMove){
                    if(moved==data.length){//先判断是否最后一张
                        moved=0;//将moved归0
                        $bannerImg.css("left",0);//将ul的left瞬间归0
                    }
                    timer=setTimeout(()=>{//先等待WATI秒
                        move(1,autoMove);
                    },3000);
                }
            }
            autoMove();
            $("#banner").hover(
                ()=>{//关闭轮播的开关变量
                    canMove=false;
                    clearTimeout(timer);//停止等待
                    timer=null;
                },
                ()=>{//打开轮播开关，启动自动轮播
                    canMove=true;
                    autoMove();
                }
            );
            $bannerInd.on("click","li",e=>{
                moved=$(e.target).index();
                $bannerImg.stop(true).animate({
                    left:-LIWIDTH*moved
                },1000);
                $bannerInd.children(":eq("+moved+")")
                    .addClass("ind")
                    .siblings().removeClass("ind");
            });
            function move(dir,callback){
                moved+=dir;//按照方向增减moved
                //如果moved没有到头
                if(moved<data.length){
                    //让ulInds中moved位置的li设置hover
                    $bannerInd.children(":eq("+moved+")")
                        .addClass("ind")
                        .siblings().removeClass("ind");
                }else{//否则，如果到头了
                    //让ulInds中第一个li设置为hover
                    $bannerInd.children(":eq(0)")
                        .addClass("ind")
                        .siblings().removeClass("ind");
                }
                //先清除ulImgs上动画，让ulImgs移动到新的left位置
                $bannerImg.stop(true).animate({
                    //新的left位置永远等于-LIWIDTH*moved
                    left:-LIWIDTH*moved
                },1000,callback);
            }
            $("#banner>[data-move=right]").click(()=>{
                if(moved==data.length){
                    moved=0;
                    $bannerImg.css("left",0);
                }
                move(1);
            });
            $("#banner>[data-move=left]").click(()=>{
                //如果是第一张
                if(moved==0){//就跳到最后一张
                    moved=data.length;
                    $bannerImg.css("left",-LIWIDTH*moved);
                }
                move(-1);
            })
        },
        error:function(){
            alert("网络故障，请检查");
        }
    });
    //加载首页商品
    var $floorP1=$("#floor-1>div:last-child"),$floorP2=$("#floor-2>div:last-child");
    $.ajax({
        type:"get",
        url:"data/05_index_product.php",
        success:function(data){
            console.log(data);
            var html1="",html2="";
            for(var i=0;i<data.length;i++){
                if(i<8){
                    html1+=`
                        <a href="javascript:"><img src=${data[i].img} class=${data[i].pid} alt="" /></a>
                    `;
                }else if(i<data.length){
                    html2+=`
                        <a href="javascript:"><img src=${data[i].img} class=${data[i].pid} alt="" /></a>
                    `;
                }
            }
            $floorP1.html(html1);$floorP2.html(html2);
            $("#floors").on("click","div.flex>a",function(e){
                sessionStorage['pid']=parseInt($(e.target).attr("class"));
                 location="product_detail.html?"+"pid="+$(e.target).attr("class");
                //console.log($(e.target).attr("class"));
            });

        },
        error:function(){
            alert("网络故障，请检查");
        }

    });
    //倒计时
    function GetRTime(){
        var EndTime= new Date('2018/7/25 18:00:00');
        var NowTime = new Date();
        var t =EndTime.getTime() - NowTime.getTime();
        var h;
        var m;
        var s;
        if(t>=0){
            h=Math.floor(t/1000/60/60%24);
            m=Math.floor(t/1000/60%60);
            s=Math.floor(t/1000%60);
        }
        $("#leftTime>div:nth-child(2)").html(h);
        $("#leftTime>#sec").html(m);
        $("#leftTime>div:last-child").html(s);
    }
    setInterval(GetRTime,1000);

})