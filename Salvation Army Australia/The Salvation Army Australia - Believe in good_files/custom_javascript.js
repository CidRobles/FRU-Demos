function set_auto_mode() {
  jQuery.cookie("site_version", null, {
    path: "/"
  }), "localhost" == window.location.host || window.location.host.match(hostname_check) || jQuery.cookie("site_version", null, {
    expires: -1,
    path: "/",
    domain: document.domain,
    secure: !0
  }), location.reload()
}

function add_desktop_version() {
  jQuery("#mp-pusher").removeAttr("style"), 0 == jQuery('link[rel*=style][href="' + cssUrl + '"]').length && (link_html = '<link href="' + cssUrl + '" type="text/css" rel="stylesheet" />', variant_css = jQuery('link[href*="custom-desktop-style.css"]'), 0 != jQuery(variant_css).length ? jQuery('link[href*="custom-desktop-style.css"]').before(link_html) : jQuery("head").append(link_html))
}

function update_site_version() {
  var e;
  e = jQuery(".pc-site a:contains('mobile')").text() ? "mobile" : jQuery(".pc-site a:contains('tablet')").text() ? "tablet" : "desktop", jQuery.cookie("site_version", e, {
    expires: 7,
    path: "/"
  }), "localhost" == window.location.host || window.location.host.match(hostname_check) || jQuery.cookie("site_version", e, {
    expires: 7,
    path: "/",
    domain: document.domain,
    secure: !0
  }), location.reload()
}

function change_font_size(e) {
  "large" == e ? (jQuery("main#content article div#news-item-content").css({
    "font-size": "1.2rem"
  }), jQuery.cookie("site_fontsize", e, {
    expires: 7,
    path: "/"
  }), "localhost" == window.location.host || window.location.host.match(hostname_check) || jQuery.cookie("site_fontsize", e, {
    expires: 7,
    path: "/",
    domain: document.domain,
    secure: !0
  })) : (jQuery("main#content article div#news-item-content").removeAttr("style"), jQuery.cookie("site_fontsize", null, {
    path: "/"
  }), "localhost" == window.location.host || window.location.host.match(hostname_check) || jQuery.cookie("site_fontsize", null, {
    expires: -1,
    path: "/",
    domain: document.domain,
    secure: !0
  }))
}

function twitterLink() {
  var currentURL=location.protocol + '//' + location.host + location.pathname;
  var e = location.protocol + "//www.twitter.com/home?status=" + encodeURIComponent(currentURL);
  window.open(e, "Twitter", "scrollbars=no,menubar=no,height=600,width=800,resizable=yes,toolbar=no,location=no,status=no")
}

function faceBookLink() {
  var currentURL=location.protocol + '//' + location.host + location.pathname;
  var e = location.protocol + "//www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(currentURL);
  window.open(e, "Facebook", "scrollbars=no,menubar=no,height=600,width=800,resizable=yes,toolbar=no,location=no,status=no")
}

function add_selected_class() {
  var e = window.location.pathname;
  parseurl = e.split("/"), "localhost" == window.location.host ? "" == parseurl[2] ? jQuery('nav#navigation a[href$="' + parseurl[1] + '/"]').parent("li").addClass("selected") : jQuery('nav#navigation a[href$="' + parseurl[2] + '/"]').parent("li").addClass("selected") : "" == parseurl[1] ? jQuery('nav#navigation a[href$="' + window.location.host + '/"]').parent("li").addClass("selected") : jQuery('nav#navigation a[href$="' + parseurl[1] + '/"]').parent("li").addClass("selected")
}

function change_footer_version_text() {
  //1 == is_tablet && "desktop" == jQuery.cookie("site_version") ? jQuery(".pc-site a:first").text("Switch to tablet version") : "desktop" == jQuery.cookie("site_version") ? jQuery(".pc-site a:first").text("Switch to mobile version") : "tablet" == jQuery.cookie("site_version") || "mobile" == jQuery.cookie("site_version") ? jQuery(".pc-site a:first").text("Switch to desktop version") : 1 == is_tablet ? jQuery(".pc-site a:first").text("Switch to tablet version") : jQuery(window).width() <= window_breakdown ? jQuery(".pc-site a:first").text("Switch to desktop version") : jQuery(window).width() >= window_breakdown && jQuery(".pc-site a:first").text("Switch to mobile version")
}

function checkEmail(e) {
  var t = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return t.test(e) ? !0 : (jQuery("#subresponse").css("display", "block"), jQuery("#subresponse").html("Please enter a valid email address").fadeOut(3e3), !1)
}


function loadMMenuJquery(){

  jQuery("#header").append('<a class="burger-menu" href="#mobile-menu" title="Menu" />');
  jQuery("nav#mobile-menu").mmenu({
    navbar: {
    title: 0
  },

    "extensions": [
                      "theme-dark"
                   ],
                   "navbars": [
                      {
                         "position": "top",
                         "content": [
                            "searchfield"
                         ]
                      },
                      {
                         "position": "bottom",
                         "content": [

                            "<a class='fa fa-facebook'  target='_blank'  title='Facebook' href='https://www.facebook.com/TheSalvationArmyAustralia'></a>",
                            "<a class='fa fa-twitter'  target='_blank' title='Twitter' href='https://twitter.com/salvos'></a>",
                            "<a class='fa fa-instagram'  target='_blank'  title='Instagram' href='https://www.instagram.com/salvosau/'></a>"
                         ]
                      }
                   ],


    searchfield: {
      add: !0,
      form: !0,
      search: !1
    }
  }, {
    selectedClass: "selected"
});
	var mmenu_loading = 0;
	var parent_menu_item = jQuery(".mm-selected");
	var api = jQuery("#mobile-menu").data("mmenu");
	var id = parent_menu_item.children(jQuery('a')).first().attr('href');
	var previous_path='';
	if(id.startsWith('#')){
		mmenu_loading = 1;
		api.openPanel(jQuery(id));
	}
	api.bind( "open:finish", function() {
		if(previous_path == '' || previous_path == undefined){
			var panel = $('.mm-opened');
			previous_path = getMobileMenuPath(panel);
		}


    //This is GTM-compatible code
    gtmEvent('Open Burger', 'click','burger');
  	});

	api.bind( "close:finish", function( ) {

    //This is GTM-compatible code
    gtmEvent('Close Burger', 'click','burger');
	});

	api.bind( "setSelected:before", function( item ) {
		var url_clicked = item.children('a:not(.mm-next)').attr('href');

    //This is GTM-compatible code
    gtmEvent('Burger Link To: '+url_clicked, 'click','burger');

	});

	api.bind( "openPanel:finish", function( panel ) {
		var path = getMobileMenuPath(panel);
		var action ='';
		var from = '';
		var gaCategory = '';
		if(mmenu_loading ==1 ){
			//menu is loading on page load do nothing
			mmenu_loading = 0;

		}else{

			if(path.length > previous_path.length ){
				//navigate forward
				action = 'Forward to: ';
				gaCategory = 'navigate-forward';
			}else{
				//navigate backwards
				action = 'Back to: ';
				var path_array = previous_path.split(" > ");
				var last_element = path_array[path_array.length - 1];
				from =" From: '"+last_element+"'";
				gaCategory = 'navigate-back';
			}
			var return_value = action+"'"+path+"'"+from;

      //This is GTM-compatible code
      gtmEvent(return_value,gaCategory,'burger');

			previous_path = path;
		}
	});
}

function getMobileMenuPath(panel){
	var title = panel.children('div.mm-navbar').children('a.mm-title').text();
	var prev_id = panel.children('div.mm-navbar').children('a.mm-prev').attr('href');
	var path = title;
	while (title != '' && title != undefined) {
		title = $(prev_id).children('div.mm-navbar').children('a.mm-title').text();
		prev_id = $(prev_id).children('div.mm-navbar').children('a.mm-prev').attr('href');

		if(title != '' && title != undefined){
			path = title+' > '+path;
		}else{
			path = 'Home > '+path;
		}
	}
	if(path == '' || path == undefined){
		path = 'Home';
	}

	return path;
}

function loadMMenuDollar(){
  $("#header").append('<a class="burger-menu" href="#mobile-menu"/>');
  $("nav#mobile-menu").mmenu({
    navbar: {
    title: 0
  },

    "extensions": [
                      "theme-dark"
                   ],
                   "navbars": [
                      {
                         "position": "top",
                         "content": [
                            "searchfield"
                         ]
                      },
                      {
                         "position": "bottom",
                         "content": [

                            "<a class='fa fa-facebook'  target='_blank'  title='Facebook' href='https://www.facebook.com/TheSalvationArmyAustralia'></a>",
                            "<a class='fa fa-twitter'  target='_blank' title='Twitter' href='https://twitter.com/salvos'></a>",
                            "<a class='fa fa-instagram'  target='_blank'  title='Instagram' href='https://www.instagram.com/salvosau/'></a>"
                         ]
                      }
                   ],


    searchfield: {
      add: !0,
      form: !0,
      search: !1
    }
  }, {
    selectedClass: "selected"
  });

  var parent_menu_item = $(".mm-selected");
  var api = $("#mobile-menu").data("mmenu");
  var id = parent_menu_item.children($('a')).first().attr('href');

   if(id.startsWith('#')){
     api.openPanel($(id));
   }

}

//fa scripts
function link_is_external(link_element) {
    return (link_element.host !== window.location.host);
}

jQuery(document).ready(function(){

      try {
            loadMMenuJquery();
      } catch (e) {
          //loadMMenuDollar();
      }
	jQuery('a').each(function(e){
		if (this.href&&link_is_external(this)) {
			if(jQuery(this).prop('target')=="_blank"){
				var current_rel = jQuery(this).prop("rel") ? jQuery(this).prop("rel")+ " " : "";
				jQuery(this).prop("rel", current_rel + "noopener");
			}
		}
	});
});

var window_breakdown = 769,
  hostname_check = /^[0-9.,]+$/;
jQuery(window).bind("load", function() {
   jQuery("nav#mobile-menu .mm-search input").keyup(function(e) {
    13 == e.keyCode && (window.location.href = site_url + "search?keywords=" + jQuery(this).val())
  }), jQuery("nav#mobile-menu").find(".mm-search").append('<input type="submit" aria-label="Search" value="Search" class="btn" id="go" title="Search">'), jQuery("nav#mobile-menu .mm-search input.btn").click(function(e) {
    window.location.href = site_url + "search?keywords=" + jQuery("nav#mobile-menu .mm-search input").val()
  })
}), jQuery(document).ready(function() {
  jQuery("div.content-wrapper article .slide").click(function() {
    jQuery("div.content-wrapper article .slide").nextAll(".slide-panel").slideUp("fast");
    var e = jQuery(this).attr("title");
    jQuery(this).nextAll(".slide-panel[title='" + e + "']").is(":visible") ? jQuery(this).nextAll(".slide-panel[title='" + e + "']").slideUp("fast") : jQuery(this).nextAll(".slide-panel[title='" + e + "']").slideDown("fast")
  }), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), add_selected_class(), jQuery("#back-top").hide(), jQuery(function() {
    jQuery(window).scroll(function() {
      jQuery(this).scrollTop() > 100 ? jQuery("#back-top").fadeIn() : jQuery("#back-top").stop().fadeOut()
    }), jQuery("#back-top a").click(function() {
      return jQuery("body,html").animate({
        scrollTop: 0
      }, 800), !1
    }), jQuery("div.red-bg").addClass("load")
  }), jQuery(window).resize(function() {
    jQuery(window).width() >= window_breakdown && jQuery("#mobile-menu").trigger("close")
  }), change_footer_version_text(), jQuery(".share-news li .counter").hide(), jQuery(".share-news li.facebook").mouseenter(function() {
    jQuery(window).width() >= window_breakdown && 0 == is_tablet && jQuery(".share-news .facebook .counter").show(400)
  }).mouseleave(function() {
    jQuery(".share-news .facebook .counter").hide()
  }), jQuery(".share-news li.twitter").mouseenter(function() {
    jQuery(window).width() >= window_breakdown && 0 == is_tablet && jQuery(".share-news .twitter .counter").show(400)
  }).mouseleave(function() {
    jQuery(".share-news .twitter .counter").hide()
  }), jQuery(".share-news li.comment").mouseenter(function() {
    jQuery(window).width() >= window_breakdown && 0 == is_tablet && jQuery(".share-news .comment .counter").show(400)
  }).mouseleave(function() {
    jQuery(".share-news .comment .counter").hide()
  })
});
