(function () {
    // Add statements here
    var days = "[[ Number of days | number | | { required: true, min: 0, placeholder: 90 } ]]";
  
    var expectedSessionType = "WEB";
    var timeSpent = 0.00;
    var actualDate = new Date(Date.now());
    
    if (guest && guest.sessions && guest.sessions.length > 0) {
        loop:
        for (var i = 0; i < guest.sessions.length; i++) {
            if (guest.sessions[i]) {
                if (guest.sessions[i].sessionType !== expectedSessionType) {
                    continue loop;
                } else {
                    var creationDate = guest.sessions[i].createdAt;
                    if (creationDate) {
                        var date = new Date(creationDate);
                        var timePassed = actualDate.getTime() - date.getTime();
                        var daysPassed = Math.floor(timePassed / (1000 * 3600 * 24));
                        if (daysPassed <= days) {
                            var startDate = guest.sessions[i].startedAt;
                            var endDate = guest.sessions[i].endedAt;
                            
                            if (startDate && endDate)
                            {
                                var sDate = new Date(startDate);
                                var eDate = new Date(endDate);
                                var sessionTime = (eDate.getTime() - sDate.getTime()) / 1000;
                                timeSpent += Math.abs(sessionTime);
                            }
                        }
                    }

                }
            }
        }
    }

    return timeSpent;
})();
