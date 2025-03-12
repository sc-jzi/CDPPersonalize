// Set the 'Output' field of your condition to: The visitor [[has]] visited [[page]] in the previous session 

(function () {
    var visited = "[[has | enum(has, has not) | has | { required: true, placeholder: has/has not }]]";
    var pageName = "[[page | string |  | { required: true, placeholder: page }]]";
    var expectedSessionType = "WEB";
    var expectedEventType = "VIEW";
    var mostRecentSession = true;
    var pageMatch = false;
    
    if (guest && guest.sessions && guest.sessions.length > 0) {
        loop:
        for (var i = 0; i < guest.sessions.length; i++) {
            if (guest.sessions[i]) {
                if (guest.sessions[i].sessionType !== expectedSessionType) {
                    continue loop;
                } else if (guest.sessions[i].status === "OPEN") {
                    continue loop;
                } else if (guest.sessions[i].events) {
                    if (mostRecentSession) {
                        mostRecentSession = false;
                        
                        for (var j = 0; j < guest.sessions[i].events.length; j++) {
                            if (guest.sessions[i].events[j].type === expectedEventType) {
                                var eventData = guest.sessions[i].events[j].arbitraryData;
                                
                                if (eventData && eventData.page) {
                                    var viewedpage = eventData.page;
                                    pageMatch = viewedpage.indexOf(pageName) >= 0 ? true : false;
                                    
                                    if (pageMatch) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    if (pageMatch) {
        if (visited === "has") {
            return true;
        }
        
        return false;
    }
})();
