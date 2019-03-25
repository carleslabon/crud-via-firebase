import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UsersService { 
    constructor(private fireBase: AngularFireDatabase) { }

    userList: AngularFireList<any>;
    edited = false;
    editMode = false;

    form = new FormGroup({
        $key: new FormControl(null),
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email])
    })

    getUsers() {
        this.userList = this.fireBase.list('users');
        return this.userList.snapshotChanges();
    }

    addUser(user) {
        this.userList.push({
            name: user.name,
            email: user.email
        });
    }

    createForm(user) {
        this.editMode = true;
        this.form.setValue(user);
    }

    updateUser(user) {
        this.userList.update(user.$key, {
            name: user.name,
            email: user.email
        });
        this.edited = true;
    }

    deleteUser($key: string) {
        this.userList.remove($key);
    }
}