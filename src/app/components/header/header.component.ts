import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Input() titleData:any
title:string;
img:string;
subTitle:string;
  constructor(private modalService: NgbModal, private router:Router) { }

  ngOnInit() {
    console.log("Title Array : ",this.titleData);
    this.title = this.titleData.title;
    this.img = this.titleData.img;
    this.subTitle = this.titleData.subTitle;
    
  }

    //Signout Modal
    openSignOut(content1) {
      this.modalService.open(content1, { centered: true, size: "sm" })
      }
      SignOut() {
        console.log("SignOut Called")
        localStorage.clear()
        this.router.navigateByUrl('/administrator')
        this.modalService.dismissAll()
      
      }
    
}
