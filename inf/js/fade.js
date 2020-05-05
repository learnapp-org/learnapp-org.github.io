    
        jQuery('body').css('display','none');
	jQuery(document).ready(function() {
		jQuery('body').fadeIn();
		jQuery('a').on('click',function(event){
			var thetarget = this.getAttribute('target')
			if (thetarget != "_blank"){			
				var thehref = this.getAttribute('href')
				event.preventDefault();
				jQuery('body').fadeOut(function(){
					//alert(thehref)
					window.location = thehref					
				});
			}
		});
	});
	setTimeout(function(){
		jQuery('body').fadeIn();
	},1000)