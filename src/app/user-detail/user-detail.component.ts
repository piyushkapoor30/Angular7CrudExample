import { Component, OnInit } from '@angular/core';
import { User } from '../models/user-model';
declare var $: any;
declare const Swal: any;

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {

  users: User[] = [];
  modal: any;
  user = {} as User;
  isNewRecord: boolean;
  onClickValidation: boolean;
  countries = ["Newzeland", "America", "India", "UAE", "France", "Spain", "Australia", "Canada"];

  ngOnInit() {
    this.user.id = 0;
    this.isNewRecord = true;
    this.onClickValidation = false;
  }

  //ON CLICK CANCEL BUTTON :
  onClose() {
    $('#userAddEditModal').modal('hide');
  }

  //ON CLICK ADD BUTTON :
  onclickAdd() {
    $('#userAddEditModal').modal();
    this.isNewRecord = true;
    this.user = {} as User;
    this.user.country = this.countries[0];
  }

  //ON UPDATE USER DETAIL :
  onUpdate(f: any) {
    this.onClickValidation = !this.onClickValidation;
    if (!f.form.valid) {
      return;
    }
    $('#userAddEditModal').modal('hide');
  }


  // ON EDIT ICON :
  onclickEdit(user: User) {
    this.user = user;
    $('#userAddEditModal').modal();
    if (this.user.id > 0) {
      this.isNewRecord = false;
    }
  }

  // ADD FUNCTIONALITY LOGIC :
  addUser(f: any) {
    this.onClickValidation = !this.onClickValidation;
    if (!f.form.valid) {
      return;
    }
    const date: Date = new Date();
    this.user.id = date.getTime();
    this.users.push(this.user);
    $('#userAddEditModal').modal('hide');
    Swal.fire('User Added Successfully');
  }

  //DELETE FUNCTION WORK :
  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure want to Delete?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if (result.value) {
        const index = this.users.findIndex(x => x.id === id);
        this.users.splice(index, 1);
        Swal.fire('Deleted!', 'User Deleted Successfuly.', 'success');
        console.log(this.users)
      }
    })
  }
}
