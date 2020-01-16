'use strict';

class User {
    constructor(id, firstName, lastName, email, passwordHash) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
    }
}

module.exports = User;
