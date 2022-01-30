import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../model/Role';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor() {
        const user = new User();
        user.firstName = 'test';
        user.lastName = 'test';
        user.username = 'test';
        user.role = Role.admin;
        this.userSubject = new BehaviorSubject<User>(user);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
}