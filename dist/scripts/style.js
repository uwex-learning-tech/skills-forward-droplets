/* global console */function getParameterByName(e,t){var n="[\\?&]"+t+"=([^&#]*)",r=new RegExp(n),i=r.exec(e);t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");return i===null?"":decodeURIComponent(i[1].replace(/\+/g," "))}function gotoToC(){var e="/d2l/lms/content/home.d2l?ou="+getParameterByName(window.parent.location.href,"ou")+"&showTOC=1";top.location.href=e}function gotoGrades(){var e="/d2l/lms/grades/my_grades/main.d2l?ou="+getParameterByName(window.parent.location.href,"ou");top.location.href=e}function gotoDropbox(){var e="/d2l/lms/dropbox/user/folders_list.d2l?ou="+getParameterByName(window.parent.location.href,"ou");top.location.href=e}function gotoDiscussions(){var e="/d2l/lms/discussions/admin/forum_topics_list.d2l?ou="+getParameterByName(window.parent.location.href,"ou");top.location.href=e}$(document).ready(function(){function e(){if($("abbr").length||$(".with-tooltip").length){t();console.log("Tooltip available!")}if($(".with-popover").length){n();console.log("Popover available!")}if($(".with-tabs").length){r();console.log("Tab available!")}if($(".with-accordion").length){i();console.log("Accordion available!")}$(".with-subnav").length&&s()}function t(){$("abbr, .with-tooltip").on("mouseover",function(){var e=$(this).attr("title"),t=$(this).position();$(this).attr("title","").css("position","relative");if($(this).hasClass("top")){$(this).before('<div class="tooltip in top"><div class="tooltip-inner">'+e+'</div><div class="tooltip-arrow"></div></div>');$(".tooltip").css({top:t.top-28+"px",left:t.left+"px"})}else if($(this).hasClass("bottom")){$(this).after('<div class="tooltip in bottom"><div class="tooltip-inner">'+e+'</div><div class="tooltip-arrow"></div></div>');$(".tooltip").css({bottom:t.bottom+28+"px",left:t.left+"px"})}else if($(this).hasClass("right")){$(this).before('<div class="tooltip in right"><div class="tooltip-inner">'+e+'</div><div class="tooltip-arrow"></div></div>');$(".tooltip").css({top:t.top+"px",left:t.left+$(this).width()+"px"})}else if($(this).hasClass("left")){$(this).before('<div class="tooltip in left"><div class="tooltip-inner">'+e+'</div><div class="tooltip-arrow"></div></div>');$(".tooltip").css({top:t.top+"px",left:t.left-($(".tooltip").width()+8)+"px"})}else{$(this).before('<div class="tooltip in"><div class="tooltip-inner">'+e+'</div><div class="tooltip-arrow"></div></div>');$(".tooltip").css({top:t.top-28+"px",left:t.left+"px"})}$("abbr, .with-tooltip").on("mouseout",function(){$(this).attr("title",$(".tooltip.in .tooltip-inner").html()).css("position","static");$(".tooltip").remove()})})}function n(){$(".with-popover").each(function(e){var t=$(this).attr("data-title"),n=$(this).position();console.log(n);if($(this).hasClass("top")){$("body").append('<div class="popover top"><div class="popover-content">'+t+'</div><div class="arrow"></div></div>');$(".popover:eq("+e+")").css({top:n.top-($(".popover:eq("+e+")").innerHeight()+8)+"px",left:n.left+"px"})}else if($(this).hasClass("bottom")){$("body").append('<div class="popover bottom"><div class="popover-content">'+t+'</div><div class="arrow"></div></div>');$(".popover:eq("+e+")").css({top:n.top+$(this).height()+4+"px",left:n.left+"px"})}else if($(this).hasClass("right")){$("body").append('<div class="popover right"><div class="popover-content">'+t+'</div><div class="arrow"></div></div>');$(this).is("img")?$(".popover:eq("+e+")").css({top:n.top+$(this).height()/2+"px",left:n.left+$(this).width()+3+"px"}):$(".popover:eq("+e+")").css({top:n.top-$(this).height()+"px",left:n.left+$(this).width()+3+"px"})}else if($(this).hasClass("left")){$("body").append('<div class="popover left"><div class="popover-content">'+t+'</div><div class="arrow"></div></div>');$(this).is("img")?$(".popover:eq("+e+")").css({top:n.top+$(this).height()/2+"px",left:n.left-$(".popover").width()+100+"px"}):$(".popover:eq("+e+")").css({top:n.top-$(this).height()+"px",left:n.left-$(".popover").width()-5+"px"})}else{$("body").append('<div class="popover"><div class="popover-content">'+t+'</div><div class="arrow"></div></div>');$(".popover:eq("+e+")").css({top:n.top-($(".popover:eq("+e+")").innerHeight()+8)+"px",left:n.left+"px"})}});$(".with-popover").on("click",function(){var e=$(".with-popover").index(this);if($(this).hasClass("active")){$(this).removeClass("active");$(".popover:eq("+e+")").removeClass("in")}else{$(this).addClass("active");$(".popover:eq("+e+")").addClass("in")}})}function r(){$(".with-tabs .tabs li").on("click",function(){var e=$(".with-tabs .tabs li").index(this);$(".with-tabs .tabs li").each(function(){$(".with-tabs .tabs li").hasClass("active")&&$(this).removeClass("active")});$(this).addClass("active");$(".with-tabs .tab-contents section").each(function(){$(".with-tabs .tab-contents section").hasClass("active")&&$(this).removeClass("active")});$(".with-tabs .tab-contents section:eq("+e+")").addClass("active");return!1})}function i(){$(".with-accordion").prepend('<div class="accordion-controls"><a class="closeAll" href="javascript:void(0)">Close All</a> <a class="openAll" href="javascript:void(0)">Open All</a></div>');$(".closeAll").on("click",function(){$(".with-accordion .accordion-title").each(function(e){$(this).hasClass("active")&&$(".accordion-content:eq("+e+")").slideUp("fast",function(){$(".accordion-title:eq("+e+")").removeClass("active")})})});$(".openAll").on("click",function(){$(".with-accordion .accordion-title").each(function(e){$(this).hasClass("active")||$(".accordion-content:eq("+e+")").slideDown("fast",function(){$(".accordion-title:eq("+e+")").addClass("active")})})});$(".with-accordion .accordion-title").each(function(e){$(this).hasClass("active")&&$(".accordion-content:eq("+e+")").show()});$(".with-accordion .accordion-title").on("click",function(){var e=$(".with-accordion .accordion-title").index(this);$(this).hasClass("active")?$(".accordion-content:eq("+e+")").slideUp("fast",function(){$(".accordion-title:eq("+e+")").removeClass("active")}):$(".with-accordion .accordion-title").each(function(t){if($(this).hasClass("active")){$(this).removeClass("active");$(".accordion-content:eq("+t+")").slideUp("fast",function(){$(".accordion-title:eq("+e+")").addClass("active");$(".accordion-content:eq("+e+")").slideDown()})}else if(t===e){$(".accordion-title:eq("+e+")").addClass("active");$(".accordion-content:eq("+e+")").slideDown()}});return!1})}function s(){var e='<ul class="page-subnav">';$(".with-subnav h2").each(function(t){$(this).before('<a class="anchor" id="nav'+t+'" href="#"></a>');e+='<li><a href="#nav'+t+'">'+$(this).html()+"</a></li>"});e+="</ul>";$(".with-subnav").prepend(e);$("body").css("padding-top",$(".page-subnav").innerHeight());$(".anchor").css({display:"block",position:"relative",top:$(".page-subnav").innerHeight()*-1+"px",visibility:"hidden"})}e()});