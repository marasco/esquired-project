const mandrill = require('mandrill-api/mandrill');

module.exports = {
	
	email: function(email, subject, text){

	mandrill_client = new mandrill.Mandrill('2-1UFpeIBHy67hD-kxSEZw');

	var raw_message = "From: esquired@flydevs.com\nTo: "+email+"\nSubject: "+subject+"\n\n"+text+"";
	var from_email = "esquired@flydevs.com";
	var from_name = "Esquired";
	var to = [
	    email
	];
	var async = false;
	var ip_pool = "Main Pool";
	var send_at = false;
	var return_path_domain = 'https://flydevs.com';
	mandrill_client.messages.sendRaw({"raw_message": raw_message, "from_email": from_email, "from_name": from_name, "to": to, "async": async, "ip_pool": ip_pool, "send_at": send_at, "return_path_domain": return_path_domain}, function(result) {
	    console.log(result)
	    
	}, function(e) {
	    // Mandrill returns the error as an object with name and message keys
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	});

	}
}