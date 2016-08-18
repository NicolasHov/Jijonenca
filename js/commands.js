var commandsModule = angular.module('Commands', []).

service('CommandsService', function($http){
	var files = {};

	this.ls = function(currentDir){
		var command = "ls";

	    console.log("LOG-LS");
	    var promise = $http.get("/command/", {
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
	            console.log("currentDir: " + currentDir);
	            return data;
	        }
	    }).error(function(data, status, headers, config) {
	        console.log("-ERR Communication With Server");
	    });

	    return promise;
	};//fin ls method



	this.find = function(){
        $http.get("/command/", {
            params: {
                "command": command,
                "currentDir": $scope.currentDir,
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
                $scope.files = data;

                /* updating current dir */
                if ($scope.command !== "find") { /* if ls has a parameter */
                    console.log("Command: " + $scope.command);
                    var ls_path = $scope.command.split(" ")[1];
                    if (ls_path === "..") {
                        if ($scope.currentDir !== "/") {
                            $scope.currentDir = $scope.currentDir.split('/');
                            $scope.currentDir.pop();
                            $scope.currentDir = $scope.currentDir.join("/");
                            if (!$scope.currentDir.startsWith('/'))
                                $scope.currentDir = '/' + $scope.currentDir;
                        }
                    } else { /* ls with parameter != .. */
                        if ($scope.currentDir.endsWith('/'))
                            $scope.currentDir += ls_path;
                        else
                            $scope.currentDir += '/' + ls_path;
                    }
                }
                console.log("currentDir: " + $scope.currentDir);

            }
        })
        .error(function(data, status, headers, config) {
            console.log("-ERR Communication With Server");
        });
	};// end of find method
});