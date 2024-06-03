import EventSource from "eventsource";
const URL = "https://konnectprodstream2.knowlarity.com:8200/update-stream/f4bcd1f6-7cfd-4ff2-936a-c3bf10ed3918/konnect";
const source = new EventSource(URL);
console.log('Received an event .......');
source.onmessage = function (event) {
    console.log('Received an event .......');
	var data = JSON.parse(event.data)
	console.log('Received an event .......');
	console.log(data);
}