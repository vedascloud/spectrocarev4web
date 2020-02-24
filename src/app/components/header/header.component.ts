import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private modalService: NgbModal, private router:Router) { }

  ngOnInit() {
  }

  //Signout Modal
  openSignOut(content1) {
    this.modalService.open(content1, { centered: true, size: "sm" })
    }
    SignOut() {
      console.log("SignOut Called")
      localStorage.clear()
      this.router.navigateByUrl('/adminsignin')
      this.modalService.dismissAll()
    // let petObj = {
    // "clientId": clientObj.clientId,
    // "username": clientObj.username
    // }
    // console.log(petObj)
    // this.clientService.deletePet(petObj).subscribe((res) => {
    // this.deleteResponse = res;
    // if (this.deleteResponse.response == "3") {
    // this.modalService.dismissAll();
  
    // }
    // }, (err) => {
    // console.log(err)
    // })
    }
}
