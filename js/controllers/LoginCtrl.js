//Controller to handle Login Authentication 
app.controller('LoginCtrl', ['$scope', '$firebaseAuth', '$location', function($scope, $firebaseAuth, $location) {
    //define auth object for firebase Authentication
    $scope.authObj = $firebaseAuth();
    //define function scope for button ng-click in register.html
    $scope.loginSubmit = function() {

        //console.log($scope.player_email + ' ' + $scope.player_password);

        //use method signInWithEmailAndPassword(email, password) to allow user to sign in after clicked submit button
        $scope.authObj.$signInWithEmailAndPassword($scope.player_email, $scope.player_password).then(function(firebaseUser) {
            alert("User " + firebaseUser.uid + " Signed in!");
            //redirected to member/id url
            $location.path("/member/" + firebaseUser.uid);
        }).catch(function(error) {
            console.error("Error: ", error);
            $scope.errorMessage = error.message;
        });
    }
}]);