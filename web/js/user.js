function User(json) {
    this.id = json.id;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
    this.mobile = json.mobile;
    this.role = json.role;
    this.isAdmin = function () {
        return this.role == "admin"
    };
    this.isAuthenticated = function () {
        return this.id != null && this.firstName != null && this.lastName != null && this.email != null && this.mobile != null && this.role != null
    };
}
