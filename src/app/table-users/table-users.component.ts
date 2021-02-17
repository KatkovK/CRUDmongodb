import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestService } from '../rest.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'users',
  templateUrl: './table-users.component.html',
  styles: [
  ]
})


export class TableUsersComponent implements OnInit {
  public modalRef: BsModalRef;
  public user: User = new User;
  public users: any;
  public editUser: any;
  id = { 'id': '' };

  constructor(
    private restService: RestService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.restService.getAll().subscribe(user => {
      this.users = user;

    }, 
    error => {
      console.log(error)
    });
  }

  updateUser() {
    this.restService.update(this.editUser).subscribe(res => {
      this.getUser();
      this.modalRef.hide();

    }, 
    error => {
      console.log(error)  
    });
  }

  addUser() {
    this.restService.post(this.user).subscribe(res => {
      this.getUser();
      this.modalRef.hide();

    }, 
    error => {
      console.log(error)
    });
  }

  deleteUser() {
    this.restService.delete(this.id).subscribe(res => {
      this.getUser();
      this.modalRef.hide();
    }, error => {
      console.log(error); 
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  };

  openModalEdit(template: TemplateRef<any>, user) {
    this.modalRef = this.modalService.show(template);
    this.editUser = user;
  };

  openModalDelete(template: TemplateRef<any>, id) {
    this.id = id;
    this.modalRef = this.modalService.show(template);
  };

}
class User {
  name: string;
  age: number
}