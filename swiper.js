;
$(function($) {
    var methods = {

        init: function(options) {
            var defaults = {
                before:false,
                callback:false,
                activeIndex:0
            };
            var config = $.extend({}, defaults, options);

            var $this=$(this);

            var $item=$('.slide-item');

            var _startY;
            var _curY;
            var _moveY;

            var _max=$item.length-1;

            var _height=$this.height();

            var _posBegin= 0;
            var $page=$('<div class="slide-page"><span></span><span></span><span></span><span></span></div>');

            if($('body').find('.slide-page').length<=0){
                $('body').append($page);
            }
            $pageList=$('.slide-page>span');
            $this.data('index',config.activeIndex);

            $item.eq(config.activeIndex).addClass('current');
            $pageList.eq(config.activeIndex).addClass('current');
            changeTime(0);

            _translateY($this,0);

            //禁止原本的滚动
            document.body.addEventListener('touchmove', function(event) {
                event.preventDefault();
            }, false);

            //页数列表选择滑动
            $pageList.on('touchstart click',function(e){
                var ismove=$(e.target).hasClass('current')?false:true;
                var _index=$pageList.index($(this));
                move(ismove,_index);
            });

            //slide滑动
            $this.on({

                touchstart: function(e) {

                    fnTouches(e);

                   var activeIndex=$this.data('index');

                   _startY = e.touches[0].pageY;

                   changeTime(0);

                },
                touchmove:function(e){

                    fnTouches(e);

                    var _translate;

                    _curY = e.touches[0].pageY;

                    _moveY=_curY-_startY;

                    _translate=Math.round(_moveY+_posBegin);

                    _translateY($this,_translate);
                },

                touchend: function(e) {
                    var _index=$this.data('index');
                    var ismove;

                    changeTime(300);

                    //下一页
                    if(_moveY<0){

                        _index+1>_max?false:ismove=true;

                        _index=(_index+1)>_max?_max:_index+1;

                    }
                    //上一页
                    else if(_moveY>0){
                        _index-1<=0?false:ismove=true;
                        _index=(_index-1)<=0?0:_index-1;
                    }
                    move(ismove,_index);
                }
            });

            function move(ismove,_index){
                $item.removeClass('current').eq(_index).addClass('current');
                $pageList.removeClass('current').eq(_index).addClass('current');

                if(ismove&&config.before){
                    config.before.call(this,_index);
                }
                 _translateY($this,-_index*_height);
                 if(ismove&&config.callback){
                        config.callback.call(this,_index);
                }
                $this.data('index',_index);
                _posBegin= getTranslateY($this);
            }

            // touches
            function fnTouches(e){
                if(!e.touches){
                    e.touches = e.originalEvent.touches;
                }
            };

            function _translateY(obj,y){
                obj.css({
                    "-webkit-transform":'translateY('+ y+'px)',
                    transform:'translateY('+ y+'px)'
                });
            };

            function getTranslateY(obj){
                var transZRegex = /\.*translateY\((.*)px\)/i;
                var result;
                if(obj[0].style.WebkitTransform){
                    result=parseInt(transZRegex.exec(obj[0].style.WebkitTransform)[1]);
                }else if(obj[0].style.transform){
                    result=parseInt(transZRegex.exec(obj[0].style.transforms)[1]);
                }
                return result;
            };

            function changeTime(times){
                $this.css({
                    '-webkit-transition-duration': times+'ms',
                    'transition-duration': times+'ms'
                });
            };

        }
    }

    $.fn.wapSlide = function() {
        var method = arguments[0];
        if (methods[method]) {
            method = methods[method];
            // 将arguments转成数组
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof(method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.layer Plugin');
            return this;
        }
        return method.apply(this, arguments);
    }
}(jQuery));
