var commandsModule = angular.module('Commands', []).

service('CommandsService', function($http){
	var files = {};

    /* This function allows sending an 'ls command' to the server */
	this.ls = function(command, currentDir){
	    console.log("LOG-LS");
	    var promise = $http.get("/command/", {
	        params: {
	            "command": command,
	            "currentDir": currentDir,
	        }
	    })
	    .success(function(data, status, headers, config) {
	        if (data["type"] == false) {
	            console.log("Error: " + data['data']);
	        } else {
	            /* updating file manager view */
	            data.data[0] = {
	                "name": "..",
	                "size": "0",
	                "last_modified": "/",
	                "type": "link"
	            };

	            /* updating current dir */
	            if (command !== "ls") { /* if ls has a parameter */
	                console.log("Command: " + command);
	                var ls_path = command.split(" ")[1];
	                if (ls_path === "..") {
	                    if (currentDir !== "/") {
	                        currentDir = currentDir.split('/');
	                        currentDir.pop();
	                        currentDir = currentDir.join("/");
	                        if (!currentDir.startsWith('/'))
	                            currentDir = '/' + currentDir;
	                    }
	                } else { /* ls with parameter != .. */
	                    if (currentDir.endsWith('/'))
	                        currentDir += ls_path;
	                    else
	                        currentDir += '/' + ls_path;
	                }
	            }
	            console.log("files: " + JSON.stringify(data));
	            return data;
	        }
	    }).error(function(data, status, headers, config) {
	        console.log("-ERR Communication With Server");
	    });

	    return promise;
	};//fin ls method


    /* This function allows sending a find command to the server */
	this.find = function(command, currentDir){
        $http.get("/command/", {
            params: {
                "command": command,
                "currentDir": currentDir,
            }
        })
        .success(function(data, status, headers, config) {
            if (data["type"] == "1") {
                console.log("Error: " + data["message"]);
            } else {
                /* updating file manager view */
                data[0] = {
                    "name": "..",
                    "size": "0",
                    "last_modified": "/",
                    "type": "link"
                };

                /* updating current dir */
                if ($scope.command !== "find") { /* if ls has a parameter */
                    console.log("Command: " + $scope.command);
                    var ls_path = $scope.command.split(" ")[1];
                    if (ls_path === "..") {
                        if (currentDir !== "/") {
                            currentDir = currentDir.split('/');
                            currentDir.pop();
                            currentDir = currentDir.join("/");
                            if (!currentDir.startsWith('/'))
                                currentDir = '/' + currentDir;
                        }
                    } else { /* ls with parameter != .. */
                        if (currentDir.endsWith('/'))
                            currentDir += ls_path;
                        else
                            currentDir += '/' + ls_path;
                    }
                }
                console.log("currentDir: " + currentDir);
                return data;
            }
        })
        .error(function(data, status, headers, config) {
            console.log("-ERR Communication With Server");
        });
	};// end of find method

    /* Function for sending general commands to the server */
	this.else = function(command, currentDir){
	    console.log("Sending Command : " + command);
	    $http.get("/command/", {
            params: {
                "command": command,
                "currentDir": currentDir,
            }
        })
        .success(function(data, status, headers, config) {
            if (data["type"] == "1") {
                console.log("Error: " + data["message"]);
            } else(data["type"] == "0")
            console.log("Ok Success: " + data["message"]);

        })
        .error(function(data, status, headers, config) {
            console.log("-ERR Communication With Server");
        });
	};
});