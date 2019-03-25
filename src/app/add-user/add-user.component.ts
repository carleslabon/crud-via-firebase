import { Component } from '@angular/core';

import { UsersService } from '../shared/users.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent { 
    success = false;

    constructor(private usersService: UsersService) { }

    editMode = this.usersService.editMode;

    onSubmit() {
        if(this.usersService.form.valid) {
            if(this.usersService.form.get('$key').value == null) {
                this.usersService.addUser(this.usersService.form.value);
                this.success = true;
            } else {
                this.usersService.updateUser(this.usersService.form.value);
            }
            this.usersService.form.reset();
        }
    }
}