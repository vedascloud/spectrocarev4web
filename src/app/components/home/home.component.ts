import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homeForm:FormGroup;
  previewImg:any;
  @ViewChild('fileInput', { static: true }) el: ElementRef;

  constructor(private router:Router, private fb:FormBuilder, private cd:ChangeDetectorRef) { }

  ngOnInit() {
    this.previewImg ="assets/images/The-Health-Clinic.png"
    this.homeForm=this.fb.group({
      hospitalName:['',Validators.required],
      phNo:['',Validators.required],
      rgNo:['',Validators.required],
      email:['',Validators.required],
      address:['',Validators.required],
      password:['',Validators.required],
      hospitalImg:['']
    })
  }

  home(){
    console.log(this.homeForm.value);
  }

  //Image Upload
  fileProgress(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
       this.homeForm.get('hospitalImg').setValue(file);
       this.previewImg = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.homeForm.get('hospitalImg').setValue(null)
  }

}
