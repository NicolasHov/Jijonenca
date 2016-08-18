var cappuccinoWebClient = angular.module('cappuccinoWebClient', ['Commands'])
    .controller('controller', ['$scope', '$http', 'CommandsService', function($scope, $http, $CommandsService) {
        $scope.command = "ls";
        $scope.currentDir = "/";
        $scope.homePage = false;
        $showUploadForm = false;
        $scope.files = {};
        $scope.allowed_commands = ["ls", "cp", "mv", "dw", "up", "find"];

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
                $CommandsService.ls($scope.currentDir).then(function(data) {
                    var output = [];
                    for (i = 0; i < Object.keys(data.data).length; i++) {
                        output.push(data.data[i]);
                    }
                    $scope.files = output;
                });
                return;
            } else if ($scope.command.startsWith("find")) {


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
