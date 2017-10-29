app.controller('HomeCtrl', ["$scope", "$firebaseObject","$firebaseAuth", "$location", function($scope, $firebaseObject, $firebaseAuth, $location) {
    $scope.PlayerNumber = 0;
    //define Firebase database reference to 'members' in JSON tree
    var ref = firebase.database().ref().child("members");
    var obj = $firebaseObject(ref);
    //Fetch data of students if database have any
    obj.$loaded(
        function(data) {
            //Test log whether data received. Uncomment if for testing/logging.
            console.log(data);
            $scope.students = data;
        },
        function(error) {
            console.error("Error:", error);
        }
    );

    //Get Authentication credentials and check whether user is signed in or not.
    $scope.authObj = $firebaseAuth();
    $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
        //if signed in
        if (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            $scope.userLogged = true;
            $scope.param_id = firebaseUser.uid;

        } else {
        $location.path('/');
            $scope.userLogged = false;

        }
    });

    //Event triggered if clicked Logout button to sign out
    $scope.userLogout = function() {
    
        var r = confirm("Are you sure you wished to log out?");
        if (r == true) {
            //sign out from firebase Auth
            $scope.authObj.$signOut();
            alert("Successfully signed out!");
        
        } else {
            //do nothing
        }
    }

    //Count the total number of children/objects that represent every user in the app
    var count = 0;
    ref.on("child_added", function(snapshot) {
        var newCounter = snapshot.val();
        count++;
        $scope.PlayerNumber = count;
    });
    
}]);