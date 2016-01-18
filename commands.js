var fs = require('fs');
var request = require('request');

function pwd (stdin, file, done){
	done(process.env.PWD);
}

function myDate(stdin, file, done){
	done(new Date());
}

function ls(stdin, file, done){
	var output = [];
	
	fs.readdir('.', function(err, files) {
	  if (err) throw err;
	  files.forEach(function(f) {
	    output.push(f.toString());
	  });
	  done(output.join("\n"));
	});
}

function echo(stdin, file, done){
	if (!stdin){
		var result = file;
	} else {
		var result = stdin;
	}

	if(result[0] === "$" && result.length > 1){
		var enVar = process.env[result.substring(1)];
		
		if (enVar) {
			result = enVar;
		}
		else{
			result = file;
		} 
	} 
	done(result);
}

function cat (stdin, file, done){
	if(!stdin) {
		fs.readFile(file, (err, data) => {
			if(err) throw err;
			done(data);
		});
	} else {
		done(stdin);
	}
}

function head (stdin, file, done){
	if(!stdin) {
		fs.readFile(file, (err, data) => {
			if(err) throw err;
			data = data.toString().split("\n").slice(0,5).join("\n");
			done(data);
		});
	} else {
		var data = stdin.toString().split("\n").slice(0,5).join("\n");
		done(data);
	}
}


function tail (stdin, file, done){
	if(!stdin){
		fs.readFile(file, (err, data) => {
			if(err) throw err;
			data = data.toString().split("\n").slice(-5).join("\n");
			done(data);
		});	
	} else {
		var data = stdin.toString().split("\n").slice(-5).join("\n");
		done(data);
	}
}

function sort(stdin, file, done){
	if(!stdin){
		fs.readFile(file, (err, data) => {
			if(err) throw err;
			data = data.toString().split("\n").sort(function (a, b) {return a.toLowerCase().localeCompare(b.toLowerCase());}).join("\n");
			done(data);
		});
	} else {
		// data = stdin.toString().split("\n").sort(function(a,b) {return a.toLowerCase() > b.toLowerCase()}).join("\n");
		done(data);
	}
}

function wc(stdin, file, done){
	if(!stdin) {
		fs.readFile(file, (err, data) => {
			if(err) throw err;
			data = data.toString().split("\n").length;
			done(data);
		});
	} else {
		var data = stdin.toString().split("\n").length;
		done(data);
	}
}

function uniq(stdin, file, done){
	if(!stdin) {
		fs.readFile(file, (err, data) => {
			if(err) throw err;
			data = data.toString().split("\n");
			data = data.filter(function(currLine, i) {
				return (currLine !== data[i-1])
			}).join("\n");
			done(data);
		});
	} else {
		var data = stdin.toString().split("\n");
		data = data.filter(function(currLine, i) {
			return (currLine !== data[i-1])
		}).join("\n");
		done(data);
	}
}

function curl(stdin, file, done){
	if (!stdin) {
		request("http://" + file, function (error, response, body) {
		  	if (!error && response.statusCode == 200) {
		    	done(body); // Show the HTML for the Google homepage.
		  	}
		});
	} else {
		request("http://" + stdin, function (error, response, body) {
		  	if (!error && response.statusCode == 200) {
		    	done(body); // Show the HTML for the Google homepage.
		  	}
		});
	}
}





module.exports = {
	pwd: pwd,
	date: myDate,
	ls: ls,
	echo: echo, 
	cat: cat,
	head: head,
	tail: tail,
	sort: sort,
	wc: wc,
	uniq: uniq,
	curl: curl
};