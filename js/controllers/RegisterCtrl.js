//Controller to handle Registration Authentication 
app.controller('RegisterCtrl', ['$scope', '$firebaseAuth', '$firebaseObject', '$location', function($scope, $firebaseAuth, $firebaseObject, $location) {
    $scope.authObj = $firebaseAuth();
    $scope.submit = function() {
        //define reference to Firebase server and access "/members" in JSON tree
        var ref = firebase.database().ref().child("members");

        //use createUserWithEmailAndPassword method with player email password from input
        $scope.authObj.$createUserWithEmailAndPassword($scope.player_email, $scope.player_password).then(function(firebaseUser) {
            alert("User " + firebaseUser.uid + " created successfully!");
            //define user reference to /members/$id which the $id represents your email uid given by Firebase
            var userRef = ref.child(firebaseUser.uid);
            //define FirebaseObject called member to add name,gender,email,and instantize total points to 0 by default
            var member = $firebaseObject(userRef);
            member.player_name = $scope.player_name;
            member.player_gender = $scope.player_gender;
            member.player_email = $scope.player_email;
            member.player_total_points = 0;
            //update information into Firebase database with the inputs given
            member.$save().then(function(ref) {
                // allow the index $id to be same as member's id
                ref.key === member.$id; 
                alert('Successfully updated');
                //redirect to url member/{{id}}
                $location.path("/member/" + firebaseUser.uid);

            }, function(error) {
                console.log("Error:", error);
            });

        }).catch(function(error) {
            alert(error.message);
            $scope.errorMessage = error.message;
        });
    }

}]);
