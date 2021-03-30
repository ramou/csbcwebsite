
function renderSearchBox() {
	google.search.cse.element.render(
            {
              div: "search",
              tag: 'searchbox-only',
              attributes: {
            	  resultsUrl: 'search.html',
            	  enableAutoComplete: 'true'
              }
            });
	var element = $('input.gsc-input');
	  element.attr('placeholder', "SEARCH SITE");
}

function renderSearchResult() {
	google.search.cse.element.render(
            {
              div: "searchResult",
              tag: 'searchresults-only',
            });
}
var setupOnLoad = [];
$(function() {
    highlightCurrentMenuItem();
    setupLogoClick();

    (function() {
        var cx = '016202362187468762670:wdq-p3deq_u';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
        
      })();
    
    
    
    setupOnLoad.push(renderSearchBox);
    
	var href = $(location).attr('href').split('\\').pop().split('/').pop().split('#')[0].split('?')[0];
	if(href === "") href="index.html";
    if(href==='search.html') {
    	setupOnLoad.push(renderSearchResult);
    } 
    
    window.__gcse = {
	  		  parsetags: 'explicit',
	  		  callback: myGoogleStuffCallback
    };

});



var myGoogleStuffCallback = function() {
	  if (document.readyState == 'complete') {
		for (i = 0; i < setupOnLoad.length; ++i) {
			setupOnLoad[i]();
		}
	  } else {
	    // Document is not ready yet, when CSE element is initialized.
	    google.setOnLoadCallback(function() {
			for (i = 0; i < setupOnLoad.length; ++i) {
				setupOnLoad[i]();
			}
	    }, true);
	  }
};



function highlightCurrentMenuItem() {
	//Grabbed a nice solution from
	//https://stackoverflow.com/questions/423376/how-to-get-the-file-name-from-a-full-path-using-javascript
	var href = $(location).attr('href').split('\\').pop().split('/').pop().split('#')[0].split('?')[0];
	if(href === "") href="index.html";
	$("a[href='"+href+"']").addClass("current");

}

function setupLogoClick() {
    $(".main_menu").click(function(e) {
    	var about = $(this).find("li").first();
    	
    	if( e.pageX-$(this).offset().left < 250 & e.pageY-$(this).offset().top < 115) {
    		//console.log("rawr " + e.pageX);
    		about.find('a')[0].click(true);
    	}
    });
}