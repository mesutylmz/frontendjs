

export default function loadUsersByName( usernName ){
	
	var  url = 'http://localhost:8080/rest/user' + '?name=' + userName;
	
	fetch(url).
		then(function(response) {
    return response.json();
	}).then(function(data) {
		console.log(data);
	});

	
	
}