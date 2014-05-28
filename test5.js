var fs = require('fs');
var http = require('http');
var sys = require('sys');
var path = require('path');
var url = require('url');

var exec = require('child_process').exec;
var child;
/*
child = exec('date > out.txt',
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
	//var full_path = path.join(process.cwd(),my_path);  
/*
	path.exists(full_path,function(exists){  
        if(!exists){  
            res.writeHeader(404, {"Content-Type": "text/plain"});    
            res.write("404 Not Found\n");    
            res.end();  
        }  
        else{  
            fs.readFile(full_path, "binary", function(err, file) {    
                 if(err) {    
                     res.writeHeader(500, {"Content-Type": "text/plain"});    
                     res.write(err + "\n");    
                     res.end();    
                 
                 }    
                 else{  
                    res.writeHeader(200);    
                    res.write(file, "binary");    
                    res.end();  
                }  
                       
            });  
        } 
	});	//close path.exists	
*/
	fs.readFile('/usr/home/pim/image/temp.html',function(err, html) {
	if (err) throw err;
     	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(html);
	res.end();

var op_command1 = "./scriptrrd.bash 20 2 cpu_user cpu_system mem_act mem_free disks_op total_page page_out page_freed page_in";
var op_command2 = "./scriptgraph.bash ";
op_command2 = op_command2 + data_vm.stime +" " + data_vm.ftime;
for(var i=0; i<data_vm.data.length;i++){
	op_command2 = op_command2 +" " + data_vm.data[i];
}

//var command = "date > date_out.txt"; 	
//child = exec('date > date_out.txt',
child = exec(op_command1,
        function (error, stdout, stderr) {
        console.log('std.out: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
                console.log('exec error: ' + error);
        }
});

	console.log("Value: %s", data_vm.data);
	console.log("Value: %s", data_vm.data.length);
	console.log("Start-Time: %s", data_vm.stime);
	console.log("Finish-Time: %s", data_vm.ftime);
	console.log("Command: %s", op_command2);
	});
}).listen(8080);
