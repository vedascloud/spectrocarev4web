import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-medical-record',
  templateUrl: './all-medical-record.component.html',
  styleUrls: ['./all-medical-record.component.css']
})
export class AllMedicalRecordComponent implements OnInit {
  titleArray:any =
  {title:"Patient",
  subTitle:"Medical Records",
img:"assets/images/ui/Icons/1x/admin center.png"};
  constructor() { }

  ngOnInit() {
  }

}
