//Controller to handle Member's Points, Name, Email, Gender data
app.controller('MemberCtrl', ["$scope", '$http', '$route', '$routeParams', '$location', '$firebaseObject', '$firebaseAuth', function($scope, $http, $route, $routeParams, $location, $firebaseObject, $firebaseAuth) {

    // get param of url member id
    var url = $routeParams.member_id;
    // define reference for Firebase to access database of child("members")
    var ref = firebase.database().ref().child("members").child(url);
    // define and assign Firebase Object
    var player = $firebaseObject(ref);
    //define player's name, gender, email and total points
    var init_player_name;
    var init_player_email;
    var init_player_gender;
    var init_player_total_points;

    //Get Authentication credentials and check whether user is signed in or not.
    $scope.authObj = $firebaseAuth();
    $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
        //if signed in and the firebase uid matches the url param
        if (firebaseUser && (url == firebaseUser.uid)) {
            console.log("Signed in as:", firebaseUser.uid);
            getData();
        } else if (firebaseUser && url != firebaseUser.uid){
            // If user is signed in / trying to access data of other members'
            alert("Not authorized to access this page!");
            $location.path("/error/");
        }
        else{
            //do nothing
        }
    });

    //create function to fetch data from Firebase server
    function getData() {
        player.$loaded().then(function() {
            init_player_name = player.player_name;
            init_player_email = player.player_email;
            init_player_gender = player.player_gender;
            init_player_total_points = player.player_total_points;
            //set loader to be hidden after completed fetch data
            $scope.loadingCompleted = true;
        });
        // allow real time data binding between the inputs' view and firebase server
        player.$bindTo($scope, "data").then(function() {
            console.log($scope.data);
            $scope.data.player_total_points = init_player_total_points;
            $scope.data.player_name = init_player_name;
            $scope.data.player_email = init_player_email;
            // Update latest values to the database and view
            ref.update({
                player_name: init_player_name,
                player_email: init_player_email,
                player_total_points: init_player_total_points
            });
        });
    }
    //Event triggered if clicked Logout button to sign out
    $scope.logoutSubmit = function() {
    
        var r = confirm("Are you sure you wished to log out?");
        if (r == true) {
            //sign out from firebase Auth and redirect back to home
            $scope.authObj.$signOut();
            alert("Successfully signed out!");
            $location.path("/");
        } else {
            //do nothing
        }
    }

    // create function for click button to add points to total point score.
    $scope.addPt = function(point) {
        $scope.data.player_total_points = $scope.data.player_total_points += point;
    }
}]);