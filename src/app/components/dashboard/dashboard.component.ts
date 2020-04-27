import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatSnackBar ,MatSnackBarConfig } from '@angular/material';

import { ChartDataSets, ChartOptions,ChartType } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  titleArray:any =
    {title:"Dashboard",
    subTitle:"",
  img:"../../../assets/images/ui/Icons/1x/dashboard.png"};
  getAppointmentLabels(){
    var labels = [];
    for(var i=1;i<=31;i++){
     labels.push(i.toString());
    }
    return labels;
  }
  
  getAppointmentCounts(){
    var counts = [];
    for(var i=1;i<=31;i++){
     counts.push(Math.floor((Math.random() * 100) + 1));
    }
    return counts;
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = this.getAppointmentLabels();
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: this.getAppointmentCounts(), label: 'Appointments' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public lineChartData: ChartDataSets[] = [
    { data: [40,55,56,20,65,30,80,42,47,75,55,90], label: 'Patients' },
  ];
  public lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
  public lineChartOptions: ChartOptions  = { responsive: true,};
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#53b8c5',    
      // backgroundColor: 'rgba(255,0,0,0.3)',53b8c5
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];


  //two
  public lineChartDataTwo: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40,45,75,55,63,80], label: 'Medical Personnels' },
  ];
  public lineChartLabelsTwo: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
  public lineChartOptionsTwo: ChartOptions  = { responsive: true,};
  public lineChartColorsTwo: Color[] = [
    {
      borderColor: 'black',
      //backgroundColor: '#53b8c5',    
       backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegendTwo = true;
  public lineChartTypeTwo = 'line';
  public lineChartPluginsTwo = [];

  //three
  public lineChartDataThree: ChartDataSets[] = [
    { data: [0,10,25,30,28,24,26,18,20,27,20,24], label: 'Avg Login time of patients' },
  ];
  public lineChartLabelsThree: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
  public lineChartOptionsThree: ChartOptions  = { responsive: true,};
  public lineChartColorsThree: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: '#53ffc5',    
      //backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegendThree = true;
  public lineChartTypeThree = 'line';
  public lineChartPluginsThree = [];

  //Four
  public lineChartDataFour: ChartDataSets[] = [
    { data: [0.4,0.2,0.6,0.7,0.8,0.4,0.9,1.5,1.2,1.8,2.0,1.7], label: 'Onsite reports' },
  ];
  public lineChartLabelsFour: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
  public lineChartOptionsFour: ChartOptions  = { responsive: true,};
  public lineChartColorsFour: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'lightblue',    
      //backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegendFour = true;
  public lineChartTypeFour = 'line';
  public lineChartPluginsFour = [];

  //
  // DoughnutOne
  //public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartLabels: Label[] = ['const','remaining','Total Number Of Urine Tests'];
  public doughnutChartData: MultiDataSet = [
    [0, 200,800]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  // DoughnutTwo
  //public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartLabelsTwo: Label[] = ['const','remaining','Total Number Of Blood Tests'];
  public doughnutChartDataTwo: MultiDataSet = [
    [0,450, 550]
  ];
  public doughnutChartTypeTwo: ChartType = 'doughnut';

  public doughnutChartLabelsThree: Label[] = ['const','remaining','Total Number Of Screening Records'];
  public doughnutChartDataThree: MultiDataSet = [
    [0,850, 150]
  ];
  public doughnutChartTypeThree: ChartType = 'doughnut';

  constructor(private modalService: NgbModal, private router:Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    
  }

  //Mat Snack Bar
  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{duration:5000})
  }

  
}
