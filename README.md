# -swiper
一个手机端简易垂直滑动插件

html机构如下：
    <div class="slide-container">
      <div class="slide-wapper">
          <div class="slide-item">
              页面1
          </div>
          <div class="slide-item">
               页面2
          </div>
          <div class="slide-item">
               页面3
          </div>
          <div class="slide-item">
               页面4
          </div>
      </div>
  </div>
  
  js调用：
  $('.slide-wapper').wapSlide({
      before:function(index){
          console.log('滑动前');
      },
      callback:function(index){
          console.log('滑动后回调');
      }
  });
  
  css依赖：
  html,body{
      height: 100%;
      width: 100%;
      overflow: hidden;
  }
  .slide-container{
      height: 100%;
      width: 100%;
      overflow: hidden;
  }
  .slide-wapper{
      height: 100%;
  }
  .slide-item{
      height: 100%;
  }
