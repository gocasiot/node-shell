var commands = require('./commands.js');


// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  // var argv = data.toString().trim().split(" "); // remove the newline
  // var cmd = argv[0];
  // var file = argv[1];

  var cmdString = data.toString().trim();
  var cmdList = cmdString.split(/\s*\|\s*/g)

  var firstCommand = cmdList.shift();
  var cmd = firstCommand.split(" ")[0];
  var file = firstCommand.split(" ")[1];
  var stdin = null;

  // console.log(cmdList);

  commands[cmd](stdin, file, done);
  
  function done(result){
	if (cmdList.length > 0) {
		var nextCommand = cmdList.shift();
  		var cmd = nextCommand.split(" ")[0];
  		// var file = nextCommand.split(" ")[1];
  		var file = null;
  		commands[cmd](result, file, done);
	} else {
		process.stdout.write(result + "\n");
    	process.stdout.write('prompt >');
	}

}
  
  
  //process.exit();

});







