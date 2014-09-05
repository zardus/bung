var username = 'yansname@hotmail.com', password = 'DtDTCAY2@S0g';

phantom.casperPath = 'node_modules/casperjs';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');

var casper = require('casper').create({
	pageSettings: {
		userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36'
	},
	viewportSize: {
		width: 1024,
		height: 768
	},
});

casper.start('http://login.live.com');

casper.then(function logIn() {
	this.echo("Logging in....");
	this.viewport(1024, 768);
	this.fill('form[name="f1"]', {
		'login': username,
		'passwd': password,
		'KMSI': true
	}, false);
	this.click('input[name="SI"]');
	this.echo("Login done!");
});
casper.then(function() { this.capture('captures/logged_in.png'); });

// get our search term
var search_term = "";
casper.thenOpen('http://watchout4snakes.com/wo4snakes/Random/RandomSentence');
casper.then(function() {
	search_term = this.fetchText("#result")
 	this.capture('captures/search_term.png');
	this.echo("Searching for: " + search_term);
});

// go to bing
casper.thenOpen('http://www.bing.com/');

// do the search
casper.then(function() {
	this.wait(3000);
	this.fill('form#sb_form', { q: search_term });
	this.click('#sb_form_go');
	this.echo("Search done.");
});
casper.then(function() { this.capture('captures/search_results.png'); });
casper.then(function() {
	this.click('#scpt5');
});
casper.then(function() { this.capture('captures/wtf.png'); });

casper.run(function() {
	this.exit();
});

