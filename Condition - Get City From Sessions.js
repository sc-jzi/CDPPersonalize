// Set the 'Output' field of your condition to: The visitor [[is]] in [[city]] during the current visit 

(function () {
    var visited = "[[is | enum(is, is not) | is | { required: true, values: [is, is not] }]]";
    var city = "[[city | string || {required: true, placeholder: city }]]";
    var cityMatch = false;
    var expectedType = "WEB";
    var expectedStatus = "OPEN";
    if (request && request.params && request.params.geo && request.params.geo.city) {
        if (request.params.geo.city.toLowerCase() === city.toLowerCase())
        {
            cityMatch = true;
        }
    } else if (guest && guest.sessions && guest.sessions.length > 0) {
        loop:
        for (var i = 0; i < guest.sessions.length; i++) {
            if (guest.sessions[i]) {
                if (
                    guest.sessions[i].sessionType !== expectedType
                    || guest.sessions[i].status !== expectedStatus
                ) {
                    continue loop;
                } else if (
                    guest.sessions[i].dataExtensions
                ) {
                    for (var j = 0; j < guest.sessions[i].dataExtensions.length; j++) {
                       if (guest.sessions[i].dataExtensions[j].key && guest.sessions[i].dataExtensions[j].key === 'bxt') {
                           if (guest.sessions[i].dataExtensions[j].values && guest.sessions[i].dataExtensions[j].values.geoLocationCity) {
                               if (guest.sessions[i].dataExtensions[j].values.geoLocationCity.toLowerCase() === city.toLowerCase())
                               {
                                   cityMatch = true;
                               }
                           }
                       } 
                    }
                }
            }
        }
    }
    
    return (visited === "is") && cityMatch || (visited === "is not") && !cityMatch;
})();
