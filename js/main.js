$(document).ready(function(){
	//markets
	var img = $(".market_bloc.active").data('img');
	var title = $(".market_bloc.active").data('title');
	var link = $(".market_bloc.active").data('link');
	var excerpt = $(".market_bloc.active").data('excerpt');	
	$(".market_description img").attr("src", img);
	$(".market_description h3").text(title);	
	$(".market_description p").html(excerpt);
	$(".market_description a").attr("href", link);	
	
$( ".market_bloc" ).click(function() {
	$(".market_bloc").removeClass('active');
	$(this).addClass('active');
	var img = $(this).data('img');
	var title = $(this).data('title');
	var link = $(this).data('link');
	var excerpt = $(this).data('excerpt');	

	$('.market_description').animate({'opacity': 0}, 0, function () {
		$(".market_description img").attr("src", img);
		$(".market_description h3").text(title);	
		$(".market_description p").html(excerpt);
		$(".market_description a").attr("href", link);	
	}).animate({'opacity': 1}, 0);	
	
	//return false;
});

	var mq = window.matchMedia("screen and (min-width: 992px)");
	if(mq.matches){
		$( ".market_bloc" ).click(function() {
			return false;
		});	
	}else{
		console.log('< 991');
	}	
	
});	
	//numbers scroll & animation
	var a = 0;
	$(window).scroll(function() {

	var $nb_container = $('#nb_container');	
	if($nb_container.length!=1){
		return;
	}
	
	  var oTop = $('#nb_container').offset().top - window.innerHeight;
	  if (a == 0 && $(window).scrollTop() > oTop) {
		$('.counter').each(function() {
		  var $this = $(this),
			countTo = $this.attr('data-count');
		  $({
			countNum: $this.text()
		  }).animate({
			  countNum: countTo
			},

			{

			  duration: 4500,
			  easing: 'swing',
			  step: function() {
				$this.text(Math.floor(this.countNum));
			  },
			  complete: function() {
				$this.text(this.countNum);
			  }

			});
		});
		a = 1;
	  }

	});
  
  $('.bxslider').bxSlider({
	  auto: ($(".bxslider .item").length > 1) ? true: false,
	  mode: 'fade',
	  pager: false,
	  controls: false,
	  touchEnabled: false,
	  //pause:6000,
  }); 
  $('.bxslider_stories').bxSlider({
	  auto: false,
	  pager: false,
	  controls: true,
	  slideMargin: 15,
	  minSlides: 1,
	  maxSlides: 3,
	  infiniteLoop: false,
	  slideWidth: 320,
	  moveSlides:1,
	  shrinkItems: false,
	  pause:6000,
	  touchEnabled: false,
	  nextSelector: '.custom_controls .custom_next',
	  prevSelector: '.custom_controls .custom_prev',
	  nextText: '<i class="fa fa-angle-right fa-1x"></i>',
	  prevText: '<i class="fa fa-angle-left fa-1x"></i>',
	  onSliderLoad: function() {
		$(".bxslider_stories .item").eq(1).addClass('active-slide');
	  },
		onSlideBefore: function($slideElement, oldIndex, newIndex) {
			$(".bxslider_stories .item").removeClass('active-slide');
			$(".bxslider_stories .item").eq(newIndex+1).addClass('active-slide');
		},	  
	  onSlideNext: function($slideElement, oldIndex, newIndex) {
		$(".bxslider_stories .item").removeClass('current');
		current = $('.bxslider_stories').eq(newIndex);
		//console.log(current);
		//$(".bxslider_stories .item:not(.bx-clone)").eq(current).addClass('current');
	  }, 
  });
  $('.bxslider_news').bxSlider({
	  auto: true,
	  pager: true,
	  mode: 'fade',
	  controls:false,
	  pause:6000, 
  });  



$(document).ready(function(){
	
	$('.line').each(function(index) {
	  //console.log( index  );
	   height_txt = $(this).find('.post_content').height();
	   height_img = $(this).find('.post_img img').height(); 
		//console.log(height_txt,height_img);
		if(height_img!=0){
			if(height_img==height_txt){
				$(this).find('.post_content').addClass('smaller');
			}
			if(height_img<height_txt){
				$(this).find('.post_img').addClass('smaller');
			}		
		}
	});	

	$(function() {
	  $('a[href*="#"]:not([href="#"])').click(function() {
		  
		if($(this).data('toggle')!= 'tab'){  
		  
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			  var target = $(this.hash);
			  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			  if (target.length) {
				$('html, body').animate({
				  scrollTop: target.offset().top-200
				}, 1000);
				return false;
			  }
			}
		
		}
	  });
	});

	$('input[type="submit"].btn.disabling').prop("disabled", true);


	function navbar(){
			var distanceY = window.pageYOffset || document.documentElement.scrollTop,
			//menu
				menu_pos = 100,
				menu = $('.header');
			if (distanceY > menu_pos) {
				$('.header').addClass('smaller');
			} else {
				$('.header').removeClass('smaller');
			}	
			
			//si scroll vers le bas, on cache le menu. Si scroll vers le haut on l'affiche.
			
				
		}
	window.onload = function() {
		navbar();
		window.addEventListener('scroll', navbar);
	}



	
});
new WOW().init();


$('#partnerModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var img = button.data('img');
  var title = button.data('title');
  var txt = button.data('txt');
  var website = button.data('website');
  var btn_label = button.data('label');
  var default_label = button.data('default_label');
//	console.log(btn_label);
  var modal = $(this)
 
  modal.find('#partnerModal_logo').attr("src",img); 
  modal.find('#partnerModal_txt').html(txt);
  
  if(website!=''){
	modal.find('#partnerModal_website').attr("href",website); 
	modal.find('#partnerModal_website').removeClass('hidden');
	if(btn_label!=''){
		modal.find('#partnerModal_website').html(btn_label);
	}else{
		modal.find('#partnerModal_website').html(default_label);
	}
  }else{
	modal.find('#partnerModal_website').addClass('hidden'); 	  
  }
});

$('#customerModal').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget) // Button that triggered the modal
	var img = button.data('img');
	//var title = button.data('title');
	var txt = button.data('txt');
	var btn_url = button.data('url');
	var target = button.data('url_target');
	var btn_label = button.data('label');
	var default_label = button.data('default_label');

	var modal = $(this)
	modal.find('#customerModal_logo').attr("src",img);
	modal.find('#customerModal_txt').html(txt);

	if(btn_url!=''){
		modal.find('#customerModal_link').attr("href",btn_url);
		modal.find('#customerModal_link').removeClass('hidden');
		if(btn_label!=''){
			modal.find('#customerModal_link').html(btn_label);
		}else{
			modal.find('#customerModal_link').html(default_label);
		}
		if(target=='self'){
			modal.find('#customerModal_link').removeAttr('target');
		}else{
			modal.find('#customerModal_link').attr('target', '_blank');
		}
	}else{
		modal.find('#customerModal_link').addClass('hidden');
	}
});

function autoType(elementClass, typingSpeed){
  var thhis = $(elementClass);
  thhis.css({
    "position": "relative",
    "display": "inline-block"
  });
  thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
  thhis = thhis.find(".text-js");
  var text = thhis.text().trim().split('');
  var amntOfChars = text.length;
  var newString = "";
  thhis.text("|");
  setTimeout(function(){
    thhis.css("opacity",1);
    thhis.prev().removeAttr("style");
    thhis.text("");
    for(var i = 0; i < amntOfChars; i++){
      (function(i,char){
        setTimeout(function() {        
          newString += char;
          thhis.text(newString);
        },i*typingSpeed);
      })(i+1,text[i]);
    }
  },1500);
}


$(document).ready(function(){
  // Now to start autoTyping just call the autoType function with the 
  // class of outer div
  // The second paramter is the speed between each letter is typed.   
  autoType(".type-js",600);
});


//Forms
document.addEventListener( 'wpcf7mailsent', function( event ) {
	if ( '7944' == event.detail.contactFormId ) {
		dataLayer.push({'event': 'Hotline'});
	}
	if ( '8460' == event.detail.contactFormId ) {
		dataLayer.push({'event': 'Apply'});
	}	
	if ( '6892' == event.detail.contactFormId ) {
		dataLayer.push({'event': 'Privacy'});
	}		

}, false );