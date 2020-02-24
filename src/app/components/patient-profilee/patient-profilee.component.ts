import { Component, OnInit, ChangeDetectorRef,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-profilee',
  templateUrl: './patient-profilee.component.html',
  styleUrls: ['./patient-profilee.component.css']
})
export class PatientProfileeComponent implements OnInit {
   
  sub:any;
  id:string;
  
  @ViewChild('fileInput', { static: true }) el: ElementRef;
  constructor(private fb:FormBuilder, private loginService:LoginService,private activatedRoute:ActivatedRoute, private cd:ChangeDetectorRef) { }
  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loginService.id = this.id;
    }) 
  }
}
