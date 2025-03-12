// Function to parse through all of a visitor's sessions and return an array of pages viewed.
function getAudienceType(numSessions) {

    // Declare an array variable to capture the most recent session data.
    var sessionPageViews = [];

    // Declare the return Audience Pattern.
    var audTypeA = "[[ Audience Type A | String ]]";
    var audPatternA = "[[ Audience Pattern A | String ]]";
    var audTypeB = "[[ Audience Type B | String ]]";
    var audPatternB = "[[ Audience Pattern B | String ]]";
    var audTypeC = "[[ Audience Type C | String ]]";
    var audPatternC = "[[ Audience Pattern C | String ]]";
    var audType = "";
    
    // Declare audience pattern counts for each audience type.
    var audOneCount = 0;
    var audTwoCount = 0;
    var audThreeCount = 0;
    var otherCount = 0;
    
    // Place all sessions into an array variable called cdpSessions.
    var cdpSessions = guest.sessions;
    
    for (var i = 0; i < cdpSessions.length; i++) {
        // Place each session into the cdpSession array to access events within each session.
        var cdpSession = cdpSessions[i];
    
        // Only look sessions with type = WEB.
        if (cdpSession.sessionType === 'WEB') {
         	// Place all of a sesssion's event data into the events array.
            var events = cdpSession.events;
        
            // Loop through all of the events found within sessions with a type of 'WEB'
         	for (var j = 0; j < events.length; j++) {
         		var event = events[j];
        
         		// Look for events of type 'VIEW' which have arbitraryData and a Sitecore Template Name of 'Session'
                if (event.type === 'VIEW' && event.arbitraryData && event.arbitraryData.page !== '/en') {
         			
                    // If all above conditions are met, then push the event data into sessionPageViews array.
                    // sessionPageViews.push(event);
                    
                    if (event.arbitraryData.page.contains(audPatternA)){
                        audOneCount = audOneCount + 1;
                    } else if (event.arbitraryData.page.contains(audPatternB)){
                        audTwoCount = audTwoCount + 1;
                    } else if (event.arbitraryData.page.contains(audPatternC)){
                        audThreeCount = audThreeCount + 1;
                    } else {
                        otherCount = otherCount + 1;
                    }
         		}
     	    }
    
            // End loop after processing the latest session data. Evaluating the last session only via 'numberOfPageViews' variable set to '1'.
         	if (sessionPageViews.length === numSessions) {
         	    break;
         	}
        }
    }
     	
     // Compare the three audience pattern integers.
     if ((parseInt(audOneCount, 10) > parseInt(audTwoCount, 10)) && (parseInt(audOneCount, 10) > parseInt(audThreeCount, 10))){
         audType = audTypeA;
     } else if ((parseInt(audTwoCount, 10) > parseInt(audOneCount, 10)) && parseInt(audTwoCount, 10) > parseInt(audThreeCount, 10)) {
         audType = audTypeB;
     } else if ((parseInt(audThreeCount, 10) > parseInt(audOneCount, 10)) && parseInt(audThreeCount, 10) > parseInt(audTwoCount, 10)) {
         audType = audTypeC;
     } else {
         audType = "Default";
     }
     	
    // Print statements to make sure properly processing event data.
    print('Student: ' + audOneCount);
    print('Researcher: ' + audTwoCount);
    print('None: ' + audThreeCount);
    print('Audience Pattern: ' + audType);
    
    // Return the session page view array back to the calling main function.
    return audType;
}

(function () {

    // Call the function to get an array of data associated with the last session.
    var audienceType = getAudienceType(1);
    
    if (audienceType !== ''){
        return audienceType;
    } else {
        return "";
    }

})();
