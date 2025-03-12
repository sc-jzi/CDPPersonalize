// The 'Output' field of your condition should be set to: [[Event Value]] [[has]] been sent in [[any]] session

(function() {
  var sent = "[[has | enum(has, has not) | has | { required: true, placeholder: has/has not }]]";
  var customEventTypeValue = "[[Event Value | string |  | { required: true, placeholder: Custom event value }]]".toLowerCase();
  var currentOrAny = "[[any | enum(any, current ) | current | { required: true, placeholder: any/current }]]";
  var expectedSessionType = "WEB";
  var customEventSent = false;

  if (guest && guest.sessions && guest.sessions.length > 0) {
        
      loop: for (var i = 0; i < guest.sessions.length; i++) {
          if (guest.sessions[i]) {
              if (guest.sessions[i].sessionType !== expectedSessionType) {
                continue loop;
              } else if (guest.sessions[i].events) {
                  if (currentOrAny === 'current' && guest.sessions[i].status === 'OPEN') {
                      for (var j = 0; j < guest.sessions[i].events.length; j++) {
                          if (guest.sessions[i].events[j].type.toLowerCase() === customEventTypeValue) {
                              customEventSent = true
                            
                              if (customEventSent) {
                                break;
                              }
                          }
                      }
                  } else if (currentOrAny === 'any') {
                      for (var j = 0; j < guest.sessions[i].events.length; j++) {
                          if (guest.sessions[i].events[j].type.toLowerCase() === customEventTypeValue) {
                              customEventSent = true
                            
                              if (customEventSent) {
                                break;
                              }
                          }
                      }
                  }
          
              } else {
                  continue loop;
              }
          }
      }
  }
  
  if (customEventSent && sent == 'has') {
      return true
  }
  
  return false
})();
