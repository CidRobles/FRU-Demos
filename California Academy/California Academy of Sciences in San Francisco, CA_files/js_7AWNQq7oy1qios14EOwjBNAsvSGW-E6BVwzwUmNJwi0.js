var ChimeraPopup = function () {
	var $ = jQuery;

	var _onDateSelect = function (td) {
		var data = td.data();

		if (data.performance) {
			var url = chimera.TNEW_URL + chimera.CART_URL_LOGIN + encodeURIComponent('/memberadmissiontimed/' + data.performance.PerformanceId);
			window.location.href = url;
		}

		return false;
	}

	var _onData = function () {
		$('.modal.chimera').find('td').each(function () {
			$(this).removeClass('active');
			var data = $(this).data();

			// make sure tix on sale
			if (data.performance) {
				if (data.performance.PublishWebApiStartDate) {
					var time = moment(data.performance.PublishWebApiStartDate);

					if (time.isValid()) {
						if (time.isAfter()) return;
					}
				}
			}

			// append availability
			var numAvailable = 0;
			
			if (data.availability) {
				$.each(data.availability, function (i, obj) {
					if (obj.AvailableCount > numAvailable) {
						numAvailable = obj.AvailableCount;
					}
				});
			}

			if (numAvailable > 0) {
				$(this).attr('price-class', 'generic');
				$(this).addClass('active');

				var str = numAvailable + '<br />';
				str += (numAvailable == 1) ? 'ticket' : 'tickets';
				
				$(this).find('.performance').not(':first').remove();
				$(this).find('.performance').append('<div>' + str + '</div>');
			}
		});
	}

	var _getModal = function () {
		var modal = $('<div />');
		modal.addClass('modal');
		modal.addClass('chimera');
		modal.addClass('loading');
		
		// close button
		var close = $('<a href="#" rel="modal:close" class="close">Close</a>');
		modal.append(close);

		// blurb
		if (chimera.MEMBERSHIP_CALENDAR_CONFIG.blurb) {
			var b = $.trim(chimera.MEMBERSHIP_CALENDAR_CONFIG.blurb);

			if (b != '') {
				var blurb = $('<div />');
				blurb.addClass('blurb');
				blurb.html(b);
				modal.append(blurb);
			}
		}

		// calendar
		var cal = $('<div />');
		cal.addClass('calendar');
		$('html').addClass('calendar-small');
		cal.addClass('inline-embed');

		var foo = new TessituraCalendarView(cal, {
			minDate: 0,
			maxDate: chimera.MEMBER_TIX_SEARCH_FUTURE,
			performanceTypes: [
				{
					id: chimera.MEMBER_TIX_TYPE_ID,
					priceTypes: [ chimera.REFERENCE_PRICE_TYPE ]
				}
			],
			onData: _onData,
			onDateSelect: _onDateSelect
		});

		modal.on($.modal.OPEN, function () {
			$('html').addClass('modal-open');
		});

		modal.on($.modal.CLOSE, function () {
			$('html').removeClass('modal-open');
		});

		modal.append(cal);
		
		return modal;	
	}

	var _onClick = function () {
		$('.chimera-calendar-popup, .modal').remove();

		$(window).off('resize.modal');
		
		$(window).on('resize.modal', function () {
			$('.modal').css('display', 'inline-block');
		});

		var modal = _getModal();

		// open modal
		modal.modal({
			blockerClass: 'chimera-calendar-popup',
			fadeDuration: 300,
  			fadeDelay: 0.5,
			showClose: false
		});

		return false;
	}

	this.initialize = function () {
		if (typeof(chimera) != 'object') return;
		if (!chimera.MEMBERSHIP_CALENDAR_CONFIG) return;
		if (!chimera.MEMBERSHIP_CALENDAR_CONFIG.urlFragment) return;

		var links = $('a[href*="' + $.trim(chimera.MEMBERSHIP_CALENDAR_CONFIG.urlFragment) + '"]');
		var e = Modernizr.touch ? 'touchend' : 'click';

		links.off();
		links.on(e, _onClick);
	}

	this.initialize();
}
;
/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isLowIE=b.isIE8=document.all&&!document.addEventListener,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(c,d){if(void 0===d||d===!1)return!0;if(e=c.split("_"),e.length>1){var f=b.find(p+"-"+e[0]);if(f.length>0){var g=e[1];"replaceWith"===g?f[0]!==d[0]&&f.replaceWith(d):"img"===g?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(p+"-"+c).html(d)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery";return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s);e.click(function(){b.prev()}),f.click(function(){b.next()}),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),A()});;
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Sketchfab=e():t.Sketchfab=e()}(self,(()=>(()=>{"use strict";var t={d:(e,i)=>{for(var n in i)t.o(i,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:i[n]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};function i(t){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}t.d(e,{default:()=>h});var n=function(t,e){t.forEach((function(t){this[t]=function(){var i,n=e._requestIdCounter++,s=Array.prototype.slice.call(arguments);if(s.length>0){var r=s[s.length-1];"function"==typeof r&&(i=s.pop())}i&&(e._pendingRequests[n]=i.bind(this)),e._target.postMessage({type:"api.request",instanceId:e.getIdentifier(),requestId:n,member:t,arguments:s},e.getDomain())}}),this),this.addEventListener=function(t,i,n){"viewerready"===t&&e.isViewerReady&&i(),e._eventListeners[t]||(e._eventListeners[t]=[]),e._eventListeners[t].push(i),n&&this.setListenerOptions&&(n.name=t,this.setListenerOptions(n))},this.removeEventListener=function(t,i){if(e._eventListeners[t]){var n=e._eventListeners[t].indexOf(i);-1!==n&&e._eventListeners[t].splice(n,1)}}},s=function(t,e,i){this._target=t,this._requestIdCounter=0,this._pendingRequests={},this._eventListeners={},this._ready=!1,this._domain=i,this._instanceId=e,this.listenServer()};s.prototype={getIdentifier:function(){return this._instanceId},getDomain:function(){return this._domain},setIdentifier:function(t){this._instanceId=t},use:function(t,e){this._version=t,this._ready=!0;var i=this._requestIdCounter++;this._pendingRequests[i]=function(t,i,s){t?e.call(this,t):e.call(this,null,new n(s,this))}.bind(this),this._target.postMessage({type:"api.initialize",requestId:i,name:t,instanceId:this._instanceId},this._domain)},listenServer:function(){if(!this._serverReceiveMessageBinded){var t=["api.initialize.result","api.request.result","api.event"];this._serverReceiveMessageBinded=function(e){if(e.origin===this._domain&&e.data&&e.data.type&&e.data.instanceId&&e.data.instanceId===this.getIdentifier()){var i=e.data.type;if(-1!==t.indexOf(i))if("api.event"===i){var n=e.data.results,s=n[0];if(this._eventListeners["*"]||this._eventListeners.all)return void["*","all"].forEach((function(t){var e=this._eventListeners[t];e&&e.forEach((function(t){t.apply(t,n)}))}),this);var r=n.slice(1),o=this._eventListeners[s];o?o.forEach((function(t){t.apply(t,r)})):"viewerready"===s&&(this.isViewerReady=!0)}else{var a=e.data.requestId,d=this._pendingRequests[a];if(!d)return;d.apply(null,e.data.results),this._pendingRequests[a]=void 0}}}.bind(this),window.addEventListener("message",this._serverReceiveMessageBinded)}}};const r=s;var o=/[&|;]+/g;function a(t){return"object"===i(t)?(e=t,n={},Object.keys(e).forEach((function(t){n[t]=Array.isArray(e[t])?e[t]:[e[t]]})),n):("?"===t[0]&&(t=t.substr(1)),t.split(o).reduce((function(t,e){if(0===e.length)return t;var i=e.indexOf("=");-1===i&&(i=e.length);var n=decodeURIComponent(e.substr(0,i).replace(/\+/g,"%20")),s=decodeURIComponent(e.substr(i+1).replace(/\+/g,"%20"));return void 0===t[n]&&(t[n]=[]),t[n].push(s),t}),{}));var e,n}window.SketchfabAPIClient=r;var d=function(t,e){var n=t,s=e;"object"===i(t)&&(s=t,n=null),this._version=n,this._target=s,window.sketchfabAPIinstances||(window.sketchfabAPIinstances=[]),window.sketchfabAPIinstances.push(this),this._apiId=window.sketchfabAPIinstances.length.toString(),this._target.id&&(this._apiId+="_"+this._target.id),this._target.allow||(this._target.allow="vr; autoplay; fullscreen"),this._client=void 0,this._options=void 0,this._domain="sketchfab.com",this._domain="same-as-current"===this._domain?window.location.hostname:this._domain,this._urlTemplate="https://YYYY/models/XXXX/embed",this._url=this._urlTemplate.replace("YYYY",this._domain),this._transmitOptions={},this._getURLOptions()};d.prototype={_urlOptionsDict:{skfb_api_version:{default:"1.12.1",type:"string"}},_optionsLoaded:function(t){this._urlOptions=t,this._version=this._getURLOption("skfb_api_version",this._version)},_getURLOption:function(t,e){var i=this._urlOptionsDict[t];if(!i)return e;null==e&&(e=i.default);var n=this._urlOptions[t];return n&&n.length?n[0]:e},_getURLOptions:function(){if(!window||!window.location.search)return this._optionsLoaded({});var t=a(window.location.search);for(var e in t)e.startsWith("skfb_")&&(this._transmitOptions[e.substr(5)]=t[e]);return this._optionsLoaded(t)},getEmbedURL:function(t,e){var i=this._url+"?api_version="+this._version+"&api_id="+this._apiId;e&&Object.keys(e).forEach((function(t){null!=e[t]&&"function"!=typeof e[t]&&(i+="&"+t.toString()+"="+e[t].toString())}));var n=this._transmitOptions;return Object.keys(this._transmitOptions).forEach((function(t){i+="&"+t.toString()+"="+n[t].toString()})),i.replace("XXXX",t)},init:function(t,e){this._options=e,this._uid=t,this._realInit()},_initializeAPIEmbed:function(t){if(t.data&&t.data.instanceId&&this._apiId===t.data.instanceId&&"api.ready"===t.data.type&&this._target.src){if(void 0!==t.data.error)return this.error(t.data.error),void window.removeEventListener("message",this._initializeAPIEmbedBinded);var e=this._target.src.split("/");e="https://"+e[2],this._client&&(console.log("reusing a Sketchfab instance for multiple client is not supported, please create a new sketchfab instance"),window.removeEventListener("message",this._client._serverReceiveMessageBinded)),this._client=new window.SketchfabAPIClient(this._target.contentWindow,this._apiId,e),this._client.use(this._version,function(t,e){if(t)throw t;this.success.call(this,e)}.bind(this)),window.removeEventListener("message",this._initializeAPIEmbedBinded)}},_realInit:function(){this._initializeAPIEmbedBinded||(this._initializeAPIEmbedBinded=this._initializeAPIEmbed.bind(this)),window.addEventListener("message",this._initializeAPIEmbedBinded),this._target.src=this.getEmbedURL(this._uid,this._options)},success:function(t){this._options.success&&"function"==typeof this._options.success&&this._options.success(t)},error:function(t){this._options.error&&"function"==typeof this._options.error&&this._options.error(t)},show:function(){var t=this._target.style.top;this._target.style.top="-1000vh",Promise.resolve().then(function(){this._target.style.top=t}.bind(this))}};const h=d;return e.default})()));

var ModelInline = function (id, copy) {
	var $ = jQuery;
	var _api;
    
    var _onLoad = function () {
        _api.removeEventListener('camerastart', _onLoad);

        _api.setPostProcessing({
            vignetteEnable: false
        });

        $('html').addClass('model-loaded');
    }

    var _getModelId = function () {
    	var arr = $('.model-inline').data('models');
    	var i = Math.floor(Math.random() * arr.length);

    	return arr[i];
    }

    var _insertWatermark = function () {
    	var a = $('<a class="sketchfab-watermark" title="View on Sketchfab" href="https://sketchfab.com/calacademy" target="_blank">View on Sketchfab</a>');
    	$('.model-inline').append(a);
    }

	this.initialize = function () {
		$('html').addClass('has-model-inline');
		
		$('.model-inline').append('<div class="iframe-container"><iframe src="" id="sketchfab-frame" frameborder="0" allow="autoplay; fullscreen; vr" allowvr allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe></div>');

		var iframe = $('#sketchfab-frame').get(0);
	    var client = new Sketchfab(iframe);

	    client.init(_getModelId(), {
	    	transparent: 1,
	    	preload: 1,
	    	ui_hint: 0,
	        autospin: 0.35,
	        autostart: 1,
	        ui_infos: 0,
	        ui_controls: 0,
	        ui_stop: 0,
	        success: function onSuccess (api) {
	            _api = api;
	            _api.addEventListener('camerastart', _onLoad);

	            _api.load(function () {
	                _api.start();
	                _insertWatermark();
	            });
	        }
	    });
	}

	this.initialize();
}

jQuery(document).ready(function ($) {
	var _doSkull = function () {
		if (!window.calacademyJazz) return false;
		if (!$('html').hasClass('skull') && !window.calacademyJazz.skull) return false;
		if ($('.model-inline').length != 1) return false;
		
		return true;
	}

	if (_doSkull()) {
		$('.skull-remove').remove();
		$('.skull-message').html('Happy Halloween from the Academy! Take hundreds of spooky skulls for a spin on our new <a href="https://sketchfab.com/calacademy/">Sketchfab channel</a>.');
		var foo = ModelInline();
	} else {
		$('.skull-message, .model-inline').remove();
	}
});
;
(function(c){c.fn.extend({defaultValue:function(e){if("placeholder"in document.createElement("input"))return!1;return this.each(function(){if(c(this).data("defaultValued"))return!1;var a=c(this),h=a.attr("placeholder"),f={input:a};a.data("defaultValued",!0);var d=function(){var b;if(a.context.nodeName.toLowerCase()=="input")b=c("<input />").attr({type:"text"});else if(a.context.nodeName.toLowerCase()=="textarea")b=c("<textarea />");else throw"DefaultValue only works with input and textareas";b.attr({value:h,
"class":a.attr("class")+" empty",size:a.attr("size"),style:a.attr("style"),tabindex:a.attr("tabindex"),rows:a.attr("rows"),cols:a.attr("cols"),name:"defaultvalue-clone-"+((1+Math.random())*65536|0).toString(16).substring(1)});b.focus(function(){b.hide();a.show();setTimeout(function(){a.focus()},1)});return b}();f.clone=d;d.insertAfter(a);var g=function(){a.val().length<=0?(d.show(),a.hide()):(d.hide(),a.show().trigger("click"))};a.bind("blur",g);g();e&&e(f)})}})})(jQuery);;
/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.13
 */
;(function(k){'use strict';k(['jquery'],function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:!0};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}}return j})}(typeof define==='function'&&define.amd?define:function(a,b){if(typeof module!=='undefined'&&module.exports){module.exports=b(require('jquery'))}else{b(jQuery)}}));;
/*
 *	jQuery dotdotdot 1.6.16
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
!function(t,e){function n(t,e,n){var r=t.children(),o=!1;t.empty();for(var i=0,d=r.length;d>i;i++){var l=r.eq(i);if(t.append(l),n&&t.append(n),a(t,e)){l.remove(),o=!0;break}n&&n.detach()}return o}function r(e,n,i,d,l){var s=!1,c="table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",u="script, .dotdotdot-keep";return e.contents().detach().each(function(){var f=this,h=t(f);if("undefined"==typeof f||3==f.nodeType&&0==t.trim(f.data).length)return!0;if(h.is(u))e.append(h);else{if(s)return!0;e.append(h),l&&e[e.is(c)?"after":"append"](l),a(i,d)&&(s=3==f.nodeType?o(h,n,i,d,l):r(h,n,i,d,l),s||(h.detach(),s=!0)),s||l&&l.detach()}}),s}function o(e,n,r,o,d){var c=e[0];if(!c)return!1;var f=s(c),h=-1!==f.indexOf(" ")?" ":"　",p="letter"==o.wrap?"":h,g=f.split(p),v=-1,w=-1,b=0,y=g.length-1;for(o.fallbackToLetter&&0==b&&0==y&&(p="",g=f.split(p),y=g.length-1);y>=b&&(0!=b||0!=y);){var m=Math.floor((b+y)/2);if(m==w)break;w=m,l(c,g.slice(0,w+1).join(p)+o.ellipsis),a(r,o)?(y=w,o.fallbackToLetter&&0==b&&0==y&&(p="",g=g[0].split(p),v=-1,w=-1,b=0,y=g.length-1)):(v=w,b=w)}if(-1==v||1==g.length&&0==g[0].length){var x=e.parent();e.detach();var T=d&&d.closest(x).length?d.length:0;x.contents().length>T?c=u(x.contents().eq(-1-T),n):(c=u(x,n,!0),T||x.detach()),c&&(f=i(s(c),o),l(c,f),T&&d&&t(c).parent().append(d))}else f=i(g.slice(0,v+1).join(p),o),l(c,f);return!0}function a(t,e){return t.innerHeight()>e.maxHeight}function i(e,n){for(;t.inArray(e.slice(-1),n.lastCharacter.remove)>-1;)e=e.slice(0,-1);return t.inArray(e.slice(-1),n.lastCharacter.noEllipsis)<0&&(e+=n.ellipsis),e}function d(t){return{width:t.innerWidth(),height:t.innerHeight()}}function l(t,e){t.innerText?t.innerText=e:t.nodeValue?t.nodeValue=e:t.textContent&&(t.textContent=e)}function s(t){return t.innerText?t.innerText:t.nodeValue?t.nodeValue:t.textContent?t.textContent:""}function c(t){do t=t.previousSibling;while(t&&1!==t.nodeType&&3!==t.nodeType);return t}function u(e,n,r){var o,a=e&&e[0];if(a){if(!r){if(3===a.nodeType)return a;if(t.trim(e.text()))return u(e.contents().last(),n)}for(o=c(a);!o;){if(e=e.parent(),e.is(n)||!e.length)return!1;o=c(e[0])}if(o)return u(t(o),n)}return!1}function f(e,n){return e?"string"==typeof e?(e=t(e,n),e.length?e:!1):e.jquery?e:!1:!1}function h(t){for(var e=t.innerHeight(),n=["paddingTop","paddingBottom"],r=0,o=n.length;o>r;r++){var a=parseInt(t.css(n[r]),10);isNaN(a)&&(a=0),e-=a}return e}if(!t.fn.dotdotdot){t.fn.dotdotdot=function(e){if(0==this.length)return t.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){t(this).dotdotdot(e)});var o=this;o.data("dotdotdot")&&o.trigger("destroy.dot"),o.data("dotdotdot-style",o.attr("style")||""),o.css("word-wrap","break-word"),"nowrap"===o.css("white-space")&&o.css("white-space","normal"),o.bind_events=function(){return o.bind("update.dot",function(e,d){e.preventDefault(),e.stopPropagation(),l.maxHeight="number"==typeof l.height?l.height:h(o),l.maxHeight+=l.tolerance,"undefined"!=typeof d&&(("string"==typeof d||d instanceof HTMLElement)&&(d=t("<div />").append(d).contents()),d instanceof t&&(i=d)),g=o.wrapInner('<div class="dotdotdot" />').children(),g.contents().detach().end().append(i.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var c=!1,u=!1;return s.afterElement&&(c=s.afterElement.clone(!0),c.show(),s.afterElement.detach()),a(g,l)&&(u="children"==l.wrap?n(g,l,c):r(g,o,g,l,c)),g.replaceWith(g.contents()),g=null,t.isFunction(l.callback)&&l.callback.call(o[0],u,i),s.isTruncated=u,u}).bind("isTruncated.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(o[0],s.isTruncated),s.isTruncated}).bind("originalContent.dot",function(t,e){return t.preventDefault(),t.stopPropagation(),"function"==typeof e&&e.call(o[0],i),i}).bind("destroy.dot",function(t){t.preventDefault(),t.stopPropagation(),o.unwatch().unbind_events().contents().detach().end().append(i).attr("style",o.data("dotdotdot-style")||"").data("dotdotdot",!1)}),o},o.unbind_events=function(){return o.unbind(".dot"),o},o.watch=function(){if(o.unwatch(),"window"==l.watch){var e=t(window),n=e.width(),r=e.height();e.bind("resize.dot"+s.dotId,function(){n==e.width()&&r==e.height()&&l.windowResizeFix||(n=e.width(),r=e.height(),u&&clearInterval(u),u=setTimeout(function(){o.trigger("update.dot")},100))})}else c=d(o),u=setInterval(function(){if(o.is(":visible")){var t=d(o);(c.width!=t.width||c.height!=t.height)&&(o.trigger("update.dot"),c=t)}},500);return o},o.unwatch=function(){return t(window).unbind("resize.dot"+s.dotId),u&&clearInterval(u),o};var i=o.contents(),l=t.extend(!0,{},t.fn.dotdotdot.defaults,e),s={},c={},u=null,g=null;return l.lastCharacter.remove instanceof Array||(l.lastCharacter.remove=t.fn.dotdotdot.defaultArrays.lastCharacter.remove),l.lastCharacter.noEllipsis instanceof Array||(l.lastCharacter.noEllipsis=t.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis),s.afterElement=f(l.after,o),s.isTruncated=!1,s.dotId=p++,o.data("dotdotdot",!0).bind_events().trigger("update.dot"),l.watch&&o.watch(),o},t.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0},t.fn.dotdotdot.defaultArrays={lastCharacter:{remove:[" ","　",",",";",".","!","?"],noEllipsis:[]}},t.fn.dotdotdot.debug=function(){};var p=1,g=t.fn.html;t.fn.html=function(n){return n!=e&&!t.isFunction(n)&&this.data("dotdotdot")?this.trigger("update",[n]):g.apply(this,arguments)};var v=t.fn.text;t.fn.text=function(n){return n!=e&&!t.isFunction(n)&&this.data("dotdotdot")?(n=t("<div />").text(n).html(),this.trigger("update",[n])):v.apply(this,arguments)}}}(jQuery);;
/*! Hammer.JS - v2.0.3 - 2014-09-10
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */


!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==ib?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<gb.length;){if(c=gb[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return mb++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:pb?N:qb?O:ob?Q:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&wb&&d-e===0,g=b&(yb|zb)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=lb(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===wb||f.eventType===yb)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=zb&&(i>vb||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=kb(l.x)>kb(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:jb(a.pointers[c].clientX),clientY:jb(a.pointers[c].clientY)},c++;return{timeStamp:lb(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:jb(a[0].clientX),y:jb(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:jb(c/b),y:jb(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Ab:kb(a)>=kb(b)?a>0?Bb:Cb:b>0?Db:Eb}function I(a,b,c){c||(c=Ib);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Ib);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],Jb)-J(a[1],a[0],Jb)}function L(a,b){return I(b[0],b[1],Jb)/I(a[0],a[1],Jb)}function M(){this.evEl=Lb,this.evWin=Mb,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Pb,this.evWin=Qb,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Sb,this.targetIds={},y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=this.targetIds;if(b&(wb|xb)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f=t(a.targetTouches),g=t(a.changedTouches),h=[];if(b===wb)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(yb|zb)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function Q(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new O(this.manager,a),this.mouse=new M(this.manager,a)}function R(a,b){this.manager=a,this.set(b)}function S(a){if(q(a,Yb))return Yb;var b=q(a,Zb),c=q(a,$b);return b&&c?Zb+" "+$b:b||c?b?Zb:$b:q(a,Xb)?Xb:Wb}function T(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=_b,this.simultaneous={},this.requireFail=[]}function U(a){return a&ec?"cancel":a&cc?"end":a&bc?"move":a&ac?"start":""}function V(a){return a==Eb?"down":a==Db?"up":a==Bb?"left":a==Cb?"right":""}function W(a,b){var c=b.manager;return c?c.get(a):a}function X(){T.apply(this,arguments)}function Y(){X.apply(this,arguments),this.pX=null,this.pY=null}function Z(){X.apply(this,arguments)}function $(){T.apply(this,arguments),this._timer=null,this._input=null}function _(){X.apply(this,arguments)}function ab(){X.apply(this,arguments)}function bb(){T.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function cb(a,b){return b=b||{},b.recognizers=m(b.recognizers,cb.defaults.preset),new db(a,b)}function db(a,b){b=b||{},this.options=i(b,cb.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new R(this,this.options.touchAction),eb(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function eb(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function fb(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var gb=["","webkit","moz","MS","ms","o"],hb=b.createElement("div"),ib="function",jb=Math.round,kb=Math.abs,lb=Date.now,mb=1,nb=/mobile|tablet|ip(ad|hone|od)|android/i,ob="ontouchstart"in a,pb=v(a,"PointerEvent")!==d,qb=ob&&nb.test(navigator.userAgent),rb="touch",sb="pen",tb="mouse",ub="kinect",vb=25,wb=1,xb=2,yb=4,zb=8,Ab=1,Bb=2,Cb=4,Db=8,Eb=16,Fb=Bb|Cb,Gb=Db|Eb,Hb=Fb|Gb,Ib=["x","y"],Jb=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Kb={mousedown:wb,mousemove:xb,mouseup:yb},Lb="mousedown",Mb="mousemove mouseup";j(M,y,{handler:function(a){var b=Kb[a.type];b&wb&&0===a.button&&(this.pressed=!0),b&xb&&1!==a.which&&(b=yb),this.pressed&&this.allow&&(b&yb&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:tb,srcEvent:a}))}});var Nb={pointerdown:wb,pointermove:xb,pointerup:yb,pointercancel:zb,pointerout:zb},Ob={2:rb,3:sb,4:tb,5:ub},Pb="pointerdown",Qb="pointermove pointerup pointercancel";a.MSPointerEvent&&(Pb="MSPointerDown",Qb="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Nb[d],f=Ob[a.pointerType]||a.pointerType,g=f==rb;e&wb&&(0===a.button||g)?b.push(a):e&(yb|zb)&&(c=!0);var h=s(b,a.pointerId,"pointerId");0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Rb={touchstart:wb,touchmove:xb,touchend:yb,touchcancel:zb},Sb="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Rb[a.type],c=P.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:rb,srcEvent:a})}}),j(Q,y,{handler:function(a,b,c){var d=c.pointerType==rb,e=c.pointerType==tb;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(yb|zb)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Tb=v(hb.style,"touchAction"),Ub=Tb!==d,Vb="compute",Wb="auto",Xb="manipulation",Yb="none",Zb="pan-x",$b="pan-y";R.prototype={set:function(a){a==Vb&&(a=this.compute()),Ub&&(this.manager.element.style[Tb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),S(a.join(" "))},preventDefaults:function(a){if(!Ub){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,Yb),f=q(d,$b),g=q(d,Zb);return e||f&&c&Fb||g&&c&Gb?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var _b=1,ac=2,bc=4,cc=8,dc=cc,ec=16,fc=32;T.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=W(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=W(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=W(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=W(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?U(d):""),a)}var c=this,d=this.state;cc>d&&b(!0),b(),d>=cc&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=fc)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(fc|_b)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(dc|ec|fc)&&(this.state=_b),this.state=this.process(b),void(this.state&(ac|bc|cc|ec)&&this.tryEmit(b))):(this.reset(),void(this.state=fc))},process:function(){},getTouchAction:function(){},reset:function(){}},j(X,T,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ac|bc),e=this.attrTest(a);return d&&(c&zb||!e)?b|ec:d||e?c&yb?b|cc:b&ac?b|bc:ac:fc}}),j(Y,X,{defaults:{event:"pan",threshold:10,pointers:1,direction:Hb},getTouchAction:function(){var a=this.options.direction,b=[];return a&Fb&&b.push($b),a&Gb&&b.push(Zb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Fb?(e=0===f?Ab:0>f?Bb:Cb,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ab:0>g?Db:Eb,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return X.prototype.attrTest.call(this,a)&&(this.state&ac||!(this.state&ac)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=V(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(Z,X,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Yb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ac)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j($,T,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Wb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(yb|zb)&&!f)this.reset();else if(a.eventType&wb)this.reset(),this._timer=e(function(){this.state=dc,this.tryEmit()},b.time,this);else if(a.eventType&yb)return dc;return fc},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===dc&&(a&&a.eventType&yb?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=lb(),this.manager.emit(this.options.event,this._input)))}}),j(_,X,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Yb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ac)}}),j(ab,X,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Fb|Gb,pointers:1},getTouchAction:function(){return Y.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Fb|Gb)?b=a.velocity:c&Fb?b=a.velocityX:c&Gb&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&kb(b)>this.options.velocity&&a.eventType&yb},emit:function(a){var b=V(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(bb,T,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Xb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&wb&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=yb)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=dc,this.tryEmit()},b.interval,this),ac):dc}return fc},failTimeout:function(){return this._timer=e(function(){this.state=fc},this.options.interval,this),fc},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==dc&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),cb.VERSION="2.0.3",cb.defaults={domEvents:!1,touchAction:Vb,enable:!0,inputTarget:null,inputClass:null,preset:[[_,{enable:!1}],[Z,{enable:!1},["rotate"]],[ab,{direction:Fb}],[Y,{direction:Fb},["swipe"]],[bb],[bb,{event:"doubletap",taps:2},["tap"]],[$]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var gc=1,hc=2;db.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?hc:gc},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&dc)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===hc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ac|bc|cc)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof T)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&fb(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&eb(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(cb,{INPUT_START:wb,INPUT_MOVE:xb,INPUT_END:yb,INPUT_CANCEL:zb,STATE_POSSIBLE:_b,STATE_BEGAN:ac,STATE_CHANGED:bc,STATE_ENDED:cc,STATE_RECOGNIZED:dc,STATE_CANCELLED:ec,STATE_FAILED:fc,DIRECTION_NONE:Ab,DIRECTION_LEFT:Bb,DIRECTION_RIGHT:Cb,DIRECTION_UP:Db,DIRECTION_DOWN:Eb,DIRECTION_HORIZONTAL:Fb,DIRECTION_VERTICAL:Gb,DIRECTION_ALL:Hb,Manager:db,Input:y,TouchAction:R,TouchInput:O,MouseInput:M,PointerEventInput:N,TouchMouseInput:Q,Recognizer:T,AttrRecognizer:X,Tap:bb,Pan:Y,Swipe:ab,Pinch:Z,Rotate:_,Press:$,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==ib&&define.amd?define(function(){return cb}):"undefined"!=typeof module&&module.exports?module.exports=cb:a[c]=cb}(window,document,"Hammer");
;
(function($, Hammer, dataAttr) {
    function hammerify(el, options) {
        var $el = $(el);
        if(!$el.data(dataAttr)) {
            $el.data(dataAttr, new Hammer($el[0], options));
        }
    }

    $.fn.hammer = function(options) {
        return this.each(function() {
            hammerify(this, options);
        });
    };

    // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit = (function(originalEmit) {
        return function(type, data) {
            originalEmit.call(this, type, data);
            $(this.element).trigger({
                type: type,
                gesture: data
            });
        };
    })(Hammer.Manager.prototype.emit);
})(jQuery, Hammer, "hammer");
;
!function(t){var i=t(window);t.fn.visible=function(t,e,o){if(!(this.length<1)){var r=this.length>1?this.eq(0):this,n=r.get(0),f=i.width(),h=i.height(),o=o?o:"both",l=e===!0?n.offsetWidth*n.offsetHeight:!0;if("function"==typeof n.getBoundingClientRect){var g=n.getBoundingClientRect(),u=g.top>=0&&g.top<h,s=g.bottom>0&&g.bottom<=h,c=g.left>=0&&g.left<f,a=g.right>0&&g.right<=f,v=t?u||s:u&&s,b=t?c||a:c&&a;if("both"===o)return l&&v&&b;if("vertical"===o)return l&&v;if("horizontal"===o)return l&&b}else{var d=i.scrollTop(),p=d+h,w=i.scrollLeft(),m=w+f,y=r.offset(),z=y.top,B=z+r.height(),C=y.left,R=C+r.width(),j=t===!0?B:z,q=t===!0?z:B,H=t===!0?R:C,L=t===!0?C:R;if("both"===o)return!!l&&p>=q&&j>=d&&m>=L&&H>=w;if("vertical"===o)return!!l&&p>=q&&j>=d;if("horizontal"===o)return!!l&&m>=L&&H>=w}}}}(jQuery);
;
/*! jQuery UI - v1.12.1 - 2019-01-11
* http://jqueryui.com
* Includes: widget.js, data.js, keycode.js, scroll-parent.js, widgets/draggable.js, widgets/datepicker.js, widgets/mouse.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){function e(t){for(var e,i;t.length&&t[0]!==document;){if(e=t.css("position"),("absolute"===e||"relative"===e||"fixed"===e)&&(i=parseInt(t.css("zIndex"),10),!isNaN(i)&&0!==i))return i;t=t.parent()}return 0}function i(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},t.extend(this._defaults,this.regional[""]),this.regional.en=t.extend(!0,{},this.regional[""]),this.regional["en-US"]=t.extend(!0,{},this.regional.en),this.dpDiv=s(t("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function s(e){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.on("mouseout",i,function(){t(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).removeClass("ui-datepicker-next-hover")}).on("mouseover",i,n)}function n(){t.datepicker._isDisabledDatepicker(h.inline?h.dpDiv.parent()[0]:h.input[0])||(t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),t(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).addClass("ui-datepicker-next-hover"))}function o(e,i){t.extend(e,i);for(var s in i)null==i[s]&&(e[s]=i[s]);return e}t.ui=t.ui||{},t.ui.version="1.12.1";var a=0,r=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,o,a,r={},l=e.split(".")[0];e=e.split(".")[1];var h=l+"-"+e;return s||(s=i,i=t.Widget),t.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr[":"][h.toLowerCase()]=function(e){return!!t.data(e,h)},t[l]=t[l]||{},n=t[l][e],o=t[l][e]=function(t,e){return this._createWidget?(arguments.length&&this._createWidget(t,e),void 0):new o(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){return t.isFunction(s)?(r[e]=function(){function t(){return i.prototype[e].apply(this,arguments)}function n(t){return i.prototype[e].apply(this,t)}return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}(),void 0):(r[e]=s,void 0)}),o.prototype=t.widget.extend(a,{widgetEventPrefix:n?a.widgetEventPrefix||e:e},r,{constructor:o,namespace:l,widgetName:e,widgetFullName:h}),n?(t.each(n._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var i,s,n=r.call(arguments,1),o=0,a=n.length;a>o;o++)for(i in n[o])s=n[o][i],n[o].hasOwnProperty(i)&&void 0!==s&&(e[i]=t.isPlainObject(s)?t.isPlainObject(e[i])?t.widget.extend({},e[i],s):t.widget.extend({},s):s);return e},t.widget.bridge=function(e,i){var s=i.prototype.widgetFullName||e;t.fn[e]=function(n){var o="string"==typeof n,a=r.call(arguments,1),l=this;return o?this.length||"instance"!==n?this.each(function(){var i,o=t.data(this,s);return"instance"===n?(l=o,!1):o?t.isFunction(o[n])&&"_"!==n.charAt(0)?(i=o[n].apply(o,a),i!==o&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+n+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; "+"attempted to call method '"+n+"'")}):l=void 0:(a.length&&(n=t.widget.extend.apply(null,[n].concat(a))),this.each(function(){var e=t.data(this,s);e?(e.option(n||{}),e._init&&e._init()):t.data(this,s,new i(n,this))})),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(e,i){i=t(i||this.defaultElement||this)[0],this.element=t(i),this.uuid=a++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},i!==this&&(t.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=t(i.style?i.ownerDocument:i.document||i),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,function(t,i){e._removeClass(i,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;s.length-1>o;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){function i(i,o){var a,r;for(r=0;i.length>r;r++)a=n.classesElementLookup[i[r]]||t(),a=e.add?t(t.unique(a.get().concat(e.element.get()))):t(a.not(e.element).get()),n.classesElementLookup[i[r]]=a,s.push(i[r]),o&&e.classes[i[r]]&&s.push(e.classes[i[r]])}var s=[],n=this;return e=t.extend({element:this.element,classes:this.options.classes||{}},e),this._on(e.element,{remove:"_untrackClassesElement"}),e.keys&&i(e.keys.match(/\S+/g)||[],!0),e.extra&&i(e.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))})},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),h=l[1]+o.eventNamespace,c=l[2];c?n.on(h,c,r):i.on(h,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i).off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}}),t.widget,t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])}}),t.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},t.fn.scrollParent=function(e){var i=this.css("position"),s="absolute"===i,n=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return s&&"static"===e.css("position")?!1:n.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:t(this[0].ownerDocument||document)},t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var l=!1;t(document).on("mouseup",function(){l=!1}),t.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.on("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).on("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){if(!l){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(e),this._mouseDownEvent=e;var i=this,s=1===e.which,n="string"==typeof this.options.cancel&&e.target.nodeName?t(e.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(e)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(e)!==!1,!this._mouseStarted)?(e.preventDefault(),!0):(!0===t.data(e.target,this.widgetName+".preventClickEvent")&&t.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return i._mouseMove(t)},this._mouseUpDelegate=function(t){return i._mouseUp(t)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),l=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button)return this._mouseUp(e);if(!e.which)if(e.originalEvent.altKey||e.originalEvent.ctrlKey||e.originalEvent.metaKey||e.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,l=!1,e.preventDefault()},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),t.ui.plugin={add:function(e,i,s){var n,o=t.ui[e].prototype;for(n in s)o.plugins[n]=o.plugins[n]||[],o.plugins[n].push([i,s[n]])},call:function(t,e,i,s){var n,o=t.plugins[e];if(o&&(s||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(n=0;o.length>n;n++)t.options[o[n][0]]&&o[n][1].apply(t.element,i)}},t.ui.safeActiveElement=function(t){var e;try{e=t.activeElement}catch(i){e=t.body}return e||(e=t.body),e.nodeName||(e=t.body),e},t.ui.safeBlur=function(e){e&&"body"!==e.nodeName.toLowerCase()&&t(e).trigger("blur")},t.widget("ui.draggable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(e){var i=this.options;return this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),this.handle?(this._blurActiveElement(e),this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(e){this.iframeBlocks=this.document.find(e).map(function(){var e=t(this);return t("<div>").css("position","absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(e){var i=t.ui.safeActiveElement(this.document[0]),s=t(e.target);s.closest(i).length||t.ui.safeBlur(i)},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===t(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(e),this.originalPosition=this.position=this._generatePosition(e,!1),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(e,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",e,s)===!1)return this._mouseUp(new t.Event("mouseup",e)),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,s=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",e)!==!1&&i._clear()}):this._trigger("stop",e)!==!1&&this._clear(),!1},_mouseUp:function(e){return this._unblockFrames(),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),this.handleElement.is(e.target)&&this.element.trigger("focus"),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new t.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(e){return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper),n=s?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var e=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options,o=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,t(o).width()-this.helperProportions.width-this.margins.left,(t(o).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=t(n.containment),s=i[0],s&&(e=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(t,e){e||(e=this.position);var i="absolute"===t?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(t,e){var i,s,n,o,a=this.options,r=this._isRootNode(this.scrollParent[0]),l=t.pageX,h=t.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),a.grid&&(n=a.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/a.grid[1])*a.grid[1]:this.originalPageY,h=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-a.grid[1]:n+a.grid[1]:n,o=a.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/a.grid[0])*a.grid[0]:this.originalPageX,l=i?o-this.offset.click.left>=i[0]||o-this.offset.click.left>i[2]?o:o-this.offset.click.left>=i[0]?o-a.grid[0]:o+a.grid[0]:o),"y"===a.axis&&(l=this.originalPageX),"x"===a.axis&&(h=this.originalPageY)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(e,i,s){return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s,this],!0),/^(drag|start|stop)/.test(e)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),t.Widget.prototype._trigger.call(this,e,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i,s){var n=t.extend({},i,{item:s.element});s.sortables=[],t(s.options.connectToSortable).each(function(){var i=t(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",e,n))})},stop:function(e,i,s){var n=t.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,t.each(s.sortables,function(){var t=this;t.isOver?(t.isOver=0,s.cancelHelperRemoval=!0,t.cancelHelperRemoval=!1,t._storedCSS={position:t.placeholder.css("position"),top:t.placeholder.css("top"),left:t.placeholder.css("left")},t._mouseStop(e),t.options.helper=t.options._helper):(t.cancelHelperRemoval=!0,t._trigger("deactivate",e,n))})},drag:function(e,i,s){t.each(s.sortables,function(){var n=!1,o=this;o.positionAbs=s.positionAbs,o.helperProportions=s.helperProportions,o.offset.click=s.offset.click,o._intersectsWith(o.containerCache)&&(n=!0,t.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==o&&this._intersectsWith(this.containerCache)&&t.contains(o.element[0],this.element[0])&&(n=!1),n})),n?(o.isOver||(o.isOver=1,s._parent=i.helper.parent(),o.currentItem=i.helper.appendTo(o.element).data("ui-sortable-item",!0),o.options._helper=o.options.helper,o.options.helper=function(){return i.helper[0]},e.target=o.currentItem[0],o._mouseCapture(e,!0),o._mouseStart(e,!0,!0),o.offset.click.top=s.offset.click.top,o.offset.click.left=s.offset.click.left,o.offset.parent.left-=s.offset.parent.left-o.offset.parent.left,o.offset.parent.top-=s.offset.parent.top-o.offset.parent.top,s._trigger("toSortable",e),s.dropped=o.element,t.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,o.fromOutside=s),o.currentItem&&(o._mouseDrag(e),i.position=o.position)):o.isOver&&(o.isOver=0,o.cancelHelperRemoval=!0,o.options._revert=o.options.revert,o.options.revert=!1,o._trigger("out",e,o._uiHash(o)),o._mouseStop(e,!0),o.options.revert=o.options._revert,o.options.helper=o.options._helper,o.placeholder&&o.placeholder.remove(),i.helper.appendTo(s._parent),s._refreshOffsets(e),i.position=s._generatePosition(e,!0),s._trigger("fromSortable",e),s.dropped=!1,t.each(s.sortables,function(){this.refreshPositions()}))})}}),t.ui.plugin.add("draggable","cursor",{start:function(e,i,s){var n=t("body"),o=s.options;n.css("cursor")&&(o._cursor=n.css("cursor")),n.css("cursor",o.cursor)},stop:function(e,i,s){var n=s.options;n._cursor&&t("body").css("cursor",n._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("opacity")&&(o._opacity=n.css("opacity")),n.css("opacity",o.opacity)},stop:function(e,i,s){var n=s.options;n._opacity&&t(i.helper).css("opacity",n._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(t,e,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(e,i,s){var n=s.options,o=!1,a=s.scrollParentNotHidden[0],r=s.document[0];a!==r&&"HTML"!==a.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+a.offsetHeight-e.pageY<n.scrollSensitivity?a.scrollTop=o=a.scrollTop+n.scrollSpeed:e.pageY-s.overflowOffset.top<n.scrollSensitivity&&(a.scrollTop=o=a.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+a.offsetWidth-e.pageX<n.scrollSensitivity?a.scrollLeft=o=a.scrollLeft+n.scrollSpeed:e.pageX-s.overflowOffset.left<n.scrollSensitivity&&(a.scrollLeft=o=a.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(e.pageY-t(r).scrollTop()<n.scrollSensitivity?o=t(r).scrollTop(t(r).scrollTop()-n.scrollSpeed):t(window).height()-(e.pageY-t(r).scrollTop())<n.scrollSensitivity&&(o=t(r).scrollTop(t(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(e.pageX-t(r).scrollLeft()<n.scrollSensitivity?o=t(r).scrollLeft(t(r).scrollLeft()-n.scrollSpeed):t(window).width()-(e.pageX-t(r).scrollLeft())<n.scrollSensitivity&&(o=t(r).scrollLeft(t(r).scrollLeft()+n.scrollSpeed)))),o!==!1&&t.ui.ddmanager&&!n.dropBehaviour&&t.ui.ddmanager.prepareOffsets(s,e)}}),t.ui.plugin.add("draggable","snap",{start:function(e,i,s){var n=s.options;s.snapElements=[],t(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var e=t(this),i=e.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:e.outerWidth(),height:e.outerHeight(),top:i.top,left:i.left})})},drag:function(e,i,s){var n,o,a,r,l,h,c,u,d,p,f=s.options,g=f.snapTolerance,m=i.offset.left,_=m+s.helperProportions.width,v=i.offset.top,b=v+s.helperProportions.height;for(d=s.snapElements.length-1;d>=0;d--)l=s.snapElements[d].left-s.margins.left,h=l+s.snapElements[d].width,c=s.snapElements[d].top-s.margins.top,u=c+s.snapElements[d].height,l-g>_||m>h+g||c-g>b||v>u+g||!t.contains(s.snapElements[d].item.ownerDocument,s.snapElements[d].item)?(s.snapElements[d].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(n=g>=Math.abs(c-b),o=g>=Math.abs(u-v),a=g>=Math.abs(l-_),r=g>=Math.abs(h-m),n&&(i.position.top=s._convertPositionTo("relative",{top:c-s.helperProportions.height,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left)),p=n||o||a||r,"outer"!==f.snapMode&&(n=g>=Math.abs(c-v),o=g>=Math.abs(u-b),a=g>=Math.abs(l-m),r=g>=Math.abs(h-_),n&&(i.position.top=s._convertPositionTo("relative",{top:c,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left)),!s.snapElements[d].snapping&&(n||o||a||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=n||o||a||r||p)
}}),t.ui.plugin.add("draggable","stack",{start:function(e,i,s){var n,o=s.options,a=t.makeArray(t(o.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});a.length&&(n=parseInt(t(a[0]).css("zIndex"),10)||0,t(a).each(function(e){t(this).css("zIndex",n+e)}),this.css("zIndex",n+a.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("zIndex")&&(o._zIndex=n.css("zIndex")),n.css("zIndex",o.zIndex)},stop:function(e,i,s){var n=s.options;n._zIndex&&t(i.helper).css("zIndex",n._zIndex)}}),t.ui.draggable,t.extend(t.ui,{datepicker:{version:"1.12.1"}});var h;t.extend(i.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(t){return o(this._defaults,t||{}),this},_attachDatepicker:function(e,i){var s,n,o;s=e.nodeName.toLowerCase(),n="div"===s||"span"===s,e.id||(this.uuid+=1,e.id="dp"+this.uuid),o=this._newInst(t(e),n),o.settings=t.extend({},i||{}),"input"===s?this._connectDatepicker(e,o):n&&this._inlineDatepicker(e,o)},_newInst:function(e,i){var n=e[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:n,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?s(t("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(e,i){var s=t(e);i.append=t([]),i.trigger=t([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).on("keydown",this._doKeyDown).on("keypress",this._doKeyPress).on("keyup",this._doKeyUp),this._autoSize(i),t.data(e,"datepicker",i),i.settings.disabled&&this._disableDatepicker(e))},_attachments:function(e,i){var s,n,o,a=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),a&&(i.append=t("<span class='"+this._appendClass+"'>"+a+"</span>"),e[r?"before":"after"](i.append)),e.off("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&e.on("focus",this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),o=this._get(i,"buttonImage"),i.trigger=t(this._get(i,"buttonImageOnly")?t("<img/>").addClass(this._triggerClass).attr({src:o,alt:n,title:n}):t("<button type='button'></button>").addClass(this._triggerClass).html(o?t("<img/>").attr({src:o,alt:n,title:n}):n)),e[r?"before":"after"](i.trigger),i.trigger.on("click",function(){return t.datepicker._datepickerShowing&&t.datepicker._lastInput===e[0]?t.datepicker._hideDatepicker():t.datepicker._datepickerShowing&&t.datepicker._lastInput!==e[0]?(t.datepicker._hideDatepicker(),t.datepicker._showDatepicker(e[0])):t.datepicker._showDatepicker(e[0]),!1}))},_autoSize:function(t){if(this._get(t,"autoSize")&&!t.inline){var e,i,s,n,o=new Date(2009,11,20),a=this._get(t,"dateFormat");a.match(/[DM]/)&&(e=function(t){for(i=0,s=0,n=0;t.length>n;n++)t[n].length>i&&(i=t[n].length,s=n);return s},o.setMonth(e(this._get(t,a.match(/MM/)?"monthNames":"monthNamesShort"))),o.setDate(e(this._get(t,a.match(/DD/)?"dayNames":"dayNamesShort"))+20-o.getDay())),t.input.attr("size",this._formatDate(t,o).length)}},_inlineDatepicker:function(e,i){var s=t(e);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),t.data(e,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(e),i.dpDiv.css("display","block"))},_dialogDatepicker:function(e,i,s,n,a){var r,l,h,c,u,d=this._dialogInst;return d||(this.uuid+=1,r="dp"+this.uuid,this._dialogInput=t("<input type='text' id='"+r+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.on("keydown",this._doKeyDown),t("body").append(this._dialogInput),d=this._dialogInst=this._newInst(this._dialogInput,!1),d.settings={},t.data(this._dialogInput[0],"datepicker",d)),o(d.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(d,i):i,this._dialogInput.val(i),this._pos=a?a.length?a:[a.pageX,a.pageY]:null,this._pos||(l=document.documentElement.clientWidth,h=document.documentElement.clientHeight,c=document.documentElement.scrollLeft||document.body.scrollLeft,u=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[l/2-100+c,h/2-150+u]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),d.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),t.blockUI&&t.blockUI(this.dpDiv),t.data(this._dialogInput[0],"datepicker",d),this},_destroyDatepicker:function(e){var i,s=t(e),n=t.data(e,"datepicker");s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),t.removeData(e,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).off("focus",this._showDatepicker).off("keydown",this._doKeyDown).off("keypress",this._doKeyPress).off("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty(),h===n&&(h=null))},_enableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!1,o.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}))},_disableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!0,o.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}),this._disabledInputs[this._disabledInputs.length]=e)},_isDisabledDatepicker:function(t){if(!t)return!1;for(var e=0;this._disabledInputs.length>e;e++)if(this._disabledInputs[e]===t)return!0;return!1},_getInst:function(e){try{return t.data(e,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,i,s){var n,a,r,l,h=this._getInst(e);return 2===arguments.length&&"string"==typeof i?"defaults"===i?t.extend({},t.datepicker._defaults):h?"all"===i?t.extend({},h.settings):this._get(h,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),h&&(this._curInst===h&&this._hideDatepicker(),a=this._getDateDatepicker(e,!0),r=this._getMinMaxDate(h,"min"),l=this._getMinMaxDate(h,"max"),o(h.settings,n),null!==r&&void 0!==n.dateFormat&&void 0===n.minDate&&(h.settings.minDate=this._formatDate(h,r)),null!==l&&void 0!==n.dateFormat&&void 0===n.maxDate&&(h.settings.maxDate=this._formatDate(h,l)),"disabled"in n&&(n.disabled?this._disableDatepicker(e):this._enableDatepicker(e)),this._attachments(t(e),h),this._autoSize(h),this._setDate(h,a),this._updateAlternate(h),this._updateDatepicker(h)),void 0)},_changeDatepicker:function(t,e,i){this._optionDatepicker(t,e,i)},_refreshDatepicker:function(t){var e=this._getInst(t);e&&this._updateDatepicker(e)},_setDateDatepicker:function(t,e){var i=this._getInst(t);i&&(this._setDate(i,e),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(t,e){var i=this._getInst(t);return i&&!i.inline&&this._setDateFromField(i,e),i?this._getDate(i):null},_doKeyDown:function(e){var i,s,n,o=t.datepicker._getInst(e.target),a=!0,r=o.dpDiv.is(".ui-datepicker-rtl");if(o._keyEvent=!0,t.datepicker._datepickerShowing)switch(e.keyCode){case 9:t.datepicker._hideDatepicker(),a=!1;break;case 13:return n=t("td."+t.datepicker._dayOverClass+":not(."+t.datepicker._currentClass+")",o.dpDiv),n[0]&&t.datepicker._selectDay(e.target,o.selectedMonth,o.selectedYear,n[0]),i=t.datepicker._get(o,"onSelect"),i?(s=t.datepicker._formatDate(o),i.apply(o.input?o.input[0]:null,[s,o])):t.datepicker._hideDatepicker(),!1;case 27:t.datepicker._hideDatepicker();break;case 33:t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 34:t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&t.datepicker._clearDate(e.target),a=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&t.datepicker._gotoToday(e.target),a=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?1:-1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,-7,"D"),a=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?-1:1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,7,"D"),a=e.ctrlKey||e.metaKey;break;default:a=!1}else 36===e.keyCode&&e.ctrlKey?t.datepicker._showDatepicker(this):a=!1;a&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var i,s,n=t.datepicker._getInst(e.target);return t.datepicker._get(n,"constrainInput")?(i=t.datepicker._possibleChars(t.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),e.ctrlKey||e.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0},_doKeyUp:function(e){var i,s=t.datepicker._getInst(e.target);if(s.input.val()!==s.lastVal)try{i=t.datepicker.parseDate(t.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,t.datepicker._getFormatConfig(s)),i&&(t.datepicker._setDateFromField(s),t.datepicker._updateAlternate(s),t.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(i){if(i=i.target||i,"input"!==i.nodeName.toLowerCase()&&(i=t("input",i.parentNode)[0]),!t.datepicker._isDisabledDatepicker(i)&&t.datepicker._lastInput!==i){var s,n,a,r,l,h,c;s=t.datepicker._getInst(i),t.datepicker._curInst&&t.datepicker._curInst!==s&&(t.datepicker._curInst.dpDiv.stop(!0,!0),s&&t.datepicker._datepickerShowing&&t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),n=t.datepicker._get(s,"beforeShow"),a=n?n.apply(i,[i,s]):{},a!==!1&&(o(s.settings,a),s.lastVal=null,t.datepicker._lastInput=i,t.datepicker._setDateFromField(s),t.datepicker._inDialog&&(i.value=""),t.datepicker._pos||(t.datepicker._pos=t.datepicker._findPos(i),t.datepicker._pos[1]+=i.offsetHeight),r=!1,t(i).parents().each(function(){return r|="fixed"===t(this).css("position"),!r}),l={left:t.datepicker._pos[0],top:t.datepicker._pos[1]},t.datepicker._pos=null,s.dpDiv.empty(),s.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),t.datepicker._updateDatepicker(s),l=t.datepicker._checkOffset(s,l,r),s.dpDiv.css({position:t.datepicker._inDialog&&t.blockUI?"static":r?"fixed":"absolute",display:"none",left:l.left+"px",top:l.top+"px"}),s.inline||(h=t.datepicker._get(s,"showAnim"),c=t.datepicker._get(s,"duration"),s.dpDiv.css("z-index",e(t(i))+1),t.datepicker._datepickerShowing=!0,t.effects&&t.effects.effect[h]?s.dpDiv.show(h,t.datepicker._get(s,"showOptions"),c):s.dpDiv[h||"show"](h?c:null),t.datepicker._shouldFocusInput(s)&&s.input.trigger("focus"),t.datepicker._curInst=s))}},_updateDatepicker:function(e){this.maxRows=4,h=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var i,s=this._getNumberOfMonths(e),o=s[1],a=17,r=e.dpDiv.find("."+this._dayOverClass+" a");r.length>0&&n.apply(r.get(0)),e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),o>1&&e.dpDiv.addClass("ui-datepicker-multi-"+o).css("width",a*o+"em"),e.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e===t.datepicker._curInst&&t.datepicker._datepickerShowing&&t.datepicker._shouldFocusInput(e)&&e.input.trigger("focus"),e.yearshtml&&(i=e.yearshtml,setTimeout(function(){i===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),i=e.yearshtml=null},0))},_shouldFocusInput:function(t){return t.input&&t.input.is(":visible")&&!t.input.is(":disabled")&&!t.input.is(":focus")},_checkOffset:function(e,i,s){var n=e.dpDiv.outerWidth(),o=e.dpDiv.outerHeight(),a=e.input?e.input.outerWidth():0,r=e.input?e.input.outerHeight():0,l=document.documentElement.clientWidth+(s?0:t(document).scrollLeft()),h=document.documentElement.clientHeight+(s?0:t(document).scrollTop());return i.left-=this._get(e,"isRTL")?n-a:0,i.left-=s&&i.left===e.input.offset().left?t(document).scrollLeft():0,i.top-=s&&i.top===e.input.offset().top+r?t(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>l&&l>n?Math.abs(i.left+n-l):0),i.top-=Math.min(i.top,i.top+o>h&&h>o?Math.abs(o+r):0),i},_findPos:function(e){for(var i,s=this._getInst(e),n=this._get(s,"isRTL");e&&("hidden"===e.type||1!==e.nodeType||t.expr.filters.hidden(e));)e=e[n?"previousSibling":"nextSibling"];return i=t(e).offset(),[i.left,i.top]},_hideDatepicker:function(e){var i,s,n,o,a=this._curInst;!a||e&&a!==t.data(e,"datepicker")||this._datepickerShowing&&(i=this._get(a,"showAnim"),s=this._get(a,"duration"),n=function(){t.datepicker._tidyDialog(a)},t.effects&&(t.effects.effect[i]||t.effects[i])?a.dpDiv.hide(i,t.datepicker._get(a,"showOptions"),s,n):a.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,o=this._get(a,"onClose"),o&&o.apply(a.input?a.input[0]:null,[a.input?a.input.val():"",a]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),t.blockUI&&(t.unblockUI(),t("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(t){t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(t.datepicker._curInst){var i=t(e.target),s=t.datepicker._getInst(i[0]);(i[0].id!==t.datepicker._mainDivId&&0===i.parents("#"+t.datepicker._mainDivId).length&&!i.hasClass(t.datepicker.markerClassName)&&!i.closest("."+t.datepicker._triggerClass).length&&t.datepicker._datepickerShowing&&(!t.datepicker._inDialog||!t.blockUI)||i.hasClass(t.datepicker.markerClassName)&&t.datepicker._curInst!==s)&&t.datepicker._hideDatepicker()}},_adjustDate:function(e,i,s){var n=t(e),o=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(o,i+("M"===s?this._get(o,"showCurrentAtPos"):0),s),this._updateDatepicker(o))},_gotoToday:function(e){var i,s=t(e),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(e,i,s){var n=t(e),o=this._getInst(n[0]);o["selected"+("M"===s?"Month":"Year")]=o["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(o),this._adjustDate(n)},_selectDay:function(e,i,s,n){var o,a=t(e);t(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(a[0])||(o=this._getInst(a[0]),o.selectedDay=o.currentDay=t("a",n).html(),o.selectedMonth=o.currentMonth=i,o.selectedYear=o.currentYear=s,this._selectDate(e,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear)))},_clearDate:function(e){var i=t(e);this._selectDate(i,"")},_selectDate:function(e,i){var s,n=t(e),o=this._getInst(n[0]);i=null!=i?i:this._formatDate(o),o.input&&o.input.val(i),this._updateAlternate(o),s=this._get(o,"onSelect"),s?s.apply(o.input?o.input[0]:null,[i,o]):o.input&&o.input.trigger("change"),o.inline?this._updateDatepicker(o):(this._hideDatepicker(),this._lastInput=o.input[0],"object"!=typeof o.input[0]&&o.input.trigger("focus"),this._lastInput=null)},_updateAlternate:function(e){var i,s,n,o=this._get(e,"altField");o&&(i=this._get(e,"altFormat")||this._get(e,"dateFormat"),s=this._getDate(e),n=this.formatDate(i,s,this._getFormatConfig(e)),t(o).val(n))},noWeekends:function(t){var e=t.getDay();return[e>0&&6>e,""]},iso8601Week:function(t){var e,i=new Date(t.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),e=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((e-i)/864e5)/7)+1},parseDate:function(e,i,s){if(null==e||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var n,o,a,r,l=0,h=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,c="string"!=typeof h?h:(new Date).getFullYear()%100+parseInt(h,10),u=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,d=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,g=-1,m=-1,_=-1,v=-1,b=!1,y=function(t){var i=e.length>n+1&&e.charAt(n+1)===t;return i&&n++,i},w=function(t){var e=y(t),s="@"===t?14:"!"===t?20:"y"===t&&e?4:"o"===t?3:2,n="y"===t?s:1,o=RegExp("^\\d{"+n+","+s+"}"),a=i.substring(l).match(o);if(!a)throw"Missing number at position "+l;return l+=a[0].length,parseInt(a[0],10)},k=function(e,s,n){var o=-1,a=t.map(y(e)?n:s,function(t,e){return[[e,t]]}).sort(function(t,e){return-(t[1].length-e[1].length)});if(t.each(a,function(t,e){var s=e[1];return i.substr(l,s.length).toLowerCase()===s.toLowerCase()?(o=e[0],l+=s.length,!1):void 0}),-1!==o)return o+1;throw"Unknown name at position "+l},x=function(){if(i.charAt(l)!==e.charAt(n))throw"Unexpected literal at position "+l;l++};for(n=0;e.length>n;n++)if(b)"'"!==e.charAt(n)||y("'")?x():b=!1;else switch(e.charAt(n)){case"d":_=w("d");break;case"D":k("D",u,d);break;case"o":v=w("o");break;case"m":m=w("m");break;case"M":m=k("M",p,f);break;case"y":g=w("y");break;case"@":r=new Date(w("@")),g=r.getFullYear(),m=r.getMonth()+1,_=r.getDate();break;case"!":r=new Date((w("!")-this._ticksTo1970)/1e4),g=r.getFullYear(),m=r.getMonth()+1,_=r.getDate();break;case"'":y("'")?x():b=!0;break;default:x()}if(i.length>l&&(a=i.substr(l),!/^\s+/.test(a)))throw"Extra/unparsed characters found in date: "+a;if(-1===g?g=(new Date).getFullYear():100>g&&(g+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c>=g?0:-100)),v>-1)for(m=1,_=v;;){if(o=this._getDaysInMonth(g,m-1),o>=_)break;m++,_-=o}if(r=this._daylightSavingAdjust(new Date(g,m-1,_)),r.getFullYear()!==g||r.getMonth()+1!==m||r.getDate()!==_)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(t,e,i){if(!e)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,o=(i?i.dayNames:null)||this._defaults.dayNames,a=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,l=function(e){var i=t.length>s+1&&t.charAt(s+1)===e;return i&&s++,i},h=function(t,e,i){var s=""+e;if(l(t))for(;i>s.length;)s="0"+s;return s},c=function(t,e,i,s){return l(t)?s[e]:i[e]},u="",d=!1;if(e)for(s=0;t.length>s;s++)if(d)"'"!==t.charAt(s)||l("'")?u+=t.charAt(s):d=!1;else switch(t.charAt(s)){case"d":u+=h("d",e.getDate(),2);break;case"D":u+=c("D",e.getDay(),n,o);break;case"o":u+=h("o",Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),3);break;case"m":u+=h("m",e.getMonth()+1,2);break;case"M":u+=c("M",e.getMonth(),a,r);break;case"y":u+=l("y")?e.getFullYear():(10>e.getFullYear()%100?"0":"")+e.getFullYear()%100;break;case"@":u+=e.getTime();break;case"!":u+=1e4*e.getTime()+this._ticksTo1970;break;case"'":l("'")?u+="'":d=!0;break;default:u+=t.charAt(s)}return u},_possibleChars:function(t){var e,i="",s=!1,n=function(i){var s=t.length>e+1&&t.charAt(e+1)===i;return s&&e++,s};for(e=0;t.length>e;e++)if(s)"'"!==t.charAt(e)||n("'")?i+=t.charAt(e):s=!1;else switch(t.charAt(e)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=t.charAt(e)}return i},_get:function(t,e){return void 0!==t.settings[e]?t.settings[e]:this._defaults[e]},_setDateFromField:function(t,e){if(t.input.val()!==t.lastVal){var i=this._get(t,"dateFormat"),s=t.lastVal=t.input?t.input.val():null,n=this._getDefaultDate(t),o=n,a=this._getFormatConfig(t);try{o=this.parseDate(i,s,a)||n}catch(r){s=e?"":s}t.selectedDay=o.getDate(),t.drawMonth=t.selectedMonth=o.getMonth(),t.drawYear=t.selectedYear=o.getFullYear(),t.currentDay=s?o.getDate():0,t.currentMonth=s?o.getMonth():0,t.currentYear=s?o.getFullYear():0,this._adjustInstDate(t)}},_getDefaultDate:function(t){return this._restrictMinMax(t,this._determineDate(t,this._get(t,"defaultDate"),new Date))},_determineDate:function(e,i,s){var n=function(t){var e=new Date;return e.setDate(e.getDate()+t),e},o=function(i){try{return t.datepicker.parseDate(t.datepicker._get(e,"dateFormat"),i,t.datepicker._getFormatConfig(e))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?t.datepicker._getDate(e):null)||new Date,o=n.getFullYear(),a=n.getMonth(),r=n.getDate(),l=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,h=l.exec(i);h;){switch(h[2]||"d"){case"d":case"D":r+=parseInt(h[1],10);break;case"w":case"W":r+=7*parseInt(h[1],10);break;case"m":case"M":a+=parseInt(h[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a));break;case"y":case"Y":o+=parseInt(h[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a))}h=l.exec(i)}return new Date(o,a,r)},a=null==i||""===i?s:"string"==typeof i?o(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return a=a&&"Invalid Date"==""+a?s:a,a&&(a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)),this._daylightSavingAdjust(a)},_daylightSavingAdjust:function(t){return t?(t.setHours(t.getHours()>12?t.getHours()+2:0),t):null},_setDate:function(t,e,i){var s=!e,n=t.selectedMonth,o=t.selectedYear,a=this._restrictMinMax(t,this._determineDate(t,e,new Date));t.selectedDay=t.currentDay=a.getDate(),t.drawMonth=t.selectedMonth=t.currentMonth=a.getMonth(),t.drawYear=t.selectedYear=t.currentYear=a.getFullYear(),n===t.selectedMonth&&o===t.selectedYear||i||this._notifyChange(t),this._adjustInstDate(t),t.input&&t.input.val(s?"":this._formatDate(t))},_getDate:function(t){var e=!t.currentYear||t.input&&""===t.input.val()?null:this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return e},_attachHandlers:function(e){var i=this._get(e,"stepMonths"),s="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){t.datepicker._adjustDate(s,-i,"M")},next:function(){t.datepicker._adjustDate(s,+i,"M")},hide:function(){t.datepicker._hideDatepicker()},today:function(){t.datepicker._gotoToday(s)},selectDay:function(){return t.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return t.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return t.datepicker._selectMonthYear(s,this,"Y"),!1}};t(this).on(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(t){var e,i,s,n,o,a,r,l,h,c,u,d,p,f,g,m,_,v,b,y,w,k,x,C,D,T,I,M,P,S,N,H,A,z,O,E,W,F,L,R=new Date,Y=this._daylightSavingAdjust(new Date(R.getFullYear(),R.getMonth(),R.getDate())),B=this._get(t,"isRTL"),j=this._get(t,"showButtonPanel"),q=this._get(t,"hideIfNoPrevNext"),K=this._get(t,"navigationAsDateFormat"),U=this._getNumberOfMonths(t),V=this._get(t,"showCurrentAtPos"),X=this._get(t,"stepMonths"),$=1!==U[0]||1!==U[1],G=this._daylightSavingAdjust(t.currentDay?new Date(t.currentYear,t.currentMonth,t.currentDay):new Date(9999,9,9)),J=this._getMinMaxDate(t,"min"),Q=this._getMinMaxDate(t,"max"),Z=t.drawMonth-V,te=t.drawYear;if(0>Z&&(Z+=12,te--),Q)for(e=this._daylightSavingAdjust(new Date(Q.getFullYear(),Q.getMonth()-U[0]*U[1]+1,Q.getDate())),e=J&&J>e?J:e;this._daylightSavingAdjust(new Date(te,Z,1))>e;)Z--,0>Z&&(Z=11,te--);for(t.drawMonth=Z,t.drawYear=te,i=this._get(t,"prevText"),i=K?this.formatDate(i,this._daylightSavingAdjust(new Date(te,Z-X,1)),this._getFormatConfig(t)):i,s=this._canAdjustMonth(t,-1,te,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"e":"w")+"'>"+i+"</span></a>":q?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"e":"w")+"'>"+i+"</span></a>",n=this._get(t,"nextText"),n=K?this.formatDate(n,this._daylightSavingAdjust(new Date(te,Z+X,1)),this._getFormatConfig(t)):n,o=this._canAdjustMonth(t,1,te,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"w":"e")+"'>"+n+"</span></a>":q?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(B?"w":"e")+"'>"+n+"</span></a>",a=this._get(t,"currentText"),r=this._get(t,"gotoCurrent")&&t.currentDay?G:Y,a=K?this.formatDate(a,r,this._getFormatConfig(t)):a,l=t.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(t,"closeText")+"</button>",h=j?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(B?l:"")+(this._isInRange(t,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+a+"</button>":"")+(B?"":l)+"</div>":"",c=parseInt(this._get(t,"firstDay"),10),c=isNaN(c)?0:c,u=this._get(t,"showWeek"),d=this._get(t,"dayNames"),p=this._get(t,"dayNamesMin"),f=this._get(t,"monthNames"),g=this._get(t,"monthNamesShort"),m=this._get(t,"beforeShowDay"),_=this._get(t,"showOtherMonths"),v=this._get(t,"selectOtherMonths"),b=this._getDefaultDate(t),y="",k=0;U[0]>k;k++){for(x="",this.maxRows=4,C=0;U[1]>C;C++){if(D=this._daylightSavingAdjust(new Date(te,Z,t.selectedDay)),T=" ui-corner-all",I="",$){if(I+="<div class='ui-datepicker-group",U[1]>1)switch(C){case 0:I+=" ui-datepicker-group-first",T=" ui-corner-"+(B?"right":"left");break;case U[1]-1:I+=" ui-datepicker-group-last",T=" ui-corner-"+(B?"left":"right");break;default:I+=" ui-datepicker-group-middle",T=""}I+="'>"}for(I+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+T+"'>"+(/all|left/.test(T)&&0===k?B?o:s:"")+(/all|right/.test(T)&&0===k?B?s:o:"")+this._generateMonthYearHeader(t,Z,te,J,Q,k>0||C>0,f,g)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",M=u?"<th class='ui-datepicker-week-col'>"+this._get(t,"weekHeader")+"</th>":"",w=0;7>w;w++)P=(w+c)%7,M+="<th scope='col'"+((w+c+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+d[P]+"'>"+p[P]+"</span></th>";for(I+=M+"</tr></thead><tbody>",S=this._getDaysInMonth(te,Z),te===t.selectedYear&&Z===t.selectedMonth&&(t.selectedDay=Math.min(t.selectedDay,S)),N=(this._getFirstDayOfMonth(te,Z)-c+7)%7,H=Math.ceil((N+S)/7),A=$?this.maxRows>H?this.maxRows:H:H,this.maxRows=A,z=this._daylightSavingAdjust(new Date(te,Z,1-N)),O=0;A>O;O++){for(I+="<tr>",E=u?"<td class='ui-datepicker-week-col'>"+this._get(t,"calculateWeek")(z)+"</td>":"",w=0;7>w;w++)W=m?m.apply(t.input?t.input[0]:null,[z]):[!0,""],F=z.getMonth()!==Z,L=F&&!v||!W[0]||J&&J>z||Q&&z>Q,E+="<td class='"+((w+c+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(z.getTime()===D.getTime()&&Z===t.selectedMonth&&t._keyEvent||b.getTime()===z.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(L?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!_?"":" "+W[1]+(z.getTime()===G.getTime()?" "+this._currentClass:"")+(z.getTime()===Y.getTime()?" ui-datepicker-today":""))+"'"+(F&&!_||!W[2]?"":" title='"+W[2].replace(/'/g,"&#39;")+"'")+(L?"":" data-handler='selectDay' data-event='click' data-month='"+z.getMonth()+"' data-year='"+z.getFullYear()+"'")+">"+(F&&!_?"&#xa0;":L?"<span class='ui-state-default'>"+z.getDate()+"</span>":"<a class='ui-state-default"+(z.getTime()===Y.getTime()?" ui-state-highlight":"")+(z.getTime()===G.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+"' href='#'>"+z.getDate()+"</a>")+"</td>",z.setDate(z.getDate()+1),z=this._daylightSavingAdjust(z);I+=E+"</tr>"}Z++,Z>11&&(Z=0,te++),I+="</tbody></table>"+($?"</div>"+(U[0]>0&&C===U[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),x+=I}y+=x}return y+=h,t._keyEvent=!1,y},_generateMonthYearHeader:function(t,e,i,s,n,o,a,r){var l,h,c,u,d,p,f,g,m=this._get(t,"changeMonth"),_=this._get(t,"changeYear"),v=this._get(t,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",y="";if(o||!m)y+="<span class='ui-datepicker-month'>"+a[e]+"</span>";else{for(l=s&&s.getFullYear()===i,h=n&&n.getFullYear()===i,y+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",c=0;12>c;c++)(!l||c>=s.getMonth())&&(!h||n.getMonth()>=c)&&(y+="<option value='"+c+"'"+(c===e?" selected='selected'":"")+">"+r[c]+"</option>");y+="</select>"}if(v||(b+=y+(!o&&m&&_?"":"&#xa0;")),!t.yearshtml)if(t.yearshtml="",o||!_)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(u=this._get(t,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(t){var e=t.match(/c[+\-].*/)?i+parseInt(t.substring(1),10):t.match(/[+\-].*/)?d+parseInt(t,10):parseInt(t,10);return isNaN(e)?d:e},f=p(u[0]),g=Math.max(f,p(u[1]||"")),f=s?Math.max(f,s.getFullYear()):f,g=n?Math.min(g,n.getFullYear()):g,t.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";g>=f;f++)t.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";t.yearshtml+="</select>",b+=t.yearshtml,t.yearshtml=null}return b+=this._get(t,"yearSuffix"),v&&(b+=(!o&&m&&_?"":"&#xa0;")+y),b+="</div>"},_adjustInstDate:function(t,e,i){var s=t.selectedYear+("Y"===i?e:0),n=t.selectedMonth+("M"===i?e:0),o=Math.min(t.selectedDay,this._getDaysInMonth(s,n))+("D"===i?e:0),a=this._restrictMinMax(t,this._daylightSavingAdjust(new Date(s,n,o)));t.selectedDay=a.getDate(),t.drawMonth=t.selectedMonth=a.getMonth(),t.drawYear=t.selectedYear=a.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(t)},_restrictMinMax:function(t,e){var i=this._getMinMaxDate(t,"min"),s=this._getMinMaxDate(t,"max"),n=i&&i>e?i:e;return s&&n>s?s:n},_notifyChange:function(t){var e=this._get(t,"onChangeMonthYear");e&&e.apply(t.input?t.input[0]:null,[t.selectedYear,t.selectedMonth+1,t])},_getNumberOfMonths:function(t){var e=this._get(t,"numberOfMonths");return null==e?[1,1]:"number"==typeof e?[1,e]:e},_getMinMaxDate:function(t,e){return this._determineDate(t,this._get(t,e+"Date"),null)},_getDaysInMonth:function(t,e){return 32-this._daylightSavingAdjust(new Date(t,e,32)).getDate()},_getFirstDayOfMonth:function(t,e){return new Date(t,e,1).getDay()},_canAdjustMonth:function(t,e,i,s){var n=this._getNumberOfMonths(t),o=this._daylightSavingAdjust(new Date(i,s+(0>e?e:n[0]*n[1]),1));return 0>e&&o.setDate(this._getDaysInMonth(o.getFullYear(),o.getMonth())),this._isInRange(t,o)},_isInRange:function(t,e){var i,s,n=this._getMinMaxDate(t,"min"),o=this._getMinMaxDate(t,"max"),a=null,r=null,l=this._get(t,"yearRange");return l&&(i=l.split(":"),s=(new Date).getFullYear(),a=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(a+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||e.getTime()>=n.getTime())&&(!o||e.getTime()<=o.getTime())&&(!a||e.getFullYear()>=a)&&(!r||r>=e.getFullYear())
},_getFormatConfig:function(t){var e=this._get(t,"shortYearCutoff");return e="string"!=typeof e?e:(new Date).getFullYear()%100+parseInt(e,10),{shortYearCutoff:e,dayNamesShort:this._get(t,"dayNamesShort"),dayNames:this._get(t,"dayNames"),monthNamesShort:this._get(t,"monthNamesShort"),monthNames:this._get(t,"monthNames")}},_formatDate:function(t,e,i,s){e||(t.currentDay=t.selectedDay,t.currentMonth=t.selectedMonth,t.currentYear=t.selectedYear);var n=e?"object"==typeof e?e:this._daylightSavingAdjust(new Date(s,i,e)):this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return this.formatDate(this._get(t,"dateFormat"),n,this._getFormatConfig(t))}}),t.fn.datepicker=function(e){if(!this.length)return this;t.datepicker.initialized||(t(document).on("mousedown",t.datepicker._checkExternalClick),t.datepicker.initialized=!0),0===t("#"+t.datepicker._mainDivId).length&&t("body").append(t.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"isDisabled"!==e&&"getDate"!==e&&"widget"!==e?"option"===e&&2===arguments.length&&"string"==typeof arguments[1]?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof e?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this].concat(i)):t.datepicker._attachDatepicker(this,e)}):t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i))},t.datepicker=new i,t.datepicker.initialized=!1,t.datepicker.uuid=(new Date).getTime(),t.datepicker.version="1.12.1",t.datepicker});
;
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);;
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms3d-inputtypes-svg-touch-shiv-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-css_calc-css_overflow_scrolling-css_positionsticky
 */
;window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}function J(){e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.csstransforms3d=function(){var a=!!I("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect};for(var K in s)B(s,K)&&(x=K.toLowerCase(),e[x]=s[K](),v.push((e[x]?"":"no-")+x));return e.input||J(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=y,e.prefixed=function(a,b,c){return b?I(a,b,c):I(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),Modernizr.addTest("overflowscrolling",function(){return Modernizr.testAllProps("overflowScrolling")}),Modernizr.addTest("csspositionsticky",function(){var a="position:",b="sticky",c=document.createElement("modernizr"),d=c.style;return d.cssText=a+Modernizr._prefixes.join(b+";"+a).slice(0,-a.length),d.position.indexOf(b)!==-1}),Modernizr.addTest("csscalc",function(){var a="width:",b="calc(10px);",c=document.createElement("div");return c.style.cssText=a+Modernizr._prefixes.join(b+a),!!c.style.length});;
if (typeof(jQuery) != 'undefined') {
	window.addEventListener('load', function() {
		jQuery('body').addClass('loaded');
	}, false);

	jQuery.fn.cleanWhitespace = function () {
		textNodes = this.contents().filter(
		  function() { return (this.nodeType == 3 && !/\S/.test(this.nodeValue)); })
		  .remove();
		return this;
	};

	jQuery.fn.touchFix = function (options) {
	    if (!Modernizr.touch) return this;

	    var $ = jQuery;
	    var $parent = $(this);

	    $(document)
	    .on('focus', options.inputElements, function (e) {
	        $parent.addClass(options.addClass);
	    })
	    .on('blur', options.inputElements, function (e) {
	        $parent.removeClass(options.addClass);

	        // Fix for some scenarios where you need to start scrolling
	        // setTimeout(function() {
	        //     $(document).scrollTop($(document).scrollTop());
	        // }, 1);
	    });

	    return this;
	};

	(function ($) {
	    $.extend({
	        getQueryString: function (name) {
	            function parseParams() {
	                var params = {},
	                    e,
	                    a = /\+/g,  // Regex for replacing addition symbol with a space
	                    r = /([^&=]+)=?([^&]*)/g,
	                    d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
	                    q = window.location.search.substring(1);

	                while (e = r.exec(q))
	                    params[d(e[1])] = d(e[2]);

	                return params;
	            }

	            if (!this.queryStringParams)
	                this.queryStringParams = parseParams();

	            return this.queryStringParams[name];
	        }
	    });
	})(jQuery);
}

var calacademy = {
	Constants: {
		isShake: false,
		defaultSearchText: '',
		emptyGif: '/sites/all/themes/calacademy_zen/images/empty.gif',
		emptyGifLandscape: '/sites/all/themes/calacademy_zen/images/empty-landscape.gif',
		breakpoints: {
			smartphone: 320,
			tablet: 870,
			desktop: 1000
		},
		popUpProfiles: {
			chat: {
				width: 430,
				height: 450,
				resizable: 0,
				center: 1,
				createnew: 0
			}
		}
	},
	fixRightRail: function () {
		var $ = jQuery;

		var foo = setInterval(function () {
			if ($('cl-donation-form').length > 0) {
				clearInterval(foo);
				$('.right-rail').insertAfter('.center-wrapper .panel-col-first');
			}
		}, 333);
	},
	Utils: {
		initHeroVideo: function (v) {
			var $ = jQuery;

			var _onAutoplayError = function () {
				// mimic autoplay via user interaction
				$('body').on('click.video-autoplay touchstart.video-autoplay', function () {
					v.get(0).play();
					$('body').off('.video-autoplay');
				});
			}

			v.off();
			$('.video-control-container').remove();
			$('html').attr('video-state', '');

			// no fade out
			if (v.hasClass('playing')) {
				v.addClass('no-transition');
				v.removeClass('playing');
			}

			v.on('playing', function () {
				$(this).off('playing');

				$(this).removeClass('no-transition');
				$(this).addClass('playing');

				// add playing attribute
				$('html').attr('video-state', 'playing');

				// insert button
				var btn = $('<button>Toggle video playback</button>');

				btn.on('touchend click', function () {
					var video = v.get(0);

					if (video.paused) {
						video.play();
						$('html').attr('video-state', 'playing');
					} else {
						video.pause();
						$('html').attr('video-state', 'paused');
					}

					return false;
				});

				var container = $('<div />');
				container.addClass('container');
				container.addClass('video-control-container');
				container.append(btn);

				v.parent().append(container);
			});

			v.on('canplay', function () {
				$(this).off('canplay');

				// check if autoplay enabled
				var promise = $(this).get(0).play();

				if (typeof(promise.catch) == 'function') {
				    promise.catch(_onAutoplayError);
				}
			});

			if (v.get(0).readyState > 3) {
				v.trigger('canplay');
			}
		},
		log: function (obj, css) {
			if (typeof(console) == 'undefined') {
				if (typeof(dump) == 'function') {
					dump(obj);
				} else {
					// alert(obj);
				}
			} else {
				if (css) {
					console.log('%c' + obj, css);
				} else {
					console.log(obj);
				}
			}
		},
		getBrowserInfo: function () {
			var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

			if(/trident/i.test(M[1])){
				tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
				return {name:'IE ',version:(tem[1]||'')};
			}
			if(M[1]==='Chrome'){
				tem=ua.match(/\bOPR\/(\d+)/)
				if(tem!=null)   {return {name:'Opera', version:tem[1]};}
			}

			M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
			if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}

			return {
				name: M[0],
				version: M[1]
			};
		},
		getFileExtension: function (file) {
			file = file.split('?').shift();
			return file.split('.').pop().toLowerCase();
		},
		initSignupForms: function () {
			jQuery('.enews-signup').on('submit', function () {
				if (jQuery(this).hasClass('submitting')) {
					return false;
				}

				jQuery(this).addClass('submitting');

				var email = jQuery.trim(jQuery('.email', this).val()).toLowerCase();

				if (!calacademy.Utils.isEmail(email)) {
					jQuery(this).removeClass('submitting');
					jQuery('.email', this).val('');
					jQuery('.email', this).attr('placeholder', 'Please enter a valid email address');
					return false;
				}

				var field = jQuery('.email', this);

				field.val('');
				field.blur();
				field.attr('disabled', 'true');
				field.attr('placeholder', 'Submitting...');

				var host = location.host;
				// use prod www host unless www-stg or local env
				if ((host.indexOf('local') === -1) && (host.indexOf('www-stg') === -1)) {
					host = 'www.calacademy.org';
				}

				var baseurl = location.protocol + '//' + host;

				// this needs to be cloned to calacademy_instant_articles_get_footer
				// /sites/all/modules/custom/calacademy_instant_articles/calacademy_instant_articles.module

				var transactionId = '2911631';
				var listIds = [ 10233915 ];

				if (jQuery('body').hasClass('section-nightlife')) {
					transactionId = '3165489';
					listIds = [ 10233914 ];
				}

				window.dataLayer = window.dataLayer || [];

				jQuery.ajax({
					dataType: 'jsonp',
					url: baseurl + '/mailjet-client-proxy',
					data: {
						email: email,
						list_ids: listIds,
						collection_point: 'wwwfooter',
						template_transaction_id: transactionId
					},
					success: function (data, textStatus, XMLHttpRequest) {
						field.val('');
						field.blur();
						field.attr('placeholder', 'Thank you for signing up!');
						field.removeAttr('disabled');
						field.closest('.enews-signup').removeClass('submitting');
						window.dataLayer.push({
							'event': 'email_sign_up',
							'email_signup_name': 'subscribe_form_footer',
							'userId': btoa(encodeURIComponent(email))
						});
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						field.val('');
						field.attr('placeholder', 'The server encountered an error. Please try again.');
						field.removeAttr('disabled');
						field.closest('.enews-signup').removeClass('submitting');
					}
				});

				return false;
			});
		},
		snow: function (alwaysSnow) {
			if (typeof(alwaysSnow) == 'undefined') alwaysSnow = false;
			if (jQuery('#snow-container').length > 0) return;

			if (!alwaysSnow) {
				if (!window.calacademyJazz) return;
				if (!jQuery('html').hasClass('snow') && !window.calacademyJazz.snow) return;
			}

			jQuery.getJSON('/sites/all/themes/calacademy_zen/js/particlesjs-config.json', function (data) {
				var snowContainer = jQuery('<div id="snow-container" />');

				snowContainer.css({
					position: 'fixed',
					top: '0',
					left: '0',
					bottom: '0',
					right: '0',
					zIndex: '997',
					pointerEvents: 'none'
				});

				jQuery('body').append(snowContainer);

				particlesJS('snow-container', data);
			});
		},
		getEvents: function (el) {
			return jQuery._data(el.get(0), 'events');
		},
		addBadges: function () {
			var $ = jQuery;

			var _getBadgeSlug = function (el) {
				var str = $.trim(el.text()).toLowerCase();
				if (str == '') return false;

				return 'badge-' + str.split(' ').join('-');
			}

			var imgFields = [
				'.views-field-field-image-primary-1',
				'.views-field-field-hero-region',
				'.views-field-field-image-primary',
				'.views-field-field-inline-image',
				'.views-field-field-slideshow-frame-bg-image'
			];

			var imgSelector = imgFields.join(', ');

			// from view field
			$('.views-field-field-badge').each(function () {
				var badgeClass = _getBadgeSlug($(this));
				if (!badgeClass) return true;

				var row = $(this).closest('.views-row');
				row.find(imgSelector).addClass(badgeClass);
			});

			// from img data
			$(imgSelector).find('img').each(function () {
				if ($(this).data('badge')) {
					var row = $(this).closest('.views-row');
					row.find(imgSelector).addClass($(this).data('badge'));
				}
			});

			// from body class
			$.each([
				'virtual-event', 'sold-out', 'closing-soon', 'coming-soon', 'new', 'expand'
			], function (i, str) {
				if (jQuery('body').hasClass('body-badge-' + str)) {
					jQuery('.pane-hero-media-slideshow-standard').addClass('badge-' + str);
					return false;
				}
			});
		},
		randomRange: function (low, high) {
			return (Math.random() * (high - low)) + low;
		},
		getRowHeight: function (row) {
			// this only works for "portrait" style views
			var $ = jQuery;
			var h = parseInt(row.css('marginTop')) + parseInt(row.css('marginBottom'));

			$('.views-field', row).each(function () {
				// don't calculate hidden fields
				if (!$(this).is(':visible')) return;

				// use width for primary image cuz sometimes height is miscalculated or absent
				if ($(this).hasClass('views-field-field-image-primary')
					|| $(this).hasClass('views-field-field-hero-region')
					|| $(this).hasClass('views-field-field-slideshow-frame-bg-image')) {
					h += $(this).width() + parseInt($(this).css('marginBottom')) + parseInt($(this).css('marginTop'));
				} else {
					h += $(this).outerHeight(true);
				}
			});

			return h;
		},
		getClusterHeight: function (cluster) {
			var $ = jQuery;

			// iterate all rows and record bottom positions
			var bottoms = [];

			$('.views-row', cluster).each(function () {
				var rowTop = $(this).position().top;
				bottoms.push(rowTop + calacademy.Utils.getRowHeight($(this)));
			});

			// return the bottom-most value
			return Math.max.apply(Math, bottoms);
		},
		clearClusterHeights: function (viewElement) {
			var $ = jQuery;

			viewElement.each(function () {
				$('.view', this).addClass('dynamic-css');
				$('.view', this).css('height', calacademy.Utils.getClusterHeight($(this)) + 'px');
			});
		},
		removeEmptyElements: function (selector, container) {
			var $ = jQuery;

			// remove empty tags
			$(selector, container).each(function () {
				if ($('img, iframe, video, audio', this).length > 0) return;

				if ($.trim($(this).text()) == '') {
					$(this).remove();
				}
			});
		},
		fixHeroField: function (container, link) {
			var $ = jQuery;

			// skip if irrelevant
			if (container.length == 0) return;
			if (container.hasClass('js-hero-dom-processed')) return;

			// remove empty a tags
			calacademy.Utils.removeEmptyElements('a', this);

			var img = $('img', container).eq(0);
			var caption = $('blockquote', container).eq(0);

			if (img.length == 0) {
				// no image, remove
				container.remove();
			} else {
				if (link.length == 0) {
					// no link, just use img
					container.html(img);
				} else {
					// no alt then derive from hero title anchor label
					if (!img.attr('alt')) {
						var heroFields = $(container).parent().parent().children();
						$(heroFields).each(function() {
							var heroFieldClass = $(this).attr('class');
							if (heroFieldClass.indexOf('field-title') > -1) {
								$(this).find('a').each(function () {
									img.attr('alt', 'image: ' + this.text);
								})
							}
						})
					}
					// add link
					var newA = $('<a />');
					newA.attr('href', link.attr('href'));

					// add video class to link if necessary
					if ($('.video', container).length == 1) {
						newA.addClass('video');
					}

					newA.html(img);
					container.html(newA);
				}

				// add caption
				if (caption.length == 1) {
					if ($.trim(caption.text()) != '') {
						container.append(caption);
					}
				}

				container.addClass('js-hero-dom-processed');
			}
		},
		addImageLoadEvent: function (container, pseudoSingletonClass) {
			var $ = jQuery;

			if (typeof(pseudoSingletonClass) == 'undefined') {
				pseudoSingletonClass = 'js-load-processed';
			}

			// load events don't bubble, so they can't be delegated
			$('img', container).one('load', function () {
				var inst = $(this);

				// skip if already processed
				if (inst.hasClass(pseudoSingletonClass)) return;

				var delay = calacademy.Utils.randomRange(300, 600);

				// shorten delay for exposed filters
				if (inst.parents('.exposed-filters').length > 0) {
					delay = calacademy.Utils.randomRange(0, 300);
				}

				setTimeout(function () {
					inst.addClass('loaded');
				}, delay);

				inst.addClass(pseudoSingletonClass);
			});

			$('img', container).each(function () {
				if (this.complete) {
					$(this).trigger('load');
				}
			});
		},
		alterLinkTargets: function (container) {
			if (typeof(container) != 'object') {
				container = jQuery('body');
			}

			// remove target by default
			jQuery('a:not(.keep-target)', container).removeAttr('target');

			// offsite links and pdfs get target _blank
			var offsiteLinks = jQuery('a[href*="//"]:not([href*="calacademy.org"]), a[href*="//store.calacademy.org"], a[href$=".pdf"], a[href*="google.com"], a.offsite', container);

			offsiteLinks.addClass('offsite');
			offsiteLinks.prop('target', '_blank');
			offsiteLinks.prop('rel', 'noreferrer');
		},
		addSecondaryBg: function (myClass, anchor) {
			var rail = jQuery('.right-rail');

			// do nothing
			if (rail.length == 0) return;

			// apply secondary bg
			jQuery('body').addClass(myClass);

			jQuery(window).on('resize.' + myClass, function () {
				var x = Math.round(jQuery('#page').outerWidth() / 2) - 100;

				var y;

				if (anchor.length != 1) {
					y = rail.offset().top;
				} else {
					y = anchor.offset().top + anchor.outerHeight();
				}

				y -= jQuery('#page').offset().top;
				y -= 200;

				if (jQuery('html').hasClass('tablet')) {
					x -= 75;
				}

				// @note
				// background-position-x and background-position-y don't work in FF
				jQuery('#page').css('background-position', x + 'px ' + y + 'px');
			});

			jQuery(window).trigger('resize.' + myClass);
		},
		isEmail: function (value) {
			var isValid = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );

			if (!isValid) return false;

			// check if dotless
			// @see https://www.icann.org/news/announcement-2013-08-30-en
			var arr = value.split('@');
			return (arr[1].indexOf('.') !== -1);
		},
		isMobile: {
	        Android: function () {
	            return navigator.userAgent.match(/Android/i) ? true : false;
	        },
	        BlackBerry: function () {
	            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	        },
	        iOS: function () {
	            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	        },
	        Opera: function () {
	            return navigator.userAgent.match(/Opera Mini/i) ? true : false;
	        },
	        Windows: function () {
	            return navigator.userAgent.match(/IEMobile/i) ? true : false;
	        }
	    }
	},
	Statics: {
		pageObjects: [],
		device: false,
		browser: null
	},
};

calacademy.Statics.browser = calacademy.Utils.getBrowserInfo();
;
(function(a){a.isScrollToFixed=function(b){return !!a(b).data("ScrollToFixed")};a.ScrollToFixed=function(d,i){var l=this;l.$el=a(d);l.el=d;l.$el.data("ScrollToFixed",l);var c=false;var G=l.$el;var H;var E;var e;var y;var D=0;var q=0;var j=-1;var f=-1;var t=null;var z;var g;function u(){G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");f=-1;D=G.offset().top;q=G.offset().left;if(l.options.offsets){q+=(G.offset().left-G.position().left)}if(j==-1){j=q}H=G.css("position");c=true;if(l.options.bottom!=-1){G.trigger("preFixed.ScrollToFixed");w();G.trigger("fixed.ScrollToFixed")}}function n(){var I=l.options.limit;if(!I){return 0}if(typeof(I)==="function"){return I.apply(G)}return I}function p(){return H==="fixed"}function x(){return H==="absolute"}function h(){return !(p()||x())}function w(){if(!p()){t.css({display:G.css("display"),width:G.outerWidth(true),height:G.outerHeight(true),"float":G.css("float")});cssOptions={"z-index":l.options.zIndex,position:"fixed",top:l.options.bottom==-1?s():"",bottom:l.options.bottom==-1?"":l.options.bottom,"margin-left":"0px"};if(!l.options.dontSetWidth){cssOptions.width=G.width()}G.css(cssOptions);G.addClass(l.options.baseClassName);if(l.options.className){G.addClass(l.options.className)}H="fixed"}}function b(){var J=n();var I=q;if(l.options.removeOffsets){I="";J=J-D}cssOptions={position:"absolute",top:J,left:I,"margin-left":"0px",bottom:""};if(!l.options.dontSetWidth){cssOptions.width=G.width()}G.css(cssOptions);H="absolute"}function k(){if(!h()){f=-1;t.css("display","none");G.css({"z-index":y,width:"",position:E,left:"",top:e,"margin-left":""});G.removeClass("scroll-to-fixed-fixed");if(l.options.className){G.removeClass(l.options.className)}H=null}}function v(I){if(I!=f){G.css("left",q-I);f=I}}function s(){var I=l.options.marginTop;if(!I){return 0}if(typeof(I)==="function"){return I.apply(G)}return I}function A(){if(!a.isScrollToFixed(G)){return}var K=c;if(!c){u()}else{if(h()){D=G.offset().top;q=G.offset().left}}var I=a(window).scrollLeft();var L=a(window).scrollTop();var J=n();if(l.options.minWidth&&a(window).width()<l.options.minWidth){if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}else{if(l.options.maxWidth&&a(window).width()>l.options.maxWidth){if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}else{if(l.options.bottom==-1){if(J>0&&L>=J-s()){if(!x()||!K){o();G.trigger("preAbsolute.ScrollToFixed");b();G.trigger("unfixed.ScrollToFixed")}}else{if(L>=D-s()){if(!p()||!K){o();G.trigger("preFixed.ScrollToFixed");w();f=-1;G.trigger("fixed.ScrollToFixed")}v(I)}else{if(!h()||!K){o();G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed")}}}}else{if(J>0){if(L+a(window).height()-G.outerHeight(true)>=J-(s()||-m())){if(p()){o();G.trigger("preUnfixed.ScrollToFixed");if(E==="absolute"){b()}else{k()}G.trigger("unfixed.ScrollToFixed")}}else{if(!p()){o();G.trigger("preFixed.ScrollToFixed");w()}v(I);G.trigger("fixed.ScrollToFixed")}}else{v(I)}}}}}function m(){if(!l.options.bottom){return 0}return l.options.bottom}function o(){var I=G.css("position");if(I=="absolute"){G.trigger("postAbsolute.ScrollToFixed")}else{if(I=="fixed"){G.trigger("postFixed.ScrollToFixed")}else{G.trigger("postUnfixed.ScrollToFixed")}}}var C=function(I){if(G.is(":visible")){c=false;A()}};var F=function(I){(!!window.requestAnimationFrame)?requestAnimationFrame(A):A()};var B=function(){var J=document.body;if(document.createElement&&J&&J.appendChild&&J.removeChild){var L=document.createElement("div");if(!L.getBoundingClientRect){return null}L.innerHTML="x";L.style.cssText="position:fixed;top:100px;";J.appendChild(L);var M=J.style.height,N=J.scrollTop;J.style.height="3000px";J.scrollTop=500;var I=L.getBoundingClientRect().top;J.style.height=M;var K=(I===100);J.removeChild(L);J.scrollTop=N;return K}return null};var r=function(I){I=I||window.event;if(I.preventDefault){I.preventDefault()}I.returnValue=false};l.init=function(){l.options=a.extend({},a.ScrollToFixed.defaultOptions,i);y=G.css("z-index");l.$el.css("z-index",l.options.zIndex);t=a("<div />");H=G.css("position");E=G.css("position");e=G.css("top");if(h()){l.$el.after(t)}a(window).bind("resize.ScrollToFixed",C);a(window).bind("scroll.ScrollToFixed",F);if("ontouchmove" in window){a(window).bind("touchmove.ScrollToFixed",A)}if(l.options.preFixed){G.bind("preFixed.ScrollToFixed",l.options.preFixed)}if(l.options.postFixed){G.bind("postFixed.ScrollToFixed",l.options.postFixed)}if(l.options.preUnfixed){G.bind("preUnfixed.ScrollToFixed",l.options.preUnfixed)}if(l.options.postUnfixed){G.bind("postUnfixed.ScrollToFixed",l.options.postUnfixed)}if(l.options.preAbsolute){G.bind("preAbsolute.ScrollToFixed",l.options.preAbsolute)}if(l.options.postAbsolute){G.bind("postAbsolute.ScrollToFixed",l.options.postAbsolute)}if(l.options.fixed){G.bind("fixed.ScrollToFixed",l.options.fixed)}if(l.options.unfixed){G.bind("unfixed.ScrollToFixed",l.options.unfixed)}if(l.options.spacerClass){t.addClass(l.options.spacerClass)}G.bind("resize.ScrollToFixed",function(){t.height(G.height())});G.bind("scroll.ScrollToFixed",function(){G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");A()});G.bind("detach.ScrollToFixed",function(I){r(I);G.trigger("preUnfixed.ScrollToFixed");k();G.trigger("unfixed.ScrollToFixed");a(window).unbind("resize.ScrollToFixed",C);a(window).unbind("scroll.ScrollToFixed",F);G.unbind(".ScrollToFixed");t.remove();l.$el.removeData("ScrollToFixed")});C()};l.init()};a.ScrollToFixed.defaultOptions={marginTop:0,limit:0,bottom:-1,zIndex:1000,baseClassName:"scroll-to-fixed-fixed"};a.fn.scrollToFixed=function(b){return this.each(function(){(new a.ScrollToFixed(this,b))})}})(jQuery);;
/* MediaMatch v.2.0.2 - Testing css media queries in Javascript. Authors & copyright (c) 2013: WebLinc, David Knight. */

window.matchMedia||(window.matchMedia=function(c){var a=c.document,w=a.documentElement,l=[],t=0,x="",h={},G=/\s*(only|not)?\s*(screen|print|[a-z\-]+)\s*(and)?\s*/i,H=/^\s*\(\s*(-[a-z]+-)?(min-|max-)?([a-z\-]+)\s*(:?\s*([0-9]+(\.[0-9]+)?|portrait|landscape)(px|em|dppx|dpcm|rem|%|in|cm|mm|ex|pt|pc|\/([0-9]+(\.[0-9]+)?))?)?\s*\)\s*$/,y=0,A=function(b){var z=-1!==b.indexOf(",")&&b.split(",")||[b],e=z.length-1,j=e,g=null,d=null,c="",a=0,l=!1,m="",f="",g=null,d=0,f=null,k="",p="",q="",n="",r="",k=!1;if(""===
b)return!0;do{g=z[j-e];l=!1;if(d=g.match(G))c=d[0],a=d.index;if(!d||-1===g.substring(0,a).indexOf("(")&&(a||!d[3]&&c!==d.input))k=!1;else{f=g;l="not"===d[1];a||(m=d[2],f=g.substring(c.length));k=m===x||"all"===m||""===m;g=-1!==f.indexOf(" and ")&&f.split(" and ")||[f];d=g.length-1;if(k&&0<=d&&""!==f){do{f=g[d].match(H);if(!f||!h[f[3]]){k=!1;break}k=f[2];n=p=f[5];q=f[7];r=h[f[3]];q&&(n="px"===q?Number(p):"em"===q||"rem"===q?16*p:f[8]?(p/f[8]).toFixed(2):"dppx"===q?96*p:"dpcm"===q?0.3937*p:Number(p));
k="min-"===k&&n?r>=n:"max-"===k&&n?r<=n:n?r===n:!!r;if(!k)break}while(d--)}if(k)break}}while(e--);return l?!k:k},B=function(){var b=c.innerWidth||w.clientWidth,a=c.innerHeight||w.clientHeight,e=c.screen.width,j=c.screen.height,g=c.screen.colorDepth,d=c.devicePixelRatio;h.width=b;h.height=a;h["aspect-ratio"]=(b/a).toFixed(2);h["device-width"]=e;h["device-height"]=j;h["device-aspect-ratio"]=(e/j).toFixed(2);h.color=g;h["color-index"]=Math.pow(2,g);h.orientation=a>=b?"portrait":"landscape";h.resolution=
d&&96*d||c.screen.deviceXDPI||96;h["device-pixel-ratio"]=d||1},C=function(){clearTimeout(y);y=setTimeout(function(){var b=null,a=t-1,e=a,j=!1;if(0<=a){B();do if(b=l[e-a])if((j=A(b.mql.media))&&!b.mql.matches||!j&&b.mql.matches)if(b.mql.matches=j,b.listeners)for(var j=0,g=b.listeners.length;j<g;j++)b.listeners[j]&&b.listeners[j].call(c,b.mql);while(a--)}},10)},D=a.getElementsByTagName("head")[0],a=a.createElement("style"),E=null,u="screen print speech projection handheld tv braille embossed tty".split(" "),
m=0,I=u.length,s="#mediamatchjs { position: relative; z-index: 0; }",v="",F=c.addEventListener||(v="on")&&c.attachEvent;a.type="text/css";a.id="mediamatchjs";D.appendChild(a);for(E=c.getComputedStyle&&c.getComputedStyle(a)||a.currentStyle;m<I;m++)s+="@media "+u[m]+" { #mediamatchjs { position: relative; z-index: "+m+" } }";a.styleSheet?a.styleSheet.cssText=s:a.textContent=s;x=u[1*E.zIndex||0];D.removeChild(a);B();F(v+"resize",C);F(v+"orientationchange",C);return function(a){var c=t,e={matches:!1,
media:a,addListener:function(a){l[c].listeners||(l[c].listeners=[]);a&&l[c].listeners.push(a)},removeListener:function(a){var b=l[c],d=0,e=0;if(b)for(e=b.listeners.length;d<e;d++)b.listeners[d]===a&&b.listeners.splice(d,1)}};if(""===a)return e.matches=!0,e;e.matches=A(a);t=l.push({mql:e,listeners:null});return e}}(window));;
/*!
 * enquire.js v2.1.0 - Awesome Media Queries in JavaScript
 * Copyright (c) 2013 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function(t,i,n){var e=i.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=n(e):"function"==typeof define&&define.amd?define(function(){return i[t]=n(e)}):i[t]=n(e)})("enquire",this,function(t){"use strict";function i(t,i){var n,e=0,s=t.length;for(e;s>e&&(n=i(t[e],e),n!==!1);e++);}function n(t){return"[object Array]"===Object.prototype.toString.apply(t)}function e(t){return"function"==typeof t}function s(t){this.options=t,!t.deferSetup&&this.setup()}function o(i,n){this.query=i,this.isUnconditional=n,this.handlers=[],this.mql=t(i);var e=this;this.listener=function(t){e.mql=t,e.assess()},this.mql.addListener(this.listener)}function r(){if(!t)throw Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!t("only all").matches}return s.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(t){return this.options===t||this.options.match===t}},o.prototype={addHandler:function(t){var i=new s(t);this.handlers.push(i),this.matches()&&i.on()},removeHandler:function(t){var n=this.handlers;i(n,function(i,e){return i.equals(t)?(i.destroy(),!n.splice(e,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){i(this.handlers,function(t){t.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var t=this.matches()?"on":"off";i(this.handlers,function(i){i[t]()})}},r.prototype={register:function(t,s,r){var h=this.queries,u=r&&this.browserIsIncapable;return h[t]||(h[t]=new o(t,u)),e(s)&&(s={match:s}),n(s)||(s=[s]),i(s,function(i){h[t].addHandler(i)}),this},unregister:function(t,i){var n=this.queries[t];return n&&(i?n.removeHandler(i):(n.clear(),delete this.queries[t])),this}},new r});
;
jQuery.fn.popupwindow = function(p)
{

	var profiles = p || {};

	return this.each(function(index){
		var settings, parameters, mysettings, b, a, winObj;
		
		// for overrideing the default settings
		mysettings = (jQuery(this).attr("rel") || "").split(",");

		
		settings = {
			height:600, // sets the height in pixels of the window.
			width:600, // sets the width in pixels of the window.
			toolbar:0, // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
			scrollbars:0, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
			status:0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
			resizable:1, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
			left:0, // left position when the window appears.
			top:0, // top position when the window appears.
			center:0, // should we center the window? {1 (YES) or 0 (NO)}. overrides top and left
			createnew:1, // should we create a new window for each occurance {1 (YES) or 0 (NO)}.
			location:0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
			menubar:0, // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
			onUnload:null // function to call when the window is closed
		};

		// if mysettings length is 1 and not a value pair then assume it is a profile declaration
		// and see if the profile settings exists

		if(mysettings.length == 1 && mysettings[0].split(":").length == 1)
		{
			a = mysettings[0];
			// see if a profile has been defined
			if(typeof profiles[a] != "undefined")
			{
				settings = jQuery.extend(settings, profiles[a]);
			}
		}
		else
		{
			// overrides the settings with parameter passed in using the rel tag.
			for(var i=0; i < mysettings.length; i++)
			{
				b = mysettings[i].split(":");
				if(typeof settings[b[0]] != "undefined" && b.length == 2)
				{
					settings[b[0]] = b[1];
				}
			}
		}

		// center the window
		if (settings.center == 1)
		{
			settings.top = (screen.height-(settings.height + 110))/2;
			settings.left = (screen.width-settings.width)/2;
		}
		
		parameters = "location=" + settings.location + ",menubar=" + settings.menubar + ",height=" + settings.height + ",width=" + settings.width + ",toolbar=" + settings.toolbar + ",scrollbars=" + settings.scrollbars  + ",status=" + settings.status + ",resizable=" + settings.resizable + ",left=" + settings.left  + ",screenX=" + settings.left + ",top=" + settings.top  + ",screenY=" + settings.top;
		
		jQuery(this).bind("click", function(){
			var name = settings.createnew ? "PopUpWindow" + index : "PopUpWindow";
			winObj = window.open(this.href, name, parameters);
			
			if (settings.onUnload) {
				// Incremental check for window status
				// Attaching directly to window.onunlaod event causes invoke when document within window is reloaded
				// (i.e. an inner refresh)
				unloadInterval = setInterval(function() {
					if (!winObj || winObj.closed) {
						clearInterval(unloadInterval);	
						settings.onUnload.call($(this));
					}
				},500);
			}
			
			winObj.focus();
			
			return false;
		});
	});

};;
(function ($) {
 
    $.webFontListener = function (callbacks) {
		// config
		var defaults = {
			timeout: 8000,
            onFontLoad: function () {},
            onFontLoadError: function () {}          
        };

        callbacks = $.extend({}, defaults, callbacks);

        // private
        var _testElement = $('<span />');
        var _testElementText = 'QW@HhsXJ';
        var _initialWidth;
        var _pollInterval;
        var _pollDuration = 50;
        var _startTime;
        var _instance = this;

		var _checkFont = function () {
			var currentTime = (new Date()).getTime();
			
			if ((currentTime - _startTime) >= defaults.timeout) {
				// timeout failure
				_instance.destroy();

				if ($.isFunction(callbacks.onFontLoadError)) {
					callbacks.onFontLoadError.call(_instance);	
				}

				return;
			}

			var w = _testElement.width();

			// nothing has changed or we have a bogus measurement
			if (isNaN(w) || w <= 0) return;
			if (w == _initialWidth) return;

			// success
			_instance.destroy();
			
			if ($.isFunction(callbacks.onFontLoad)) {
				callbacks.onFontLoad.call(_instance);	
			}
		}

		// public
		this.destroy = function () {
			clearInterval(_pollInterval);
			_testElement.remove();	
		}

	    this.initialize = function () {
		    // init test element
			_testElement.html(_testElementText);
			_testElement.addClass('font-load-test');
			_testElement.addClass('monospace');
			
			// add it to the DOM and measure
			$('body').append(_testElement);
			_initialWidth = _testElement.width();
			
			// remove ref font
			_testElement.removeClass('monospace');

			// start polling for custom font
			_startTime = (new Date()).getTime();
			
			clearInterval(_pollInterval);
	        _pollInterval = setInterval(_checkFont, _pollDuration);
			_checkFont();

	        return this;
	    };

    	return this.initialize();
	};
 
}(jQuery));
;
var HackDOM = function () {
	var $ = jQuery;
	var _gcseInterval;
	var _imageFieldSelector = '.views-field-field-hero-region, .views-field-field-image-primary, .views-field-field-slideshow-frame-bg-image, .views-field-field-image-primary-large';

	var _removeCruft = function () {
		// remove bogus styles
		$('p, p *').attr('style', '');

		// some more aggressive stuff for blogs
		//$('.node-type-blog .panel-col-first *').attr('style', ''); // too aggressive - botching hero slideshows
		$('.node-type-blog .field-name-body *').attr('style', '');
		$('.node-type-blog .panel-col-first img').parent('a, div').addClass('img-container');

		$('p > img, .img-container', '.node-type-blog .panel-col-first').each(function () {
			if ($(this).parent('p').length == 1) {
				if ($(this).prop('tagName') == 'IMG') {
					$(this).parent('p').before('<div class="img-container"><img src="'+ $(this).attr('src') +'" /></div>');
					$(this).remove();
				} else {
					$(this).parent('p').before($(this));
				}
			}
		});

		// remove empty p tags
		$('p').each(function () {
			if ($.trim($(this).text()) == '' && $('img, iframe', this).length == 0) {
				$(this).remove();
			}
		});

		$('.node-type-blog .panel-col-first p').after('<div class="clear-floats">&nbsp;</div>');

		// hide panels that are just 0
		$('.panel-pane').each(function () {
			if ($('img, iframe, #live-stream-container', this).length > 0) {
				return;
			}

			var content = $.trim($(this).text());

			if (content == '0' || content == '1') {
				$(this).remove();
			}
		});

		// add a class to non-empty article section fields
		$('.view-display-id-panel_pane_blog_article_section .view-content > div').each(function () {
			$(this).find('> div').each(function () {
				if ($(this).find('img, p, iframe, li, h1, h2').length > 0) {
					$(this).addClass('article-section-field-with-content');
				}
			});

			$(this).find('.article-section-field-with-content').last().addClass('last');
		});
		
		// remove empty CTA button panels
		$('.pane-node-field-cta-buttons').each(function () {
			if ($(this).find('.content *').length == 0) {
				$(this).remove();
			}
		});
	}

	var _getViewsFieldClass = function (classList) {
		var prefix = 'field-name';
		var myClass;

		$.each(classList, function (index, item) {
			if (item.indexOf(prefix) === 0) {
				myClass = item.replace(prefix, 'views-field');
			}
		});

		return myClass;
	}

	var _addViewsFieldClasses = function (el) {
		$('.field', el).each(function () {
			var classList = $(this).attr('class').split(/\s+/);

			$(this).addClass(_getViewsFieldClass(classList));
			$(this).addClass('views-field');
		});
	}

	var _getPseudoRows = function (obj, startIndex, myMax, myImgSelector) {
		var i = (typeof(startIndex) == 'undefined') ? 0 : startIndex;
		var max = (typeof(myMax) == 'undefined') ? 0 : myMax;
		var imgSelector = (typeof(myImgSelector) == 'undefined') ? _imageFieldSelector : myImgSelector;
		var rows = [];

		obj.each(function () {
			i++;
			if (max > 0 && i > max) return;

			// add some additional classes to each field
			_addViewsFieldClasses($(this));

			// derive title from header
			if ($('header', this).length == 1) {
				var title = $('<div />');
				title.addClass('views-field');
				title.addClass('views-field-title');
				title.html($('header .node-title', this).html());

				var img = $(imgSelector, this);

				if (img.length == 0) {
					// prepend
					$(this).prepend(title);
				} else {
					// put the title after the primary image
					img.after(title);
				}

				// ok, now remove the header
				$('header', this).remove();
			}

			// all set, now create a phony view row
			var row = $('<div />');
			row.addClass('views-row');
			row.addClass('views-row-' + i);

			// clone the content
			row.html($(this).html());
			rows.push(row);
		});

		return rows;
	}

	var _convertNLGalleryToPseudoRows = function () {
		_addViewsFieldClasses($('.view-display-id-past_nl_gallery'));
		$('.view-display-id-past_nl_gallery .views-field-field-links').addClass('views-field-title');

		// switch href on img link
		$('.view-display-id-past_nl_gallery .views-row').each(function () {
			var img = $('img', this);

			if (img.length == 1) {
				var a = $('.views-field-title a', this);

				if (a.length == 1) {
					var parentA = img.parents('a').first();
					parentA.attr('href', a.attr('href'));
				}
			}
		});
	}

	var _alterNightLife = function () {
		// NightLife Landing (gallery)
		_convertNLGalleryToPseudoRows();

		// NightLife Landing (tri grid / people)
		var peeps = $('.page-nightlife-landing .views-field .field-name-field-featured-people > .field-items > .field-item > .node');
		var rows = _getPseudoRows(peeps, 1, 3);

		// add
		$.each(rows, function (index, item) {
			peeps.parents('.view-content').first().append(item);
		});

		// remove
		peeps.parents('.views-field').remove();

		// lingering scheduled item location cleanup (when peep not set but loc is)
		$('.page-nightlife-landing .views-field .field-name-field-location').remove();

		// remove non-image fields from hero region
		$('.view-nightlife-upcoming .field-name-field-hero-region').each(function () {
			calacademy.Utils.fixHeroField($(this), $('.views-field-title a', $(this).parent()));
		});

		// NightLife Detail (people / music)
		var sec = $('.node-type-event-nightlife #music');
		var peeps = $('.field-name-field-featured-people > .field-items > .field-item > .node', sec);
		var rows = _getPseudoRows(peeps);

		if (!($.isEmptyObject(rows))) {

			var view = $('<div class="view"><div class="view-content"></div></div>');
			sec.append(view);

			var originalView = $('.view', sec).first();

			// add
			$.each(rows, function (index, item) {
				var originalRow = $('.item-list li', originalView).eq(index);

				$('.views-field-title', item).before($('.field-name-field-location', originalRow));
				$('.views-field-title', item).after($('.field-name-field-time-slots', originalRow));
				calacademy.Utils.fixHeroField($('.field-name-field-hero-region', item), $('.views-field-title a', item));

				$('.view-content', view).append(item);
			});

			// remove
			originalView.remove();

		} else {
			sec.remove();
		}

		// NightLife Detail (events)
		var sec = $('.node-type-event-nightlife #events');
		var events = $('.field-name-field-article-section .content', sec);
		var rows = _getPseudoRows(events);

		// remove
		$('.field', sec).remove();

		var view = $('<div class="view"><div class="view-content"></div></div>');
		sec.append(view);

		// add
		$.each(rows, function (index, item) {
			$('.view-content', view).append(item);
		});
	}

	var _removeEmptySlideshows = function () {
		var arr = [
			'.pane-node-field-hero-region',
			'.pane-hero-media-slideshow-large',
			'.pane-hero-media-revision-slideshow-large',
			'.pane-hero-media-slideshow-standard',
			'.pane-hero-media-revision-slideshow-standard',
			'.pane-hero-media-standard-hero-image-pane',
			'.pane-hero-media-revision-standard-hero-image-pane',
			'.pane-hero-media-large-hero-image-pane',
			'.pane-hero-media-revision-large-hero-image-pane',
			'.pane-slideshows-large-hero-image-pane',
			'.pane-slideshows-slideshow-large-bridge-pane',
			'.pane-slideshows-standard-hero-image-pane',
			'.pane-slideshows-slideshow-standard-bridge-pane'
		];

		calacademy.Utils.removeEmptyElements(arr.join(', '), $('body'));
	}

	var _alterESLandingPage = function () {
		// remove empty panels
		calacademy.Utils.removeEmptyElements('.panel-pane, .panel-panel, .center-wrapper', $('body'));

		// remove empty a tags
		$('.es-categories a').each(function () {
			if ($('img', this).length == 1) return;

			if ($.trim($(this).text()) == '') {
				$(this).remove();
			}
		});

		// ticket #81150390, temp hide blog category
		$('.blog-category-container').parent('.views-row').remove();

		// concatenate "blog pseudo" and "selected" category views
		var pseudoRows = $('.es-categories > .view > .attachment > .view > .view-content > .views-row');

		if (pseudoRows.length > 0) {
			pseudoRows.each(function () {
				// alter these rows to match the DOM of the other categories
				$(this).prepend($('.link-block', this));
				$('.views-field-title-1', this).remove();

				$('.es-categories > .view > .view-content').append($(this));
			});

			$('.es-categories > .view > .attachment').remove();
		}

		var categories = $('.es-categories > .view > .view-content > .views-row');

		// do nothing if less than or equal to three
		if (categories.length <= 3) return;

		// create container
		var container = $('<div />');
		container.addClass('clone-container');
		container.addClass('smartphone-hide');
		container.addClass('image-top');
		container.addClass('es-categories');

		// place container directly after the callout box
		$('.body-box > .field').after(container);

		// populate container
		var i = 1;

		categories.each(function () {
			if (i > 3) {
				if (i % 2 == 0) {
					// clone into container
					var clone = $(this).clone();
					container.append(clone);

					$('img', clone).off('load');
					calacademy.Utils.addImageLoadEvent(clone, 'js-load-processed-clone');

					// original should be hidden on non-smartphones
					$(this).addClass('smartphone-only');
				}
			}

			i++;
		});
	}

	var _setBlurbOffset = function () {
		// reset
		$('.pane-node-field-blurb-description, .pane-node-field-article-section:first').attr('style', '');

		var blockquotes = $('.slideshow-hero-large blockquote, .view-hero-media blockquote');
		var blurb = $('.pane-node-field-blurb-description');
		if (blockquotes.length == 0 || blurb.length != 1) return;

		// offset blurb to accommodate image captions
		var captionHeight = 0;

		if (!$('html').hasClass('smartphone')) {
			blockquotes.each(function () {
				var h = $(this).outerHeight();

				if (h > captionHeight) {
					captionHeight = h;
				}
			});
		}

		var blurbMargin = parseInt(blurb.css('margin-top'));
		blurbMargin -= captionHeight;
		blurb.css('margin-top', blurbMargin);

		var sideThing = $('.pane-node-field-article-section:first');
		var sideThingMargin = parseInt(sideThing.css('margin-top'));
		sideThingMargin += captionHeight;
		sideThing.css('margin-top', sideThingMargin);
	}

	var _alterLandingAndExhibitsPage = function () {
		$(window).off('load.blurb');
		$(window).on('load.blurb', _setBlurbOffset);
		$(document).off('breakpoint.blurb');
		$(document).on('breakpoint.blurb', _setBlurbOffset);

		// alter people article sections to mimic views styles
		var sec = $('#people');
		var peeps = $('.field-name-field-featured-people > .field-items > .field-item > .node', sec);
		var rows = _getPseudoRows(peeps);

		// remove
		$('.field', sec).remove();

		var view = $('<div class="view"><div class="view-content"></div></div>');
		sec.append(view);

		// add
		$.each(rows, function (index, item) {
			$('.view-content', view).append(item);
		});

		// simplify hero region
		var link = $('.views-field-title a', sec);
		var heroRegion = $('.field-name-field-hero-region', sec);
		calacademy.Utils.fixHeroField(heroRegion, link);

		// drop some article sections in weird places
		// make a clone and put it under the blurb if there's more than two sections
		var numArticles = $('.pane-node-field-article-section > .field > .field-items > .field-item').length;

		if (numArticles > 2) {
			var orig = $('.pane-node-field-article-section');
			var clone = orig.clone();

			orig.addClass('article-section-orig');
			clone.addClass('article-section-clone');
			clone.insertAfter(orig);

			var origArticleSelector = '.article-section-orig > .field > .field-items > .field-item';
			var cloneArticleSelector = '.article-section-clone > .field > .field-items > .field-item';

			if (numArticles == 3) {
				// remove the first article from the clone
				$(cloneArticleSelector).first().remove();

				// remove everything but the first from the original
				var i = 0;

				$(origArticleSelector).each(function () {
					if (i > 0) $(this).addClass('cloned');
					i++;
				});
			} else {
				// remove the first two articles from the clone
				$(cloneArticleSelector).first().remove();
				$(cloneArticleSelector).first().remove();

				// remove everything but the first two from the original
				var i = 0;

				$(origArticleSelector).each(function () {
					if (i > 1) $(this).addClass('cloned');
					i++;
				});
			}
		}

		// clone right rail to bottom for smartphone
		var smartphoneRightrail = $('.right-rail').clone(true);
		smartphoneRightrail.addClass('cloned');
		smartphoneRightrail.appendTo('#content');
	}

	var _cloneMenuGarnish = function () {
		var clone = $('.block-menu-garnish').eq(0).clone();
		clone.addClass('clone');
		clone.addClass('block-views-menu-garnish-block-clone');

		$('.tb-megamenu .nav.level-0 > li:first-child').after(clone);

		var buyTickets = $('.tb-megamenu .nav.level-0 > li:last-child a').eq(0).clone();
		buyTickets.addClass('cta-clone');
		$('#main-nav .btn-navbar').after(buyTickets);
	}

	var _cloneAlerts = function () {
		var clone = $('.alerts').clone();
		clone.addClass('clone');

		// clear some stuff
		$('*', clone).off();
		$('*', clone).removeClass();
		$('li', clone).attr('style', '');

		$('.menu-garnish-container').before(clone);
	}

	var _fixColumnFields = function () {
		$('.column-fields').each(function () {
			var numColumns = $(this).children('.field').children('.field-items').children('.field-item').length;

			if (numColumns < 2) {
				$(this).removeClass('column-fields');
				$(this).addClass('floated-fields');
			}
		});
	}

	var _addFileClasses = function () {
		$('.file-icon').each(function () {
			var type = $(this).attr('title');
			var src = $(this).attr('src');
			var link = $(this).next();

			link.addClass(type);
			link.css('background-image', 'url("'+ src +'")');
		});
	}

	var _alterMegaMenuFeaturedItems = function () {
		$('.tb-megamenu .featured').each(function () {
			var featured = $(this);
			var rows = $('.field-name-field-megamenu-featured-item > .field-items > .field-item', this);
			var html = '';

			featured.empty();

			rows.each(function () {
				var row = $('<div />');
				row.addClass('featured-item');

				var title = $('.node-title a', this).addClass('title');
				var subtitle = $('.field-name-field-subtitle .field-item', this).addClass('subtitle');

				if ($('img', this).length == 1) {
					// create container
					var imgContainer = $('<div />');
					imgContainer.addClass('image-container');

					// fix hero field then add to container
					calacademy.Utils.fixHeroField($(this), title);
					imgContainer.html($(this).html());

					// add container to row
					row.append(imgContainer);
				}

				row.append(subtitle);

				title.html('<span>' + title.text() + '</span>');
				row.append(title);

				featured.prepend(row);
			});
		});
	}

	var _alterClusters = function () {
		// add non-image fields to a seperate container so they can be styled properly
		$('.tri-large > .view > .view-content > .views-row').each(function () {
			// create container
			var container = $('<div />');
			container.addClass('field-container');

			// add non-image fields to container
			var fields = $(this).children().not(_imageFieldSelector);
			container.html(fields);

			$(this).append(container);
		});
	}

	var _alterScienceTodayLanding = function () {
		// add sci today logo image inset element to top story image
		var logoSciToday = $('<div />');
		logoSciToday.addClass('science-today-logo-inset');
		$('.view-es-science-today-featured-articles > .view-content > .views-row-first > .views-field-field-hero-region > .field-content').append(logoSciToday);

		// hide hero region on cant miss items that are not first item
		var countCantMiss = 0;
		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row').each(function () {
			if (countCantMiss != 0) {
				$(this).children('.views-field-field-hero-region').hide();
			}
			countCantMiss++;
		});

		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row:nth-child(1)').addClass('cant-miss-right-column');
		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row:nth-child(2)').addClass('cant-miss-left-column');
		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row:nth-child(3)').addClass('cant-miss-left-column');
		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row:nth-child(4)').addClass('cant-miss-right-column');
		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row:nth-child(5)').addClass('cant-miss-right-column');
		$('.view-display-id-panel_pane_st_cant_miss > .view-content > .views-row:nth-child(6)').addClass('cant-miss-left-column');

		$('.pane-astronomical-events-panel-pane-1').addClass('cant-miss-left-column');

		$('.cant-miss-left-column').wrapAll('<div class="cant-miss-container-left" />');
		$('.cant-miss-right-column').wrapAll('<div class="cant-miss-container-right" />');

		// replace link on cant miss hero - custom req. - std hero img fix not working here
		var titleLinkHref = $('.cant-miss-container-right > .views-row:nth-child(1) > .views-field-title > .field-content > a').attr('href');
		$('.cant-miss-container-right > .views-row:nth-child(1) > .views-field-field-hero-region > .field-content > a').attr('href', titleLinkHref);

		// add astro-event non-image fields to a seperate container so they can be styled properly
		$('.pane-astronomical-events-panel-pane-1 > .view > .view-content > .views-row').each(function () {
			// create container
			var container = $('<div />');
			container.addClass('field-container');
			// add non-image fields to container
			var fields = $(this).children().not(_imageFieldSelector);
			container.html(fields);
			$(this).append(container);
		});

		// add creature of the week non-image fields to a seperate container so they can be styled properly
		$('.pane-es-science-today-featured-articles-panel-pane-creature-week > .pane-title').insertBefore('.pane-es-science-today-featured-articles-panel-pane-creature-week > .view > .view-content > .views-row > .views-field-title');
		$('.pane-es-science-today-featured-articles-panel-pane-creature-week > .view > .view-content > .views-row').each(function () {
			// create container
			var container = $('<div />');
			container.addClass('creature-field-container');
			// add non-image fields to container
			var fields = $(this).children().not(_imageFieldSelector);
			container.html(fields);
			$(this).append(container);
		});

		// add link to cant miss hero
		var sec = $('.pane-es-science-today-featured-articles-panel-pane-creature-week > .view > .view-content > .views-row');
		var link = $('.creature-field-container > .views-field-title > span > a', sec);
		var heroRegion = $('.views-field-field-hero-region', sec);
		calacademy.Utils.fixHeroField(heroRegion, link);

		// browse by topic
		$('.es-categories > .view-category-listings > .view-content > .views-row').each(function () {
			var catLinkName = $(this).children('.views-field-name').children('span').children('a').text();
			var catLinkBlock = $('<a />');
			catLinkBlock.attr('href', $(this).children('.views-field-name').children('span').children('a').attr('href'));
			catLinkBlock.addClass('link-block');
			catLinkBlock.append('<span>' + catLinkName + '</span>');
			$(this).append(catLinkBlock);
			$(this).children('.views-field-name').css('display', 'none');
		});

	}

	var _alterSlideshowCaptions = function () {
		$('.slideshow-hero-large .flex-caption > div').each(function () {
			if ($.trim($('.field_slideshow_frame_title', this).text()) == ''
				&& $.trim($('.field_link', this).text()) == '') {
				// remove if no text
				$(this).parent().remove();
			} else {
				// add some style classes
				if ($.trim($('.field_slideshow_large_text_displ', this).text().toLowerCase()).indexOf('large') == 0) {
					$(this).addClass('large');
				} else {
					$(this).addClass('medium');
				}
			}
		});
	}

	var _alterPriceTable = function () {
		// add a CSS class for best deal
		$('.field-name-field-best-deal .field-item').each(function () {
			if (parseInt($(this).text())) {
				// apply a class to its parent
				var parentSquare = $(this).parents('.field-item').eq(0);
				parentSquare.addClass('best-deal');
			}
		});

		// fix the wonky entity references
		var v = $('<div />');
		v.addClass('view');
		v.append($('.pane-node-field-entities.image-top-four-columns .field-name-field-subtitle h2'));

		var rows = _getPseudoRows($('.pane-node-field-entities.image-top-four-columns .node'));

		$.each(rows, function (index, item) {
			// remove hero type label
			$('.field-name-field-hero-type', item).remove();

			// simplify hero
			var hasVideo = $('.view-simulator-hero-img > .video', item).length == 1;
			var img = $('.view-simulator-hero-img img', item);
			$('.view-simulator-hero-img', item).html(img);

			var myDiv = $('<div class="field-content" />');
			img.wrap(myDiv);

			// wrap image in link
			var clone = $('.views-field-title a', item).clone();
			if (hasVideo) clone.addClass('video');
			clone.empty();
			$('img', item).wrap(clone);

			v.append(item);
		});

		// replace pane contents with derived content
		$('.pane-node-field-entities.image-top-four-columns').html(v);
	}

	var _alterEntityCollections = function () {
		var newContent = $('<div />');

		// page body
		var b = $('<div />');
		b.addClass('page-header');
		b.addClass('pane-node-body');

		var bodyEl = $('#content > article > .field-name-body');

		// missing p tag
		if ($('p', bodyEl).length == 0) {
			$('.field-item', bodyEl).wrapInner('<p></p>')
		}

		b.html(bodyEl);
		newContent.append(b);

		var hasRightRail = ($('.field-name-field-right-rail-items article').length > 0);
		var entityContainer = $('<div />');
		entityContainer.addClass('entity-container');

		if (hasRightRail) {
			$('body').addClass('with-right-rail');
		}

		// "panes"
		$('.field-name-field-entities-5-, .field-name-field-entities > .field-items > .field-item').each(function () {
			var p = $('<div />');
			p.addClass('panel-pane entity-collections-panel-pane');

			var isTriGrid = $(this).hasClass('field-name-field-entities-5-');

			if (isTriGrid) {
				p.addClass('skewed-tri-grid');
			} else {
				if (hasRightRail) {
					p.addClass('image-top-three-columns');
				} else {
					p.addClass('image-top-four-columns');
				}
			}

			if (hasRightRail && !isTriGrid) {
				entityContainer.append(p);
			} else {
				newContent.append(p);
			}

			// view header
			var t = $('.field-name-field-subtitle h2', this);
			t.addClass('pane-title');
			p.append(t);

			var v = $('<div />');
			v.addClass('view');
			v.addClass('simulated');
			p.append(v);

			// rows
			var rows = _getPseudoRows($('.field-type-entityreference .node', this), 0, 0, '.view-simulator-hero-img');

			$.each(rows, function (index, item) {
				// remove hero type label
				$('.field-name-field-hero-type', item).remove();

				// simplify hero
				var hasVideo = $('.view-simulator-hero-img > .video', item).length == 1;
				var img = $('.view-simulator-hero-img img', item);
				$('.view-simulator-hero-img', item).html(img);

				//no alt then derive from hero title anchor label
				if (!img.attr('alt')) {
					var title = $('.views-field-title > a', item).text();
					img.attr('alt', 'image: ' + title);
				}

				var myDiv = $('<div class="field-content" />');
				img.wrap(myDiv);

				// wrap image in link
				var clone = $('.views-field-title a', item).clone();
				if (hasVideo) clone.addClass('video');
				clone.empty();
				$('img', item).wrap(clone);

				v.append(item);
			});
		});

		// add link as a pseudo-row
		var linkSelector = '#content > article > .field-name-field-title-link a';

		if ($(linkSelector).length == 1) {
			var container = $('.entity-collections-panel-pane .view', newContent).first();
			var linkContainer = $('<div />');

			linkContainer.html($(linkSelector).clone());
			$('a', linkContainer).addClass('views-field');
			linkContainer.addClass('views-row');
			linkContainer.addClass('cta-block');
			linkContainer.addClass('views-row-' + ($('.views-row', container).length + 1));

			container.append(linkContainer);
		}

		// right rail
		if (hasRightRail) {
			var p = $('<div />');
			p.addClass('right-rail');

			var n = $('<div />');
			n.addClass('panel-pane');
			n.addClass('pane-node-field-right-rail-items');

			p.append(n);

			n.html($('.field-name-field-right-rail-items').html());
			newContent.append(entityContainer);
			newContent.append(p);
		}

		// replace content with new stuff
		$('#content').html(newContent.html());

		// add skip link target anchor
		$('#content').prepend('<a id="main-content" name="#main-content" tabindex="-1"></a>');
	}

	var _addLessonPlansSearch = function () {
		var form = $('<form class="lesson-plan-search views-exposed-widget" action="/educators/search/" method="get"><label for="search-lesson-plans">Search Lesson Plans</label><input id="search-lesson-plans" class="form-text" name="gq" size="15" type="text" placeholder="Search Lesson Plans" /><div class="submit-container"><input type="submit" class="form-submit" value="Search" /></div></form>');

		form.on('submit', function () {
			var t = encodeURIComponent($.trim($(this).find('.form-text').val()));
			window.location.href = '/educators/search/#t=' + t + '&tids=9762';

			return false;
		});

		$('.exposed-filters .view-lesson-plan-content').before(form);
	}

	var _addEventDetailTimeslotFormat = function() {
		var timeslots = $('#event_detail_timeslots').html();
		if(typeof(timeslots) != "undefined" && timeslots !== null) {
			var timeslotList = timeslots.split(',');
			var timeslotListFormatted = '';
			for(i=0; i < timeslotList.length; i++) {
				var time = moment(timeslotList[i], ["HH:mm"]).format("h:mm a");
				timeslotListFormatted += time;
				if (i < timeslotList.length-1) {
					timeslotListFormatted += ", ";
				}
			}
			$('#event_detail_timeslots').html(timeslotListFormatted);
		}
	}

	var _alterLogos = function () {
		$('.field-name-field-logo-container .entity, .field-name-field-logo-container > .field-items > .field-item').each(function () {
			$(this).hide();
			var title = false;

			if ($('.field-name-field-title', this).length == 1) {
				title = $('<h2 class="pane-title">' + $('.field-name-field-title .field-item', this).html() + '</h2>');
			}

			var view = $('<div />');
			view.addClass('view');
			view.addClass('view-logos');

			$('.field-name-field-logo-details > .field-items > .field-item', this).each(function () {
				var row = $('<div />');
				row.addClass('views-row');

				if ($('img', this).length == 1) {
					var img = $('<div />');
					img.addClass('views-field');
					img.addClass('views-field-field-image-primary');
					img.html($('img', this));

					row.append(img);
				}

				if ($('.field-name-field-image-link', this).length == 1) {
					var l = $('<div />');
					l.addClass('views-field');
					l.addClass('views-field-image-link');
					l.hide();
					l.html($('.field-name-field-image-link .field-item', this).html());

					row.append(l);
				}

				if ($('.field-name-field-description', this).length == 1) {
					var d = $('<div />');
					d.addClass('views-field');
					d.addClass('views-field-description');
					d.html($('.field-name-field-description .field-item', this).html());

					row.append(d);
				}

				view.append(row);
			});

			$(this).parent().parent().append(view);
			if (title) view.before(title);
		});

		$('.pane-node-field-logo-container .field-collection-container > div').unwrap();
	}

	var _fixMultiTimeslots = function () {
		// var now = moment();

		$('.view.simulated .field-name-field-date').each(function () {
			if ($('.field-item', this).length > 1) {
				$(this).addClass('multi');

				// this doesn't work for timeslots that span multiple years
				/*
				$('.field-item', this).each(function () {
					var test = moment($(this).text(), 'MMMM D at h:mm a');

					if (test.diff(now) > 0) {
						$(this).addClass('most-current');
						return false;
					}
				});
				*/
			}
		});

		// $('.view.simulated .field-name-field-date .field-item').not('.most-current').remove();
	}

	// hide "Revisions" tab from node view for auth users
	var _hideRevisionsTab = function () {
		$('.tabs-primary .tabs-primary__tab a').each(function() {
			if ($(this).is(':contains("Revisions")')) {
				$(this).css('display', 'none');
			}
		});
	}

	// @see
	// http://help.calacademy.org/helpdesk/WebObjects/Helpdesk.woa/wa/TicketActions/view?ticket=132443
	var _alterEventsArticleSectionSubtitle = function () {
		var articleSectionsContent = $('.pane-node-field-article-section > .field');
		$('.field-name-field-autoplay', articleSectionsContent).remove();

		var content = $.trim(articleSectionsContent.text());

		if (content == '') {
			// empty article section, remove the subtitle
			$('.pane-node-field-article-section > .pane-title').remove();
		}
	}

	var _alterRightRails = function () {
		$('.right-rail .field-collection-item-field-contact-collection').each(function () {
			if ($('.field-name-field-person-name-first', this).length == 1) {
				$(this).addClass('has-name');
			}
		});

		var first = $('.right-rail .node').eq(0);

		if (first.children('.field').eq(0).hasClass('field-name-field-inline-image')) {
			$('.right-rail').addClass('image-first');
		}
	}

	var _removeCruftyLinks = function () {
		$('.views-row .links.inline').remove();
	}

	var _onSearchResultsChange = function () {
		$('.gsc-result').not('.processed').each(function () {
			var title = $(this).find('.gs-title').first();
			var url = $(this).find('.gsc-url-top');

			$(this).find('.gsc-table-cell-snippet-close').prepend(url);
			$(this).find('.gsc-table-cell-snippet-close').prepend(title);

			$(this).addClass('processed');
		});
	}

	var _alterGoogleSearchResults = function () {
		// blocks should be wrapped in #search-results-container
		if ($('#search-results-container').length != 1) return;

		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
		if (typeof(MutationObserver) !== 'function') return;

		var observer = new MutationObserver(_onSearchResultsChange);
		var target = $('#search-results-container').get(0);

		observer.observe(target, {
			attributes: true,
			childList: false,
			characterData: false,
			subtree: true
		});
	}

	var _alterHighlights = function () {
		$('.field-name-field-highlight').each(function () {
			var link = $(this).find('.field-name-field-legacy-link a');
			var img = $(this).find('.field-name-field-inline-image img');

			if (link.length == 1 && img.length == 1) {
				var clonedLink = link.clone();
				clonedLink.text('');

				img.wrap(clonedLink);
			}
		});
	}

	var _reduceRelatedEvents = function () {
		var _getTitle = function (el) {
			return $.trim(el.text());
		}

		var titles = [ _getTitle($('.page-header .pane-node-title')) ];
		var i = 0;

		$('.view-display-id-upcoming_related .views-row').each(function () {
			var title = _getTitle($(this).find('.views-field-title'));

			if ($.inArray(title, titles) >= 0) {
				$(this).remove();
			} else {
				titles.push(title);
				$(this).addClass('do-not-remove');
				i++;
			}

			if (i == 3) {
				return false;
			}
		});

		$('.view-display-id-upcoming_related .views-row').not('.do-not-remove').remove();

		if ($('.view-display-id-upcoming_related .views-row').length == 0) {
			$('.pane-event-list-upcoming-related').remove();
		}
	}

	var _alterGifSrc = function () {
		var cropStyles = [
			'styles/manual_crop_square_460px/public/',
			'styles/manual_crop_standard_960x540/public/',
			'styles/manual_crop_large_1920x970/public/',
			'styles/automatic_landscape_940x460/public/'
		];

		$(_imageFieldSelector + ', .views-field-field-inline-image').find('img').each(function () {
			var src = $(this).attr('src');

			if (calacademy.Utils.getFileExtension(src) == 'gif') {
				$(this).addClass('image-src-replaced');

				// square gif
				var gifSrc = calacademy.Constants.emptyGif;

				if ($(this).attr('height') != $(this).attr('width')) {
					// landscape gif
					$(this).addClass('image-src-replaced-landscape');
					gifSrc = calacademy.Constants.emptyGifLandscape;
				}

				$(this).attr('src', gifSrc);

				// background url
				$.each(cropStyles, function (i, j) {
					src = src.replace(j, '');
				});

				$(this).css('background-image', 'url(' + src + ')');
			}
		});
	}

	var _a11yYoutubeFieldPlayerIframe = function () {
		$('iframe.youtube-field-player').each(function () {
			var title = $(this).attr('title');
			if (typeof title == 'undefined' || title == false) {
				$(this).attr('title', 'YouTube Player');
			}
		});
	}

	var _alterYoutubeEmbedLanding = function () {
		var embed = $('.youtube-field-player');
		if (embed.length != 1) return;

		var src = embed.attr('src');
		embed.attr('src', src + '&controls=0&mute=1&autoplay=1');

		// move
		$('.pane-node-field-hero-region').prepend(embed);

		// size
		$(window).on('resize.yt-embed', function () {
			var w = embed.outerWidth();
			var h = (1080 / 1920) * w;
			embed.css('height', h + 'px');
		});

		$(window).trigger('resize.yt-embed');
	}

	var _alterPageStoryLanding = function() {

		// exposed form modify before form ajax sort+filter
		var formExposed = $('#views-exposed-form-story-nonfeatured-story-list-panel-pane');
		$('label', formExposed).css('display', 'none');
		$('.form-item-tid select option:contains("Story Topic")', formExposed).text('See all posts');
		$('.views-widget-sort-by', formExposed).css('display', 'none');
		$('.form-item-sort-order select option:contains("Order")', formExposed).text('Oldest first');
		$('.form-item-sort-order select option:contains("Desc")', formExposed).text('Newest first');
		$('.form-item-sort-order select', formExposed).find('option').each(function() {
			$(this).prependTo($('.form-item-sort-order select', formExposed));
		});

		// exposed form modify after form ajax sort+filter
		$(document).ajaxComplete(function(e) {
			var formExposedAjax = $('#views-exposed-form-story-nonfeatured-story-list-panel-pane');
			$('label', formExposedAjax).css('display', 'none');
			$('.views-widget-sort-by', formExposedAjax).css('display', 'none');
			$('.form-item-tid select option:contains("Story Topic")', formExposedAjax).text('See all posts');
			$('.form-item-sort-order select option:contains("Order")', formExposedAjax).text('Oldest first');
			$('.form-item-sort-order select option:contains("Desc")', formExposedAjax).text('Newest first');
			$('.form-item-sort-order select', formExposedAjax).find('option').each(function() {
				$(this).prependTo($('.form-item-sort-order select', formExposedAjax));
			});
		});

	}

	var _alterPageStory = function() {
		// story reaction widget handler (markup in nodeview template variant)
		// rule: only process if reaction widget showing in page
		if (!$('#reaction-widget')) return;
		// get reactions for page (if they exist yet)
		// rule: there are exactly 4 reactions
		var url = new URL(window.location);
		var page = url.hostname + url.pathname;
		page = page.replace(/[^A-Za-z0-9]+/g, '');
		page = page.toLowerCase();
		// account for "calacademy.org" url hostname use without "www" subdomain
		if (page.indexOf('calacademyorg') === 0) {
			page = page.replace('calacademyorg', 'wwwcalacademyorg');
		}
		$.ajax({
			url: "https://4nngj4s65c.execute-api.us-west-2.amazonaws.com/v1/reactions/" + page + ".json",
			type: 'GET',
      success: function(data) {
				if (data.votes.length == 4) {
					for (let i = 0; i < 4; i++) {
						$('#reaction-widget #reaction-widget-reaction-' + i + ' .reaction-widget-reaction-count').html(data.votes[i] || 0);
					}
				}
			},
			error: function(xhr, statusText) {
				// display 0's
				$('#reaction-widget').find('.reaction-widget-reaction-count').html("0");
			}
		});
		// put reaction for page
		// rule: no limit on votes per page view
		var btn = $('#reaction-widget .reaction-widget-reaction');
		var vote = 'click';
		btn.on(vote, function () {
			var reactionPos = $(this).attr('id');
			reactionPos = reactionPos.replace('reaction-widget-reaction-', '');
			reactionPos = parseInt(reactionPos);
			var currentCount = $(this).find('.reaction-widget-reaction-count').html();
			currentCount = parseInt(currentCount);
			// display upvote
			$(this).find('.reaction-widget-reaction-count').html(currentCount + 1);
			// update remote saved votes
			// get latest votes again (account for delay between page load and vote)
			$.ajax({
				url: "https://4nngj4s65c.execute-api.us-west-2.amazonaws.com/v1/reactions/" + page + ".json",
				type: 'GET',
	      success: function(data) {
					var votes = data.votes;
					votes[reactionPos] = parseInt(data.votes[reactionPos]) + 1;
					var d = {"votes": votes};
					$.ajax({
						url: "https://4nngj4s65c.execute-api.us-west-2.amazonaws.com/v1/reactions/" + page + ".json",
						type: 'PUT',
						contentType: 'application/json',
						data: JSON.stringify(d)
					});
				},
				// no remote saved votes yet - add
				error: function(xhr, statusText) {
					var votes = [0,0,0,0];
					votes[reactionPos] = 1;
					var d = {"votes": votes};
					$.ajax({
						url: "https://4nngj4s65c.execute-api.us-west-2.amazonaws.com/v1/reactions/" + page + ".json",
						type: 'PUT',
						contentType: 'application/json',
						data: JSON.stringify(d)
					});
				}
			});
		});
	}

	this.initialize = function () {
		calacademy.Utils.log('HackDOM.initialize');

		_removeCruft();
		_removeEmptySlideshows();
		_alterSlideshowCaptions();
		_cloneMenuGarnish();
		_cloneAlerts();
		_fixColumnFields();
		_addFileClasses();
		_alterMegaMenuFeaturedItems();
		_alterClusters();
		_reduceRelatedEvents();
		_alterLogos();
		_hideRevisionsTab();
		_alterRightRails();
		_alterGoogleSearchResults();
		_alterGifSrc();
		_a11yYoutubeFieldPlayerIframe();

		if ($('body').hasClass('section-nightlife')) {
			_alterNightLife();
		}

		if ($('body').hasClass('node-type-landing-page')
			|| $('body').hasClass('node-type-exhibit')) {
			_alterLandingAndExhibitsPage();
			_alterYoutubeEmbedLanding();
		}

		if ($('body').hasClass('node-type-es-landing-page')) {
			_alterESLandingPage();
		}

		if ($('body').hasClass('node-type-price-table')) {
			_alterPriceTable();
		}

		if ($('body').hasClass('node-type-landing-page-science-today')) {
			_alterScienceTodayLanding();
		}

		if ($('body').hasClass('node-type-entity-collections')) {
			_alterEntityCollections();
		}

		if ($('body').hasClass('page-lesson-plans-landing')) {
			_addLessonPlansSearch();
		}

		if ($('body').hasClass('node-type-event')) {
			_addEventDetailTimeslotFormat();
			_alterEventsArticleSectionSubtitle();
		}

		if ($('body').hasClass('page-story-landing')) {
			_alterPageStoryLanding();
		}

		if ($('body').hasClass('node-type-story')) {
			_alterPageStory();
		}

		_alterHighlights();
		_fixMultiTimeslots();
		_removeCruftyLinks();
	}

	this.initialize();
}
;
/**
 * jquery.sanitize.js
 *
 * @author Greg Rotter
 * @todo Add tests
 */
;(function($){
	/**
	 * Strip all tags except those specified in a whitelist
	 *
	 * @param {string} whitelist A jQuery selector of tags not to be stripped
	 */
	$.fn.stripTags = function (whitelist) {
	    $('*', this).not(whitelist).each(function () {
			var content = $(this).contents();
			$(this).replaceWith(content);
		});

	    return this;
	}

	/**
	 * Strip all attributes except those specified in a whitelist
	 *
	 * @param {array} whitelist An array of objects that define whitelisted
	 * attributes and what tag types they apply to
	 * @example
	 * // strip all attributes except for href, name and id on anchor tags.
	 * $('#container').stripAttributes([{tag: 'a', allowedAttributes: ['href', 'name', 'id']}]);
	 */
	$.fn.stripAttributes = function (whitelist) {
		$('*', this).each(function () {
			var inst = $(this);
			var tagName = $(this).prop('tagName').toLowerCase();

			var attributes = $.map(this.attributes, function (item) {
				return item.name;
			});

			// strip everything by default
			var _strip = function (i, item) {
				inst.removeAttr(item);
			}

			// we have a whitelist defined
			if (typeof(whitelist) != 'undefined') {
				$.each(whitelist, function (index, value) {
					if (value.tag == tagName) {
						// redefine strip routine to apply to selected tag
						_strip = function (i, item) {
							// if found attribute is NOT contained in whitelist, remove it
							if ($.inArray(item, value.allowedAttributes) == -1) {
								inst.removeAttr(item);
							}
						}

						return false;
					}
				});
			}

			$.each(attributes, _strip);
		});

	    return this;
	}
})(jQuery);
;
var iNatEmbed = function () {
	var $ = jQuery;

	var _apiBase = 'https://api.inaturalist.org/v1/';
	var _apiBaseLegacy = 'https://www.inaturalist.org/';

	var _getObservationHtml = function (obj) {
		// pic
		var url = obj.photos[0].url;
		url = url.replace('square', 'medium');

		// identification
		var obsId = !obj.species_guess ? 'Unknown' : obj.species_guess;
		var isScientific = false;

		if ($.isArray(obj.identifications)) {
			if (obj.identifications.length > 0) {
				obsId = obj.identifications[0].taxon.name;
				isScientific = true;
			}
		}

		var html = '<a class="observation-image" href="' + obj.uri + '">';
		html += '<div class="image-container" style="background-image: url(' + url + ');"><img src="' + calacademy.Constants.emptyGif + '" /></div>';
		
		if (isScientific) {
			html += '<div class="observation-id scientific">' + obsId + '</div>';
		} else {
			html += '<div class="observation-id">' + obsId + '</div>';	
		}
		
		html += '</a>';

		if (obj.description) {
			html += '<div class="observation-description">' + obj.description + '</div>';	
		}
		
		return html;	
	}

	var _getData = function (apiUrl, onSuccess, onError) {
		var foo = $.ajax({
			url: apiUrl,
			success: function (data) {
				if (typeof(onSuccess) == 'function') {
					onSuccess(data);
				}
			},
			error: function () {
				if (typeof(onError) == 'function') {
					onError();
				}
			}
		});
	}

	var _getStat = function () {
		var container = $(this);
		var id = container.closest('.inat-container').data('project-id');
		var endpoint = container.data('endpoint') + '?project_id=' + id + '&per_page=1';

		_getData(_apiBase + endpoint, function (data) {
			$('span', container).html(data.total_results);
		});
	}

	var _embed = function () {
		var container = $(this);
		var projectUrl = container.data('project-url');
		var slug = projectUrl.split('/').pop();
		
		// project info
		_getData(_apiBaseLegacy + 'projects/' + slug + '.json', function (data) {
			console.log(data);
			container.data('project-id', data.id);
			
			$('.title', container).html(data.title);
			$('.description', container).html(data.description);

			// sanitize description
			$('.description', container).stripAttributes([
				{
					tag: 'a',
					allowedAttributes: ['href']
				}
			]);

			// observations
			_getData(_apiBase + 'observations?project_id=' + data.id + '&order=desc&order_by=created_at&per_page=12&photos=true', function (obj) {
				$.each(obj.results, function (i, result) {
					var html = _getObservationHtml(result);
					$('.observations ul', container).append('<li>' + html + '</li>');	
				});

				if (calacademy.Utils) {
					calacademy.Utils.alterLinkTargets($('.inat-container'));	
				}
			});

			// stats
			$('.stats li', container).each(_getStat);

			// display
			container.addClass('data-fetched');
		});
	}

	this.initialize = function () {
		$('.inat-container').each(_embed);
	}

	this.initialize(); 
}
;
var mediaGallery = function () {
	var $ = jQuery;

	var _init = function () {

		var options = {
			type: 'image',
			image: {
				titleSrc: function(item) {
					return item.el.closest('.views-row').find('.media-gallery-item-text').html();
				}
			},
			iframe: {
				markup: '<div class="mfp-iframe-scaler">'+
				'<div class="mfp-close"></div>'+
				'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
				'<div class="mfp-bottom-bar"><div class="mfp-title"></div></div>'+
				'</div>',
				patterns: {
    			youtube: {
      			index: 'youtube.com/',
						id: function(url) {
							return url;
						},
						src: '%id%?autoplay=1&mute=1'
					}
				},
				srcAction: 'iframe_src',
			},
			gallery: {
				enabled: true,
				preload: [0,1],
				tCounter: ''
			},
			callbacks: {
				markupParse: function(template, values, item) {
			    template.closest('.mfp-iframe-scaler').find('.mfp-bottom-bar').css('margin-top', '0');
					template.closest('.mfp-iframe-scaler').find('.mfp-title').html(item.el.closest('.views-row').find('.media-gallery-item-text').html());
			  },
				change: function() {
					$(this.content).find('img[src*="1080x1440"]').closest('.mfp-content').addClass('portrait');
					$(this.content).find('img[src*="1080x1440"]').closest('.mfp-content').removeClass('landscape');
					$(this.content).find('img[src*="1920x1080"]').closest('.mfp-content').addClass('landscape');
					$(this.content).find('img[src*="1920x1080"]').closest('.mfp-content').removeClass('portrait');

					//$(this.content).find('img').css('max-height', '540px');
					//$(this.content).find('img[src*="1080x1440"]').closest('.mfp-figure').find('.mfp-close').css('margin-right', '-236px');
					//$(this.content).find('img[src*="1920x1080"]').closest('.mfp-figure').find('.mfp-close').css('margin-right', '0');
					//$(this.content).closest('.mfp-iframe-scaler').find('.mfp-close').css('margin-right', '0');
					//$(this.content).find('.mfp-iframe').closest('.mfp-iframe-scaler').closest('.mfp-content').css({'max-width':'818px', 'max-height':'460px'});
					//$(this.content).find('img[src*="1080x1440"]').closest('.mfp-figure').find('.mfp-bottom-bar').css({'margin-left':'-240px', 'width':'820px'});
					//$(this.content).find('img[src*="1920x1080"]').closest('.mfp-figure').find('.mfp-bottom-bar').css({'margin-left':'0', 'width':'auto'});
					//$(this.content).closest('.mfp-iframe-scaler').find('.mfp-bottom-bar').css({'margin-left':'0', 'margin-top':'3px', 'width':'auto'});
					//$(this.content).find('img').closest('.mfp-content').css({'max-width':'unset', 'max-height':'unset'});
				},
				resize: function() {
					$(this.content).find('img[src*="1080x1440"]').closest('.mfp-content').addClass('portrait');
					$(this.content).find('img[src*="1920x1080"]').closest('.mfp-content').addClass('landscape');
					//$(this.container[0]).find('img').css('max-height', '540px');
					//$(this.container[0]).find('img[src*="1080x1440"]').closest('.mfp-figure').find('.mfp-close').css('margin-right', '-236px');
					//$(this.container[0]).find('img[src*="1920x1080"]').closest('.mfp-figure').find('.mfp-close').css('margin-right', '0');
					//$(this.container[0]).closest('.mfp-iframe-scaler').find('.mfp-close').css('margin-right', '0');
					//$(this.container[0]).find('.mfp-iframe').closest('.mfp-iframe-holder').find('.mfp-content').css({'max-width':'818px', 'max-height':'460px'});
					//$(this.container[0]).find('img[src*="1080x1440"]').closest('.mfp-figure').find('.mfp-bottom-bar').css({'margin-left':'-240px', 'width':'820px'});
					//$(this.container[0]).find('img[src*="1920x1080"]').closest('.mfp-figure').find('.mfp-bottom-bar').css({'margin-left':'0', 'width':'auto'});
					//$(this.container[0]).closest('.mfp-iframe-scaler').find('.mfp-bottom-bar').css({'margin-left':'0', 'margin-top':'3px', 'width':'auto'});
					//$(this.container[0]).find('img').closest('.mfp-content').css({'max-width':'unset', 'max-height':'unset'});
				},
				open: function() {
					// override magnific-popup overflowy scroll hide + html margin-right
					$('html').css('margin-right', '0');
					$(this.container[0]).find('img[src*="1080x1440"]').closest('.mfp-content').addClass('portrait');
					$(this.container[0]).find('img[src*="1920x1080"]').closest('.mfp-content').addClass('landscape');

					//$(this.container[0]).find('img').css('max-height', '540px');
					//$(this.container[0]).find('img[src*="1080x1440"]').closest('.mfp-figure').find('.mfp-close').css('margin-right', '-236px');
					//$(this.container[0]).find('img[src*="1920x1080"]').closest('.mfp-figure').find('.mfp-close').css('margin-right', '0');
					//$(this.container[0]).closest('.mfp-iframe-scaler').find('.mfp-close').css('margin-right', '0');
					//$(this.container[0]).find('.mfp-iframe').closest('.mfp-iframe-holder').find('.mfp-content').css({'max-width':'818px', 'max-height':'460px'});
					//$(this.container[0]).find('img[src*="1080x1440"]').closest('.mfp-figure').find('.mfp-bottom-bar').css({'margin-left':'-240px', 'width':'820px'});
					//$(this.container[0]).find('img[src*="1920x1080"]').closest('.mfp-figure').find('.mfp-bottom-bar').css({'margin-left':'0', 'width':'auto'});
					//$(this.container[0]).closest('.mfp-iframe-scaler').find('.mfp-bottom-bar').css({'margin-left':'0', 'margin-top':'3px', 'width':'auto'});
				}
			}
		};

		$(this).find('.modal-trigger').magnificPopup(options);
	}

	this.initialize = function () {
		// media gallery dependent upon magnific popup
		if (typeof($.fn.magnificPopup) != 'function') return;
		$('.view-media-gallery').each(_init);
	}

	this.initialize();
}
;
var Popup = function () {
	var $ = jQuery;
	var _originalPlaceholder;
	var _autocloseTimeout;
	var _container;

	var _initPopup = function(popup) {
		if (typeof(popup) != 'string') return;

		var popupName = popup.replace("popup-", "");

		// if this is email acquisition popup, check for user cookie for list id
		var emailListId = '';
		if ($('#' + popup + ' input.list_id').length) {
		  emailListId = $('#' + popup + ' input.list_id').val();
		}

		// if existing cookie for this popup, remove popup before display
		if ($.cookie('suppress-popup-' + popupName, Number) ||
		$.cookie('suppress-popups', Number) ||
		$.cookie('suppress-popup-email-list-id-' + emailListId, Number) ||
		$.getQueryString('suppress-popups') == '1') {
		  $('.popup').remove();
		  return;
		}

		// set session cookie for any and all popups
		$.cookie('suppress-popups', '1', {path: '/'});

		// set N day popup-specific cookie
		var intCookieDays = $('#' + popup).attr('data-cookie-days');
		intCookieDays = parseInt(intCookieDays);
		if (intCookieDays > 0) {
			$.cookie('suppress-popup-' + popupName, 1, {expires: intCookieDays, path: '/'});
		}

		setTimeout(function () {
			_showPopup(popupName, emailListId);
		}, 2000);

	}

	var _showPopup = function (name, emailListId) {

		_container = $('#popup-' + name);

		if (_container.length != 1) return;

		if (_container.length == 1) {
			_container.show();
			// a11y: popup dialog must trap keyboard; focus to 1st actionable element
			var popupInputEmail = _container.find('input[name="email"]').first();
			var popupCTA = _container.find('a.cta-link').first();
			if (popupInputEmail.length > 0) {
				popupInputEmail.focus();
			} else if (popupCTA.length > 0) {
				popupCTA.focus();
			}
		}
		calacademy.Utils.log('Showing popup: ' + _container.attr('id'));

		$('button', _container).on('click', function () {
			_container.addClass('close');
			$(this).blur();
			$(document.body).focus();
		});

		_initSignupForm(name, function () {
			// email acquisition success for this popup
			// set 100-year cookie to block popups for this email acquisition list id
			if (emailListId) {
				$.cookie('suppress-popup-email-list-id-' + emailListId, 1, {expires: 100*365, path: '/'});
			} else {
				calacademy.Utils.log('email acquisition popup list id not found');
			}
		});

	}

	var _initSignupForm = function (name, onSuccess, onError) {

		_container.removeClass('submit-success');
		_container.removeClass('submit-error');

		_originalPlaceholder = $('.email', _container).attr('placeholder');

		$('form', _container).on('submit', function () {

			var host = location.host;
			var baseurl = location.protocol + '//' + host;

			if ($(this).hasClass('submitting')) {
				return false;
			}

			$(this).addClass('submitting');

			var field = $('.email', this);
			var email = $.trim(field.val()).toLowerCase();

			if (!calacademy.Utils.isEmail(email)) {
				$(this).removeClass('submitting');
				field.val('');
				field.attr('placeholder', 'Please enter a valid email address');
				return false;
			}

			field.val('');
			field.blur();
			field.attr('disabled', 'true');
			field.attr('placeholder', 'Submitting...');

			var data = {
				email: email,
				list_ids: parseInt($('.list_id', _container).val()),
				collection_point: $('.collection_point', _container).val(),
				template_transaction_id: parseInt($('.template_transaction_id', _container).val()),
			};

			if ($('.template_transaction_vars', this).length > 0) {
				var jsonObj = {};
				$('.template_transaction_vars', this).each(function () {
					jsonObj[$(this).attr('name')] = $(this).val();
				});
				data.template_transaction_vars = JSON.stringify(jsonObj);
			}

			calacademy.Utils.log(data);

			window.dataLayer = window.dataLayer || [];

			$.ajax({
				dataType: 'jsonp',
				url: baseurl + '/mailjet-client-proxy',
				data: data,
				success: function (data, textStatus, XMLHttpRequest) {
					field.val('');
					field.blur();

					_container.addClass('submit-success');

					$('h2', _container).html($('.copy .success .header', _container).html());
					$('p', _container).html($('.copy .success .subheader', _container).html());

					field.removeAttr('disabled');
					field.attr('placeholder', _originalPlaceholder);
					$('form', _container).removeClass('submitting');
					$('form', _container).addClass('success');

					// auto-close
					_autocloseTimeout = setTimeout(function () {
						_container.addClass('close');
						$(document.body).focus();
					}, 5000);

					window.dataLayer.push({
						'event': 'pop_up_email',
						'pop_up_name': _container.attr('id'),
						'userId': btoa(encodeURIComponent(email))
					});

					// callback
					if (typeof(onSuccess) == 'function') {
						onSuccess();
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					field.val('');

					_container.addClass('submit-error');

					$('h2', _container).html($('.copy .error .header', _container).html());
					$('p', _container).html($('.copy .error .subheader', _container).html());

					field.removeAttr('disabled');
					field.attr('placeholder', _originalPlaceholder);
					$('form', _container).removeClass('submitting');

					// callback
					if (typeof(onError) == 'function') {
						onError();
					}
				}
			});

			return false;
		});
	}

	var _schedulePrune = function () {
		// chimera dependency
		if (typeof(chimera) != 'object') return;

		$('.popup').each(function () {
			// if no scheduling data present, assume active
			if ($.isArray($(this).data('schedule'))) {
				var isExpired = true;

				// if any conditions met, do not remove
				$.each($(this).data('schedule'), function (i, obj) {
					if (chimera.utils.isActive(obj)) {
						isExpired = false;
						return false;
					}
				});

				if (isExpired) {
					calacademy.Utils.log($(this).data('schedule'));
					calacademy.Utils.log($(this).attr('id') + ' not yet active or expired. Removing from DOM.');
					$(this).remove();
				}
			}
		});
	}

	this.initialize = function () {
		// popups instantiated in Drupal blocks - class .popup w/ Pages config
		_schedulePrune();
		
		// no popups, quit
		if ($('.popup').length == 0) return;

		var i = 0;

		if ($('.popup').length > 1) {
			// multiple popups present, randomize
			i = Math.floor(Math.random() * $('.popup').length); 
		}

		_initPopup($('.popup').eq(i).attr('id'));
	};

	this.initialize();
}
;
var EducatorSearch = function () {
	var $ = jQuery;
	var _gcseInitInterval;
	var _firstRun = true;

	var _vocab = {
		field_educators_content_type: [],
		field_educators_search_filters: []
	};

	function _getSanitizedString (str) {
		var container = document.createElement('div');
		var text = document.createTextNode(str);
		container.appendChild(text);

		return container.innerHTML;
	}

	var _getHashValue = function (key) {
		var hash = window.location.hash.substring(1);
		if (hash == '') return false;

		var arr = hash.split('&');
		var value = false;
		
		$.each(arr, function (i, val) {
			var pair = val.split('=');
			
			if (pair[0] == key) {
				value = pair[1];
				return false;
			}
 		});

		if (value === false) return false;
 		value = $.trim(decodeURIComponent(value));

 		return _getSanitizedString(value);
	}

	var _getHash = function () {
		var keyVals = [];

		// text
		if ($.trim($('.educator-search #t').val()) != '') {
			keyVals.push('t=' + encodeURIComponent($.trim($('.educator-search #t').val())));	
		}
		
		// tids
		var arr = [];

		$('#search-filters-container input:checked').each(function () {
			arr.push($(this).val());
		});

		if (arr.length > 0) {
			keyVals.push('tids=' + arr.join(','));
		}
		
		return keyVals.join('&');
	}

	var _truncate = function (el) {
		el.dotdotdot({
			height: 30,
			watch: true
		});
	}

	var _getTidsForList = function (ul) {
		var arr = [];

		$('input:checked', ul).each(function () {
			arr.push($(this).val());
		});

		if (arr.length == 0) {
			return false;
		} else {
			return arr.join(',');	
		}
	}

	var _getQuery = function (freeText) {
		var filters = [];
		
		// checkboxes
		$('#search-filters-container ul').each(function () {
			var tids = _getTidsForList($(this));
			
			if (tids) {
				filters.push('more:pagemap:document-' + $(this).data('field') + ':' + tids);
			}	
		});

  		if (filters.length == 0) {
  			// no filters, limit to educators
  			return $.trim(freeText + ' site:calacademy.org/educators');
  		} else {
  			return $.trim(freeText + ' ' + filters.join(' '));
  		}
	}

	var _track = function (freeText) {
		if (typeof(ga) != 'function') return;

		// @see
		// https://stackoverflow.com/questions/15744042/events-not-being-tracked-in-new-google-analytics-analytics-js-setup
		var tracker = ga.getAll()[0];
		if (typeof(tracker.send) != 'function') return;

		var filters = [];

		$('#search-filters-container input:checked').each(function () {
			var label = $.trim($(this).siblings('label').text());
			filters.push(label);
		});

		if (freeText != '') {
			freeText += ' | ';
		}

		var searchTerm;

  		if (filters.length == 0) {
  			searchTerm = $.trim(freeText + 'site:calacademy.org/educators');
  		} else {
  			searchTerm = $.trim(freeText + filters.join(', '));
  		}

  		var url = '/educators/search?t=' + encodeURIComponent(searchTerm);

  		calacademy.Utils.log('track pageview: ' + url);
  		tracker.send('pageview', url);		
	}

	var _updateSelectedFiltersUI = function (freeText) {
		$('.selected-filters').empty();
		
		// free text
		if (freeText != '') {
			var button = $('<a href="#">&ldquo;' + freeText + '&rdquo;</a>');
			button.addClass('button-free-text');

			// clear free text when clicked
			button.on('click', function () {
				$('#t').val('');
				_onSubmit();

				return false;
			});

			// insert into DOM
			$('.selected-filters').append(button);
		}

		// iterate each checked filter
		$('#search-filters-container input:checked').each(function () {
			var label = $(this).siblings('label').html();

			var button = $('<a href="#">' + label + '</a>');
			button.data('term-id', $(this).attr('id'));
			button.addClass('button-' + $(this).attr('id'));
			
			// clear the corresponding filter when clicked
			button.on('click', function () {
				var correspondingInput = $('#' + $(this).data('term-id'));
				correspondingInput.prop('checked', false);

				// resubmit query
				_onSubmit();

				return false;
			});

			// insert into DOM
			$('.selected-filters').append(button);
		});

		// update indicators 
		$('.smartphone-filter-toggle span').remove();
		$('#search-filters-container h3 span').remove();
		$('#search-filters-container h4').remove();
		
		$('#search-filters-container ul').each(function () {
			var checked = $(this).find('input:checked');

			if (checked.length > 0) {
				$(this).prev('h3').append('<span> (' + checked.length + ')</span>');
				$(this).prev('h3').addClass('has-selected-filters');

				var h4 = $('<h4 />');
				h4.addClass($(this).data('tid'));

				var labels = [];

				checked.each(function () {
					var label = $(this).siblings('label');
					labels.push(label.html());
				});

				h4.html(labels.join(', '));
				h4.insertAfter($(this).prev('h3'));

				if ($(this).hasClass('collapsed')) {
					h4.addClass('collapsed');
					_truncate(h4);
				}
			} else {
				$(this).prev('h3').removeClass('has-selected-filters');
			}
		});

		// smartphone toggle
		var totalChecked = $('#search-filters-container input:checked').length;
		
		if (totalChecked > 0) {
			$('.smartphone-filter-toggle').append('<span> (' + totalChecked + ')</span>');
		}
	}

	var _onSubmit = function () {
		if ($('#search-results-container').length != 1) {
			// jump to results page
			var url = '/educators/search/';
			var hash = _getHash();
			
			if (hash != '') {
				url += '#' + hash;
			}

			window.location.href = url;
			return false;
		}

		var freeText = $.trim($('#t').val());
		_updateSelectedFiltersUI(freeText);

  		// scroll
  		/*
  		if (typeof($.fn.scrollTo) == 'function') {
  			$(window).scrollTo(0, 500);
  		} else {
  			window.scrollTo(0, 0);
  		}
  		*/

  		if (_firstRun) {
  			_firstRun = false;
  			_onNav();
  		} else {
  			// update hash
  			window.location.hash = _getHash();
  		}

		return false;
	}

	var _appendFilterSection = function (title, tidClass, field) {
		var container = $('#search-filters-container .container');

		var h3 = $('<h3>' + title + '</h3>');
		h3.data('tid', tidClass);
		
		container.append(h3);
				
		var ul = $('<ul />');
		ul.addClass(tidClass);
		ul.data('tid', tidClass);
		ul.data('field', field);

		container.append(ul);	
	}

	var _initFilters = function () {
		// create checkboxes
		var container = $('<div id="search-filters-container"><div class="container"></div></div>');
		$('.search-term').after(container);
		
		$('<div class="selected-filters" />').insertAfter($('.search-term'));

		// create list for content types
		_appendFilterSection('Resource Type', 'parent-tid-content_type', 'field_educators_content_type');		

		// create lists for filters
		$.each(_vocab.field_educators_search_filters, function (key, obj) {
			if (!obj.parent_tid) {
				var tidClass = 'parent-tid-' + obj.tid;
				_appendFilterSection(obj.name, tidClass, 'field_educators_search_filters');
			}
		});

		_createFilterUI(_vocab.field_educators_content_type);
		_createFilterUI(_vocab.field_educators_search_filters);

		// insert the smartphone filter toggle button
		var btn = $('<a href="#">Filters</a>');
		btn.addClass('smartphone-filter-toggle');
		
		btn.on('click', function () {
			$('html').toggleClass('show-filters');
			return false;
		});

		$('#search-filters-container').prepend(btn);

		// interaction
		$('#search-filters-container h3').on('click', _onFilterTitleClick);
		$('#search-filters-container input').on('change', _onSubmit);
	}

	var _onFilterTitleClick = function () {
		$(this).toggleClass('collapsed');
		$('.' + $(this).data('tid')).toggleClass('collapsed');

		var h4 = $('h4.' + $(this).data('tid'));

		if (h4.hasClass('collapsed')) {
			_truncate(h4);
		}
	}

	var _createFilterUI = function (terms) {
		var tids = false;

		if ($.getQueryString('tids')) {
			var clean = _getSanitizedString($.getQueryString('tids'));
			tids = $.trim(clean).split(',');

			window.location.hash += '&tids=' + tids.join(',');
		}

		var hashTids = _getHashValue('tids');
		
		if (hashTids) {
			tids = hashTids.split(',');
		}

		$.each(terms, function (key, obj) {
			if (!obj.parent_tid) return;

			var checkbox = $('<input type="checkbox" id="' + obj.tid + '" value="' + obj.tid + '" />');
			
			var li = $('<li />');
			li.append(checkbox);
			li.append('<label for="' + obj.tid + '">' + obj.name + '</label>');
			li.data('term-data', obj);

			$('#search-filters-container .parent-tid-' + obj.parent_tid).append(li);

			// preselect per query string
			if (tids) {
				if ($.inArray(obj.tid, tids) !== -1) {
					checkbox.prop('checked', true);	
				}
			}
		});
	}

	var _getContentTypeData = function () {
		$.ajax({
			dataType: 'jsonp',
			url: '/rest/educators-content-types/',
			cache: false,
			success: function (data, textStatus, XMLHttpRequest) {
				_vocab.field_educators_content_type = data;

				// create a phony parent tid for "Resource Type" terms
				$.each(_vocab.field_educators_content_type, function (key, obj) {
					obj.parent_tid = 'content_type';
				});

				_initFilters();
				_onSubmit();
			}
		});
	}

	var _getFilterData = function () {
		$.ajax({
			dataType: 'jsonp',
			url: '/rest/educators-taxonomy/',
			cache: false,
			success: function (data, textStatus, XMLHttpRequest) {
				_vocab.field_educators_search_filters = data;
				_getContentTypeData();
			}
		});
	}

	var _initForm = function () {
		// check query
		var queryT = $.getQueryString('t');

		if (queryT) {
			queryT = _getSanitizedString($.trim(queryT));
			$('.educator-search #t').val(queryT);

			window.location.hash += 't=' + encodeURIComponent(queryT);
		}

		// check hash
		var hashT = _getHashValue('t');

		if (hashT !== false) {
			$('.educator-search #t').val(hashT);
		}

		$('.educator-search form').on('submit', _onSubmit);	
	}

	var _onLoadCheck = function () {
		if (!$('html').hasClass('gcse-init')) return;
		clearInterval(_gcseInitInterval);
		_getFilterData();
	}

	var _onNav = function (e) {
		// update UI
		var t = _getHashValue('t');

		if (t !== false) {
			$('#t').val(t);
		} else {
			$('#t').val('');
		}

		var tids = _getHashValue('tids');
		
		if (tids === false) {
			tids = '';
		}

		tids = tids.split(',');

		$('#search-filters-container input').each(function () {
			var tid = $(this).attr('id');
			var checked = ($.inArray(tid, tids) > -1);
			
			$(this).prop('checked', checked);
		});

		_updateSelectedFiltersUI($('#t').val());

		// execute query
  		var freeText = $.trim($('#t').val());
  		var query = _getQuery(freeText);

  		calacademy.Utils.log(query, 'background: #eaff00;');
		
  		try {
			var element = google.search.cse.element.getElement('educator-results');
  			element.execute(query);
  		} catch (e) {
  			calacademy.Utils.log(e);
  		}
		
  		_track(freeText);
	}

	this.initialize = function () {
		if ($('.educator-search').length == 0) return;
		if ($('#header, .pane-node-title h1').length == 0) return;

		// move form to proper location in dom
		if ($('body').hasClass('page-search-results')) {
			$('#header').append($('.educator-search'));
		} else {
			var prependTo = $('.page-header');

			if ($('#header').length == 1) {
				prependTo = $('#header');
			}

			prependTo.prepend($('.educator-search'));
		}

		_initForm();

		if ($('#search-results-container').length == 1) {
			window.onhashchange = _onNav;		
			_gcseInitInterval = setInterval(_onLoadCheck, 100);	
		}
	}

	this.initialize();
}
;
/************************************************************************************************
 * jquery.mlens.js
 * http://mlens.musings.it
 * magnifying lens jQuery plugin for images
 * originally developed for the project "RubiniFirma" and released as a freebie
 * based on jquery.imageLens.js by http://www.dailycoding.com
 *
 * mlens supports multiple instances, these are the configurable parameters
 * lensShape: shape of the lens (square or circle)
 * lensSize: lens dimension (in px)
 * borderSize: lens border size (in px)
 * borderColor: lens border color (hex value)
 * borderRadius: lens border radius (if you like rounded corners when the shape is "square")
 * imgSrc: address of the hi-res image
 * lensCss: lens class if you like to style it your own way
 * imgOverlay: address of the overlay image for the lens (optional)
 * overlayAdapt: boolean that indicates if the overlay image has to adapt to the lens size (dafault: true)
 * imgSrc2x: address of the double pixel density image (for retina displays)
 * zoomLevel: number for moltiplicating the zoom (zoomed image can pixellate!)
 *
 * @author Federica Sibella
 * Copyright (c) 2012-14 Federica Sibella - musings(at)musings(dot)it | http://www.musings.it
 * Double licensed MIT or GPLv3.
 * Date: 2014/05/22
 * @version 1.4
 *
 * changelog:
 * 2015/05/22 rewritten destroy method, added zoomLevel, some parts of the code optimized v.1.4
 * 2013/12/16 added retina support v.1.3
 * 2013/09/25 added overlay image control v. 1.2
 * 2013/08/26 added touch support for v. 1.1
 ************************************************************************************************/

;(function($){
	// global variables
	var mlens = [], // mlens array
		instance = 0, // instance of mlens
		methods = { // methods for mlens plugin
		// function for initializing the lens instance
		init: function(options) {
			// Defaults for lens options
			var defaults = {
				lensShape: "square",
				lensSize: 100,
   				borderSize: 4,
    			borderColor: "#888",
				borderRadius: 0,
				imgSrc: "",
				imgSrc2x: "",
				lensCss: "",
				lensShowClass: "",
				lensHideClass: "",
				wrapperClass: "",
				imgOverlay: "",
				overlayAdapt: true,
				zoomLevel: 1
			},
			settings = $.extend({}, defaults, options);

			// for each instance of mlens
			this.each(function () {
				// internal variables
				var $image = $(this), 				// the image on which mlens is called
					data = $image.data("mlens"), 	// data array for mlens
					$target = $(), 					// the target lens
					$overlay = $(), 				// lens overlay
					$imageWrapper = $(), 			// image wrapper for attaching lens and hi-res image correctly
					$imageTag = $(), 				// hi-res hidden image
					imgSrc = $image.attr("src"), 	// initial value of the hi-res image src
					imgWidth = "auto"; 				// initial width of the underlying hi-res image

				// control on the zoomLevel parameter: must be a number, must be > 0
				if(typeof(settings.zoomLevel) !== "number" || settings.zoomLevel <= 0) {
					settings.zoomLevel = defaults.zoomLevel;
				}

				// have we got retina image and the device has retina support?
				if(settings.imgSrc2x != "" && window.devicePixelRatio > 1) {
					imgSrc = settings.imgSrc2x;
					// create a new image out of the DOM for precise measurements
					var bigimg = new Image();
					// after the big image has been fully loaded
					bigimg.onload = function() {
						// take its width and divide by 2
						imgWidth = String(parseInt(this.width/2) * settings.zoomLevel) + "px";
						// use it as the background size for the lens
						$target.css({"backgroundSize": imgWidth + " auto"});
						// use it as the width for the hi-res image itself
						$imageTag.css({"width": imgWidth});
					}
					bigimg.src = imgSrc;
				}
				else {
					// if there's imgSrc in the settings use it
					if(settings.imgSrc != "") {
						imgSrc = settings.imgSrc;
					}
					// create a new image out of the DOM for precise measurements
					var bigimg = new Image();
					// after the big image has been fully loaded
					bigimg.onload = function() {
						// take its width and divide by 2
						imgWidth = String(parseInt(this.width) * settings.zoomLevel) + "px";
						// use it as the background size for the lens
						$target.css({"backgroundSize": imgWidth + " auto"});
						// use it as the width for the hi-res image itself
						$imageTag.css({"width": imgWidth});
					}
					bigimg.src = imgSrc;
				}

				// build lens style using user's settings
				var lensStyle = "background-position: 0px 0px;width: " + String(settings.lensSize) + "px;height: " + String(settings.lensSize) + "px;"
	            				+ "float: left; border: " + String(settings.borderSize) + "px solid " + settings.borderColor + ";"
	            				+ "background-repeat: no-repeat;position: absolute;";

				// build image overlay style (just in case it has to be used)
				var overlayStyle= "position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-position: center center; background-repeat: no-repeat; z-index: 1;"

				// if overlay image has to adapt to lens size
				if(settings.overlayAdapt === true) {
					overlayStyle = overlayStyle + "background-position: center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
				}

				// choosing lens shape and overlay style on the basis of user's settings
				switch(settings.lensShape) {
					case "square":
					case "":
					default:
						lensStyle = lensStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
						overlayStyle = overlayStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
					break;
					case "circle":
						lensStyle = lensStyle + "border-radius: " + String(settings.lensSize / 2 + settings.borderSize) + "px;";
						overlayStyle = overlayStyle + "border-radius: " + String(settings.lensSize / 2 + settings.borderSize) + "px;";
					break;
				}

				// lens wrapping div to attach target lens and hi-res image correctly
				$image.wrap("<div id='mlens_wrapper_" + instance + "' />");
				$imageWrapper = $image.parent();
				$imageWrapper.addClass(settings.wrapperClass);

				// grotter
				// $imageWrapper.css({"width": $image.width()});

				// create the target lens

				// grotter
				// $target = $("<div id='mlens_target_" + instance + "' style='" + lensStyle + "' class='" + settings.lensCss + "'>&nbsp;</div>").appendTo($imageWrapper);
				$target = $("<div id='mlens_target_" + instance + "' style='" + lensStyle + "' class='" + settings.lensCss + " " + settings.lensHideClass + "'>&nbsp;</div>");

				// grotter
				// $target.appendTo('body');
				$target.prependTo('body');

				// lens style on the basis of the previous infos
	            $target.css({
					"backgroundImage": "url('" + imgSrc + "')",
					"backgroundSize": imgWidth + " auto",
					"cursor": "none"
				});

				// create hi-res image tag
				$imageTag = $("<img style='display:none;width:" + imgWidth + ";height:auto;max-width:none;max-height;none;' src='" + imgSrc + "' />").appendTo($imageWrapper);

				// if there's an overlay append it to the $target lens
				if(settings.imgOverlay != "") {
					// create the overlay
					$overlay = $("<div id='mlens_overlay_" + instance + "' style='" + overlayStyle + "'>&nbsp;</div>");

					// style the overlay
					$overlay.css({
						"backgroundImage": "url('" + settings.imgOverlay + "')",
						"cursor": "none"
					});

					// append it to the $target lens
					$overlay.appendTo($target);
				}

				// give the image a data-id attribute containing the instance for future use
	            $image.attr("data-id","mlens_" + instance);

				//attaching mousemove event both to the target and to the image
				$target.mousemove(function(e) {
					$.fn.mlens("move",$image.attr("data-id"),e);
				});

	            $image.mousemove(function(e) {
					$.fn.mlens("move",$image.attr("data-id"),e);
				});

				//touch events imitating mousemove both for the target and for the image
				$target.on("touchmove", function(e) {
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					$.fn.mlens("move",$image.attr("data-id"),touch);
				});

	            $image.on("touchmove",function(e) {
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					$.fn.mlens("move",$image.attr("data-id"),touch);
				});

	            var _glassToggle = function (boo, e) {
	            	if (Modernizr.touch) {
	            		e = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
	            	}

					$.fn.mlens("move",$image.attr("data-id"),e);

	            	if (boo) {
	            		$target.removeClass(settings.lensHideClass);
	            		$target.addClass(settings.lensShowClass);
	            		// $target.show();
	            	} else {
	            		$target.removeClass(settings.lensShowClass);
	            		$target.addClass(settings.lensHideClass);
	            		// $target.hide();
	            	}
	            }

				//target visibility relies both on its own visibility and that of the original image
				$target.hover(function(e) {
					_glassToggle(true, e);
				}, function(e) {
					_glassToggle(false, e);
				});

				$image.hover(function(e) {
					_glassToggle(true, e);
				}, function(e) {
					_glassToggle(false, e);
				});

				//touch events for the target (target visibility)
				$target.on("touchstart", function(e) {
					e.preventDefault();
					_glassToggle(true, e);
				});

				$target.on("touchend", function(e) {
					e.preventDefault();
					_glassToggle(false, e);
				});

				//touch events for the image (target visibility)
				$image.on("touchstart", function(e) {
					e.preventDefault();
					_glassToggle(true, e);
				});

				$image.on("touchend", function(e) {
					e.preventDefault();
					_glassToggle(false, e);
				});

				//saving data in mlens instance
				$image.data("mlens", {
					image: $image,
					settings: settings,
					target: $target,
					imageTag: $imageTag,
					imgSrc: imgSrc,
					imgWidth: imgWidth,
					imageWrapper: $imageWrapper,
					overlay: $overlay,
					instance: instance
				});

				// saving data in the data array and in mlens instance array
				data = $image.data("mlens");
				mlens[instance] = data;

				//instance increment
				instance++;
				return mlens;
			});
		},
		// function that defines "move" command
		move: function(id,e) {
			id = find_instance(id);
			// taking parameters values based on the instance
			var data = mlens[id],
				$image = data.image,
				$target = data.target,
				$imageTag = data.imageTag,
				offset = $image.offset(),
        		leftPos = parseInt(e.pageX - offset.left),
        		topPos = parseInt(e.pageY - offset.top),
				widthRatio = $imageTag.width() / $image.width(),
				heightRatio = $imageTag.height() / $image.height();

			// if mouse position is inside our image
	        if(leftPos > 0 && topPos > 0 && leftPos < $image.width() && topPos < $image.height()) {
				// calculating hi-res image position as target lens background
	            leftPos = String(-((e.pageX - offset.left) * widthRatio  - $target.width() / 2));
	            topPos = String(-((e.pageY - offset.top) * heightRatio - $target.height() / 2));
	            $target.css({"backgroundPosition": leftPos + "px " + topPos + "px"});

				// calculating target lens position inside the image

	            // grotter
	            // leftPos = String(e.pageX - offset.left - $target.width() / 2);
	            // topPos = String(e.pageY - offset.top - $target.height() / 2);

	            leftPos = String(e.pageX - ($target.width() / 2));
	            topPos = String(e.pageY - ($target.height() / 2));

	            $target.css({"left": leftPos + "px", "top": topPos + "px"});
	        }

			// saving new data in the mlens instance
			data.target = $target;

			mlens[id] = data;
			return mlens;
		},
		// function that defines "update" command (to modify mlens options on-the-fly)
		// same functioning as init
		update: function(options) {
			var id = find_instance($(this).attr("data-id")),
				data = mlens[id],
				$image = data.image,
				$target = data.target,
				$overlay = data.overlay,
				$imageTag = data.imageTag,
				imgSrc = data.imgSrc,
				defaults = data.settings,
				settings = $.extend({}, defaults, options),
				imgWidth = "auto";

			if(settings.imgSrc2x != "" && window.devicePixelRatio > 1) {
				imgSrc = settings.imgSrc2x;
				var bigimg = new Image();
				bigimg.onload = function() {
					imgWidth = String(parseInt(this.width/2)) + "px";
					$target.css({"backgroundSize": imgWidth + " auto"});
					$imageTag.css({"width": imgWidth});
				}
				bigimg.src = imgSrc;
			}
			else {
				// if there's imgSrc in the settings use it
				if(settings.imgSrc != "") {
					imgSrc = settings.imgSrc;
				}
				// create a new image out of the DOM for precise measurements
				var bigimg = new Image();
				// after the big image has been fully loaded
				bigimg.onload = function() {
					// take its width and divide by 2
					imgWidth = String(parseInt(this.width) * settings.zoomLevel) + "px";
					// use it as the background size for the lens
					$target.css({"backgroundSize": imgWidth + " auto"});
					// use it as the width for the hi-res image itself
					$imageTag.css({"width": imgWidth});
				}
				bigimg.src = imgSrc;
			}

			var lensStyle = "background-position: 0px 0px;width: " + String(settings.lensSize) + "px;height: " + String(settings.lensSize) + "px;"
            				+ "float: left;display: none;border: " + String(settings.borderSize) + "px solid " + settings.borderColor + ";"
            				+ "background-repeat: no-repeat;position: absolute;";

			var overlayStyle= "position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-position: center center; background-repeat: no-repeat; z-index: 1;"

			if(settings.overlayAdapt === true) {
				overlayStyle = overlayStyle + "background-position: center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
			}

			switch(settings.lensShape) {
				case "square":
				case "":
				default:
					lensStyle = lensStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
					overlayStyle = overlayStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
				break;
				case "circle":
					lensStyle = lensStyle + "border-radius: " + String(settings.lensSize / 2 + settings.borderSize) + "px;";
					overlayStyle = overlayStyle + "border-radius: " + String(settings.lensSize / 2 + settings.borderSize) + "px;";
				break;
			}

			$target.attr("style", lensStyle);
			$imageTag.attr("src", imgSrc);
			$imageTag.css({"width": imgWidth});
            $target.css({
				"backgroundImage": "url('" + imgSrc + "')",
				"backgroundSize": imgWidth + " auto",
				"cursor": "none"
			});

			$overlay.attr("style", overlayStyle);
			$overlay.css({
				"backgroundImage": "url('" + settings.imgOverlay + "')",
				"cursor": "none"
			});

			data.image = $image;
			data.target = $target;
			data.overlay = $overlay;
			data.settings = settings;
			data.imgSrc = imgSrc;
			data.imageTag = $imageTag;

			mlens[id] = data;
			return mlens;
		},
		//function that destroys mlens instance
		destroy: function() {
			var id = find_instance($(this).attr("data-id"));

			data = mlens[id];
			data.target.remove();
			data.imageTag.remove();
			data.imageWrapper.remove();
			data.overlay.remove();
            $.removeData(data, "mlens");
		    this.unbind();
		    this.element = null;
        }
	};

	/**
	 * service functions
	 */

	/**
	 * function to find mlens actual instance
	 * @param {Object} id
	 */
	function find_instance(id) {
		if(typeof(id) === "string")
		{
			var position = id.indexOf("_");
			if(position != -1)
			{
				id = id.substr(position+1);
			}
		}
		return id;
	}

	/**
	 * function that generates mlens plugin
	 * @param {Object} method
	 */
	$.fn.mlens = function(method) {
	    //method calling logic
	    if(methods[method]) {
	      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	    }
		else if( typeof method === 'object' || !method) {
	      return methods.init.apply(this, arguments);
	    }
		else {
	      $.error('Method ' +  method + ' does not exist on jQuery.mlens');
	    }
  	};
})(jQuery);;
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.moment=t()}(this,function(){"use strict";var e,i;function f(){return e.apply(null,arguments)}function o(e){return e instanceof Array||"[object Array]"===Object.prototype.toString.call(e)}function u(e){return null!=e&&"[object Object]"===Object.prototype.toString.call(e)}function m(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function l(e){if(Object.getOwnPropertyNames)return 0===Object.getOwnPropertyNames(e).length;for(var t in e)if(m(e,t))return;return 1}function r(e){return void 0===e}function h(e){return"number"==typeof e||"[object Number]"===Object.prototype.toString.call(e)}function a(e){return e instanceof Date||"[object Date]"===Object.prototype.toString.call(e)}function d(e,t){for(var n=[],s=0;s<e.length;++s)n.push(t(e[s],s));return n}function c(e,t){for(var n in t)m(t,n)&&(e[n]=t[n]);return m(t,"toString")&&(e.toString=t.toString),m(t,"valueOf")&&(e.valueOf=t.valueOf),e}function _(e,t,n,s){return xt(e,t,n,s,!0).utc()}function y(e){return null==e._pf&&(e._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidEra:null,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],era:null,meridiem:null,rfc2822:!1,weekdayMismatch:!1}),e._pf}function g(e){if(null==e._isValid){var t=y(e),n=i.call(t.parsedDateParts,function(e){return null!=e}),s=!isNaN(e._d.getTime())&&t.overflow<0&&!t.empty&&!t.invalidEra&&!t.invalidMonth&&!t.invalidWeekday&&!t.weekdayMismatch&&!t.nullInput&&!t.invalidFormat&&!t.userInvalidated&&(!t.meridiem||t.meridiem&&n);if(e._strict&&(s=s&&0===t.charsLeftOver&&0===t.unusedTokens.length&&void 0===t.bigHour),null!=Object.isFrozen&&Object.isFrozen(e))return s;e._isValid=s}return e._isValid}function w(e){var t=_(NaN);return null!=e?c(y(t),e):y(t).userInvalidated=!0,t}i=Array.prototype.some?Array.prototype.some:function(e){for(var t=Object(this),n=t.length>>>0,s=0;s<n;s++)if(s in t&&e.call(this,t[s],s,t))return!0;return!1};var p=f.momentProperties=[],t=!1;function v(e,t){var n,s,i;if(r(t._isAMomentObject)||(e._isAMomentObject=t._isAMomentObject),r(t._i)||(e._i=t._i),r(t._f)||(e._f=t._f),r(t._l)||(e._l=t._l),r(t._strict)||(e._strict=t._strict),r(t._tzm)||(e._tzm=t._tzm),r(t._isUTC)||(e._isUTC=t._isUTC),r(t._offset)||(e._offset=t._offset),r(t._pf)||(e._pf=y(t)),r(t._locale)||(e._locale=t._locale),0<p.length)for(n=0;n<p.length;n++)r(i=t[s=p[n]])||(e[s]=i);return e}function k(e){v(this,e),this._d=new Date(null!=e._d?e._d.getTime():NaN),this.isValid()||(this._d=new Date(NaN)),!1===t&&(t=!0,f.updateOffset(this),t=!1)}function M(e){return e instanceof k||null!=e&&null!=e._isAMomentObject}function D(e){!1===f.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+e)}function n(i,r){var a=!0;return c(function(){if(null!=f.deprecationHandler&&f.deprecationHandler(null,i),a){for(var e,t,n=[],s=0;s<arguments.length;s++){if(e="","object"==typeof arguments[s]){for(t in e+="\n["+s+"] ",arguments[0])m(arguments[0],t)&&(e+=t+": "+arguments[0][t]+", ");e=e.slice(0,-2)}else e=arguments[s];n.push(e)}D(i+"\nArguments: "+Array.prototype.slice.call(n).join("")+"\n"+(new Error).stack),a=!1}return r.apply(this,arguments)},r)}var s,S={};function Y(e,t){null!=f.deprecationHandler&&f.deprecationHandler(e,t),S[e]||(D(t),S[e]=!0)}function O(e){return"undefined"!=typeof Function&&e instanceof Function||"[object Function]"===Object.prototype.toString.call(e)}function b(e,t){var n,s=c({},e);for(n in t)m(t,n)&&(u(e[n])&&u(t[n])?(s[n]={},c(s[n],e[n]),c(s[n],t[n])):null!=t[n]?s[n]=t[n]:delete s[n]);for(n in e)m(e,n)&&!m(t,n)&&u(e[n])&&(s[n]=c({},s[n]));return s}function x(e){null!=e&&this.set(e)}f.suppressDeprecationWarnings=!1,f.deprecationHandler=null,s=Object.keys?Object.keys:function(e){var t,n=[];for(t in e)m(e,t)&&n.push(t);return n};function T(e,t,n){var s=""+Math.abs(e),i=t-s.length;return(0<=e?n?"+":"":"-")+Math.pow(10,Math.max(0,i)).toString().substr(1)+s}var N=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,P=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,R={},W={};function C(e,t,n,s){var i="string"==typeof s?function(){return this[s]()}:s;e&&(W[e]=i),t&&(W[t[0]]=function(){return T(i.apply(this,arguments),t[1],t[2])}),n&&(W[n]=function(){return this.localeData().ordinal(i.apply(this,arguments),e)})}function U(e,t){return e.isValid()?(t=H(t,e.localeData()),R[t]=R[t]||function(s){for(var e,i=s.match(N),t=0,r=i.length;t<r;t++)W[i[t]]?i[t]=W[i[t]]:i[t]=(e=i[t]).match(/\[[\s\S]/)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"");return function(e){for(var t="",n=0;n<r;n++)t+=O(i[n])?i[n].call(e,s):i[n];return t}}(t),R[t](e)):e.localeData().invalidDate()}function H(e,t){var n=5;function s(e){return t.longDateFormat(e)||e}for(P.lastIndex=0;0<=n&&P.test(e);)e=e.replace(P,s),P.lastIndex=0,--n;return e}var F={};function L(e,t){var n=e.toLowerCase();F[n]=F[n+"s"]=F[t]=e}function V(e){return"string"==typeof e?F[e]||F[e.toLowerCase()]:void 0}function G(e){var t,n,s={};for(n in e)m(e,n)&&(t=V(n))&&(s[t]=e[n]);return s}var E={};function A(e,t){E[e]=t}function j(e){return e%4==0&&e%100!=0||e%400==0}function I(e){return e<0?Math.ceil(e)||0:Math.floor(e)}function Z(e){var t=+e,n=0;return 0!=t&&isFinite(t)&&(n=I(t)),n}function z(t,n){return function(e){return null!=e?(q(this,t,e),f.updateOffset(this,n),this):$(this,t)}}function $(e,t){return e.isValid()?e._d["get"+(e._isUTC?"UTC":"")+t]():NaN}function q(e,t,n){e.isValid()&&!isNaN(n)&&("FullYear"===t&&j(e.year())&&1===e.month()&&29===e.date()?(n=Z(n),e._d["set"+(e._isUTC?"UTC":"")+t](n,e.month(),xe(n,e.month()))):e._d["set"+(e._isUTC?"UTC":"")+t](n))}var B,J=/\d/,Q=/\d\d/,X=/\d{3}/,K=/\d{4}/,ee=/[+-]?\d{6}/,te=/\d\d?/,ne=/\d\d\d\d?/,se=/\d\d\d\d\d\d?/,ie=/\d{1,3}/,re=/\d{1,4}/,ae=/[+-]?\d{1,6}/,oe=/\d+/,ue=/[+-]?\d+/,le=/Z|[+-]\d\d:?\d\d/gi,he=/Z|[+-]\d\d(?::?\d\d)?/gi,de=/[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;function ce(e,n,s){B[e]=O(n)?n:function(e,t){return e&&s?s:n}}function fe(e,t){return m(B,e)?B[e](t._strict,t._locale):new RegExp(me(e.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(e,t,n,s,i){return t||n||s||i})))}function me(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}B={};var _e={};function ye(e,n){var t,s=n;for("string"==typeof e&&(e=[e]),h(n)&&(s=function(e,t){t[n]=Z(e)}),t=0;t<e.length;t++)_e[e[t]]=s}function ge(e,i){ye(e,function(e,t,n,s){n._w=n._w||{},i(e,n._w,n,s)})}var we,pe=0,ve=1,ke=2,Me=3,De=4,Se=5,Ye=6,Oe=7,be=8;function xe(e,t){if(isNaN(e)||isNaN(t))return NaN;var n,s=(t%(n=12)+n)%n;return e+=(t-s)/12,1==s?j(e)?29:28:31-s%7%2}we=Array.prototype.indexOf?Array.prototype.indexOf:function(e){for(var t=0;t<this.length;++t)if(this[t]===e)return t;return-1},C("M",["MM",2],"Mo",function(){return this.month()+1}),C("MMM",0,0,function(e){return this.localeData().monthsShort(this,e)}),C("MMMM",0,0,function(e){return this.localeData().months(this,e)}),L("month","M"),A("month",8),ce("M",te),ce("MM",te,Q),ce("MMM",function(e,t){return t.monthsShortRegex(e)}),ce("MMMM",function(e,t){return t.monthsRegex(e)}),ye(["M","MM"],function(e,t){t[ve]=Z(e)-1}),ye(["MMM","MMMM"],function(e,t,n,s){var i=n._locale.monthsParse(e,s,n._strict);null!=i?t[ve]=i:y(n).invalidMonth=e});var Te="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Ne="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Pe=/D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,Re=de,We=de;function Ce(e,t){var n;if(!e.isValid())return e;if("string"==typeof t)if(/^\d+$/.test(t))t=Z(t);else if(!h(t=e.localeData().monthsParse(t)))return e;return n=Math.min(e.date(),xe(e.year(),t)),e._d["set"+(e._isUTC?"UTC":"")+"Month"](t,n),e}function Ue(e){return null!=e?(Ce(this,e),f.updateOffset(this,!0),this):$(this,"Month")}function He(){function e(e,t){return t.length-e.length}for(var t,n=[],s=[],i=[],r=0;r<12;r++)t=_([2e3,r]),n.push(this.monthsShort(t,"")),s.push(this.months(t,"")),i.push(this.months(t,"")),i.push(this.monthsShort(t,""));for(n.sort(e),s.sort(e),i.sort(e),r=0;r<12;r++)n[r]=me(n[r]),s[r]=me(s[r]);for(r=0;r<24;r++)i[r]=me(i[r]);this._monthsRegex=new RegExp("^("+i.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+s.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+n.join("|")+")","i")}function Fe(e){return j(e)?366:365}C("Y",0,0,function(){var e=this.year();return e<=9999?T(e,4):"+"+e}),C(0,["YY",2],0,function(){return this.year()%100}),C(0,["YYYY",4],0,"year"),C(0,["YYYYY",5],0,"year"),C(0,["YYYYYY",6,!0],0,"year"),L("year","y"),A("year",1),ce("Y",ue),ce("YY",te,Q),ce("YYYY",re,K),ce("YYYYY",ae,ee),ce("YYYYYY",ae,ee),ye(["YYYYY","YYYYYY"],pe),ye("YYYY",function(e,t){t[pe]=2===e.length?f.parseTwoDigitYear(e):Z(e)}),ye("YY",function(e,t){t[pe]=f.parseTwoDigitYear(e)}),ye("Y",function(e,t){t[pe]=parseInt(e,10)}),f.parseTwoDigitYear=function(e){return Z(e)+(68<Z(e)?1900:2e3)};var Le=z("FullYear",!0);function Ve(e){var t,n;return e<100&&0<=e?((n=Array.prototype.slice.call(arguments))[0]=e+400,t=new Date(Date.UTC.apply(null,n)),isFinite(t.getUTCFullYear())&&t.setUTCFullYear(e)):t=new Date(Date.UTC.apply(null,arguments)),t}function Ge(e,t,n){var s=7+t-n;return s-(7+Ve(e,0,s).getUTCDay()-t)%7-1}function Ee(e,t,n,s,i){var r,a=1+7*(t-1)+(7+n-s)%7+Ge(e,s,i),o=a<=0?Fe(r=e-1)+a:a>Fe(e)?(r=e+1,a-Fe(e)):(r=e,a);return{year:r,dayOfYear:o}}function Ae(e,t,n){var s,i,r=Ge(e.year(),t,n),a=Math.floor((e.dayOfYear()-r-1)/7)+1;return a<1?s=a+je(i=e.year()-1,t,n):a>je(e.year(),t,n)?(s=a-je(e.year(),t,n),i=e.year()+1):(i=e.year(),s=a),{week:s,year:i}}function je(e,t,n){var s=Ge(e,t,n),i=Ge(e+1,t,n);return(Fe(e)-s+i)/7}C("w",["ww",2],"wo","week"),C("W",["WW",2],"Wo","isoWeek"),L("week","w"),L("isoWeek","W"),A("week",5),A("isoWeek",5),ce("w",te),ce("ww",te,Q),ce("W",te),ce("WW",te,Q),ge(["w","ww","W","WW"],function(e,t,n,s){t[s.substr(0,1)]=Z(e)});function Ie(e,t){return e.slice(t,7).concat(e.slice(0,t))}C("d",0,"do","day"),C("dd",0,0,function(e){return this.localeData().weekdaysMin(this,e)}),C("ddd",0,0,function(e){return this.localeData().weekdaysShort(this,e)}),C("dddd",0,0,function(e){return this.localeData().weekdays(this,e)}),C("e",0,0,"weekday"),C("E",0,0,"isoWeekday"),L("day","d"),L("weekday","e"),L("isoWeekday","E"),A("day",11),A("weekday",11),A("isoWeekday",11),ce("d",te),ce("e",te),ce("E",te),ce("dd",function(e,t){return t.weekdaysMinRegex(e)}),ce("ddd",function(e,t){return t.weekdaysShortRegex(e)}),ce("dddd",function(e,t){return t.weekdaysRegex(e)}),ge(["dd","ddd","dddd"],function(e,t,n,s){var i=n._locale.weekdaysParse(e,s,n._strict);null!=i?t.d=i:y(n).invalidWeekday=e}),ge(["d","e","E"],function(e,t,n,s){t[s]=Z(e)});var Ze="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),ze="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),$e="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),qe=de,Be=de,Je=de;function Qe(){function e(e,t){return t.length-e.length}for(var t,n,s,i,r=[],a=[],o=[],u=[],l=0;l<7;l++)t=_([2e3,1]).day(l),n=me(this.weekdaysMin(t,"")),s=me(this.weekdaysShort(t,"")),i=me(this.weekdays(t,"")),r.push(n),a.push(s),o.push(i),u.push(n),u.push(s),u.push(i);r.sort(e),a.sort(e),o.sort(e),u.sort(e),this._weekdaysRegex=new RegExp("^("+u.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+o.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+a.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+r.join("|")+")","i")}function Xe(){return this.hours()%12||12}function Ke(e,t){C(e,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),t)})}function et(e,t){return t._meridiemParse}C("H",["HH",2],0,"hour"),C("h",["hh",2],0,Xe),C("k",["kk",2],0,function(){return this.hours()||24}),C("hmm",0,0,function(){return""+Xe.apply(this)+T(this.minutes(),2)}),C("hmmss",0,0,function(){return""+Xe.apply(this)+T(this.minutes(),2)+T(this.seconds(),2)}),C("Hmm",0,0,function(){return""+this.hours()+T(this.minutes(),2)}),C("Hmmss",0,0,function(){return""+this.hours()+T(this.minutes(),2)+T(this.seconds(),2)}),Ke("a",!0),Ke("A",!1),L("hour","h"),A("hour",13),ce("a",et),ce("A",et),ce("H",te),ce("h",te),ce("k",te),ce("HH",te,Q),ce("hh",te,Q),ce("kk",te,Q),ce("hmm",ne),ce("hmmss",se),ce("Hmm",ne),ce("Hmmss",se),ye(["H","HH"],Me),ye(["k","kk"],function(e,t,n){var s=Z(e);t[Me]=24===s?0:s}),ye(["a","A"],function(e,t,n){n._isPm=n._locale.isPM(e),n._meridiem=e}),ye(["h","hh"],function(e,t,n){t[Me]=Z(e),y(n).bigHour=!0}),ye("hmm",function(e,t,n){var s=e.length-2;t[Me]=Z(e.substr(0,s)),t[De]=Z(e.substr(s)),y(n).bigHour=!0}),ye("hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[Me]=Z(e.substr(0,s)),t[De]=Z(e.substr(s,2)),t[Se]=Z(e.substr(i)),y(n).bigHour=!0}),ye("Hmm",function(e,t,n){var s=e.length-2;t[Me]=Z(e.substr(0,s)),t[De]=Z(e.substr(s))}),ye("Hmmss",function(e,t,n){var s=e.length-4,i=e.length-2;t[Me]=Z(e.substr(0,s)),t[De]=Z(e.substr(s,2)),t[Se]=Z(e.substr(i))});var tt=z("Hours",!0);var nt,st={calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},longDateFormat:{LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},invalidDate:"Invalid date",ordinal:"%d",dayOfMonthOrdinalParse:/\d{1,2}/,relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",ss:"%d seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",w:"a week",ww:"%d weeks",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},months:Te,monthsShort:Ne,week:{dow:0,doy:6},weekdays:Ze,weekdaysMin:$e,weekdaysShort:ze,meridiemParse:/[ap]\.?m?\.?/i},it={},rt={};function at(e){return e?e.toLowerCase().replace("_","-"):e}function ot(e){for(var t,n,s,i,r=0;r<e.length;){for(t=(i=at(e[r]).split("-")).length,n=(n=at(e[r+1]))?n.split("-"):null;0<t;){if(s=ut(i.slice(0,t).join("-")))return s;if(n&&n.length>=t&&function(e,t){for(var n=Math.min(e.length,t.length),s=0;s<n;s+=1)if(e[s]!==t[s])return s;return n}(i,n)>=t-1)break;t--}r++}return nt}function ut(t){var e;if(void 0===it[t]&&"undefined"!=typeof module&&module&&module.exports)try{e=nt._abbr,require("./locale/"+t),lt(e)}catch(e){it[t]=null}return it[t]}function lt(e,t){var n;return e&&((n=r(t)?dt(e):ht(e,t))?nt=n:"undefined"!=typeof console&&console.warn&&console.warn("Locale "+e+" not found. Did you forget to load it?")),nt._abbr}function ht(e,t){if(null===t)return delete it[e],null;var n,s=st;if(t.abbr=e,null!=it[e])Y("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),s=it[e]._config;else if(null!=t.parentLocale)if(null!=it[t.parentLocale])s=it[t.parentLocale]._config;else{if(null==(n=ut(t.parentLocale)))return rt[t.parentLocale]||(rt[t.parentLocale]=[]),rt[t.parentLocale].push({name:e,config:t}),null;s=n._config}return it[e]=new x(b(s,t)),rt[e]&&rt[e].forEach(function(e){ht(e.name,e.config)}),lt(e),it[e]}function dt(e){var t;if(e&&e._locale&&e._locale._abbr&&(e=e._locale._abbr),!e)return nt;if(!o(e)){if(t=ut(e))return t;e=[e]}return ot(e)}function ct(e){var t,n=e._a;return n&&-2===y(e).overflow&&(t=n[ve]<0||11<n[ve]?ve:n[ke]<1||n[ke]>xe(n[pe],n[ve])?ke:n[Me]<0||24<n[Me]||24===n[Me]&&(0!==n[De]||0!==n[Se]||0!==n[Ye])?Me:n[De]<0||59<n[De]?De:n[Se]<0||59<n[Se]?Se:n[Ye]<0||999<n[Ye]?Ye:-1,y(e)._overflowDayOfYear&&(t<pe||ke<t)&&(t=ke),y(e)._overflowWeeks&&-1===t&&(t=Oe),y(e)._overflowWeekday&&-1===t&&(t=be),y(e).overflow=t),e}var ft=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,mt=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,_t=/Z|[+-]\d\d(?::?\d\d)?/,yt=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/],["YYYYMM",/\d{6}/,!1],["YYYY",/\d{4}/,!1]],gt=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],wt=/^\/?Date\((-?\d+)/i,pt=/^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,vt={UT:0,GMT:0,EDT:-240,EST:-300,CDT:-300,CST:-360,MDT:-360,MST:-420,PDT:-420,PST:-480};function kt(e){var t,n,s,i,r,a,o=e._i,u=ft.exec(o)||mt.exec(o);if(u){for(y(e).iso=!0,t=0,n=yt.length;t<n;t++)if(yt[t][1].exec(u[1])){i=yt[t][0],s=!1!==yt[t][2];break}if(null==i)return void(e._isValid=!1);if(u[3]){for(t=0,n=gt.length;t<n;t++)if(gt[t][1].exec(u[3])){r=(u[2]||" ")+gt[t][0];break}if(null==r)return void(e._isValid=!1)}if(!s&&null!=r)return void(e._isValid=!1);if(u[4]){if(!_t.exec(u[4]))return void(e._isValid=!1);a="Z"}e._f=i+(r||"")+(a||""),Ot(e)}else e._isValid=!1}function Mt(e,t,n,s,i,r){var a=[function(e){var t=parseInt(e,10);{if(t<=49)return 2e3+t;if(t<=999)return 1900+t}return t}(e),Ne.indexOf(t),parseInt(n,10),parseInt(s,10),parseInt(i,10)];return r&&a.push(parseInt(r,10)),a}function Dt(e){var t,n,s,i,r=pt.exec(e._i.replace(/\([^)]*\)|[\n\t]/g," ").replace(/(\s\s+)/g," ").replace(/^\s\s*/,"").replace(/\s\s*$/,""));if(r){if(t=Mt(r[4],r[3],r[2],r[5],r[6],r[7]),n=r[1],s=t,i=e,n&&ze.indexOf(n)!==new Date(s[0],s[1],s[2]).getDay()&&(y(i).weekdayMismatch=!0,!void(i._isValid=!1)))return;e._a=t,e._tzm=function(e,t,n){if(e)return vt[e];if(t)return 0;var s=parseInt(n,10),i=s%100;return 60*((s-i)/100)+i}(r[8],r[9],r[10]),e._d=Ve.apply(null,e._a),e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),y(e).rfc2822=!0}else e._isValid=!1}function St(e,t,n){return null!=e?e:null!=t?t:n}function Yt(e){var t,n,s,i,r,a,o,u=[];if(!e._d){for(a=e,o=new Date(f.now()),s=a._useUTC?[o.getUTCFullYear(),o.getUTCMonth(),o.getUTCDate()]:[o.getFullYear(),o.getMonth(),o.getDate()],e._w&&null==e._a[ke]&&null==e._a[ve]&&function(e){var t,n,s,i,r,a,o,u,l;null!=(t=e._w).GG||null!=t.W||null!=t.E?(r=1,a=4,n=St(t.GG,e._a[pe],Ae(Tt(),1,4).year),s=St(t.W,1),((i=St(t.E,1))<1||7<i)&&(u=!0)):(r=e._locale._week.dow,a=e._locale._week.doy,l=Ae(Tt(),r,a),n=St(t.gg,e._a[pe],l.year),s=St(t.w,l.week),null!=t.d?((i=t.d)<0||6<i)&&(u=!0):null!=t.e?(i=t.e+r,(t.e<0||6<t.e)&&(u=!0)):i=r);s<1||s>je(n,r,a)?y(e)._overflowWeeks=!0:null!=u?y(e)._overflowWeekday=!0:(o=Ee(n,s,i,r,a),e._a[pe]=o.year,e._dayOfYear=o.dayOfYear)}(e),null!=e._dayOfYear&&(r=St(e._a[pe],s[pe]),(e._dayOfYear>Fe(r)||0===e._dayOfYear)&&(y(e)._overflowDayOfYear=!0),n=Ve(r,0,e._dayOfYear),e._a[ve]=n.getUTCMonth(),e._a[ke]=n.getUTCDate()),t=0;t<3&&null==e._a[t];++t)e._a[t]=u[t]=s[t];for(;t<7;t++)e._a[t]=u[t]=null==e._a[t]?2===t?1:0:e._a[t];24===e._a[Me]&&0===e._a[De]&&0===e._a[Se]&&0===e._a[Ye]&&(e._nextDay=!0,e._a[Me]=0),e._d=(e._useUTC?Ve:function(e,t,n,s,i,r,a){var o;return e<100&&0<=e?(o=new Date(e+400,t,n,s,i,r,a),isFinite(o.getFullYear())&&o.setFullYear(e)):o=new Date(e,t,n,s,i,r,a),o}).apply(null,u),i=e._useUTC?e._d.getUTCDay():e._d.getDay(),null!=e._tzm&&e._d.setUTCMinutes(e._d.getUTCMinutes()-e._tzm),e._nextDay&&(e._a[Me]=24),e._w&&void 0!==e._w.d&&e._w.d!==i&&(y(e).weekdayMismatch=!0)}}function Ot(e){if(e._f!==f.ISO_8601)if(e._f!==f.RFC_2822){e._a=[],y(e).empty=!0;for(var t,n,s,i,r,a,o,u=""+e._i,l=u.length,h=0,d=H(e._f,e._locale).match(N)||[],c=0;c<d.length;c++)n=d[c],(t=(u.match(fe(n,e))||[])[0])&&(0<(s=u.substr(0,u.indexOf(t))).length&&y(e).unusedInput.push(s),u=u.slice(u.indexOf(t)+t.length),h+=t.length),W[n]?(t?y(e).empty=!1:y(e).unusedTokens.push(n),r=n,o=e,null!=(a=t)&&m(_e,r)&&_e[r](a,o._a,o,r)):e._strict&&!t&&y(e).unusedTokens.push(n);y(e).charsLeftOver=l-h,0<u.length&&y(e).unusedInput.push(u),e._a[Me]<=12&&!0===y(e).bigHour&&0<e._a[Me]&&(y(e).bigHour=void 0),y(e).parsedDateParts=e._a.slice(0),y(e).meridiem=e._meridiem,e._a[Me]=function(e,t,n){var s;if(null==n)return t;return null!=e.meridiemHour?e.meridiemHour(t,n):(null!=e.isPM&&((s=e.isPM(n))&&t<12&&(t+=12),s||12!==t||(t=0)),t)}(e._locale,e._a[Me],e._meridiem),null!==(i=y(e).era)&&(e._a[pe]=e._locale.erasConvertYear(i,e._a[pe])),Yt(e),ct(e)}else Dt(e);else kt(e)}function bt(e){var t,n,s=e._i,i=e._f;return e._locale=e._locale||dt(e._l),null===s||void 0===i&&""===s?w({nullInput:!0}):("string"==typeof s&&(e._i=s=e._locale.preparse(s)),M(s)?new k(ct(s)):(a(s)?e._d=s:o(i)?function(e){var t,n,s,i,r,a,o=!1;if(0===e._f.length)return y(e).invalidFormat=!0,e._d=new Date(NaN);for(i=0;i<e._f.length;i++)r=0,a=!1,t=v({},e),null!=e._useUTC&&(t._useUTC=e._useUTC),t._f=e._f[i],Ot(t),g(t)&&(a=!0),r+=y(t).charsLeftOver,r+=10*y(t).unusedTokens.length,y(t).score=r,o?r<s&&(s=r,n=t):(null==s||r<s||a)&&(s=r,n=t,a&&(o=!0));c(e,n||t)}(e):i?Ot(e):r(n=(t=e)._i)?t._d=new Date(f.now()):a(n)?t._d=new Date(n.valueOf()):"string"==typeof n?function(e){var t=wt.exec(e._i);null===t?(kt(e),!1===e._isValid&&(delete e._isValid,Dt(e),!1===e._isValid&&(delete e._isValid,e._strict?e._isValid=!1:f.createFromInputFallback(e)))):e._d=new Date(+t[1])}(t):o(n)?(t._a=d(n.slice(0),function(e){return parseInt(e,10)}),Yt(t)):u(n)?function(e){var t,n;e._d||(n=void 0===(t=G(e._i)).day?t.date:t.day,e._a=d([t.year,t.month,n,t.hour,t.minute,t.second,t.millisecond],function(e){return e&&parseInt(e,10)}),Yt(e))}(t):h(n)?t._d=new Date(n):f.createFromInputFallback(t),g(e)||(e._d=null),e))}function xt(e,t,n,s,i){var r,a={};return!0!==t&&!1!==t||(s=t,t=void 0),!0!==n&&!1!==n||(s=n,n=void 0),(u(e)&&l(e)||o(e)&&0===e.length)&&(e=void 0),a._isAMomentObject=!0,a._useUTC=a._isUTC=i,a._l=n,a._i=e,a._f=t,a._strict=s,(r=new k(ct(bt(a))))._nextDay&&(r.add(1,"d"),r._nextDay=void 0),r}function Tt(e,t,n,s){return xt(e,t,n,s,!1)}f.createFromInputFallback=n("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",function(e){e._d=new Date(e._i+(e._useUTC?" UTC":""))}),f.ISO_8601=function(){},f.RFC_2822=function(){};var Nt=n("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Tt.apply(null,arguments);return this.isValid()&&e.isValid()?e<this?this:e:w()}),Pt=n("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",function(){var e=Tt.apply(null,arguments);return this.isValid()&&e.isValid()?this<e?this:e:w()});function Rt(e,t){var n,s;if(1===t.length&&o(t[0])&&(t=t[0]),!t.length)return Tt();for(n=t[0],s=1;s<t.length;++s)t[s].isValid()&&!t[s][e](n)||(n=t[s]);return n}var Wt=["year","quarter","month","week","day","hour","minute","second","millisecond"];function Ct(e){var t=G(e),n=t.year||0,s=t.quarter||0,i=t.month||0,r=t.week||t.isoWeek||0,a=t.day||0,o=t.hour||0,u=t.minute||0,l=t.second||0,h=t.millisecond||0;this._isValid=function(e){var t,n,s=!1;for(t in e)if(m(e,t)&&(-1===we.call(Wt,t)||null!=e[t]&&isNaN(e[t])))return!1;for(n=0;n<Wt.length;++n)if(e[Wt[n]]){if(s)return!1;parseFloat(e[Wt[n]])!==Z(e[Wt[n]])&&(s=!0)}return!0}(t),this._milliseconds=+h+1e3*l+6e4*u+1e3*o*60*60,this._days=+a+7*r,this._months=+i+3*s+12*n,this._data={},this._locale=dt(),this._bubble()}function Ut(e){return e instanceof Ct}function Ht(e){return e<0?-1*Math.round(-1*e):Math.round(e)}function Ft(e,n){C(e,0,0,function(){var e=this.utcOffset(),t="+";return e<0&&(e=-e,t="-"),t+T(~~(e/60),2)+n+T(~~e%60,2)})}Ft("Z",":"),Ft("ZZ",""),ce("Z",he),ce("ZZ",he),ye(["Z","ZZ"],function(e,t,n){n._useUTC=!0,n._tzm=Vt(he,e)});var Lt=/([\+\-]|\d\d)/gi;function Vt(e,t){var n,s,i=(t||"").match(e);return null===i?null:0===(s=60*(n=((i[i.length-1]||[])+"").match(Lt)||["-",0,0])[1]+Z(n[2]))?0:"+"===n[0]?s:-s}function Gt(e,t){var n,s;return t._isUTC?(n=t.clone(),s=(M(e)||a(e)?e.valueOf():Tt(e).valueOf())-n.valueOf(),n._d.setTime(n._d.valueOf()+s),f.updateOffset(n,!1),n):Tt(e).local()}function Et(e){return-Math.round(e._d.getTimezoneOffset())}function At(){return!!this.isValid()&&(this._isUTC&&0===this._offset)}f.updateOffset=function(){};var jt=/^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,It=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;function Zt(e,t){var n,s,i,r=e,a=null;return Ut(e)?r={ms:e._milliseconds,d:e._days,M:e._months}:h(e)||!isNaN(+e)?(r={},t?r[t]=+e:r.milliseconds=+e):(a=jt.exec(e))?(n="-"===a[1]?-1:1,r={y:0,d:Z(a[ke])*n,h:Z(a[Me])*n,m:Z(a[De])*n,s:Z(a[Se])*n,ms:Z(Ht(1e3*a[Ye]))*n}):(a=It.exec(e))?(n="-"===a[1]?-1:1,r={y:zt(a[2],n),M:zt(a[3],n),w:zt(a[4],n),d:zt(a[5],n),h:zt(a[6],n),m:zt(a[7],n),s:zt(a[8],n)}):null==r?r={}:"object"==typeof r&&("from"in r||"to"in r)&&(i=function(e,t){var n;if(!e.isValid()||!t.isValid())return{milliseconds:0,months:0};t=Gt(t,e),e.isBefore(t)?n=$t(e,t):((n=$t(t,e)).milliseconds=-n.milliseconds,n.months=-n.months);return n}(Tt(r.from),Tt(r.to)),(r={}).ms=i.milliseconds,r.M=i.months),s=new Ct(r),Ut(e)&&m(e,"_locale")&&(s._locale=e._locale),Ut(e)&&m(e,"_isValid")&&(s._isValid=e._isValid),s}function zt(e,t){var n=e&&parseFloat(e.replace(",","."));return(isNaN(n)?0:n)*t}function $t(e,t){var n={};return n.months=t.month()-e.month()+12*(t.year()-e.year()),e.clone().add(n.months,"M").isAfter(t)&&--n.months,n.milliseconds=t-e.clone().add(n.months,"M"),n}function qt(s,i){return function(e,t){var n;return null===t||isNaN(+t)||(Y(i,"moment()."+i+"(period, number) is deprecated. Please use moment()."+i+"(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),n=e,e=t,t=n),Bt(this,Zt(e,t),s),this}}function Bt(e,t,n,s){var i=t._milliseconds,r=Ht(t._days),a=Ht(t._months);e.isValid()&&(s=null==s||s,a&&Ce(e,$(e,"Month")+a*n),r&&q(e,"Date",$(e,"Date")+r*n),i&&e._d.setTime(e._d.valueOf()+i*n),s&&f.updateOffset(e,r||a))}Zt.fn=Ct.prototype,Zt.invalid=function(){return Zt(NaN)};var Jt=qt(1,"add"),Qt=qt(-1,"subtract");function Xt(e){return"string"==typeof e||e instanceof String}function Kt(e){return M(e)||a(e)||Xt(e)||h(e)||function(t){var e=o(t),n=!1;e&&(n=0===t.filter(function(e){return!h(e)&&Xt(t)}).length);return e&&n}(e)||function(e){var t,n,s=u(e)&&!l(e),i=!1,r=["years","year","y","months","month","M","days","day","d","dates","date","D","hours","hour","h","minutes","minute","m","seconds","second","s","milliseconds","millisecond","ms"];for(t=0;t<r.length;t+=1)n=r[t],i=i||m(e,n);return s&&i}(e)||null==e}function en(e,t){if(e.date()<t.date())return-en(t,e);var n=12*(t.year()-e.year())+(t.month()-e.month()),s=e.clone().add(n,"months"),i=t-s<0?(t-s)/(s-e.clone().add(n-1,"months")):(t-s)/(e.clone().add(1+n,"months")-s);return-(n+i)||0}function tn(e){var t;return void 0===e?this._locale._abbr:(null!=(t=dt(e))&&(this._locale=t),this)}f.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",f.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var nn=n("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(e){return void 0===e?this.localeData():this.locale(e)});function sn(){return this._locale}var rn=126227808e5;function an(e,t){return(e%t+t)%t}function on(e,t,n){return e<100&&0<=e?new Date(e+400,t,n)-rn:new Date(e,t,n).valueOf()}function un(e,t,n){return e<100&&0<=e?Date.UTC(e+400,t,n)-rn:Date.UTC(e,t,n)}function ln(e,t){return t.erasAbbrRegex(e)}function hn(){for(var e=[],t=[],n=[],s=[],i=this.eras(),r=0,a=i.length;r<a;++r)t.push(me(i[r].name)),e.push(me(i[r].abbr)),n.push(me(i[r].narrow)),s.push(me(i[r].name)),s.push(me(i[r].abbr)),s.push(me(i[r].narrow));this._erasRegex=new RegExp("^("+s.join("|")+")","i"),this._erasNameRegex=new RegExp("^("+t.join("|")+")","i"),this._erasAbbrRegex=new RegExp("^("+e.join("|")+")","i"),this._erasNarrowRegex=new RegExp("^("+n.join("|")+")","i")}function dn(e,t){C(0,[e,e.length],0,t)}function cn(e,t,n,s,i){var r;return null==e?Ae(this,s,i).year:((r=je(e,s,i))<t&&(t=r),function(e,t,n,s,i){var r=Ee(e,t,n,s,i),a=Ve(r.year,0,r.dayOfYear);return this.year(a.getUTCFullYear()),this.month(a.getUTCMonth()),this.date(a.getUTCDate()),this}.call(this,e,t,n,s,i))}C("N",0,0,"eraAbbr"),C("NN",0,0,"eraAbbr"),C("NNN",0,0,"eraAbbr"),C("NNNN",0,0,"eraName"),C("NNNNN",0,0,"eraNarrow"),C("y",["y",1],"yo","eraYear"),C("y",["yy",2],0,"eraYear"),C("y",["yyy",3],0,"eraYear"),C("y",["yyyy",4],0,"eraYear"),ce("N",ln),ce("NN",ln),ce("NNN",ln),ce("NNNN",function(e,t){return t.erasNameRegex(e)}),ce("NNNNN",function(e,t){return t.erasNarrowRegex(e)}),ye(["N","NN","NNN","NNNN","NNNNN"],function(e,t,n,s){var i=n._locale.erasParse(e,s,n._strict);i?y(n).era=i:y(n).invalidEra=e}),ce("y",oe),ce("yy",oe),ce("yyy",oe),ce("yyyy",oe),ce("yo",function(e,t){return t._eraYearOrdinalRegex||oe}),ye(["y","yy","yyy","yyyy"],pe),ye(["yo"],function(e,t,n,s){var i;n._locale._eraYearOrdinalRegex&&(i=e.match(n._locale._eraYearOrdinalRegex)),n._locale.eraYearOrdinalParse?t[pe]=n._locale.eraYearOrdinalParse(e,i):t[pe]=parseInt(e,10)}),C(0,["gg",2],0,function(){return this.weekYear()%100}),C(0,["GG",2],0,function(){return this.isoWeekYear()%100}),dn("gggg","weekYear"),dn("ggggg","weekYear"),dn("GGGG","isoWeekYear"),dn("GGGGG","isoWeekYear"),L("weekYear","gg"),L("isoWeekYear","GG"),A("weekYear",1),A("isoWeekYear",1),ce("G",ue),ce("g",ue),ce("GG",te,Q),ce("gg",te,Q),ce("GGGG",re,K),ce("gggg",re,K),ce("GGGGG",ae,ee),ce("ggggg",ae,ee),ge(["gggg","ggggg","GGGG","GGGGG"],function(e,t,n,s){t[s.substr(0,2)]=Z(e)}),ge(["gg","GG"],function(e,t,n,s){t[s]=f.parseTwoDigitYear(e)}),C("Q",0,"Qo","quarter"),L("quarter","Q"),A("quarter",7),ce("Q",J),ye("Q",function(e,t){t[ve]=3*(Z(e)-1)}),C("D",["DD",2],"Do","date"),L("date","D"),A("date",9),ce("D",te),ce("DD",te,Q),ce("Do",function(e,t){return e?t._dayOfMonthOrdinalParse||t._ordinalParse:t._dayOfMonthOrdinalParseLenient}),ye(["D","DD"],ke),ye("Do",function(e,t){t[ke]=Z(e.match(te)[0])});var fn=z("Date",!0);C("DDD",["DDDD",3],"DDDo","dayOfYear"),L("dayOfYear","DDD"),A("dayOfYear",4),ce("DDD",ie),ce("DDDD",X),ye(["DDD","DDDD"],function(e,t,n){n._dayOfYear=Z(e)}),C("m",["mm",2],0,"minute"),L("minute","m"),A("minute",14),ce("m",te),ce("mm",te,Q),ye(["m","mm"],De);var mn=z("Minutes",!1);C("s",["ss",2],0,"second"),L("second","s"),A("second",15),ce("s",te),ce("ss",te,Q),ye(["s","ss"],Se);var _n,yn,gn=z("Seconds",!1);for(C("S",0,0,function(){return~~(this.millisecond()/100)}),C(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),C(0,["SSS",3],0,"millisecond"),C(0,["SSSS",4],0,function(){return 10*this.millisecond()}),C(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),C(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),C(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),C(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),C(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),L("millisecond","ms"),A("millisecond",16),ce("S",ie,J),ce("SS",ie,Q),ce("SSS",ie,X),_n="SSSS";_n.length<=9;_n+="S")ce(_n,oe);function wn(e,t){t[Ye]=Z(1e3*("0."+e))}for(_n="S";_n.length<=9;_n+="S")ye(_n,wn);yn=z("Milliseconds",!1),C("z",0,0,"zoneAbbr"),C("zz",0,0,"zoneName");var pn=k.prototype;function vn(e){return e}pn.add=Jt,pn.calendar=function(e,t){1===arguments.length&&(arguments[0]?Kt(arguments[0])?(e=arguments[0],t=void 0):function(e){for(var t=u(e)&&!l(e),n=!1,s=["sameDay","nextDay","lastDay","nextWeek","lastWeek","sameElse"],i=0;i<s.length;i+=1)n=n||m(e,s[i]);return t&&n}(arguments[0])&&(t=arguments[0],e=void 0):t=e=void 0);var n=e||Tt(),s=Gt(n,this).startOf("day"),i=f.calendarFormat(this,s)||"sameElse",r=t&&(O(t[i])?t[i].call(this,n):t[i]);return this.format(r||this.localeData().calendar(i,this,Tt(n)))},pn.clone=function(){return new k(this)},pn.diff=function(e,t,n){var s,i,r;if(!this.isValid())return NaN;if(!(s=Gt(e,this)).isValid())return NaN;switch(i=6e4*(s.utcOffset()-this.utcOffset()),t=V(t)){case"year":r=en(this,s)/12;break;case"month":r=en(this,s);break;case"quarter":r=en(this,s)/3;break;case"second":r=(this-s)/1e3;break;case"minute":r=(this-s)/6e4;break;case"hour":r=(this-s)/36e5;break;case"day":r=(this-s-i)/864e5;break;case"week":r=(this-s-i)/6048e5;break;default:r=this-s}return n?r:I(r)},pn.endOf=function(e){var t,n;if(void 0===(e=V(e))||"millisecond"===e||!this.isValid())return this;switch(n=this._isUTC?un:on,e){case"year":t=n(this.year()+1,0,1)-1;break;case"quarter":t=n(this.year(),this.month()-this.month()%3+3,1)-1;break;case"month":t=n(this.year(),this.month()+1,1)-1;break;case"week":t=n(this.year(),this.month(),this.date()-this.weekday()+7)-1;break;case"isoWeek":t=n(this.year(),this.month(),this.date()-(this.isoWeekday()-1)+7)-1;break;case"day":case"date":t=n(this.year(),this.month(),this.date()+1)-1;break;case"hour":t=this._d.valueOf(),t+=36e5-an(t+(this._isUTC?0:6e4*this.utcOffset()),36e5)-1;break;case"minute":t=this._d.valueOf(),t+=6e4-an(t,6e4)-1;break;case"second":t=this._d.valueOf(),t+=1e3-an(t,1e3)-1;break}return this._d.setTime(t),f.updateOffset(this,!0),this},pn.format=function(e){e=e||(this.isUtc()?f.defaultFormatUtc:f.defaultFormat);var t=U(this,e);return this.localeData().postformat(t)},pn.from=function(e,t){return this.isValid()&&(M(e)&&e.isValid()||Tt(e).isValid())?Zt({to:this,from:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},pn.fromNow=function(e){return this.from(Tt(),e)},pn.to=function(e,t){return this.isValid()&&(M(e)&&e.isValid()||Tt(e).isValid())?Zt({from:this,to:e}).locale(this.locale()).humanize(!t):this.localeData().invalidDate()},pn.toNow=function(e){return this.to(Tt(),e)},pn.get=function(e){return O(this[e=V(e)])?this[e]():this},pn.invalidAt=function(){return y(this).overflow},pn.isAfter=function(e,t){var n=M(e)?e:Tt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=V(t)||"millisecond")?this.valueOf()>n.valueOf():n.valueOf()<this.clone().startOf(t).valueOf())},pn.isBefore=function(e,t){var n=M(e)?e:Tt(e);return!(!this.isValid()||!n.isValid())&&("millisecond"===(t=V(t)||"millisecond")?this.valueOf()<n.valueOf():this.clone().endOf(t).valueOf()<n.valueOf())},pn.isBetween=function(e,t,n,s){var i=M(e)?e:Tt(e),r=M(t)?t:Tt(t);return!!(this.isValid()&&i.isValid()&&r.isValid())&&(("("===(s=s||"()")[0]?this.isAfter(i,n):!this.isBefore(i,n))&&(")"===s[1]?this.isBefore(r,n):!this.isAfter(r,n)))},pn.isSame=function(e,t){var n,s=M(e)?e:Tt(e);return!(!this.isValid()||!s.isValid())&&("millisecond"===(t=V(t)||"millisecond")?this.valueOf()===s.valueOf():(n=s.valueOf(),this.clone().startOf(t).valueOf()<=n&&n<=this.clone().endOf(t).valueOf()))},pn.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)},pn.isSameOrBefore=function(e,t){return this.isSame(e,t)||this.isBefore(e,t)},pn.isValid=function(){return g(this)},pn.lang=nn,pn.locale=tn,pn.localeData=sn,pn.max=Pt,pn.min=Nt,pn.parsingFlags=function(){return c({},y(this))},pn.set=function(e,t){if("object"==typeof e)for(var n=function(e){var t,n=[];for(t in e)m(e,t)&&n.push({unit:t,priority:E[t]});return n.sort(function(e,t){return e.priority-t.priority}),n}(e=G(e)),s=0;s<n.length;s++)this[n[s].unit](e[n[s].unit]);else if(O(this[e=V(e)]))return this[e](t);return this},pn.startOf=function(e){var t,n;if(void 0===(e=V(e))||"millisecond"===e||!this.isValid())return this;switch(n=this._isUTC?un:on,e){case"year":t=n(this.year(),0,1);break;case"quarter":t=n(this.year(),this.month()-this.month()%3,1);break;case"month":t=n(this.year(),this.month(),1);break;case"week":t=n(this.year(),this.month(),this.date()-this.weekday());break;case"isoWeek":t=n(this.year(),this.month(),this.date()-(this.isoWeekday()-1));break;case"day":case"date":t=n(this.year(),this.month(),this.date());break;case"hour":t=this._d.valueOf(),t-=an(t+(this._isUTC?0:6e4*this.utcOffset()),36e5);break;case"minute":t=this._d.valueOf(),t-=an(t,6e4);break;case"second":t=this._d.valueOf(),t-=an(t,1e3);break}return this._d.setTime(t),f.updateOffset(this,!0),this},pn.subtract=Qt,pn.toArray=function(){var e=this;return[e.year(),e.month(),e.date(),e.hour(),e.minute(),e.second(),e.millisecond()]},pn.toObject=function(){var e=this;return{years:e.year(),months:e.month(),date:e.date(),hours:e.hours(),minutes:e.minutes(),seconds:e.seconds(),milliseconds:e.milliseconds()}},pn.toDate=function(){return new Date(this.valueOf())},pn.toISOString=function(e){if(!this.isValid())return null;var t=!0!==e,n=t?this.clone().utc():this;return n.year()<0||9999<n.year()?U(n,t?"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"):O(Date.prototype.toISOString)?t?this.toDate().toISOString():new Date(this.valueOf()+60*this.utcOffset()*1e3).toISOString().replace("Z",U(n,"Z")):U(n,t?"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]":"YYYY-MM-DD[T]HH:mm:ss.SSSZ")},pn.inspect=function(){if(!this.isValid())return"moment.invalid(/* "+this._i+" */)";var e,t,n,s="moment",i="";return this.isLocal()||(s=0===this.utcOffset()?"moment.utc":"moment.parseZone",i="Z"),e="["+s+'("]',t=0<=this.year()&&this.year()<=9999?"YYYY":"YYYYYY",n=i+'[")]',this.format(e+t+"-MM-DD[T]HH:mm:ss.SSS"+n)},"undefined"!=typeof Symbol&&null!=Symbol.for&&(pn[Symbol.for("nodejs.util.inspect.custom")]=function(){return"Moment<"+this.format()+">"}),pn.toJSON=function(){return this.isValid()?this.toISOString():null},pn.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},pn.unix=function(){return Math.floor(this.valueOf()/1e3)},pn.valueOf=function(){return this._d.valueOf()-6e4*(this._offset||0)},pn.creationData=function(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}},pn.eraName=function(){for(var e,t=this.localeData().eras(),n=0,s=t.length;n<s;++n){if(e=this.clone().startOf("day").valueOf(),t[n].since<=e&&e<=t[n].until)return t[n].name;if(t[n].until<=e&&e<=t[n].since)return t[n].name}return""},pn.eraNarrow=function(){for(var e,t=this.localeData().eras(),n=0,s=t.length;n<s;++n){if(e=this.clone().startOf("day").valueOf(),t[n].since<=e&&e<=t[n].until)return t[n].narrow;if(t[n].until<=e&&e<=t[n].since)return t[n].narrow}return""},pn.eraAbbr=function(){for(var e,t=this.localeData().eras(),n=0,s=t.length;n<s;++n){if(e=this.clone().startOf("day").valueOf(),t[n].since<=e&&e<=t[n].until)return t[n].abbr;if(t[n].until<=e&&e<=t[n].since)return t[n].abbr}return""},pn.eraYear=function(){for(var e,t,n=this.localeData().eras(),s=0,i=n.length;s<i;++s)if(e=n[s].since<=n[s].until?1:-1,t=this.clone().startOf("day").valueOf(),n[s].since<=t&&t<=n[s].until||n[s].until<=t&&t<=n[s].since)return(this.year()-f(n[s].since).year())*e+n[s].offset;return this.year()},pn.year=Le,pn.isLeapYear=function(){return j(this.year())},pn.weekYear=function(e){return cn.call(this,e,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)},pn.isoWeekYear=function(e){return cn.call(this,e,this.isoWeek(),this.isoWeekday(),1,4)},pn.quarter=pn.quarters=function(e){return null==e?Math.ceil((this.month()+1)/3):this.month(3*(e-1)+this.month()%3)},pn.month=Ue,pn.daysInMonth=function(){return xe(this.year(),this.month())},pn.week=pn.weeks=function(e){var t=this.localeData().week(this);return null==e?t:this.add(7*(e-t),"d")},pn.isoWeek=pn.isoWeeks=function(e){var t=Ae(this,1,4).week;return null==e?t:this.add(7*(e-t),"d")},pn.weeksInYear=function(){var e=this.localeData()._week;return je(this.year(),e.dow,e.doy)},pn.weeksInWeekYear=function(){var e=this.localeData()._week;return je(this.weekYear(),e.dow,e.doy)},pn.isoWeeksInYear=function(){return je(this.year(),1,4)},pn.isoWeeksInISOWeekYear=function(){return je(this.isoWeekYear(),1,4)},pn.date=fn,pn.day=pn.days=function(e){if(!this.isValid())return null!=e?this:NaN;var t,n,s=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=e?(t=e,n=this.localeData(),e="string"!=typeof t?t:isNaN(t)?"number"==typeof(t=n.weekdaysParse(t))?t:null:parseInt(t,10),this.add(e-s,"d")):s},pn.weekday=function(e){if(!this.isValid())return null!=e?this:NaN;var t=(this.day()+7-this.localeData()._week.dow)%7;return null==e?t:this.add(e-t,"d")},pn.isoWeekday=function(e){if(!this.isValid())return null!=e?this:NaN;if(null==e)return this.day()||7;var t,n,s=(t=e,n=this.localeData(),"string"==typeof t?n.weekdaysParse(t)%7||7:isNaN(t)?null:t);return this.day(this.day()%7?s:s-7)},pn.dayOfYear=function(e){var t=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==e?t:this.add(e-t,"d")},pn.hour=pn.hours=tt,pn.minute=pn.minutes=mn,pn.second=pn.seconds=gn,pn.millisecond=pn.milliseconds=yn,pn.utcOffset=function(e,t,n){var s,i=this._offset||0;if(!this.isValid())return null!=e?this:NaN;if(null==e)return this._isUTC?i:Et(this);if("string"==typeof e){if(null===(e=Vt(he,e)))return this}else Math.abs(e)<16&&!n&&(e*=60);return!this._isUTC&&t&&(s=Et(this)),this._offset=e,this._isUTC=!0,null!=s&&this.add(s,"m"),i!==e&&(!t||this._changeInProgress?Bt(this,Zt(e-i,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,f.updateOffset(this,!0),this._changeInProgress=null)),this},pn.utc=function(e){return this.utcOffset(0,e)},pn.local=function(e){return this._isUTC&&(this.utcOffset(0,e),this._isUTC=!1,e&&this.subtract(Et(this),"m")),this},pn.parseZone=function(){var e;return null!=this._tzm?this.utcOffset(this._tzm,!1,!0):"string"==typeof this._i&&(null!=(e=Vt(le,this._i))?this.utcOffset(e):this.utcOffset(0,!0)),this},pn.hasAlignedHourOffset=function(e){return!!this.isValid()&&(e=e?Tt(e).utcOffset():0,(this.utcOffset()-e)%60==0)},pn.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},pn.isLocal=function(){return!!this.isValid()&&!this._isUTC},pn.isUtcOffset=function(){return!!this.isValid()&&this._isUTC},pn.isUtc=At,pn.isUTC=At,pn.zoneAbbr=function(){return this._isUTC?"UTC":""},pn.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},pn.dates=n("dates accessor is deprecated. Use date instead.",fn),pn.months=n("months accessor is deprecated. Use month instead",Ue),pn.years=n("years accessor is deprecated. Use year instead",Le),pn.zone=n("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",function(e,t){return null!=e?("string"!=typeof e&&(e=-e),this.utcOffset(e,t),this):-this.utcOffset()}),pn.isDSTShifted=n("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",function(){if(!r(this._isDSTShifted))return this._isDSTShifted;var e,t={};return v(t,this),(t=bt(t))._a?(e=(t._isUTC?_:Tt)(t._a),this._isDSTShifted=this.isValid()&&0<function(e,t,n){for(var s=Math.min(e.length,t.length),i=Math.abs(e.length-t.length),r=0,a=0;a<s;a++)(n&&e[a]!==t[a]||!n&&Z(e[a])!==Z(t[a]))&&r++;return r+i}(t._a,e.toArray())):this._isDSTShifted=!1,this._isDSTShifted});var kn=x.prototype;function Mn(e,t,n,s){var i=dt(),r=_().set(s,t);return i[n](r,e)}function Dn(e,t,n){if(h(e)&&(t=e,e=void 0),e=e||"",null!=t)return Mn(e,t,n,"month");for(var s=[],i=0;i<12;i++)s[i]=Mn(e,i,n,"month");return s}function Sn(e,t,n,s){t=("boolean"==typeof e?h(t)&&(n=t,t=void 0):(t=e,e=!1,h(n=t)&&(n=t,t=void 0)),t||"");var i,r=dt(),a=e?r._week.dow:0,o=[];if(null!=n)return Mn(t,(n+a)%7,s,"day");for(i=0;i<7;i++)o[i]=Mn(t,(i+a)%7,s,"day");return o}kn.calendar=function(e,t,n){var s=this._calendar[e]||this._calendar.sameElse;return O(s)?s.call(t,n):s},kn.longDateFormat=function(e){var t=this._longDateFormat[e],n=this._longDateFormat[e.toUpperCase()];return t||!n?t:(this._longDateFormat[e]=n.match(N).map(function(e){return"MMMM"===e||"MM"===e||"DD"===e||"dddd"===e?e.slice(1):e}).join(""),this._longDateFormat[e])},kn.invalidDate=function(){return this._invalidDate},kn.ordinal=function(e){return this._ordinal.replace("%d",e)},kn.preparse=vn,kn.postformat=vn,kn.relativeTime=function(e,t,n,s){var i=this._relativeTime[n];return O(i)?i(e,t,n,s):i.replace(/%d/i,e)},kn.pastFuture=function(e,t){var n=this._relativeTime[0<e?"future":"past"];return O(n)?n(t):n.replace(/%s/i,t)},kn.set=function(e){var t,n;for(n in e)m(e,n)&&(O(t=e[n])?this[n]=t:this["_"+n]=t);this._config=e,this._dayOfMonthOrdinalParseLenient=new RegExp((this._dayOfMonthOrdinalParse.source||this._ordinalParse.source)+"|"+/\d{1,2}/.source)},kn.eras=function(e,t){for(var n,s=this._eras||dt("en")._eras,i=0,r=s.length;i<r;++i){switch(typeof s[i].since){case"string":n=f(s[i].since).startOf("day"),s[i].since=n.valueOf();break}switch(typeof s[i].until){case"undefined":s[i].until=1/0;break;case"string":n=f(s[i].until).startOf("day").valueOf(),s[i].until=n.valueOf();break}}return s},kn.erasParse=function(e,t,n){var s,i,r,a,o,u=this.eras();for(e=e.toUpperCase(),s=0,i=u.length;s<i;++s)if(r=u[s].name.toUpperCase(),a=u[s].abbr.toUpperCase(),o=u[s].narrow.toUpperCase(),n)switch(t){case"N":case"NN":case"NNN":if(a===e)return u[s];break;case"NNNN":if(r===e)return u[s];break;case"NNNNN":if(o===e)return u[s];break}else if(0<=[r,a,o].indexOf(e))return u[s]},kn.erasConvertYear=function(e,t){var n=e.since<=e.until?1:-1;return void 0===t?f(e.since).year():f(e.since).year()+(t-e.offset)*n},kn.erasAbbrRegex=function(e){return m(this,"_erasAbbrRegex")||hn.call(this),e?this._erasAbbrRegex:this._erasRegex},kn.erasNameRegex=function(e){return m(this,"_erasNameRegex")||hn.call(this),e?this._erasNameRegex:this._erasRegex},kn.erasNarrowRegex=function(e){return m(this,"_erasNarrowRegex")||hn.call(this),e?this._erasNarrowRegex:this._erasRegex},kn.months=function(e,t){return e?o(this._months)?this._months[e.month()]:this._months[(this._months.isFormat||Pe).test(t)?"format":"standalone"][e.month()]:o(this._months)?this._months:this._months.standalone},kn.monthsShort=function(e,t){return e?o(this._monthsShort)?this._monthsShort[e.month()]:this._monthsShort[Pe.test(t)?"format":"standalone"][e.month()]:o(this._monthsShort)?this._monthsShort:this._monthsShort.standalone},kn.monthsParse=function(e,t,n){var s,i,r;if(this._monthsParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],s=0;s<12;++s)r=_([2e3,s]),this._shortMonthsParse[s]=this.monthsShort(r,"").toLocaleLowerCase(),this._longMonthsParse[s]=this.months(r,"").toLocaleLowerCase();return n?"MMM"===t?-1!==(i=we.call(this._shortMonthsParse,a))?i:null:-1!==(i=we.call(this._longMonthsParse,a))?i:null:"MMM"===t?-1!==(i=we.call(this._shortMonthsParse,a))||-1!==(i=we.call(this._longMonthsParse,a))?i:null:-1!==(i=we.call(this._longMonthsParse,a))||-1!==(i=we.call(this._shortMonthsParse,a))?i:null}.call(this,e,t,n);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),s=0;s<12;s++){if(i=_([2e3,s]),n&&!this._longMonthsParse[s]&&(this._longMonthsParse[s]=new RegExp("^"+this.months(i,"").replace(".","")+"$","i"),this._shortMonthsParse[s]=new RegExp("^"+this.monthsShort(i,"").replace(".","")+"$","i")),n||this._monthsParse[s]||(r="^"+this.months(i,"")+"|^"+this.monthsShort(i,""),this._monthsParse[s]=new RegExp(r.replace(".",""),"i")),n&&"MMMM"===t&&this._longMonthsParse[s].test(e))return s;if(n&&"MMM"===t&&this._shortMonthsParse[s].test(e))return s;if(!n&&this._monthsParse[s].test(e))return s}},kn.monthsRegex=function(e){return this._monthsParseExact?(m(this,"_monthsRegex")||He.call(this),e?this._monthsStrictRegex:this._monthsRegex):(m(this,"_monthsRegex")||(this._monthsRegex=We),this._monthsStrictRegex&&e?this._monthsStrictRegex:this._monthsRegex)},kn.monthsShortRegex=function(e){return this._monthsParseExact?(m(this,"_monthsRegex")||He.call(this),e?this._monthsShortStrictRegex:this._monthsShortRegex):(m(this,"_monthsShortRegex")||(this._monthsShortRegex=Re),this._monthsShortStrictRegex&&e?this._monthsShortStrictRegex:this._monthsShortRegex)},kn.week=function(e){return Ae(e,this._week.dow,this._week.doy).week},kn.firstDayOfYear=function(){return this._week.doy},kn.firstDayOfWeek=function(){return this._week.dow},kn.weekdays=function(e,t){var n=o(this._weekdays)?this._weekdays:this._weekdays[e&&!0!==e&&this._weekdays.isFormat.test(t)?"format":"standalone"];return!0===e?Ie(n,this._week.dow):e?n[e.day()]:n},kn.weekdaysMin=function(e){return!0===e?Ie(this._weekdaysMin,this._week.dow):e?this._weekdaysMin[e.day()]:this._weekdaysMin},kn.weekdaysShort=function(e){return!0===e?Ie(this._weekdaysShort,this._week.dow):e?this._weekdaysShort[e.day()]:this._weekdaysShort},kn.weekdaysParse=function(e,t,n){var s,i,r;if(this._weekdaysParseExact)return function(e,t,n){var s,i,r,a=e.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],s=0;s<7;++s)r=_([2e3,1]).day(s),this._minWeekdaysParse[s]=this.weekdaysMin(r,"").toLocaleLowerCase(),this._shortWeekdaysParse[s]=this.weekdaysShort(r,"").toLocaleLowerCase(),this._weekdaysParse[s]=this.weekdays(r,"").toLocaleLowerCase();return n?"dddd"===t?-1!==(i=we.call(this._weekdaysParse,a))?i:null:"ddd"===t?-1!==(i=we.call(this._shortWeekdaysParse,a))?i:null:-1!==(i=we.call(this._minWeekdaysParse,a))?i:null:"dddd"===t?-1!==(i=we.call(this._weekdaysParse,a))||-1!==(i=we.call(this._shortWeekdaysParse,a))||-1!==(i=we.call(this._minWeekdaysParse,a))?i:null:"ddd"===t?-1!==(i=we.call(this._shortWeekdaysParse,a))||-1!==(i=we.call(this._weekdaysParse,a))||-1!==(i=we.call(this._minWeekdaysParse,a))?i:null:-1!==(i=we.call(this._minWeekdaysParse,a))||-1!==(i=we.call(this._weekdaysParse,a))||-1!==(i=we.call(this._shortWeekdaysParse,a))?i:null}.call(this,e,t,n);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),s=0;s<7;s++){if(i=_([2e3,1]).day(s),n&&!this._fullWeekdaysParse[s]&&(this._fullWeekdaysParse[s]=new RegExp("^"+this.weekdays(i,"").replace(".","\\.?")+"$","i"),this._shortWeekdaysParse[s]=new RegExp("^"+this.weekdaysShort(i,"").replace(".","\\.?")+"$","i"),this._minWeekdaysParse[s]=new RegExp("^"+this.weekdaysMin(i,"").replace(".","\\.?")+"$","i")),this._weekdaysParse[s]||(r="^"+this.weekdays(i,"")+"|^"+this.weekdaysShort(i,"")+"|^"+this.weekdaysMin(i,""),this._weekdaysParse[s]=new RegExp(r.replace(".",""),"i")),n&&"dddd"===t&&this._fullWeekdaysParse[s].test(e))return s;if(n&&"ddd"===t&&this._shortWeekdaysParse[s].test(e))return s;if(n&&"dd"===t&&this._minWeekdaysParse[s].test(e))return s;if(!n&&this._weekdaysParse[s].test(e))return s}},kn.weekdaysRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Qe.call(this),e?this._weekdaysStrictRegex:this._weekdaysRegex):(m(this,"_weekdaysRegex")||(this._weekdaysRegex=qe),this._weekdaysStrictRegex&&e?this._weekdaysStrictRegex:this._weekdaysRegex)},kn.weekdaysShortRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Qe.call(this),e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):(m(this,"_weekdaysShortRegex")||(this._weekdaysShortRegex=Be),this._weekdaysShortStrictRegex&&e?this._weekdaysShortStrictRegex:this._weekdaysShortRegex)},kn.weekdaysMinRegex=function(e){return this._weekdaysParseExact?(m(this,"_weekdaysRegex")||Qe.call(this),e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):(m(this,"_weekdaysMinRegex")||(this._weekdaysMinRegex=Je),this._weekdaysMinStrictRegex&&e?this._weekdaysMinStrictRegex:this._weekdaysMinRegex)},kn.isPM=function(e){return"p"===(e+"").toLowerCase().charAt(0)},kn.meridiem=function(e,t,n){return 11<e?n?"pm":"PM":n?"am":"AM"},lt("en",{eras:[{since:"0001-01-01",until:1/0,offset:1,name:"Anno Domini",narrow:"AD",abbr:"AD"},{since:"0000-12-31",until:-1/0,offset:1,name:"Before Christ",narrow:"BC",abbr:"BC"}],dayOfMonthOrdinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(e){var t=e%10;return e+(1===Z(e%100/10)?"th":1==t?"st":2==t?"nd":3==t?"rd":"th")}}),f.lang=n("moment.lang is deprecated. Use moment.locale instead.",lt),f.langData=n("moment.langData is deprecated. Use moment.localeData instead.",dt);var Yn=Math.abs;function On(e,t,n,s){var i=Zt(t,n);return e._milliseconds+=s*i._milliseconds,e._days+=s*i._days,e._months+=s*i._months,e._bubble()}function bn(e){return e<0?Math.floor(e):Math.ceil(e)}function xn(e){return 4800*e/146097}function Tn(e){return 146097*e/4800}function Nn(e){return function(){return this.as(e)}}var Pn=Nn("ms"),Rn=Nn("s"),Wn=Nn("m"),Cn=Nn("h"),Un=Nn("d"),Hn=Nn("w"),Fn=Nn("M"),Ln=Nn("Q"),Vn=Nn("y");function Gn(e){return function(){return this.isValid()?this._data[e]:NaN}}var En=Gn("milliseconds"),An=Gn("seconds"),jn=Gn("minutes"),In=Gn("hours"),Zn=Gn("days"),zn=Gn("months"),$n=Gn("years");var qn=Math.round,Bn={ss:44,s:45,m:45,h:22,d:26,w:null,M:11};function Jn(e,t,n,s){var i=Zt(e).abs(),r=qn(i.as("s")),a=qn(i.as("m")),o=qn(i.as("h")),u=qn(i.as("d")),l=qn(i.as("M")),h=qn(i.as("w")),d=qn(i.as("y")),c=(r<=n.ss?["s",r]:r<n.s&&["ss",r])||a<=1&&["m"]||a<n.m&&["mm",a]||o<=1&&["h"]||o<n.h&&["hh",o]||u<=1&&["d"]||u<n.d&&["dd",u];return null!=n.w&&(c=c||h<=1&&["w"]||h<n.w&&["ww",h]),(c=c||l<=1&&["M"]||l<n.M&&["MM",l]||d<=1&&["y"]||["yy",d])[2]=t,c[3]=0<+e,c[4]=s,function(e,t,n,s,i){return i.relativeTime(t||1,!!n,e,s)}.apply(null,c)}var Qn=Math.abs;function Xn(e){return(0<e)-(e<0)||+e}function Kn(){if(!this.isValid())return this.localeData().invalidDate();var e,t,n,s,i,r,a,o,u=Qn(this._milliseconds)/1e3,l=Qn(this._days),h=Qn(this._months),d=this.asSeconds();return d?(e=I(u/60),t=I(e/60),u%=60,e%=60,n=I(h/12),h%=12,s=u?u.toFixed(3).replace(/\.?0+$/,""):"",i=d<0?"-":"",r=Xn(this._months)!==Xn(d)?"-":"",a=Xn(this._days)!==Xn(d)?"-":"",o=Xn(this._milliseconds)!==Xn(d)?"-":"",i+"P"+(n?r+n+"Y":"")+(h?r+h+"M":"")+(l?a+l+"D":"")+(t||e||u?"T":"")+(t?o+t+"H":"")+(e?o+e+"M":"")+(u?o+s+"S":"")):"P0D"}var es=Ct.prototype;return es.isValid=function(){return this._isValid},es.abs=function(){var e=this._data;return this._milliseconds=Yn(this._milliseconds),this._days=Yn(this._days),this._months=Yn(this._months),e.milliseconds=Yn(e.milliseconds),e.seconds=Yn(e.seconds),e.minutes=Yn(e.minutes),e.hours=Yn(e.hours),e.months=Yn(e.months),e.years=Yn(e.years),this},es.add=function(e,t){return On(this,e,t,1)},es.subtract=function(e,t){return On(this,e,t,-1)},es.as=function(e){if(!this.isValid())return NaN;var t,n,s=this._milliseconds;if("month"===(e=V(e))||"quarter"===e||"year"===e)switch(t=this._days+s/864e5,n=this._months+xn(t),e){case"month":return n;case"quarter":return n/3;case"year":return n/12}else switch(t=this._days+Math.round(Tn(this._months)),e){case"week":return t/7+s/6048e5;case"day":return t+s/864e5;case"hour":return 24*t+s/36e5;case"minute":return 1440*t+s/6e4;case"second":return 86400*t+s/1e3;case"millisecond":return Math.floor(864e5*t)+s;default:throw new Error("Unknown unit "+e)}},es.asMilliseconds=Pn,es.asSeconds=Rn,es.asMinutes=Wn,es.asHours=Cn,es.asDays=Un,es.asWeeks=Hn,es.asMonths=Fn,es.asQuarters=Ln,es.asYears=Vn,es.valueOf=function(){return this.isValid()?this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*Z(this._months/12):NaN},es._bubble=function(){var e,t,n,s,i,r=this._milliseconds,a=this._days,o=this._months,u=this._data;return 0<=r&&0<=a&&0<=o||r<=0&&a<=0&&o<=0||(r+=864e5*bn(Tn(o)+a),o=a=0),u.milliseconds=r%1e3,e=I(r/1e3),u.seconds=e%60,t=I(e/60),u.minutes=t%60,n=I(t/60),u.hours=n%24,a+=I(n/24),o+=i=I(xn(a)),a-=bn(Tn(i)),s=I(o/12),o%=12,u.days=a,u.months=o,u.years=s,this},es.clone=function(){return Zt(this)},es.get=function(e){return e=V(e),this.isValid()?this[e+"s"]():NaN},es.milliseconds=En,es.seconds=An,es.minutes=jn,es.hours=In,es.days=Zn,es.weeks=function(){return I(this.days()/7)},es.months=zn,es.years=$n,es.humanize=function(e,t){if(!this.isValid())return this.localeData().invalidDate();var n,s,i=!1,r=Bn;return"object"==typeof e&&(t=e,e=!1),"boolean"==typeof e&&(i=e),"object"==typeof t&&(r=Object.assign({},Bn,t),null!=t.s&&null==t.ss&&(r.ss=t.s-1)),n=this.localeData(),s=Jn(this,!i,r,n),i&&(s=n.pastFuture(+this,s)),n.postformat(s)},es.toISOString=Kn,es.toString=Kn,es.toJSON=Kn,es.locale=tn,es.localeData=sn,es.toIsoString=n("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",Kn),es.lang=nn,C("X",0,0,"unix"),C("x",0,0,"valueOf"),ce("x",ue),ce("X",/[+-]?\d+(\.\d{1,3})?/),ye("X",function(e,t,n){n._d=new Date(1e3*parseFloat(e))}),ye("x",function(e,t,n){n._d=new Date(Z(e))}),f.version="2.29.1",e=Tt,f.fn=pn,f.min=function(){return Rt("isBefore",[].slice.call(arguments,0))},f.max=function(){return Rt("isAfter",[].slice.call(arguments,0))},f.now=function(){return Date.now?Date.now():+new Date},f.utc=_,f.unix=function(e){return Tt(1e3*e)},f.months=function(e,t){return Dn(e,t,"months")},f.isDate=a,f.locale=lt,f.invalid=w,f.duration=Zt,f.isMoment=M,f.weekdays=function(e,t,n){return Sn(e,t,n,"weekdays")},f.parseZone=function(){return Tt.apply(null,arguments).parseZone()},f.localeData=dt,f.isDuration=Ut,f.monthsShort=function(e,t){return Dn(e,t,"monthsShort")},f.weekdaysMin=function(e,t,n){return Sn(e,t,n,"weekdaysMin")},f.defineLocale=ht,f.updateLocale=function(e,t){var n,s,i;return null!=t?(i=st,null!=it[e]&&null!=it[e].parentLocale?it[e].set(b(it[e]._config,t)):(null!=(s=ut(e))&&(i=s._config),t=b(i,t),null==s&&(t.abbr=e),(n=new x(t)).parentLocale=it[e],it[e]=n),lt(e)):null!=it[e]&&(null!=it[e].parentLocale?(it[e]=it[e].parentLocale,e===lt()&&lt(e)):null!=it[e]&&delete it[e]),it[e]},f.locales=function(){return s(it)},f.weekdaysShort=function(e,t,n){return Sn(e,t,n,"weekdaysShort")},f.normalizeUnits=V,f.relativeTimeRounding=function(e){return void 0===e?qn:"function"==typeof e&&(qn=e,!0)},f.relativeTimeThreshold=function(e,t){return void 0!==Bn[e]&&(void 0===t?Bn[e]:(Bn[e]=t,"s"===e&&(Bn.ss=t-1),!0))},f.calendarFormat=function(e,t){var n=e.diff(t,"days",!0);return n<-6?"sameElse":n<-1?"lastWeek":n<0?"lastDay":n<1?"sameDay":n<2?"nextDay":n<7?"nextWeek":"sameElse"},f.prototype=pn,f.HTML5_FMT={DATETIME_LOCAL:"YYYY-MM-DDTHH:mm",DATETIME_LOCAL_SECONDS:"YYYY-MM-DDTHH:mm:ss",DATETIME_LOCAL_MS:"YYYY-MM-DDTHH:mm:ss.SSS",DATE:"YYYY-MM-DD",TIME:"HH:mm",TIME_SECONDS:"HH:mm:ss",TIME_MS:"HH:mm:ss.SSS",WEEK:"GGGG-[W]WW",MONTH:"YYYY-MM"},f});

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
;
/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a,b){"use strict";function c(a){this.callback=a,this.ticking=!1}function d(b){return b&&"undefined"!=typeof a&&(b===a||b.nodeType)}function e(a){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var b,c,f=a||{};for(c=1;c<arguments.length;c++){var g=arguments[c]||{};for(b in g)f[b]="object"!=typeof f[b]||d(f[b])?f[b]||g[b]:e(f[b],g[b])}return f}function f(a){return a===Object(a)?a:{down:a,up:a}}function g(a,b){b=e(b,g.options),this.lastKnownScrollY=0,this.elem=a,this.debouncer=new c(this.update.bind(this)),this.tolerance=f(b.tolerance),this.classes=b.classes,this.offset=b.offset,this.scroller=b.scroller,this.initialised=!1,this.onPin=b.onPin,this.onUnpin=b.onUnpin,this.onTop=b.onTop,this.onNotTop=b.onNotTop}var h={bind:!!function(){}.bind,classList:"classList"in b.documentElement,rAF:!!(a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame)};a.requestAnimationFrame=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame,c.prototype={constructor:c,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},g.prototype={constructor:g,init:function(){return g.cutsTheMustard?(this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var a=this.classes;this.initialised=!1,this.elem.classList.remove(a.unpinned,a.pinned,a.top,a.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var a=this.elem.classList,b=this.classes;(a.contains(b.pinned)||!a.contains(b.unpinned))&&(a.add(b.unpinned),a.remove(b.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var a=this.elem.classList,b=this.classes;a.contains(b.unpinned)&&(a.remove(b.unpinned),a.add(b.pinned),this.onPin&&this.onPin.call(this))},top:function(){var a=this.elem.classList,b=this.classes;a.contains(b.top)||(a.add(b.top),a.remove(b.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var a=this.elem.classList,b=this.classes;a.contains(b.notTop)||(a.add(b.notTop),a.remove(b.top),this.onNotTop&&this.onNotTop.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(b.documentElement||b.body.parentNode||b.body).scrollTop},getViewportHeight:function(){return a.innerHeight||b.documentElement.clientHeight||b.body.clientHeight},getDocumentHeight:function(){var a=b.body,c=b.documentElement;return Math.max(a.scrollHeight,c.scrollHeight,a.offsetHeight,c.offsetHeight,a.clientHeight,c.clientHeight)},getElementHeight:function(a){return Math.max(a.scrollHeight,a.offsetHeight,a.clientHeight)},getScrollerHeight:function(){return this.scroller===a||this.scroller===b.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(a){var b=0>a,c=a+this.getViewportHeight()>this.getScrollerHeight();return b||c},toleranceExceeded:function(a,b){return Math.abs(a-this.lastKnownScrollY)>=this.tolerance[b]},shouldUnpin:function(a,b){var c=a>this.lastKnownScrollY,d=a>=this.offset;return c&&d&&b},shouldPin:function(a,b){var c=a<this.lastKnownScrollY,d=a<=this.offset;return c&&b||d},update:function(){var a=this.getScrollY(),b=a>this.lastKnownScrollY?"down":"up",c=this.toleranceExceeded(a,b);this.isOutOfBounds(a)||(a<=this.offset?this.top():this.notTop(),this.shouldUnpin(a,c)?this.unpin():this.shouldPin(a,c)&&this.pin(),this.lastKnownScrollY=a)}},g.options={tolerance:{up:0,down:0},offset:0,scroller:a,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",initial:"headroom"}},g.cutsTheMustard="undefined"!=typeof h&&h.rAF&&h.bind&&h.classList,a.Headroom=g}(window,document);;
/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function(a){a&&(a.fn.headroom=function(b){return this.each(function(){var c=a(this),d=c.data("headroom"),e="object"==typeof b&&b;e=a.extend(!0,{},Headroom.options,e),d||(d=new Headroom(this,e),d.init(),c.data("headroom",d)),"string"==typeof b&&d[b]()})},a("[data-headroom]").each(function(){var b=a(this);b.headroom(b.data())}))}(window.Zepto||window.jQuery);;
var CalAcademy = function (todaysDate) {
	var $ = jQuery;
	var _isFontLoaded = false;
	var _device;
	var _orientationChangeTimeout;
	var _pages = calacademy.Statics.pageObjects;
	var _breakpoints = calacademy.Constants.breakpoints;
	var _scrollPosition;

	var _placeUnder = function (anchor, target) {
		if (anchor.length === 0 || target.length === 0) return;

		target.addClass('dynamic-css');
		target.css('position', 'absolute');

		target.css('top', anchor.position().top + calacademy.Utils.getRowHeight(anchor) + 'px');
		target.css('left', anchor.position().left + 'px');
	}

	var _clearClusterHeights = function () {
		calacademy.Utils.clearClusterHeights($('.skewed-tri-grid, .tri-col-highlight, .skewed-four-col'));
	}

	var _clusterLayout = function () {
		// put things in special places
		$('.skewed-tri-grid').each(function () {
			$('.views-row-1', this).find('.views-field-field-hero-region, .views-field-field-image-primary-1, .views-field-field-image-primary, .views-field-field-inline-image').addClass('mega-square');
			_placeUnder($('.views-row-1', this), $('.views-row-4', this));
			_placeUnder($('.views-row-2', this), $('.views-row-5', this));
			_placeUnder($('.views-row-3', this), $('.views-row-6', this));
		});

		$('.skewed-four-col').each(function () {
			_placeUnder($('.views-row-2', this), $('.views-row-5', this));
			_placeUnder($('.views-row-3', this), $('.views-row-6', this));
			_placeUnder($('.views-row-6', this), $('.views-row-7', this));
		});

		$('.tri-col-highlight').each(function () {
			var h = calacademy.Utils.getRowHeight($('.views-row-1', this)) + calacademy.Utils.getRowHeight($('.views-row-2', this)) + calacademy.Utils.getRowHeight($('.views-row-3', this));
			h -= $('.views-row-1 .views-field-field-hero-region, .views-row-1 .views-field-field-image-primary, .views-row-1 .views-field-field-slideshow-frame-bg-image', this).height();
			h += 75;

			$('.views-row-5', this).addClass('dynamic-css');
			$('.views-row-5', this).css('marginTop', '-' + h + 'px');
		});

		_clearClusterHeights();
	}

	var _getBgDimensions = function (containerWidth) {
		var w = 1920;
		var h = 970;

		return {
			computedHeight: Math.ceil((containerWidth * h) / w),
		}
	}

	var _midfeatureLayout = function () {
		$('.slideshow-midfeature').each(function () {
			var w = $('.slides li', this).outerWidth();

			$('.slides li', this).css('height', 'auto');
			var slideHeights = [];

			$('.slides li', this).each(function () {
				slideHeights.push($(this).outerHeight());

				// background positioning per field
				var el = $('.views-field-field-horizontal-offset-percenta, .field-name-field-horizontal-offset-percenta', this);
				var img = $('.field-name-field-slideshow-frame-bg-image, .views-field-field-slideshow-frame-bg-image', this);

				if (el.length == 1 && !isNaN(el.text())) {
					var per = el.text() + '%';

					// this only affects smaller viewports
					img.css('background-position', per + ' 0');
				}
			});

			// heighten slides to tallest
			$('.slides li', this).css('height', Math.max.apply(Math, slideHeights) + 'px');

			var height = $('.slideshow-midfeature-container').outerHeight(true);

			// bg image height
			var bgImg = $('.field-name-field-slideshow-frame-bg-image, .views-field-field-slideshow-frame-bg-image', this);
			var w = bgImg.outerWidth();
			var h = _getBgDimensions(w).computedHeight;
			if (h < height) h = height;
			bgImg.css('height', h);
			bgImg.css('top', Math.round((height - h) / 2) + 'px');

			// force next element below absolutely positioned slideshow
			if ($(this).parent().css('position') == 'absolute') {
				if ($(this).parent().next('.midfeature-shim').length == 0) {
					// insert a shim if we haven't already
					var shim = $('<div>.</div>');
					shim.addClass('midfeature-shim');

					$(this).parent().after(shim);
				}

				$(this).parent().next('.midfeature-shim').height(height);
			}
		});
	}

	var _setSlideshowLayout = function () {
		$('.flexslider').on('before', function () {
			$(this).addClass('animating');
		});

		$('.flexslider').on('after', function () {
			$(this).removeClass('animating');
		});

		$('.flexslider').each(function () {
			// add a class for no captions
			var captions = $(this).find('.views-field-field-slideshow-frame-caption, blockquote');

			if (captions.length == 0) {
				$(this).addClass('no-captions');
			}
		});

		$('.node-type-hub-page').find('.pane-hero-media-large-hero-image-pane, .pane-hero-media-slideshow-large, .pane-node-field-hero-region').each(function () {
			var captions = $(this).find('blockquote');

			if (captions.length == 0) {
				$('html').addClass('no-hub-hero-captions');
			}
		});

		// large slideshows get a special smartphone rendition
		$('.loaded .slideshow-hero-large img.delay-load').each(function () {
			if ($(window).width() < _breakpoints.tablet) {
				$(this).attr('src', $(this).data('smartphone-src'));
			} else {
				$(this).attr('src', $(this).data('src'));
			}
		});

		var _getReferenceElement = function (el) {
			if (el.hasClass('flex-control-paging') && el.parent().hasClass('slideshow-midfeature')) {
				if ($('html').hasClass('tablet')) {
					return el.parent().find('.flex-viewport');
				} else {
					return el.parent();
				}
			}

			var slider = el.closest('.flexslider');
			var pane = slider.closest('.panel-pane');
			var referenceElement = slider.find('img').first();

			if (pane.hasClass('slideshow-midfeature-container')) {
				referenceElement = pane;
			}

			return referenceElement;
		}

		$(window).on('resize.slideshow-layout', function () {
			// hack to resize svgs properly
			if ($('.svg-container svg').length > 0) {
				var swapsies = $('.svg-container svg').data('swapsies');

				if (swapsies) {
					$('.svg-container svg').css('height', '100%');
				} else {
					$('.svg-container svg').css('height', '99.99999%');
				}

				$('.svg-container svg').data('swapsies', !swapsies);
			}

			$('.slideshow-hero .slides > li').each(function () {
				var img = $('.views-field-field-slideshow-frame-bg-image, .field-name-field-slideshow-frame-bg-image', this);
				var caption = $('.views-field-field-slideshow-frame-caption', this);

				if ($.trim(caption.text()) == '') {
					$('.field-content, .field-item', caption).html('&nbsp;');
				}
			});

			$('.flex-control-paging').each(function () {
				var r = _getReferenceElement($(this));
				$(this).css('top', r.height() + 'px');
			});

			$('.flexslider .flex-direction-nav a').each(function () {
				var r = _getReferenceElement($(this));
				$(this).css('top', (Math.floor(r.height() / 2)) + 'px');
			});

			_midfeatureLayout();
		});

		$(window).trigger('resize.slideshow-layout');

		setTimeout(function () {
			$(window).trigger('resize.slideshow-layout');
		}, 100);

		if ($('.slideshow-midfeature').length > 0) {
			setInterval(_midfeatureLayout, 500);

			$('.slideshow-midfeature').each(function () {
				// hack to fix pagination styles
				var pager = $(this).find('.flex-control-paging');
				$(this).prepend(pager);
			});
		}
	}

	var _layout = function () {
		_setSmartphoneSubnavHeight();
		_clusterLayout();
	}

	var _registerBreakpoints = function () {
		enquire
		.register('screen and (min-width: ' + _breakpoints.smartphone + 'px) and (max-width: ' + (_breakpoints.tablet - 1) + 'px)', {
			match: function () {
				$('.dynamic-css').attr('style', '');
				_onBreakpoint('smartphone');
			}
		})
		.register('screen and (min-width: ' + _breakpoints.tablet + 'px) and (max-width: ' + _breakpoints.desktop + 'px)', {
			match: function () {
				_layout();
				_onBreakpoint('tablet');
			}
		})
		.register('screen and (min-width: ' + (_breakpoints.desktop + 1) + 'px)', {
			match: function () {
				_layout();
				_onBreakpoint('desktop');
			}
		});
	}

	var _initSubnavPosition = function () {
		// iterate each top level menu item and match left position of
		// its immediate dropdown
		$('.level-1 > .dropdown-toggle', $('nav').not('.smartphone-nav')).each(function () {
			var topLevelLeft = Math.round($(this).parent().position().left);
			var subNav = $(this).siblings('.dropdown-menu');

			// clear on smartphone break
			subNav.addClass('dynamic-css');

			// match position
			subNav.css('left', topLevelLeft + 'px');
		});
	}

	var _setSideScrollStyle = function () {
		if ($('.side-scroll').length == 0) return;

		$('.side-scroll .view-content, .side-scroll .views-row').attr('style', '');

		var numCols = 4;

		// create (non-smartphone) flexslider carousel
		$('.side-scroll').not('.cloned').each(function () {
			var isCarousel = $(this).find('.views-row').length > numCols;

			$(this).addClass('cloned');

			var pane = $('<div class="panel-pane side-scroll-carousel" />');
			pane.insertBefore($(this));
			pane.append($(this).find('.pane-title').clone());

			if (isCarousel) {
				var container = $('<div class="flexslider carousel" />');
				pane.append(container);

				var slides = $('<ul class="slides" />');
				container.append(slides);

				$(this).find('.views-row').each(function () {
					var li = $('<li />');
					li.append($(this).clone());
					slides.append(li);
				});

				container.flexslider({
					animation: 'slide',
					slideshow: false,
					controlNav: false,
					animationLoop: false,
					itemWidth: $(this).find('.views-row').first().outerWidth(),
					maxItems: numCols
				});
			} else {
				pane.addClass('image-top-four-columns');
				pane.append($(this).find('.view').clone());
			}
		});

		// move title
		$('.side-scroll .pane-title').each(function () {
			var pane = $(this).closest('.panel-pane');
			var div = $('<div class="panel-pane moved-title" />');
			div.append($(this));
			div.insertBefore(pane);
		});

		$(window).off('.side-scroll');

		if (_device != 'smartphone') return;

		$(window).on('resize.side-scroll', function () {
			// side scroll
			$('.side-scroll .view-content, .side-scroll .views-row').attr('style', '');

			$('.side-scroll .view-content').each(function () {
				var rows = $(this).find('.views-row');

				if (rows.length > 2) {
					$(this).closest('.side-scroll').addClass('more-than-two');

					var padding = parseInt(rows.first().css('padding-right'));
					var minWidth = $(this).closest('.side-scroll').outerWidth() / 1.5;
					minWidth -= padding / rows.length;
					rows.css('min-width', minWidth + 'px');

					var rowWidth = rows.first().outerWidth();
					var containerWidth = rowWidth * rows.length;
					containerWidth += padding * 2;
					$(this).css('width', containerWidth + 'px');
				} else {
					$(this).css('width', '100%');
					rows.css('width', '50%');
					rows.css('min-width', '50%');
				}
			});
		});

		$(window).trigger('resize.side-scroll');
	}

	var _onBreakpoint = function (device) {
		_device = device;
		calacademy.Statics.device = device;
		calacademy.Utils.log('break! (' + _device + ')');

		// remove all device classes
		$.each(['smartphone', 'tablet', 'desktop'], function (i, val) {
			$('html').removeClass(val);
		});

		// add the new one
		$('html').addClass(_device);

		_setSlideshowLayout();
		_setSideScrollStyle();

		$.each(_pages, function (i, obj) {
			if (typeof(obj.onBreakpoint) == 'function') {
				obj.onBreakpoint(device);
			}
		});

		$(document).trigger('breakpoint', [ _device ]);
	}

	var _onFontLoad = function () {
		// do the layout once on the first font load
		if (_isFontLoaded) return;
		_isFontLoaded = true;

		$('html').addClass('wf-active');

		// _layout gets fired
		_registerBreakpoints();

		// trigger page object callbacks
		var i = _pages.length;

		while (i--) {
			var obj = _pages[i];

			if (typeof(obj.onFontLoad) == 'function') {
				obj.onFontLoad();
			}
		}
	}

	var _onOrientationChange = function () {
		_layout();

		var i = _pages.length;

		while (i--) {
			var obj = _pages[i];

			if (typeof(obj.layout) == 'function') {
				obj.layout();
			}
		}
	}

	var _addMSIEClasses = function () {
		calacademy.Utils.log('isMSIE: ' + isMSIE);

		if (isMSIE) {
			$('html').addClass('ie');
		} else {
			$('html').addClass('not-ie');
		}

		var probIE = 'ActiveXObject' in window;
		calacademy.Utils.log('probIE: ' + probIE);

		if (probIE) {
			$('html').addClass('probably-ie');
		} else {
			$('html').addClass('probably-not-ie');
		}
	}

	var _isValidSearchInput = function (str) {
		str = $.trim(str);

		if (str == '') return false;
		if (str == calacademy.Constants.defaultSearchText) return false;

		return true;
	}

	var _initDefaultText = function () {
		var field = $('.block-search-form #search-field, #search-field-404');
		var label = field.siblings('label');

		if (label.length > 0) {
			calacademy.Constants.defaultSearchText = $.trim(label.eq(0).text());
		}

		if (field.attr('placeholder')) {
			calacademy.Constants.defaultSearchText = field.attr('placeholder');
		}

		field.attr('placeholder', calacademy.Constants.defaultSearchText);
		field.attr('length', calacademy.Constants.defaultSearchText.length);
		field.defaultValue();
	}

	var _initSearchUI = function () {
		var btn = $('.block-search-form .toggle');
		var close = $('.block-search-form .close');
		var form = $('.block-search-form form');
		var field = $('.block-search-form input[type="search"]');
		var myEvent = 'touchend click';

		field.val('');

		close.on(myEvent, function () {
			$('html').removeClass('search-open');
			return false;
		});

		btn.on(myEvent, function () {
			$('html').toggleClass('search-open');

			// focus search field
			if ($('html').hasClass('search-open')) {
				if ($('html').hasClass('smartphone-nav-open')) {
					_collapseSmartphoneNav();
				}

				// workaround
				$('html').addClass('search-open');

				field.focus();
			}

			_setSmartphoneSubnavHeight();
			return false;
		});

		$(window).on('scroll.nav-ui', function () {
			// collapse search on homepage scroll if search doesn't have focus
			if ($('html').hasClass('search-open')
				&& $('body').hasClass('page-homepage')
				&& !$('.block-search-form .form-type-textfield input').is(':focus')) {
				field.val('');
				btn.trigger(myEvent);
			}

			_setSmartphoneSubnavHeight();
		});

		if (Modernizr.touch) {
			$('body').on('touchmove', '*', function (e) {
				var nav = $(e.target).parents('nav, #top-level-nav-wrapper');

				if (nav.length == 0) {
					$(window).trigger('scroll.nav-ui');
				}
			});
		}

		field.on('input', function (e) {
			if (_isValidSearchInput($(this).val())) {
				form.addClass('enabled');
			} else {
				form.removeClass('enabled');
			}
		});

		form.off();

		form.on('submit', function (e) {
			var f = $(this).find('input[type="search"]');

			if (!_isValidSearchInput(f.val())) {
				f.val('');
				return false;
			}

			return true;
		});
	}

	var _setSmartphoneSubnavHeight = function () {
		// just set to auto since the nav isn't open
		if (!$('html').hasClass('smartphone-nav-open') || _device != 'smartphone') {
			$('nav:visible .tb-megamenu-nav').css('height', 'auto');
			$('nav:visible .level-0').parent().css('height', '0px');
			return;
		}

		// start with viewport height
		var h = window.innerHeight ? window.innerHeight : $(window).height();

		// subtract fixed item height
		h -= $('nav:visible .btn-navbar').outerHeight();

		// account for page offset
		h -= $('nav:visible').position().top - window.pageYOffset;

		$('nav:visible .tb-megamenu-nav').css('height', h + 'px');
		$('nav:visible .level-0').parent().css('height', 'auto');
	}

	var _collapseSmartphoneNav = function (suppressTrigger) {
		if ($('html').hasClass('smartphone-nav-open')) {
			if (!suppressTrigger) {
				var myEvent = Modernizr.touch ? 'touchend' : 'click';
				$('.tb-megamenu button').trigger(myEvent);
			}

			$('html').removeClass('smartphone-nav-open');

			if (typeof(_scrollPosition) == 'number') {
				$('html, body').scrollTop(_scrollPosition);

				// hacky chrome fix
				$('html, body').animate({
					scrollTop: _scrollPosition
				}, 50);
			}
		}
	}

	var _initNav = function () {
		// skip tabbing
		$('.page-homepage #main-nav a[href="/"]').attr('tabindex', '-1');

		// map dropdown focus to hover
		$('#main-nav').find('.dropdown-toggle').on('focus', function () {
			$('#main-nav').find('.dropdown-toggle').trigger('mouseout');
			$(this).trigger('mouseover');
		});

		$('#main-nav').find('a, button').on('blur', function () {
			var ul = $(this).closest('ul');

			if (ul.hasClass('tb-megamenu-subnav')) {
				if ($(this).closest('li').is(':last-child')) {
					$('#main-nav').find('.dropdown-toggle').trigger('mouseout');
				}
			}
		});

		// nav style
		if ($('.first-menu-link-ibss').length > 0) {
			$('body').addClass('section-researchers');
		}
		if ($('.first-menu-link-edu').length > 0) {
			$('body').addClass('section-educators');
		}

		$('nav .suppress-link > a').attr('href', '#');

		// toggle a class on the responsive nav hamburger on click
		var myEvent = Modernizr.touch ? 'touchend' : 'click';

		$('.tb-megamenu-button').on(myEvent, function (e) {
			if ($('html').hasClass('smartphone-nav-open')) {
		    	_collapseSmartphoneNav(true);
		    } else {
				_scrollPosition = $(document).scrollTop();
		    	$('html').addClass('smartphone-nav-open');
		    	$('html').removeClass('search-open');
		    }

		    _setSmartphoneSubnavHeight();
		});

		// collapse nav on window resize if open
		$(window).on('resize.smartphone-nav', _setSmartphoneSubnavHeight);

		_fixTouchNav();
		_hackMegamenu();
		_addNavInteraction();

		if (Modernizr.csspositionsticky && $('html').hasClass('scroll-collapse')) {
			$('html').headroom();
		}

		$(window).on('resize.position-nav', _positionNav);
		$(window).trigger('resize.position-nav');

		$('body').attr('style', 'min-height: 100%;');

		setTimeout(function () {
			$('body').attr('style', 'min-height: 100%;');
			$('html').addClass('nav-init');
		}, 300);

		// collapse on scroll
		var nc = $('<div />');
		nc.addClass('color-block');
		$('body').prepend(nc);

		$('html').addClass('has-nav-compression');
		var h = $('#top-level-nav-wrapper').outerHeight();
		var lastScrollPos = 0;

		$(window).on('scroll.compress-nav resize.compress-nav', function () {
			if ($('html').hasClass('full-viewport')) {
				$('html').addClass('compress-nav');
				$(this).off('.compress-nav');
				return;
			}

			var s = $(this).scrollTop();

			if (!isNaN(s) && (s != (lastScrollPos + h))) {
				if (!isNaN(s) && (s > 200)) {
					$('html').addClass('compress-nav');
					$('#top-level-nav-wrapper').css('transform', 'translateY(' + (h * -1) + 'px)');
					_positionNav(true);
				} else {
					$('html').removeClass('compress-nav');
					$('#top-level-nav-wrapper').css('transform', 'translateY(0px)');
					_positionNav();
				}
			}
			lastScrollPos = s;

		});

		$(window).trigger('scroll.compress-nav');
	}

	var _positionNav = function (forceAlertHide) {
		// nav
		var h = $('#top-level-nav-wrapper').outerHeight();
		if (!$('#top-level-nav-wrapper').is(':visible')) h = 0;
		if (forceAlertHide === true) h = 0;

		$('nav:visible').css('top', h);

		// content
		var top = $('nav:visible').outerHeight();
		top += h;

		var cb = $('.color-block');

		if (cb.length == 1) {
			var calcTop = (cb.outerHeight() * -1) + top;
			cb.css('top', calcTop);

			// account from some browser glitchiness
			if (calcTop == cb.position().top) {
				cb.addClass('positioned');
			} else {
				cb.removeClass('positioned');
			}
		}

		$('.search-form-container, .node-type-3d-object #content').css('top', top);
		$('.node-type-gigamacro-specimen #content').css('top', $('.block-search-form .toggle').outerHeight());

		var bgCol = $('#nav-wrapper').css('background-color');
		$('.node-type-es-landing-page #content, nav + div, nav + header').css('border-top', top + 'px solid ' + bgCol);

		$('.csspositionsticky .clone-container').css('top', top);

		$('.chimera-container-page body .chimera').attr('style', '');

		if (!$('html').hasClass('smartphone') && $('html').hasClass('compress-nav')) top -= 50;
		$('.csspositionsticky .node-tabular-data .clone-container').css('top', top);
		$('.chimera-container-page.chimera-takeover body .chimera').css('top', top);

		var hWithPadding = $('html').hasClass('smartphone') ? h + 12 : h + 20;
		$('.node-type-event #content, .node-type-event-nightlife #content, .node-type-blog .pane-node-title, .section-blogs .educator-search').css('padding-top', hWithPadding);

		// exceptions
		$('.page-map #main').attr('style', '');

		// make sure footer fills short pages
		var bottom = $('#footer .bottom');
		bottom.css('height', 'auto');

		var diff = $(window).height() - $('#page').outerHeight();

		if (diff > 0 && !$('html').hasClass('full-viewport')) {
			bottom.css('height', bottom.outerHeight() + diff);
		}
	}

	var _hackMegamenu = function () {
		var el = $('nav .nav-child .nav-child');
		el.attr('class', 'nav-next-level');

		$('.tb-megamenu-column', $('.mega-col-nav').not('.featured')).removeClass('tb-megamenu-column');
		$('.dropdown-submenu').removeClass('dropdown-submenu');
	}

	var _addNavInteraction = function () {
		if ($('#main-nav .level-0 > li:last-child').hasClass('active')) {
			$('#main-nav .level-0').addClass('last-over');
		}

		if (Modernizr.touch) {
			$('#main-nav .level-0 > li > a').on('touchend touchstart click', function (e) {
				// doubletap required for top level links except for
				// those without a dropdown or if smartphone
				if ($(this).parent().hasClass('suppress-link') || ($(this).siblings().length > 0 && _device != 'smartphone')) {
					e.preventDefault();
					return false;
				}
			});

			$('#main-nav .level-0 > li > a').hammer().on('doubletap', function (e) {
				if (!$(this).parent().hasClass('suppress-link')) {
					window.location.href = $(this).attr('href');
				}

				e.preventDefault();
			});

			$('#main-nav .level-0 > li').hammer().on('tap', function (e) {
				_removeMenuBorder();

				if ($(this).is(':last-child')) {
					$(this).parent().addClass('last-over');
				}

				$('#main-nav .level-0 > li').removeClass('open');
				_initSubnavPosition();
				$(this).addClass('open');

				e.preventDefault();
			});
		} else {
			$('#main-nav .level-0 > li').on('mouseover', function () {
				if ($(this).is(':last-child')) {
					$(this).parent().addClass('last-over');
				}

				_initSubnavPosition();
				$(this).addClass('open');
			});

			$('#main-nav .level-0 > li').on('mouseout', function () {
				_removeMenuBorder();
				$(this).removeClass('open');
			});

			$('#main-nav .level-0 > li.suppress-link > a').on('click', function (e) {
				return false;
			});
		}
	}

	var _removeMenuBorder = function () {
		if ($('#main-nav .level-0 > li:last-child').hasClass('active')) return;
		$('#main-nav .level-0').removeClass('last-over');
	}

	var _isNavOpen = function () {
		return $('nav .tb-megamenu-item').hasClass('open');
	}

	var _fixTouchNav = function () {
		if (!Modernizr.touch) return;

		// close the nav when touching anything other than itself
		$('body').on('touchstart', '*', function (e) {
			var nav = $(e.target).parents('nav');

			if (nav.length == 0) {
				$('nav a').removeClass('tb-megamenu-clicked');
				$('nav .tb-megamenu-item').removeClass('open');
				_removeMenuBorder();
			}
		});

		// account for weird bfcaching (back-forward cache) behavior
		$(window).bind('pageshow', function (event) {
		    try {
			    if (event.originalEvent.persisted) {
			        $('body').trigger('touchstart');
			        $('.block-search-form .form-type-textfield input').val('');
			        _collapseSmartphoneNav();
			    }
		    } catch (err) {}
		});
	}

	var _initSlideshow = function () {
		// svg overlay
		$('.page-homepage .views-field-field-svg-overlay, .page-homepage .views-field-field-svg-overlay-smartphone').each(function () {
			var link = $(this).siblings('.views-field-field-title-link');
			var container = $('<div class="svg-container" />');
			var artboard;

			if ($(this).hasClass('views-field-field-svg-overlay-smartphone')) {
				container.addClass('svg-container-smartphone');
				artboard = '0 0 744 552';
			} else {
				container.addClass('svg-container-desktop');
				artboard = '0 0 960 460';
			}

			if ($('.views-field-field-svg-overlay-smartphone', $(this).parent()).length == 1) {
				$(this).parent().addClass('smartphone-svg');
			} else {
				$(this).parent().addClass('no-smartphone-svg');
			}

			container.load($.trim($(this).text()) + ' svg', function () {
				// basic security
				$('script', this).remove();

				// svg doesn't work with standard jQuery DOM manipulation
				try {
					var svg = $('svg', this).get(0);
					svg.setAttribute('viewBox', artboard);
					svg.setAttribute('width', '100%');
					svg.setAttribute('height', '100%');
					svg.removeAttribute('id');
				} catch (e) {}

				$(this).addClass('svg-loaded');
			});

			$(this).after(container);

			if (link.length == 1) {
				container.parent().addClass('with-link');

				container.parent().on('click', function () {
					window.location.href = $.trim(link.text());
					return false;
				});
			}
		});

		$('.slideshow-midfeature .flexslider .slides li').each(function () {
			// set the highlight color
			var highlight = $('.container > .views-field-field-highlight-color, .container > .field-name-field-highlight-color', this);

			if (highlight.length == 1) {
				var colorTerm = $.trim(highlight.text());
				$(this).addClass('highlight-' + colorTerm.toLowerCase());
			}

			// set the background color
			var colorData = $('.container > .views-field-field-bg-color, .container > .field-name-field-bg-color', this);

			if (colorData.length == 1) {
				var hex = $.trim(colorData.text());
				$(this).css('background-color', hex);
			}

			// bg img gets set onload
		});

		$('.slideshow-midfeature-colorized').each(function () {
			// color theme
			var theme = $.trim($(this).find('.color-theme').html().toLowerCase());
			$(this).addClass('color-theme-' + theme);

			$(this).find('li').each(function () {
				var t = $('<div />');
				t.addClass('text-container');
				$(this).append(t);

				t.append($(this).find('h3, > p, .cta-button'));
				t.append($(this).find('blockquote'));

				// wrapper
				var w = $('<div />');
				w.addClass('container');
				$(this).wrapInner(w);

				if ($(this).find('img').length == 0) {
					$(this).addClass('no-image');
				}
			});
		});

		_suppressAutoAdvance();
	}

	var _suppressAutoAdvance = function () {
		$('.views-field-field-autoplay').each(function () {
			var suppress = parseInt($(this).text());

			if (suppress === 1) {
				var parent = $(this).parent();

				if ($('.flexslider', parent).length == 1) {
					var id = $('.flexslider', parent).attr('id');
					$('#' + id).flexslider('pause');
				}
			}
		});
	}

	var _initDatepicker = function () {
		// close desktop datepicker on scroll, nav hover and outside touch
		$(window).on('scroll.datepicker-collapse', function () {
			if (_device != 'smartphone') {
				try {
					$('.date-popup-init').datepicker('hide');
				} catch (e) {}
			}
		});

		var myEvent = Modernizr.touch ? 'touchend.datepicker-collapse' : 'mouseover.datepicker-collapse';

		$('.level-0 > li > a').on(myEvent, function () {
			$(window).trigger('scroll.datepicker-collapse');
		});

		// iPad fix, clicking outside the datepicker doesn't collapse
		if (Modernizr.touch) {
			$('body').on('touchstart', '*', function (e) {
				var cal = $(e.target).parents('.ui-datepicker');

				if (cal.length == 0) {
					$(window).trigger('scroll.datepicker-collapse');
				}
			});
		}
	}

	var _isWebformRequiredTextFulfilled = function(el) {
		var valid = true;
		el.find(':input[type="text"], :input[type="email"], textarea, select, :input[type="number"]').each(function() {
			if ($(this).hasClass('required')) {
				if ($(this).val() == '') {
					valid = false;
				}
			}
		});
		el.find('div.webform-component-date label span.form-required').each(function() {
			if ($(this).parent().parent().find('select.year').val() == "") {
				valid = false;
			}
			if ($(this).parent().parent().find('select.month').val() == "") {
				valid = false;
			}
			if ($(this).parent().parent().find('select.day').val() == "") {
				valid = false;
			}
		});
		el.find('div.webform-component-checkboxes label span.form-required').each(function() {
			if ($(this).parent().parent().find('input:checked').length < 1) {
				valid = false;
			}
		});
		el.find('div.webform-component-radios label span.form-required').each(function() {
			if ($(this).parent().parent().find('input:checked').length < 1) {
				valid = false;
			}
		});

		return valid;
	}

	var _stripEmojis = function (el, e) {
		var orig = el.val();

		if (typeof(orig) == 'string') {
			var clean = orig.stripEmojis();

			if (clean != orig) {
				el.val(clean);
			}
		}
	}

	var _initWebforms = function () {
		// fix css nav bug on ios focus
		$('html').touchFix({
			inputElements: '.webform-client-form input, .webform-client-form textarea, .webform-client-form select',
        	addClass: 'fixfixed'
		});

		// accessibility enhancement
		$('.webform-client-form .required').attr('aria-required', 'true');

		// if showing a form response, add a class for styling
		if ($('.messages--status').length > 0) {
			$('body').addClass('webform-response');
		}

		// default values
		$(".webform-client-form input[type='text'], .webform-client-form input[type='email'], .webform-client-form textarea").each(function () {
			$(this).attr('placeholder', $(this).val());
			$(this).val('');
			$(this).defaultValue();
		});

		// default disabled submit button
		$(".webform-client-form input.form-submit").addClass('disable');

		// prevent double submit click
		$(".webform-client-form").on('submit', function () {
			$(".webform-client-form input.form-submit").addClass('disable');
		});

		// redefine some validator stuff with additional functionality
		$('.webform-client-form').each(function () {

			//init keyup listening to enable submit on required input text (inc. number)
			var _form = $(this);

			_form.find(':input[type="text"], :input[type="email"], textarea, :input[type="number"]').on('paste input', function (e) {
				_stripEmojis($(this), e);
			});

			_form.find(':input[type="text"], :input[type="email"], textarea, :input[type="number"]').keyup(function (e) {
				_stripEmojis($(this), e);

				if ($(this).hasClass('required')) {
					if (_isWebformRequiredTextFulfilled(_form)) {
						$(".webform-client-form input.form-submit").removeClass('disable');
					} else {
						$(".webform-client-form inout.form-submit").addClass('disable');
					}
				}
			});
			//init change listening to enable submit on required select, checkbox, radio, number
			_form.find('select, :input[type="checkbox"], :input[type="radio"], :input[type="number"]').change(function (e) {
				_stripEmojis($(this), e);

				if (($(this).hasClass('required')) || (($(this).parent().parent().parent().find('span.form-required').length !==0))) {
					if (_isWebformRequiredTextFulfilled(_form)) {
						$(".webform-client-form input.form-submit").removeClass('disable');
					} else {
						$(".webform-client-form input.form-submit").addClass('disable');
					}
				}
			});

			// if recaptcha, make sure it is checked
			_form.find('.g-recaptcha').each(function() {
				var recaptchaIntervalCheck = setInterval(function() {
					var response = grecaptcha.getResponse();
					if(response.length == 0) {
						// not verified
						$(".webform-client-form input.form-submit").addClass('disable');
					} else {
						if (_isWebformRequiredTextFulfilled(_form)) {
							$(".webform-client-form input.form-submit").removeClass('disable');
						} else {
							$(".webform-client-form input.form-submit").addClass('disable');
						}
					}
				}, 1000);
			});

			if (typeof($(this).validate) != 'function') return;

			var settings = $(this).validate().settings;
			var highlight = settings.highlight;
			var unhighlight = settings.unhighlight;

			settings.highlight = function (element, errorClass, validClass) {
				var parent = $(element).parents('.form-item').first();
				parent.addClass('calacademy-' + errorClass).removeClass('calacademy-' + validClass);

				highlight(element, errorClass, validClass);
			}

			settings.unhighlight = function (element, errorClass, validClass) {
				var parent = $(element).parents('.form-item').first();
				parent.removeClass('calacademy-' + errorClass).addClass('calacademy-' + validClass);

				unhighlight(element, errorClass, validClass);
			}
		});

		// parse checkbox options and add some markup for styling
		$('.webform-component-checkboxes label.option').each(function () {
			var str = $(this).text();

			if (str.indexOf(': ') >= 0) {
				str = str.replace(': ', '<p>');
				str += '</p>';

				$(this).html(str);
			}
		});

		// parse radio options and add some markup for styling
		$('.webform-component-radios label.option').each(function () {
			var str = $(this).text();

			if (str.indexOf(': ') >= 0) {
				str = str.replace(': ', '<p>');
				str += '</p>';

				$(this).html(str);
			}
		});

		// replace default required field text
		$('.webform-client-form span.form-required').each(function () {
			$(this).html('required');
		});

	}

	var _initPopups = function () {
		if (typeof($.fn.popupwindow) != 'function') return;
		$('.popup-trigger').popupwindow(calacademy.Constants.popUpProfiles);
	}

	var _initFAQ = function () {
		$('.faq-answer-container .field-name-field-inline-image').each(function () {
			var p = $(this).parent();
			p.addClass('has-image');

			// wrap image in link if specified
			var link = p.find('.field-name-field-blurb-title-link');
			var url = false;

			if (link.length == 1) {
				url = $.trim(link.text());
			} else {
				var cta = p.find('.field-name-field-email-cta-link a');

				if (cta.length == 1) {
					url = cta.prop('href');
				}
			}

			if (url) {
				$(this).wrap('<a href="' + url + '"></a>');
			}
		});

		// accessibility enhancement
		var selectEvent = Modernizr.touch ? 'touchend' : 'click';
		var btns = $('.faq > .field > .field-items > .field-item .field-name-field-question');

		btns.attr({
			'role': 'button',
			'tabindex': '0'
		});

		btns.on(selectEvent, function () {
			$(this).parent().toggleClass('open');
		});

		btns.on('keyup', function (e) {
			var enabled = $(this).css('pointer-events') != 'none' && !$(this).is(':disabled');

			if (enabled && e.keyCode == jQuery.ui.keyCode.ENTER) {
				$(this).trigger(selectEvent);
			}
		});
	}

	var _addSectionClasses = function () {
		if ($('.nav-educators').length > 0) {
			$('body').addClass('section-educators');
		}
	}

	var _addChatLinkClasses = function () {
		var selector = 'a[href="/chat"], a[href="http://www.calacademy.org/chat"], a[href="https://www.calacademy.org/chat"], ';
		selector += 'a[href="/chat/"], a[href="http://www.calacademy.org/chat/"], a[href="https://www.calacademy.org/chat/"]';

		// add popup functionality
		$(selector).attr('rel', 'chat');
		$(selector).addClass('popup-trigger');

		// hide when call center not open
		var standaloneChatLinks = $(selector, '.field-type-link-field').addClass('call-center-link');
	}

	var _clearEmptyRightRail = function () {
		if ($('.right-rail #ibss-downloadables .view-content').length == 0) return;

		var str = $.trim($('.right-rail #ibss-downloadables .view-content').text());
		if (str != '') return;

		// remove the panel
		$('.right-rail #ibss-downloadables').remove();

		// some compensatory styles
		$('.right-rail article').eq(0).css({
			'border': 0,
			'padding-top': 0
		});
	}

	var _fixShareButtonToggleStyles = function () {
		// if share buttons are turned off for a node, remove the border from the next article element
		if ($.trim($('.right-rail .pane-title').eq(0).text()) == '') {
			$('.right-rail .pane-title').eq(0).remove();

			$('.right-rail article').eq(0).css({
				'border': 0,
				'padding-top': 0
			});
		}
	}

	var _isSupported = function () {
		// manual override
		if ($('html').hasClass('unsupported')) return false;

		// dismissed
		if ($.cookie('dismiss-unsupported', Number)) return true;

		if (Modernizr.touch) {
			if (calacademy.Utils.isMobile.iOS() && !Modernizr.csspositionsticky) {
				// < iOS 7
				return false;
			} else {
				// other touch devices
				return true;
			}
		}

		var v = parseFloat(calacademy.Statics.browser.version);

		// can't determine version, assume ok
		if (isNaN(v)) return true;

		var ua = calacademy.Statics.browser.name.toLowerCase();

		// IE
		if (ua == 'ie' && v < 10) return false;

		// Firefox
		var _isFirefox = ua.indexOf('firefox') > -1;
		if (_isFirefox && v < 11) return false;

		return true;
	}

	var _unsupported = function () {
		if (_isSupported()) return;

		$('html').addClass('unsupported');

		var d = $('<div />');
		d.addClass('unsupported-msg');
		d.html('<p>For optimal viewing and security, we recommend that you <a href="/supported-browsers">update</a> your browser. <a href="#" class="dismiss">Dismiss</a></p>');

		var e = Modernizr.touch ? 'touchend' : 'click';

		$('.dismiss', d).on(e, function () {
			$.cookie('dismiss-unsupported', '1');
			$('.unsupported-msg').remove();
			return false;
		});

		$('body').prepend(d);
	}

	var _redirectIframeContainers = function () {
		// not relevant
		if (!$('body').hasClass('iframe-container')) return;
		if ($('#content .panel-pane iframe').length != 1) return;

		var iframeSrc = $('#content .panel-pane iframe').attr('src').toLowerCase();

		// agnostic protocol
		if (iframeSrc.indexOf('//') == 0) return;

		var currentProtocol = document.location.protocol;

		if (iframeSrc.indexOf(currentProtocol) != 0) {
			// not a match, switch protocols
			var otherProtocol = (currentProtocol == 'https:') ? 'http:' : 'https:';
			window.location.href = window.location.href.replace(currentProtocol, otherProtocol);
		}
	}

	var _processArticleSections = function () {
		$('.view-display-id-panel_pane_blog_article_section .view-content > div, .view-display-id-panel_pane_ibss_project_article_section .view-content > div').each(function () {
			// $(this).addClass('views-row');

			// if inline image
			if ($('.views-field-field-inline-image img', this).length > 0) {
				$(this).addClass('has-inline-image');

				// wrap in first cta button if present else cta link if present
				if ($('.views-field-field-cta-button a', this).length > 0) {
					var link = $('.views-field-field-cta-button a', this).first().clone();
					link.empty();
					link.addClass('img-link');
					$('.views-field-field-inline-image img', this).wrap(link);
				} else
				if ($('.views-field-field-cta-link a', this).length > 0) {
					var link = $('.views-field-field-cta-link a', this).first().clone();
					link.empty();
					link.addClass('img-link');
					$('.views-field-field-inline-image img', this).wrap(link);
				}
			}

			// if text
			var hasText = false;

			$(this).children('.views-field').each(function () {
				if (!$(this).hasClass('views-field-field-subtitle')
					&& !$(this).hasClass('views-field-field-autoplay')) {

					var text = $.trim($(this).text());

					if (text != '') {
						hasText = true;
					}
				}

				if (!$(this).hasClass('views-field-field-inline-image')
					&& !$(this).hasClass('views-field-field-youtube-video')) {
					var text = $.trim($(this).text());

					if (text == '') {
						$(this).addClass('empty');
					}
				}
			});

			if (!hasText) {
				$(this).addClass('no-txt');
			}
		});
	}

	var _modifyYouTube = function () {
		// load iframe API if necessary
		if (typeof(YT) == 'undefined') {
			$.getScript('https://www.youtube.com/iframe_api');
		}

		// see /sites/all/modules/custom/calacademy_cam_control/CamControl.js for custom ptz code
		if ($('#live-stream-container').length > 0) return;

		window.onYouTubeIframeAPIReady = function () {
			$('.field-type-youtube').each(function () {
				if ($(this).find('iframe').length == 0) return true;

				var iframe = $(this).find('iframe');
				var src = iframe.attr('src');
				var arr = src.split('?');
				var youtubeId = arr[0].split('/').pop();
				var params = new URLSearchParams(arr[1]);

				// check for autoplay field
				var autoplay = $(this).parent().find('.field-name-field-autoplay');
				var isAutoplay = false;
				
				if (autoplay.length == 1) {
					if (parseInt($.trim(autoplay.text()))) {
						isAutoplay = true;
						params.set('autoplay', 1);
						params.set('mute', 1);
					}
				}

				// replace existing iframe
				var id = iframe.attr('id');
				var el = $('<div id="' + id + '" />');
				el.insertBefore(iframe);
				iframe.remove();

				var field = $(this);
				var player;

				var fallbackTimeout = setTimeout(function () {
					if (!isAutoplay) return;
					// _onYouTubeError(field, player, id);
				}, 8000);

				player = new YT.Player(id, {
					videoId: youtubeId,
					playerVars: Object.fromEntries(params),
					events: {
						'onStateChange': function (e) {
							if (e.data == YT.PlayerState.PLAYING) {
								clearTimeout(fallbackTimeout);
							}
						},
						'onAutoplayBlocked': function () {
							clearTimeout(fallbackTimeout);
						},
						'onError': function (e) {
							clearTimeout(fallbackTimeout);
							_onYouTubeError(field, e.target, id);
						}
					}
				});
			});
		}
	}

	var _onYouTubeError = function (field, player, id) {
		// load fallback once
		if (field.hasClass('yt-fallback')) return;

		var fallbackId = field.parent().find('.field-name-field-fallback-youtube-video');

		if (fallbackId.length == 1 && $.trim(fallbackId.text()) != '') {
			player.loadVideoById($.trim(fallbackId.text()));
			field.addClass('yt-fallback');

			if (typeof(calacademy.onVideoFallback) == 'function') {
				calacademy.onVideoFallback(id);
			}
		}
	}

	var _cloneAlerts = function () {
		// gather content
		var og = $('.alerts .flexslider');
		var content = [];

		$('.slides > li', og).each(function () {
			var field = $('.views-field-field-clone-to-homepage', this);

			if (field.length == 1) {
				if (parseInt(field.text()) == 1) {
					content.push($('.views-field-body', this).html());
				}
			}
		});

		// long alerts
		$('.alerts-long > .view-alerts .slides > li').each(function () {
			content.push($('.views-field-body', this).html());
		});

		// any alerts to clone?
		if (content.length == 0) return;

		// create a new slideshow container and insert it into the DOM
		var alerts = $('<div class="flexslider"><ul class="slides"></ul></div>');
		$('.node-right-rail-hours li:first-child h3').after(alerts);

		// populate container with content
		var homepageUl = $('<ul />');
		var i = content.length;

		while (i--) {
			var li = $('<li />');
			li.html(content[i]);
			$('.slides', alerts).prepend(li);
			homepageUl.prepend(li);
		}

		$('#homepage-alert-container').append(homepageUl);

		// init slideshow
		if (typeof($.flexslider) == 'function') {
			var options = {
				controlNav: false,
				slideshow: true
			};

			if (og.data('flexslider')) {
				options = og.data('flexslider').vars;
			}

			alerts.flexslider(options);
		}
	}

	var _wrapRightRailImages = function () {
		$('.right-rail .node .field-name-field-title-link a').each(function () {
			var img = $(this).closest('.node').find('.field-name-field-inline-image img');

			if (img.length == 1) {
				img.wrap($(this).empty());
			}
		});
	}

	var _wrapLogoImages = function () {
		$('.views-field-image-link a').each(function () {
			var img = $(this).closest('.views-row').find('.views-field-field-image-primary img');

			if (img.length == 1) {
				img.wrap($(this).empty());
			}
		});
	}

	var _addNightLifeStyle = function () {
		var path = $.trim(window.location.pathname.toLowerCase());

		if (path.indexOf('nightlife') >= 0 || $('html').hasClass('nl-test')) {
			var nlExceptions = [
				'/form/',
				'/email-content/',
				'/press/'
			];

			var isException = false;

			$.each(nlExceptions, function (i, e) {
				if (path.indexOf(e) >= 0) {
					isException = true;
					return false;
				}
			});

			if (!isException) {
				$('body').addClass('section-nightlife');
			}
		}
	}

	var _setTabularDataRowHeight = function () {
		if ($('.node-tabular-data .field-name-field-extra').length != 1) return;

		$('.node-tabular-data .field-name-field-extra table tbody td:first-child').each(function () {
			var h = $(this).outerHeight();
			$(this).parent('tr').css('height', h + 'px');
		});
	}

	var _ghostScroll = function (per) {
		var scroll = $('.scroll-container').first();
		var total = scroll.get(0).scrollWidth - scroll.outerWidth();

		scroll.scrollTo(Math.round(per * total), 0);

		_onTableScroll();
	}

	var _updateScrollBar = function (per) {
		var handle = $('.scrollbar .scroll-handle');

		if (!handle.hasClass('dragging')) {
			var trackWidth = handle.parent().outerWidth();
			var pos = Math.floor(per * (trackWidth - handle.outerWidth()));

			handle.css('left', pos + 'px');
		}
	}

	var _onTableScroll = function (e) {
		var scroll = $(this).hasClass('scroll-container') ? $(this) : $('.scroll-container').first();
		var total = scroll.get(0).scrollWidth - scroll.outerWidth();
		var per = scroll.scrollLeft() / total;

		_updateScrollBar(per);

		// set other element scroll position
		var other = $('.scroll-container').not(scroll).get(0);

		if (other) {
			other.scrollLeft = scroll.scrollLeft();
		}
	}

	var _onScrollTrack = function (e) {
		var scrollbar = $('.scrollbar');
		var trackWidth = scrollbar.outerWidth();

		var per = e.offsetX / trackWidth;
		_ghostScroll(per);
	}

	var _onHandleDrag = function (e) {
		var per = parseFloat($(this).css('left')) / ($(this).parent().outerWidth() - $(this).outerWidth());
		_ghostScroll(per);
	}

	var _initTabularData = function () {
		if ($('.node-tabular-data .field-name-field-extra').length != 1) return;

		_setTabularDataRowHeight();

		// clone header
		var table = $('.node-tabular-data .field-name-field-extra .field-item table');
		table.parent().addClass('scroll-container');
		table.addClass('regular');

		var clone = table.clone();
		clone.find('tbody').remove();
		clone.addClass('clone');
		clone.removeClass('regular');

		clone.insertBefore($('.node-tabular-data .field-name-field-extra'));
		clone.wrap('<div class="clone-container scroll-container" />');

		// scroll
		var scrollbar = $('<div class="scrollbar"><div class="scroll-handle"></div><div class="scroll-track"></div></div>');
		$('.node-tabular-data .field-name-field-extra').prepend(scrollbar);

		$('.scroll-handle').draggable({
			axis: 'x',
			containment: 'parent',
			drag: _onHandleDrag,
			start: function () {
				$(this).addClass('dragging');
			},
			stop: function () {
				$(this).removeClass('dragging');
			}
		});

		$('.scroll-track').on('mouseup touchend', _onScrollTrack);

		$('.scroll-container').on('scroll', _onTableScroll);
		$(window).on('resize.table-scroll', _onTableScroll);
	}

	var _insertMuseumHours = function () {
		if ($('.nuts-and-bolts').length == 0) return;
		if ($('body').hasClass('page-homepage')) return;

		var endpoint = '/get-museum-hours/';
		var timewarp = $.getQueryString('timewarp');

		if (typeof(timewarp) == 'string') {
			endpoint += '?date=' + $.trim(timewarp);
		}

		$.ajax({
			url: endpoint,
			success: function (data, textStatus, XMLHttpRequest) {
				if (data.formatted) {
					var html = 'Today&rsquo;s hours: ' + data.formatted.html;
					var h3 = $('<h3>'+ html +'</h3>');
					h3.addClass('museum-hours');
					h3.insertAfter($('.nuts-and-bolts h2'));
				}
			}
		});

		$('.nuts-and-bolts li:visible:last').addClass('last-visible');
	}

	var _hackAlerts = function (msg) {
		// create first alert with module var
		var firstRow = $('<li />');
		firstRow.append('<div class="views-field-body">' + msg + '</div>');
		firstRow.append('<div class="views-field-field-clone-to-homepage">1</div>');

		var lis = [];
		lis.push(firstRow);

		// add other alerts
		var view = $('.alerts .flexslider');

		view.find('li').each(function () {
			lis.push($(this));
		});

		// remove original container
		$('.alerts').remove();

		// create new alert list
		var ul = $('<ul />');
		ul.addClass('slides');

		$.each(lis, function (i, l) {
			var li = $('<li />');
			li.html(l.html());
			ul.append(li);
		});

		// create flexslider containers
		var container = $('<div />');
		container.addClass('flexslider');
		container.append(ul);

		// insert into DOM
		var alerts = $('<div />');
		alerts.addClass('alerts');
		alerts.addClass('region-header');
		alerts.append(container);

		$('#top-level-nav').append(alerts);

		// start carousel
		if (typeof($.flexslider) == 'function') {
			container.flexslider({
				controlNav: false,
				slideshow: true,
				touch: false,
				directionNav: false,
				keyboard: false,
				pauseOnAction: false,
				pauseOnHover: false
			});
		}
	}

	var _initAlerts = function () {
		if ($.cookie('dismiss-alerts', Number)) return;
		if ($('.alerts .slides li').length == 0 && typeof(calacademySoldout) == 'undefined') return;

		if (typeof(calacademySoldout) == 'object') {
			_hackAlerts(calacademySoldout.msg);
		}

		$('html').addClass('with-alerts');

		var close = $('<a href="#" class="close">Close</a>');

		close.on('touchend click', function () {
			$('html').removeClass('with-alerts');
			$(window).trigger('resize');
			$.cookie('dismiss-alerts', '1');
			return false;
		});

		$('.alerts').prepend(close);
	}

	this.initialize = function () {
		calacademy.Utils.log('CalAcademy.initialize');
		$('html').removeClass('no-js');

		// create dots
		if ($.getQueryString('dots') == '1') {
			var dots = $('<div />');
			dots.addClass('wavydots');

			var i = 1600;
			
			while (i--) {
				var dot = $('<div />');
				dot.addClass('dot');
				dots.append(dot);
			}

			$('body').append(dots);
		}

		// staging class
		var hn = window.location.hostname;

		if (hn.indexOf('www-stg') === 0 || hn.indexOf('www-local') === 0) {
			$('html').addClass('is-staging');	
		}

		// admin style hack
		$('body').removeClass('admin-menu');

		// add / remove classes for AJAX events
		$(document).ajaxStart(function (e) {
			$('html').addClass('ajax-loading');
		});

		$(document).ajaxComplete(function (e) {
			$('html').removeClass('ajax-loading');
		});

		var foo = new HackDOM();
		var eduSearch = new EducatorSearch();
		var popup = new Popup();
		var inat = new iNatEmbed();
		var mg = new mediaGallery();

		_addNightLifeStyle();
		_addMSIEClasses();
		_unsupported();
		_initAlerts();
		_initNav();
		calacademy.Utils.initSignupForms();
		_initSearchUI();
		_initSlideshow();
		_initDatepicker();
		_initWebforms();
		_addChatLinkClasses();
		_initPopups();
		_initFAQ();
		_initDefaultText();
		_addSectionClasses();
		_processArticleSections();
		_clearEmptyRightRail();
		_fixShareButtonToggleStyles();
		_redirectIframeContainers();
		_modifyYouTube();
		_cloneAlerts();
		_insertMuseumHours();
		_wrapRightRailImages();
		_wrapLogoImages();
		_initTabularData();

		calacademy.Utils.alterLinkTargets();
		calacademy.Utils.addBadges();

		$('.todays-date-from-server').html(todaysDate);

		// make stuff touchy
		if (Modernizr.touch) {
			document.addEventListener('touchstart', function () {}, true);
		}

		if ($('html').hasClass('debug')) _onFontLoad();

		// listen for web font load
		$.webFontListener({
			onFontLoad: function () {
				calacademy.Utils.log('onFontLoad');
				$('html').removeClass('wf-error');
				_setTabularDataRowHeight();
				_onFontLoad();
			},
			onFontLoadError: function () {
				calacademy.Utils.log('onFontLoadError');
				$('html').addClass('wf-error');
				_onFontLoad();
			}
		});

		// orientation change listener
		$(window).on('orientationchange', function () {
			clearTimeout(_orientationChangeTimeout);
			_orientationChangeTimeout = setTimeout(_onOrientationChange, 100);
		});

		if ($.getQueryString('shake') == '1' || calacademy.Constants.isShake) {
			$(window).on('load', function () {
				setTimeout(function () {
					$('body').addClass('shake');

					var secs = $.getQueryString('duration') ? parseInt($.getQueryString('duration')) : 10;
					var speed = $.getQueryString('speed') ? parseInt($.getQueryString('speed')) : 500;
					$('body').css('animation-duration', (speed / 1000) + 's');

					setTimeout(function () {
						$('body').removeClass('shake');
					}, secs * 100);
				}, 100);
			});
		}
	}

	this.initialize();
}
;
(function ($, Drupal, window, document, undefined) {

	var _pageDailyCalendar = function () {
		if (typeof(calacademy.onDailyCalendarDate) == 'function') {
			calacademy.onDailyCalendarDate();
		}

		// suppress iOS keyboard
		$('.form-item-field-date-value-value-date input').prop('readonly', true);

		// suppress typing (except Firefox)
		if (calacademy.Statics.browser.name != 'Firefox') {
			$('.form-item-field-date-value-value-date input').on('focus', function () {
				$(this).trigger('blur');
			});
		}

		// fix pagination that broke randomly
		$('#date-pager a').off('click');

		$('#date-pager a').on('click', function () {
			// suppress crazy clicks
			if ($('html').hasClass('ajax-loading')) return false;

			var arr = $(this).attr('href').split('/');
			var date = false;

			// weird views issue that appends the node id to the end
			// of the pagination href ala...
			// http://calacademy-local.calacademy.org/daily-calendar-view/2014-06-04//1876
			// ...so just find the first with a dash, starting at the end
			var i = arr.length;

			while (i--) {
				var d = arr[i];

				if (d.indexOf('-') >= 0) {
					date = d;
					break;
				}
			}

			if (date == false) return false;

			// set and trigger the real picker
			var realPicker = $('.views-widget-filter-field_date_value input');
			realPicker.val(date);
			realPicker.trigger('change');

			return false;
		});

		// add some weird style stuff once
		if ($('.js-clone').length > 0) return;

		var orig = $('.view-daily-calendar table');
		var clone = orig.clone();

		clone.addClass('js-clone');

		orig.after(clone);
	}

	var _fixHeroViewsImages = function () {
		// views
		var arr = [
			'.view:not(.skip-hero-processing) .views-field-field-hero-region',
			'.view:not(.skip-hero-processing) .views-field-field-image-primary'
		];

		$(arr.join(', ')).each(function () {
			calacademy.Utils.fixHeroField($('.field-content', this), $('.field-content > a', this));
		});

		// load effects
		calacademy.Utils.addImageLoadEvent($(arr.join(', ')));

		// user page
		calacademy.Utils.fixHeroField($('.pane-user-field-hero-region'), []);
	}

	var _exposedFilters = function () {
		// change the first option on exposed form selects to match the associated label
		$('.exposed-filters form label').each(function () {
			var str = $.trim($(this).text());
			var select = $('#' + $(this).attr('for'));

			if (!select.is('[multiple]') && $('option', select).length > 0) {
				$('option', select).first().text(str);
			}
		});

		// default text
		$('.exposed-filters input[type="text"]').each(function () {
			var label = $('label', $(this).parents('.views-exposed-widget'));
			$(this).attr('placeholder', $.trim(label.text()));
			$(this).defaultValue();
		});
	}

	var _addExtraClasses = function () {
		var classes = $.getQueryString('classes');

		if (typeof(classes) == 'string') {
			var arr = classes.split(',');

			$.each(arr, function (i, val) {
				$('html').addClass($.trim(val));
			});
		}
	}

	var _replace = function () {
		$('.view-content .field-content').each(function () {
			var pattern = /{{(.?[a-zA-Z0-9]+)}}/g;
			var matches = this.innerHTML.match(pattern);
			
			if ($.isArray(matches) && matches.length > 0) {
				this.innerHTML = this.innerHTML.replace(pattern, '<span class="num">$1</span>');	
			}
		});

		$(window).off('resize.num');
		
		$(window).on('resize.num', function () {
			$('span.num').each(function () {
				var h = $(this).outerHeight();
				$(this).css('min-width', h + 'px');
			});
		});

		$(window).trigger('resize.num');
	}

	Drupal.behaviors.calacademy_zen = {
		'attach': function(context, settings) {
			_addExtraClasses();
			_exposedFilters();
			_fixHeroViewsImages();
			_replace();
			calacademy.Utils.addBadges();

			// remove whitespace in view DOM to account
			// for Android inline-block margin issue
			// @see http://davidwalsh.name/remove-whitespace-inline-block
			$('.view-content').cleanWhitespace();

			if ($('body').hasClass('page-daily-calendar')) {
				_pageDailyCalendar();
			}

			if (typeof(ChimeraPopup) == 'function') {
				var foo = new ChimeraPopup();
			}
		}
	}

	// load slideshow images
	var _calacademyLoad = function () {
		// make sure this only runs once
		if ($('html').hasClass('calacademy-has-loaded')) return;
		$('html').addClass('calacademy-has-loaded');

		// giant slideshows crash older touch devices
		// Android seems ok
		if (Modernizr.touch && !Modernizr.csspositionsticky && !calacademy.Utils.isMobile.Android()) {
			// remove everything but the first slide (offset by one per looping)
			var firstSlide = $('.slideshow-hero-large li').eq(1);
			$('.slideshow-hero-large').html(firstSlide.html());
		}

		$('img.delay-load').each(function () {
			// skip midfeature, see below
			if ($(this).parents('.slideshow-midfeature').length > 0) return;
			
			// forgot to specify smartphone rendition
			if (typeof($(this).data('smartphone-src')) == 'undefined') {
				$(this).data('smartphone-src', $(this).data('src'));
			}

			// homepage gets a special, shorter rendition
			if ($('body').hasClass('page-homepage')) {
				$(this).data('src', $(this).data('short-hero-src'));
			}

			var src = $(this).data('src');
			$(this).removeAttr('src');

			$(this).load(function () {
				$(window).trigger('resize.slideshow-layout');

				if ($(this).parents('.slideshow-hero-large, .slideshow-hero').length > 0) {
					$(this).parents('li').addClass('slide-loaded');
					$(this).parents('.slides').addClass('slides-loaded');
					$(this).parents('.slideshow-hero-large, .slideshow-hero').addClass('slideshow-loaded');
					// $('.flex-caption', $(this).parents('li')).addClass('slide-loaded');
				}

				if ($(this).closest('.clear-height').length == 1) {
					$(this).closest('.clear-height').css('min-height', $(this).outerHeight(true));
				}
			});

			if ($(this).parents('.slideshow-hero-large, .page-homepage .creature').length > 0 && $(window).width() < calacademy.Constants.breakpoints.tablet) {
				$(this).attr('src', $(this).data('smartphone-src'));
			} else {
				$(this).attr('src', src);
			}
		});

		// background img for midfeature
		$(window).resize(function () {
			$('.slideshow-midfeature .views-field-field-slideshow-frame-bg-image, .slideshow-midfeature .field-name-field-slideshow-frame-bg-image').each(function () {
				var img = $('img', this);

				if (img.length == 1) {
					var src;

					if ($(window).width() < calacademy.Constants.breakpoints.tablet) {
						src = img.data('smartphone-src');
					} else {
						src = img.data('src');
					}

					$(this).css('background-image', 'url(' + src + ')');
				}
			});
		});

		$(window).trigger('resize');

		// other homepage stuff
		if ($('body').hasClass('page-homepage')) {
			PageHomepageStatic.onPageLoad();
		}

		$(window).trigger('resize.slideshow-layout');

		setTimeout(function () {
			$(window).trigger('resize.slideshow-layout');
		}, 100);
	}

	// whichever runs first...
	$(window).load(_calacademyLoad);
	setTimeout(_calacademyLoad, 5000);

})(jQuery, Drupal, this, this.document);

;
var PageHomepage = function () {
	var $ = jQuery;

	var _getViewsFieldElement = function (field) {
		var el = $('<div />');
		el.addClass('views-field');
		el.addClass('views-field-' + field);

		return el;
	}

	var _createViewRowsFromEntities = function (container, entities, offset) {
		if (isNaN(offset)) offset = 0;
		var i = offset + 1;

		entities.each(function () {
			// eyebrow
			var eyebrow = false;

			if ($('.field-name-field-subtitle h2', this).length) {
				eyebrow = _getViewsFieldElement('name');
				eyebrow.html($('.field-name-field-subtitle h2', this).html());
			}

			// title
			var title = _getViewsFieldElement('title');
			title.html($('header .node-title', this).html());

			// image
			calacademy.Utils.fixHeroField($('.views-field-field-hero-region', this), $('a', title));
			$('a.video', this).wrap($('<div class="field-content" />'));

			// description
			var desc = _getViewsFieldElement('body');
			desc.html($('.field-name-body', this));

			// create row container
			var row = $('<div />');
			row.addClass('views-row');
			row.addClass('views-row-' + i);
			i++;

			row.append($('.views-field-field-hero-region', this));
			row.append(title);
			if (eyebrow) row.append(eyebrow);
			row.append(desc);

			container.append(row);
		});
	}

	var _hackDom = function () {
		// layout entities
		$('#entities').prepend('<div class="view-container" />');
		_createViewRowsFromEntities($('#entities .view-container'), $('.field-name-field-homepage-entities > .field-items > .field-item'));
		
		// now remove
		$('#entities > article').remove();

		// clear
		$('#entities').after('<br style="clear: both;" />');

		if ($('html').hasClass('hide-first-entity')) {
			// insert silhouette image
			var img = $('<img />');
			
			img.attr({
				id: 'silhouette',
				src: $('#first-entity-silhouette').data('src')
			});

			$('#entities .views-row-1').append(img);
		}

		// move around hours & admission
		$('#hours-and-admission').detach().prependTo('#animal-ambassadors');
	}

	var _setHeroSlideshowHeight = function () {
		var w = $('body').outerWidth();
		var aspect = 700 / 1920;

		if (w < calacademy.Constants.breakpoints.tablet) {
			aspect = 552 / 768;
		}

		var h = Math.floor(w * aspect);

		$('.slideshow-hero-large .flexslider').css('height', h + 'px');
	}

	var _windowResize = function (e) {
		$('#animal-ambassadors').css('min-height', $('#animal-ambassadors img').outerHeight(true));
		_setHeroSlideshowHeight();
	}

	var _cloneNav = function () {
		var navClone = $('nav').clone();
		navClone.addClass('smartphone-nav');

		var s = navClone.find('#search-field');
		s.prop('id', 'search-field-smartphone');
		s.siblings('label').prop('for', 'search-field-smartphone');

		$('#hero').before(navClone);
	}

	var _setHideFirstEntity = function () {
		var field = $('.field-name-field-hide-first-entity');
		if (field.length == 0) return;

		if (parseInt(field.text()) == 1) {
			$('html').addClass('hide-first-entity');
		}
	}

	var _initPromos = function () {
		$('.field-name-field-homepage-promos > .field-items > .field-item').each(function () {
			// banner color
			var col = 'blue';
			var colField = $(this).find('.field-name-field-color');

			if (colField.length == 1) {
				col = $.trim(colField.text()).toLowerCase();
			}

			var img = $('<img />', {
				src: '/sites/all/themes/calacademy_zen/images/svgs/promo-bg-' + col + '.svg',
				alt: 'curved background'
			});

			$(this).find('.content').append(img);

			// position
			var position = parseInt($(this).find('.field-name-field-priority-level').text());

			if (!isNaN(position)) {
				if (position > 0) {
					var sections = $('.field-name-field-section > .field-items > .field-item');

					if (position <= sections.length) {
						var div = $('<div />');
						div.addClass('field-name-field-homepage-promos');
						div.addClass('field-item');
						div.append($(this));

						div.insertBefore(sections.eq(position - 1));
					}
				}
			}
		});
	}

	var _sizeLastCard = function () {
		var card = $('#banner .slider li:last-child a');
		var img = $('#banner .slider img').first();
		
		card.css('height', 'inherit');

		if ($(window).outerWidth() < calacademy.Constants.breakpoints.tablet) {
			card.css('height', img.outerHeight() + 'px');
		}
	}

	var _initColumns = function () {
		var i = 1;

		$('#banner .column').each(function () {
			$(this).addClass('column-' + i);
			i++;
		});

		i = 1;

		$('#banner > section').each(function () {
			$(this).addClass('section-' + i);
			i++;
		});

		// clone blurb
		// var blurb = $('#banner .blurb').clone();
		// blurb.addClass('smartphone');
		// blurb.insertAfter($('#banner .banner'));
	}

	var _initArrows = function () {
		$('#hero, #banner > section').each(function () {
			var button = $('<button>Jump to next section</button>');
			button.addClass('jump-to-next-section');

			button.on('touchend click', function (e) {
				// figure out target
				var target;

				if ($(this).parent().hasClass('section-1')) {
					// from first section, second section
					target = $('#banner > section').not('.section-1');
				} else {
					if ($(this).parent().attr('id') == 'hero') {
						// from hero, first section
						target = $('#banner > .section-1');
					} else {
						// from second section, #sections
						target = $('#sections');	
					}
				}
				
				// offset nav height
				var navHeight = $('nav:visible').outerHeight() + parseInt($('nav:visible').css('top'));
				
				// nav compress
				if (!$('html').hasClass('smartphone')) {
					navHeight -= 50;	
				}

				$('html, body').animate({
					scrollTop: target.offset().top - navHeight + 1
				}, 500);

				return false;
			});

			$(this).append(button);
		});
	}

	var _initLazyLoad = function () {
		var _getSrc = function (img) {
			var imgSrc = img.parent().data('src');
			var container = img.closest('.section-box');

			if (container.find('.smartphone-data').length == 1) {
				if ($('html').hasClass('smartphone')) {
					imgSrc = container.find('.smartphone-data').data('src');
				}
			}

			return imgSrc;
		}

		$(window).on('scroll.img-load-check resize.img-load-check', function () {
			$('.lazy-load img').each(function () {
				if ($(this).visible(true)) {
					var p = $(this).parent();
					var imgSrc = _getSrc($(this));
					var previouslyLoaded = p.data('previously-loaded-src');

					if (typeof(previouslyLoaded) == 'string') {
						if (previouslyLoaded != imgSrc) {
							// switching renditions, clear
							p.removeClass('lazy-loaded');
							p.removeClass('bg-img-loaded');
						}
					}

					p.data('previously-loaded-src', imgSrc);
					
					if (!p.hasClass('lazy-loaded')) {
						p.css('background-image', 'url(' + imgSrc + ')');
						p.addClass('lazy-loaded');

						// wait for load
						var img = new Image();
						
						$(img).one('load', function () {
							p.addClass('bg-img-loaded');
							$(this).off();
						});

						img.src = imgSrc;
					}
				}
			});
		});

		$(window).trigger('scroll.img-load-check');
	}

	var _initSections = function () {
		$('.section-box').each(function () {
			var swap = $.trim($(this).find('.field-name-field-show-label').text());
			
			if (parseInt(swap) == 1) {
				$(this).insertBefore($(this).prev());
			}
		});
	}

	this.onBreakpoint = function (device) {
		var v = $('#hero video');
		if (v.length != 1) return;

		var size = (device == 'smartphone') ? 'small' : 'large';

		if (v.data('active-size') != size) {
			var src = (size == 'small') ? v.data('src-smartphone') : v.data('src');

			v.attr('src', src);
			v.data('active-size', size);

			calacademy.Utils.initHeroVideo(v);
		}

		$(window).trigger('scroll.img-load-check');
	}

	this.initialize = function () {
		_cloneNav();
		
		if ($('body').hasClass('page-homepage-v3')) {
			_initSections();
			_initPromos();
			_initColumns();
			_initArrows();
			_initLazyLoad();
			$('.slider').wrap('<div class="slider-container" />');
			$(window).on('resize.home-size-last-card', _sizeLastCard);
			$(window).trigger('resize.home-size-last-card');
		} else {
			_setHideFirstEntity();
			_hackDom();
			
			$('#animal-ambassadors').addClass('clear-height');
			$(window).on('resize.home-check-scroll', _windowResize);
			$(window).on('scroll.home-check-scroll', _setHeroSlideshowHeight);
			$(window).trigger('resize.home-check-scroll');
		}
	}

	this.initialize();
}

var PageHomepageStatic = {
	onPageLoad: function () {
		var $ = jQuery;

		$('html').addClass('page-loaded');

		calacademy.Utils.snow();
	}
};
;
var PageNightlifeLanding = function () {
	var $ = jQuery;
	var _device;

	this.onBreakpoint = function (device) {
		_device = device;
		this.layout();

		var v = $('#nightlife-video');
		if (v.length != 1) return;

		var size = (device == 'smartphone') ? 'small' : 'large';

		if (v.data('active-size') != size) {
			var src = (size == 'small') ? v.data('src-smartphone') : v.data('src');

			v.attr('src', src);
			v.data('active-size', size);

			calacademy.Utils.initHeroVideo(v);
		}
	}

	this.layout = function () {
		calacademy.Utils.log('PageNightlifeLanding.layout');
		calacademy.Utils.clearClusterHeights($('.page-nightlife-landing #upcoming'));
	}
  
	var _addDynamicJelly = function () {
		//calacademy.Utils.addSecondaryBg('secondary-bg-jelly', $('.pane-nightlife-upcoming-next-upcoming-nl .views-row-2'));
	}
  	
	var _addCtaToCarousel = function () {
		var buttons = $('.pane-node-field-cta-buttons .field-name-field-cta-link a');
		if (buttons.length == 0 || $('.upcoming-events-pane').length != 1) return;

		var mimicRow = $('<div class="views-row cta-block" />');
		buttons.first().appendTo(mimicRow);

		mimicRow.find('a').html('<span>' + mimicRow.find('a').html() + '</span>');
		$('.upcoming-events-pane .view-content').append(mimicRow);
		
		// CTA height
		if ($('.side-scroll .cta-block a').length == 0) return;

		$(window).on('resize.side-scroll-cta', function () {
			$('.side-scroll, .side-scroll-carousel').each(function () {
				var img = $(this).find('img').first();
				$(this).find('.cta-block a').css('height', img.outerWidth() + 'px');
			});
		});

		$(window).trigger('resize.side-scroll-cta');

	}

	this.initialize = function () {
		calacademy.Utils.log('PageNightlifeLanding.initialize');

		$(window).load(function () {
			setTimeout(_addDynamicJelly, 500);
		});

		// sometimes load event doesn't fire
		setInterval(_addDynamicJelly, 2000);

		_addCtaToCarousel();
	}

	this.initialize();
}
;
var PageDailyCalendar = function () {
	var $ = jQuery;
	var _viewDate;
	var _lastSelectedDate;
	var _html5Picker;

	var _getOption = function (i) {
		var myFormat = 'YYYY-MM-DD';
		var option = $('<option />');
		var date = moment(_lastSelectedDate, myFormat).add(i, 'days');

		option.val(date.format(myFormat));
		option.html(date.format('dddd, MMMM D'));

		return option;
	}

	var _createPseudoPicker = function () {
		_html5Picker = $('<select />');

		_html5Picker.attr({
			'id': 'html5-date-picker'
		});

		_html5Picker.addClass('pseudo-picker');
		_setPseudoOptions();
	}

	var _setPseudoOptions = function () {
		if (!_html5Picker.hasClass('pseudo-picker')) return;

		_html5Picker.empty();

		var i = 0;

		while (i < 60) {
			var future = _getOption(i);

			if (i == 0) {
				future.attr('selected', 'true');
			}

			_html5Picker.append(future);

			if (i > 0) {
				var past = _getOption(i * -1);
				_html5Picker.prepend(past);
			}

			i++;
		}
	}

	var _initHtml5Picker = function () {
		if (Modernizr.inputtypes.date && Modernizr.touch) {
			_html5Picker = $('<input />');

			_html5Picker.attr({
				'id': 'html5-date-picker',
				'type': 'date',
				'value': _viewDate
			});
		} else {
			_createPseudoPicker();
		}

		// some style stuff
		_html5Picker.on('focus', function () {
			$('.panel-col-first .view-header').addClass('active');
		});

		// listen for a value change and trigger AJAX
		var myEvent = calacademy.Utils.isMobile.Android() ? 'change keypress paste textInput input' : 'blur';
		if (!Modernizr.touch) myEvent = 'change';

		_html5Picker.on(myEvent, function () {
			var val = $(this).val();
			$('.panel-col-first .view-header').removeClass('active');

			if (val != _lastSelectedDate) {
				calacademy.Utils.log('triggering AJAX: ' + val);

				// set and trigger the real picker
				var realPicker = $('.views-widget-filter-field_date_value input');
				realPicker.val(val);
				realPicker.trigger('change');

				_lastSelectedDate = val;

				if ($(this).hasClass('pseudo-picker')) {
					_setPseudoOptions();
				}
			}
		});

		// insert into the DOM
		_html5Picker.insertBefore('.pane-daily-calendar .view');
	}

	this.initialize = function () {
		calacademy.Utils.log('PageDailyCalendar.initialize');

		// the 'page' date
		_viewDate = $('.view-header h3').data('date');
		_lastSelectedDate = _viewDate;

		// setup our fancy new picker and tell it to trigger the real one
		_initHtml5Picker();
	}

	this.initialize();
}
;
var PageTaxonomyTerm = function () {
	var $ = jQuery;
	var _device;

	this.onBreakpoint = function (device) {
		_device = device;
	}

	var _addSidebarBg = function (offset, tabletOffset, yOffset, yOffsetTablet) {
		setTimeout(function () {
			var rail = $('.right-rail');

			// do nothing since the right rail doesn't exist
			if (rail.length == 0) return;
			rail = rail.eq(0);

			$(window).on('resize.secondary-bg', function () {
				var railX = rail.offset().left - offset;
				var railY = rail.offset().top;
				var railHeight = rail.height() - yOffset;

				if ($('html').hasClass('tablet')) {
					railHeight += yOffsetTablet;
					railX += tabletOffset;
				}

				// @note
				// background-position-x and background-position-y don't work in FF
				$('#page').css('background-position', Math.round(railX) + 'px ' + Math.round(railY + railHeight) + 'px');
			});

			$(window).trigger('resize.secondary-bg');
			$('body').addClass('secondary-bg');
		}, 500)
	}

	this.initialize = function () {
		calacademy.Utils.log('PageTaxonomyTerm.initialize');

		if ($('body').hasClass('section-events')) {
			_addSidebarBg(150, 50, 25, 75);
		}
		if ($('body').hasClass('section-audience')) {
			var yOffset = 25;
			var yOffsetTablet = 75;

			if ($('body').hasClass('page-taxonomy-term-545')) {
				yOffset = 250;
				yOffsetTablet = -120;
			}
			if ($('body').hasClass('page-taxonomy-term-547')) {
				yOffset = 100;
				yOffsetTablet = -60;
			}

			_addSidebarBg(0, -20, yOffset, yOffsetTablet);
		}
	}

	this.initialize();
}
;
var PageUser = function () {
	this.initialize = function() {
		var injectHTML = '<p><div class="views-row"><div class="views-field-title"><!--<a href="https://sso.calacademy.org/adfs/ls/IdpInitiatedSignon.aspx">Use Academy authentication</a>--><a href="/user/password">Reset password</a></div></div></p>';
		jQuery('#user-login').before(injectHTML);
	};
	this.initialize();
};
;
