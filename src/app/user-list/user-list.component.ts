import { Component, OnInit } from '@angular/core';

import { UsersService } from '../shared/users.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    users = [];
    deleted = false;

    constructor(private usersService: UsersService) { }

    ngOnInit() {
        this.usersService.getUsers().subscribe( // Upon page load, db data shall be reflected
            userList => { // Define userList as the list of users from the database
                this.users = userList.map(indiUser => { // Equate userList to users for html ngFor
                    return {
                        $key: indiUser.key, // Default action to get key value
                        ...indiUser.payload.val() // Retrieve child key value
                    }
                });
            }
        );
    }

    onEdit(user, editMode: boolean) {
        this.usersService.editMode = true;
        this.usersService.createForm(user);
        this.deleted = false;
    }

    onDelete($key) {
        if(confirm('Delete item?')) {
            this.usersService.deleteUser($key);
            this.deleted = true;
        }
        this.usersService.edited = false;
    }
}