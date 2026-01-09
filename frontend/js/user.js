
        angular.module('userApp', [])
            .controller('UserController', function($scope, $http) {
                $scope.users = [];
                $scope.newUser = {};
                const API_URL = 'http://127.0.0.1:8000/api/user/';

                // Load users
                $scope.loadUsers = function() {
                    $http.get(API_URL)
                        .then(function(response) {
                            $scope.users = response.data;
                        })
                        .catch(function(error) {
                            console.error('Error loading users:', error);
                            alert('Failed to load users');
                        });
                };

                // Add user
                $scope.addUser = function() {
                    if (!$scope.newUser.name || !$scope.newUser.email) {
                        alert('Name and Email are required');
                        return;
                    }
                    $http.post(API_URL, $scope.newUser)
                        .then(function(response) {
                            $scope.users.push(response.data);
                            $scope.newUser = {};
                            alert('User added successfully');
                        })
                        .catch(function(error) {
                            console.error('Error adding user:', error);
                            alert('Failed to add user');
                        });
                };

                // Edit user
                $scope.editUser = function(user) {
                    user.original = angular.copy(user);
                    user.editing = true;
                };

                // Save user
                $scope.saveUser = function(user) {
                    if (!user.name || !user.email) {
                        alert('Name and Email are required');
                        return;
                    }
                    var updateData = {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        address: user.address
                    };
                    $http.put(API_URL + user.id + '/', updateData)
                        .then(function(response) {
                            user.editing = false;
                            delete user.original;
                            alert('User updated successfully');
                        })
                        .catch(function(error) {
                            console.error('Error saving user:', error);
                            alert('Failed to update user');
                        });
                };

                // Cancel edit
                $scope.cancelEdit = function(user) {
                    angular.copy(user.original, user);
                    user.editing = false;
                    delete user.original;
                };

                // Delete user
                $scope.deleteUser = function(user) {
                    if (confirm('Are you sure you want to delete this user?')) {
                        $http.delete(API_URL + user.id + '/')
                            .then(function() {
                                var index = $scope.users.indexOf(user);
                                $scope.users.splice(index, 1);
                                alert('User deleted successfully');
                            })
                            .catch(function(error) {
                                console.error('Error deleting user:', error);
                                alert('Failed to delete user');
                            });
                    }
                };

                // Initial load
                $scope.loadUsers();
            });
