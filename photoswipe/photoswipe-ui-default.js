(function(e,t){if(typeof define==="function"&&define.amd){define(t)}else if(typeof exports==="object"){module.exports=t()}else{e.PhotoSwipeUI_Default=t()}})(this,function(){"use strict";var e=function(o,s){var n=this;var l=false,i=true,t,a,f,p,d,m,u,r=true,h,w,e,v,g,b,_,c,C={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4e3,timeToIdleOutside:1e3,loadingIndicatorDelay:1e3,addCaptionHTMLFn:function(e,t){if(!e.title){t.children[0].innerHTML="";return false}t.children[0].innerHTML=e.title;return true},closeEl:true,captionEl:true,fullscreenEl:true,zoomEl:true,shareEl:true,counterEl:true,arrowEl:true,preloaderEl:true,tapToClose:false,tapToToggleControls:true,clickToCloseNonZoomable:true,shareButtons:[{id:"facebook",label:"Share on Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/"+"?url={{url}}&media={{image_url}}&description={{text}}"},{id:"download",label:"Download image",url:"{{raw_image_url}}",download:true}],getImageURLForShare:function(){return o.currItem.src||""},getPageURLForShare:function(){return window.location.href},getTextForShare:function(){return o.currItem.title||""},indexIndicatorSep:" / ",fitControlsWidth:1200},T,I;var E=function(e){if(T){return true}e=e||window.event;if(c.timeToIdle&&c.mouseUsed&&!w){D()}var t=e.target||e.srcElement,n,o=t.getAttribute("class")||"",i;for(var r=0;r<N.length;r++){n=N[r];if(n.onTap&&o.indexOf("pswp__"+n.name)>-1){n.onTap();i=true}}if(i){if(e.stopPropagation){e.stopPropagation()}T=true;var l=s.features.isOldAndroid?600:30;I=setTimeout(function(){T=false},l)}},F=function(){return!o.likelyTouchDevice||c.mouseUsed||screen.width>c.fitControlsWidth},x=function(e,t,n){s[(n?"add":"remove")+"Class"](e,"pswp__"+t)},S=function(){var e=c.getNumItemsFn()===1;if(e!==_){x(a,"ui--one-slide",e);_=e}},k=function(){x(u,"share-modal--hidden",r)},K=function(){r=!r;if(!r){k();setTimeout(function(){if(!r){s.addClass(u,"pswp__share-modal--fade-in")}},30)}else{s.removeClass(u,"pswp__share-modal--fade-in");setTimeout(function(){if(r){k()}},300)}if(!r){O()}return false},L=function(e){e=e||window.event;var t=e.target||e.srcElement;o.shout("shareLinkClick",e,t);if(!t.href){return false}if(t.hasAttribute("download")){return true}window.open(t.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,"+"location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100));if(!r){K()}return false},O=function(){var e="",t,n,o,i,r;for(var l=0;l<c.shareButtons.length;l++){t=c.shareButtons[l];o=c.getImageURLForShare(t);i=c.getPageURLForShare(t);r=c.getTextForShare(t);n=t.url.replace("{{url}}",encodeURIComponent(i)).replace("{{image_url}}",encodeURIComponent(o)).replace("{{raw_image_url}}",o).replace("{{text}}",encodeURIComponent(r));e+='<a href="'+n+'" target="_blank" '+'class="pswp__share--'+t.id+'"'+(t.download?"download":"")+">"+t.label+"</a>";if(c.parseShareButtonOut){e=c.parseShareButtonOut(t,e)}}u.children[0].innerHTML=e;u.children[0].onclick=L},R=function(e){for(var t=0;t<c.closeElClasses.length;t++){if(s.hasClass(e,"pswp__"+c.closeElClasses[t])){return true}}},y,z,M=0,D=function(){clearTimeout(z);M=0;if(w){n.setIdle(false)}},A=function(e){e=e?e:window.event;var t=e.relatedTarget||e.toElement;if(!t||t.nodeName==="HTML"){clearTimeout(z);z=setTimeout(function(){n.setIdle(true)},c.timeToIdleOutside)}},P=function(){if(c.fullscreenEl&&!s.features.isOldAndroid){if(!t){t=n.getFullscreenAPI()}if(t){s.bind(document,t.eventK,n.updateFullscreen);n.updateFullscreen();s.addClass(o.template,"pswp--supports-fs")}else{s.removeClass(o.template,"pswp--supports-fs")}}},U=function(){if(c.preloaderEl){Z(true);e("beforeChange",function(){clearTimeout(b);b=setTimeout(function(){if(o.currItem&&o.currItem.loading){if(!o.allowProgressiveImg()||o.currItem.img&&!o.currItem.img.naturalWidth){Z(false)}}else{Z(true)}},c.loadingIndicatorDelay)});e("imageLoadComplete",function(e,t){if(o.currItem===t){Z(true)}})}},Z=function(e){if(g!==e){x(v,"preloader--active",!e);g=e}},q=function(e){var t=e.vGap;if(F()){var n=c.barsSize;if(c.captionEl&&n.bottom==="auto"){if(!p){p=s.createEl("pswp__caption pswp__caption--fake");p.appendChild(s.createEl("pswp__caption__center"));a.insertBefore(p,f);s.addClass(a,"pswp__ui--fit")}if(c.addCaptionHTMLFn(e,p,true)){var o=p.clientHeight;t.bottom=parseInt(o,10)||44}else{t.bottom=n.top}}else{t.bottom=n.bottom==="auto"?0:n.bottom}t.top=n.top}else{t.top=t.bottom=0}},B=function(){if(c.timeToIdle){e("mouseUsed",function(){s.bind(document,"mousemove",D);s.bind(document,"mouseout",A);y=setInterval(function(){M++;if(M===2){n.setIdle(true)}},c.timeToIdle/2)})}},H=function(){e("onVerticalDrag",function(e){if(i&&e<.95){n.hideControls()}else if(!i&&e>=.95){n.showControls()}});var t;e("onPinchClose",function(e){if(i&&e<.9){n.hideControls();t=true}else if(t&&!i&&e>.9){n.showControls()}});e("zoomGestureEnded",function(){t=false;if(t&&!i){n.showControls()}})};var N=[{name:"caption",option:"captionEl",onInit:function(e){f=e}},{name:"share-modal",option:"shareEl",onInit:function(e){u=e},onTap:function(){K()}},{name:"button--share",option:"shareEl",onInit:function(e){m=e},onTap:function(){K()}},{name:"button--zoom",option:"zoomEl",onTap:o.toggleDesktopZoom},{name:"counter",option:"counterEl",onInit:function(e){d=e}},{name:"button--close",option:"closeEl",onTap:o.close},{name:"button--arrow--left",option:"arrowEl",onTap:o.prev},{name:"button--arrow--right",option:"arrowEl",onTap:o.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){if(t.isFullscreen()){t.exit()}else{t.enter()}}},{name:"preloader",option:"preloaderEl",onInit:function(e){v=e}}];var W=function(){var i,r,l;var e=function(e){if(!e){return}var t=e.length;for(var n=0;n<t;n++){i=e[n];r=i.className;for(var o=0;o<N.length;o++){l=N[o];if(r.indexOf("pswp__"+l.name)>-1){if(c[l.option]){s.removeClass(i,"pswp__element--disabled");if(l.onInit){l.onInit(i)}}else{s.addClass(i,"pswp__element--disabled")}}}}};e(a.children);var t=s.getChildByClass(a,"pswp__top-bar");if(t){e(t.children)}};n.init=function(){s.extend(o.options,C,true);c=o.options;a=s.getChildByClass(o.scrollWrap,"pswp__ui");e=o.listen;H();e("beforeChange",n.update);e("doubleTap",function(e){var t=o.currItem.initialZoomLevel;if(o.getZoomLevel()!==t){o.zoomTo(t,e,333)}else{o.zoomTo(c.getDoubleTapZoom(false,o.currItem),e,333)}});e("preventDragEvent",function(e,t,n){var o=e.target||e.srcElement;if(o&&o.getAttribute("class")&&e.type.indexOf("mouse")>-1&&(o.getAttribute("class").indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(o.tagName))){n.prevent=false}});e("bindEvents",function(){s.bind(a,"pswpTap click",E);s.bind(o.scrollWrap,"pswpTap",n.onGlobalTap);if(!o.likelyTouchDevice){s.bind(o.scrollWrap,"mouseover",n.onMouseOver)}});e("unbindEvents",function(){if(!r){K()}if(y){clearInterval(y)}s.unbind(document,"mouseout",A);s.unbind(document,"mousemove",D);s.unbind(a,"pswpTap click",E);s.unbind(o.scrollWrap,"pswpTap",n.onGlobalTap);s.unbind(o.scrollWrap,"mouseover",n.onMouseOver);if(t){s.unbind(document,t.eventK,n.updateFullscreen);if(t.isFullscreen()){c.hideAnimationDuration=0;t.exit()}t=null}});e("destroy",function(){if(c.captionEl){if(p){a.removeChild(p)}s.removeClass(f,"pswp__caption--empty")}if(u){u.children[0].onclick=null}s.removeClass(a,"pswp__ui--over-close");s.addClass(a,"pswp__ui--hidden");n.setIdle(false)});if(!c.showAnimationDuration){s.removeClass(a,"pswp__ui--hidden")}e("initialZoomIn",function(){if(c.showAnimationDuration){s.removeClass(a,"pswp__ui--hidden")}});e("initialZoomOut",function(){s.addClass(a,"pswp__ui--hidden")});e("parseVerticalMargin",q);W();if(c.shareEl&&m&&u){r=true}S();B();P();U()};n.setIdle=function(e){w=e;x(a,"ui--idle",e)};n.update=function(){if(i&&o.currItem){n.updateIndexIndicator();if(c.captionEl){c.addCaptionHTMLFn(o.currItem,f);x(f,"caption--empty",!o.currItem.title)}l=true}else{l=false}if(!r){K()}S()};n.updateFullscreen=function(e){if(e){setTimeout(function(){o.setScrollOffset(0,s.getScrollY())},50)}s[(t.isFullscreen()?"add":"remove")+"Class"](o.template,"pswp--fs")};n.updateIndexIndicator=function(){if(c.counterEl){d.innerHTML=o.getCurrentIndex()+1+c.indexIndicatorSep+c.getNumItemsFn()}};n.onGlobalTap=function(e){e=e||window.event;var t=e.target||e.srcElement;if(T){return}if(e.detail&&e.detail.pointerType==="mouse"){if(R(t)){o.close();return}if(s.hasClass(t,"pswp__img")){if(o.getZoomLevel()===1&&o.getZoomLevel()<=o.currItem.fitRatio){if(c.clickToCloseNonZoomable){o.close()}}else{o.toggleDesktopZoom(e.detail.releasePoint)}}}else{if(c.tapToToggleControls){if(i){n.hideControls()}else{n.showControls()}}if(c.tapToClose&&(s.hasClass(t,"pswp__img")||R(t))){o.close();return}}};n.onMouseOver=function(e){e=e||window.event;var t=e.target||e.srcElement;x(a,"ui--over-close",R(t))};n.hideControls=function(){s.addClass(a,"pswp__ui--hidden");i=false};n.showControls=function(){i=true;if(!l){n.update()}s.removeClass(a,"pswp__ui--hidden")};n.supportsFullscreen=function(){var e=document;return!!(e.exitFullscreen||e.mozCancelFullScreen||e.webkitExitFullscreen||e.msExitFullscreen)};n.getFullscreenAPI=function(){var e=document.documentElement,t,n="fullscreenchange";if(e.requestFullscreen){t={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:n}}else if(e.mozRequestFullScreen){t={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+n}}else if(e.webkitRequestFullscreen){t={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+n}}else if(e.msRequestFullscreen){t={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}}if(t){t.enter=function(){h=c.closeOnScroll;c.closeOnScroll=false;if(this.enterK==="webkitRequestFullscreen"){o.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)}else{return o.template[this.enterK]()}};t.exit=function(){c.closeOnScroll=h;return document[this.exitK]()};t.isFullscreen=function(){return document[this.elementK]}}return t}};return e});