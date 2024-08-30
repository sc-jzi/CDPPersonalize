(function () {
    var visited = "[[has | enum(has, has not) | has | { required: true, placeholder: has/has not }]]";
    var pageName = "[[page | string |  | { required: true, placeholder: page }]]";
    var expectedSessionType = "WEB";
    var expectedEventType = "VIEW";
    
    if (guest && guest.sessions && guest.sessions.length > 0) {
        loop:
        for (var i = 0; i < guest.sessions.length; i++) {
            if (guest.sessions[i]) {
                if (guest.sessions[i].sessionType !== expectedSessionType && guest.sessions[i].status === "OPEN") {
                    continue loop;
                } else if (guest.sessions[i].events) {
                    for (var j = 0; j < guest.sessions[i].events.length; j++) {
                        var eventData = guest.sessions[i].events[j].arbitraryData;
                        var eventType = guest.sessions[i].events[j].type;

                        if (eventData && eventData.page && eventType === expectedEventType) {
                            var viewedpage = eventData.page;
                            
                            pageMatch = viewedpage.indexOf(pageName) >= 0 ? true : false;
                            
                            if (pageMatch) {
                                if (visited === "has") {
                                    return true;
                                }
                                
                                return false;
                            }
                        }
                    }
                }
            }
        }
    }
    
    return false;
})();
