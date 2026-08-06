var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/*
Abstract : Ajax Page Js File
File : dz.ajax.js
#CSS attributes: 
	.dzForm : Form class for ajax submission. 
	.dzFormMsg  : Div Class| Show Form validation error/success message on ajax form submission

#Javascript Variable
.dzRes : ajax request result variable
.dzFormAction : Form action variable
.dzFormData : Form serialize data variable

*/

(function($) { 
	"use strict";

	function contactForm()
{
	'use strict';
	var msgDiv;
	$(".dzForm").on('submit', function(e)
	{
		e.preventDefault();	//STOP default action
		var dzFormAction = $(this).attr('action');
		var dzFormData = $(this).serialize();
		var contactForm = $('#contactForm');
		$.ajax({
			method: "POST",
			url: dzFormAction,
			data: dzFormData,
			dataType: 'json',
			success: function(result){
				if(result.error){
					if(result.fields.indexOf('name') > -1){
						$('input[name="name"]', contactForm).attr('placeholder', $('input[name="name"]', contactForm).next('span').html()).addClass('has-error');
					}else{
						$('input[name="name"]', contactForm).removeClass('has-error');
					}
					if(result.fields.indexOf('email') > -1){
						$('input[name="email"]', contactForm).attr('placeholder', $('input[name="email"]', contactForm).next('span').html()).addClass('has-error');
					}else{
						$('input[name="email"]', contactForm).removeClass('has-error');
					}
					if(result.fields.indexOf('phone') > -1){
						$('input[name="phone"]', contactForm).attr('placeholder', $('input[name="phone"]', contactForm).next('span').html()).addClass('has-error');
					}else{
						$('input[name="phone"]', contactForm).removeClass('has-error');
					}
					if(result.fields.indexOf('message') > -1){
						$('textarea[name="message"]', contactForm).attr('placeholder', $('textarea[name="message"]', contactForm).next('span').html()).addClass('has-error');
					}else{
						$('textarea[name="message"]', contactForm).removeClass('has-error');
					}
					if(result.fields.indexOf('captcha') > -1){
						$('input[name="captcha[input]"]', contactForm).attr('placeholder', $('input[name="captcha[input]"]', contactForm).next('span').html()).addClass('has-error');
					}else{
						$('input[name="captcha[input]"]', contactForm).removeClass('has-error');
					}
				}else{
					contactForm.hide();
					$('#thank-you').show();
				}
			}
		})
	});
	
	
	setInterval(function(){
		$('.dzFormMsg .alert').hide(1000);
	}, 10000);
	
	
	/* This function is for mail champ subscription START*/
	
	$(".dzSubscribe").on('submit', function(e)
	{
		e.preventDefault();	//STOP default action
		var dzFormAction = $(this).attr('action');
		var dzFormData = $(this).serialize();
		$.ajax({
			method: "POST",
			url: dzFormAction,
			data: dzFormData,
			dataType: 'json',
		  success: function(result) {
			  if(result.error){
				  if(result.fields.indexOf('name') > -1){
					  $('input[name="name"]', contactForm).attr('placeholder', 'Please enter your name').addClass('error');
				  }else{
					  $('input[name="name"]', contactForm).removeClass('error');
				  }
				  if(result.fields.indexOf('email') > -1){
					  $('input[name="email"]', contactForm).attr('placeholder', 'Please enter your email address').addClass('error');
				  }else{
					  $('input[name="email"]', contactForm).removeClass('error');
				  }
				  if(result.fields.indexOf('message') > -1){
					  $('textarea[name="message"]', contactForm).attr('placeholder', 'Please write your message').addClass('error');
				  }else{
					  $('textarea[name="message"]', contactForm).removeClass('error');
				  }
			  }else{
				  contactForm.hide();
				  $('#thank-you').show();
			  }
			$('.dzSubscribeMsg').html(msgDiv);
			$('.dzSubscribe')[0].reset();
		  }
		})
	});
	
	setInterval(function(){
		$('.dzSubscribeMsg p').hide(1000);
	}, 5000);
	/* This function is for mail champ subscription END*/

	$('button.spanBtn').html($('button.spanBtn').html() + '<span></span>');
}

jQuery(document).ready(function() {
    'use strict';
	contactForm();
});
	
})(jQuery);		
}

/*
     FILE ARCHIVED ON 16:25:49 Dec 29, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:33:05 Aug 06, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.55
  exclusion.robots: 0.049
  exclusion.robots.policy: 0.036
  esindex: 0.007
  cdx.remote: 45.786
  LoadShardBlock: 149.445 (3)
  PetaboxLoader3.datanode: 87.952 (4)
  PetaboxLoader3.resolve: 135.552 (2)
  load_resource: 78.855
*/