var cappuccinoWebClient = angular.module('cappuccinoWebClient', [])
    .controller('controller', ['$scope', '$http', function($scope, $http) {
        $scope.command = "ls";
        $scope.currentDir = "/";
        $scope.homePage = false;
        $showUploadForm = false;

        $scope.allowed_commands = ["ls", "cp", "mv", "dw", "up"];

        $scope.sendCommandRequest = function(command) {
            /* LS command */
            console.log("COMANDOLO : " + $scope.command);
            if ($scope.command.startsWith("dw")) {
                console.log("LOG :" + $scope.command);
                location.replace('/download/?command=' + $scope.command + '&currentDir=' + $scope.currentDir);
            } else if ($scope.command.startsWith("up")) {
                console.log("LOG :" + $scope.command);
                $showUploadForm = true;
                return;
            } else if ($scope.command.startsWith("ls")) {
                console.log("LOG-LS")
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
                            if ($scope.command !== "ls") { /* if ls has a parameter */
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
            } else {

                /* Other Commands */
                var commandName = "";
                if ($scope.command.indexOf(' ') != -1)
                    commandName = $scope.command.split(' ')[0];

                /* Verify that the command is allowed */
                if (1 > 0) {
                    console.log("Sending Command : " + $scope.command);
                    $http.get("/command/", {
                            params: {
                                "command": $scope.command,
                                "currentDir": $scope.currentDir,
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
                }
            }
        }

        $scope.lsCommandRequestOnClick = function(event) {
            var event_target = event.target;
            var clicked_row = $(event_target).parent();
            var clicked_row = $(clicked_row).children()[0];
            console.log($(clicked_row).text());
            $scope.command = "ls " + $(clicked_row).text();
            this.sendCommandRequest($scope.command);
        }

        $scope.sendBarCommandRequest = function() {
            console.log("COMMAND : " + $scope.command);
            $scope.sendCommandRequest($scope.command);
        }

        /* home page directory file list */
        if ($scope.homePage == false) {
            $scope.sendCommandRequest("ls");
            $scope.homePage = true;
        }

    }]);
