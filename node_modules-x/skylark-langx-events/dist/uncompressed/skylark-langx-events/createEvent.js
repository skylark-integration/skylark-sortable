define([
	"./events",
	"./Event"
],function(events,Event){
    function createEvent(type,props) {
        //var e = new CustomEvent(type,props);
        //return safeMixin(e, props);
        return new Event(type,props);
    };

    return events.createEvent = createEvent;	
})