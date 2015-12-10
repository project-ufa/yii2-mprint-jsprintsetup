
(function($) {
	$.fn.print = function ( options ) {
		var settings = $.extend(true, {
            debug: false,
            dbgHeight: '100%',
            dbgWidtht: '100%',
            cssFile: '',
            documentName : document.title,
            timeOut: 60,
            redirUrl: null,
            redirTimeout: 2000,
            jsPrintSettings: null
		}, options);

		var jsP = $.extend({
            	defaultPrinter: null,
            	headerStrLeft: null,
            	headerStrCenter: null,
            	headerStrRight: null,
            	footerStrLeft: null,
            	footerStrCenter: null,
            	footerStrRight: null,
            	marginTop: 15,
            	marginBottom: 15,
            	marginLeft: 15,
            	marginRight: 15,
            	shrinkToFit: true,
            	printBGImages: true,
            	silentPrint: false
            }, options.jsPrintSettings);

        var strFrameName = ("printer-" + (new Date()).getTime());
 
        // Create an iFrame with the new name.
        var jFrame = $( "<iframe name='" + strFrameName + "'>" );
 
        if(!settings.debug)   {
            jFrame
            .css( "width", "0px" )
            .css( "height", "0px" )
            .css( "position", "absolute" )
            .css( "left", "-9999px" )
            .css( "top", "-9999px" );
        }
        else    {
            jFrame
            .css( "width", settings.dbgWidth )
            .css( "height", settings.dbgHeight )
            .css( "position", "absolute" )
        }

        jFrame.appendTo( $( "body:first" ) );
 
        // Get a FRAMES reference to the new frame.
        var objFrame = window.frames[ strFrameName ];
 
        // Get a reference to the DOM in the new frame.
        var objDoc = objFrame.document;
 
        // Grab all the style tags and copy to the new
        // document so that we capture look and feel of
        // the current document.
 
        // Create a temp document DIV to hold the style tags.
        // This is the only way I could find to get the style
        // tags into IE.
        var jStyleDiv = $( "<div>" ).append(
            $( "style" ).clone()
            );

        var printContents = "<!DOCTYPE html>" +
            "<html>" +
            "<head><title>" + settings.documentName + "</title>" +
            jStyleDiv.html() +
            '<link rel="stylesheet" type="text/css" href="'+settings.cssFile+'" />' +
            "</head>" +
            "<body>" +
            this.html() +
            "</body></html>";

        // Replace any Fieldset element with div
        var $printContents = $('<html />', {html:printContents});

        $printContents.find('fieldset').each(
            function(item)
            {
                $(this).replaceWith($('<div class="fieldset">' + this.innerHTML + '</div>'));
            }
        );

        // remove al a elements
        $printContents.find('a.view').each(
            function(item)
            {
                $(this).replaceWith("");
            }
        );

        objDoc.open();
        objDoc.write($printContents.html());
        objDoc.close(); 
    
   
        // Print the document.
        objFrame.focus();

        var result_jsp = false;
        try {
        	if(jsPrintSetup != undefined) {
        		//var jsP = settings.jsPrintSettings;
        		
	    		//set default printer
	    		if(jsP.defaultPrinter!=null)
	    			jsPrintSetup.setPrinter(jsP.defaultPrinter);

	    		if(jsP.silentPrint == true) {
	    			jsPrintSetup.clearSilentPrint();
	    			jsPrintSetup.setSilentPrint(true);;
	    		}


            	if(jsP.headerStrLeft != null)
		            jsPrintSetup.setOption('headerStrLeft', jsP.headerStrLeft);
            	if(jsP.headerStrCenter != null)
		            jsPrintSetup.setOption('headerStrCenter', jsP.headerStrCenter);
            	if(jsP.headerStrRight != null)
		            jsPrintSetup.setOption('headerStrRight', jsP.headerStrRight);

            	if(jsP.footerStrLeft != null)
		            jsPrintSetup.setOption('footerStrLeft', jsP.footerStrLeft);
            	if(jsP.footerStrCenter != null)
		            jsPrintSetup.setOption('footerStrCenter', jsP.footerStrCenter);
            	if(jsP.footerStrRight != null)
		            jsPrintSetup.setOption('footerStrRight', jsP.footerStrRight);
            
	            jsPrintSetup.setOption('marginTop', jsP.marginTop);
	            jsPrintSetup.setOption('marginBottom', jsP.marginBottom);
	            jsPrintSetup.setOption('marginLeft', jsP.marginLeft);
	            jsPrintSetup.setOption('marginRight', jsP.marginRight);
	            
	            jsPrintSetup.setOption('shrinkToFit', jsP.shrinkToFit);
	            jsPrintSetup.setOption('printBGImages', jsP.printBGImages);

	            // send to print
				jsPrintSetup.printWindow(objFrame);

	    		if(jsP.silentPrint) {
	    			
	    			setTimeout(function(){
	    				jsPrintSetup.clearSilentPrint();
	    				jsPrintSetup.setSilentPrint(false);
	    				if(settings.redirUrl!=null)
	    					console.log('redirecting to: ' + settings.redirUrl);
	    					window.location = settings.redirUrl;
	    			}, settings.redirTimeout);
	    		}

        	}
            
        }
        catch(err)
        {
            result_jsp = false;
              txt="There was an error on this page.\n\n";
              txt+="Error description: " + err.message + "\n\n";
              txt+="Click OK to continue.\n\n";
              alert(txt);
        }
        
        if(!settings.debug) {
            setTimeout(
                function(){
                    jFrame.remove();
                },
                (settings.timeOut * 1000)
                );
        }


		return this;
	};
}(jQuery));