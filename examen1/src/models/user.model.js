"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.phone = user.phone;
        this.password = user.password;
        this.is_on = user.is_on;
        this.created_at = user.created_at;
        this.role = user.role;
    }
}
exports.User = User;
