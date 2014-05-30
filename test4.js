var fs = require('fs');
var http = require('http');
var sys = require('sys');
var path = require('path');
var url = require('url');

/*	
var op_command1 = "./scriptrrd.bash 20 2 cpu_user cpu_system mem_act mem_free disks_op total_page page_out page_freed page_in";
var op_command2 = "./scriptgraph.bash ";
op_command2 = op_command2 + data_vm.stime +" " + data_vm.ftime;
        for(var i=0; i<data_vm.data.length;i++){
                op_command2 = op_command2 +" " + data_vm.data[i];
        }
*/

var exec = require('child_process').exec;
var child;
/*
child = exec(op_command2,
	function (error, stdout, stderr) {
	console.log('std.out: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
});
*/

http.createServer(function(req,res) {
	var data_vm = url.parse(req.url,true).query;
	var my_path = url.parse(req.url,true).pathname;
	var full_path = path.join(process.cwd(),my_path);  
	console.log("request: ",req.url);
	console.log("full_path: ",full_path);	
	if(full_path === "/usr/home/pim/"){
		fs.readFile('/usr/home/pim/image/temp.html',function(err, html) {
		if (err) throw err;
     		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(html);
		res.end();
		});
        console.log("Value: %s", data_vm.data);
//      console.log("Value: %s", data_vm.data.length);
        console.log("Start-Time: %s", data_vm.stime);
        console.log("Finish-Time: %s", data_vm.ftime);
		if(data_vm.stime && data_vm.ftime){
			var op_command2 = "./scriptgraph.bash ";
			op_command2 = op_command2 + data_vm.stime +" " + data_vm.ftime;
		        for(var i=0; i<data_vm.data.length;i++){
                		op_command2 = op_command2 +" " + data_vm.data[i];
        		}
		console.log("command: %s", op_command2);
		child = exec(op_command2,
        	function (error, stdout, stderr) {
        	console.log('std.out: ' + stdout);
        	console.log('stderr: ' + stderr);
        	if (error !== null) {
                	console.log('exec error: ' + error);
        	}
		}); // close child
		} // close internal if

		if(data_vm.start_time && data_vm.finish_time){
                        var op_command2 = "./scriptgraph.bash ";
                        op_command2 = op_command2 + data_vm.stime +" " + data_vm.ftime;
                        for(var i=0; i<data_vm.data.length;i++){
                                op_command2 = op_command2 +" " + data_vm.data[i];
                        }
                console.log("command: %s", op_command2);
                child = exec(op_command2,
                function (error, stdout, stderr) {
                console.log('std.out: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                        console.log('exec error: ' + error);
                }
                }); // close child
                } // close internal if

        }
	if(full_path === "/usr/home/pim/vm.png"){
		fs.readFile(full_path,function(err, file) {
		if (err) throw err;
		res.writeHead(200, {'Content-Type': 'image/png'});
                res.end(file);
        	});
	}
}).listen(8080);
