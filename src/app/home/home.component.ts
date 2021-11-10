import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Appointment } from '../appointment';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  selected : Date = new Date();
  pickeddate : FormControl = new FormControl(this.selected); 
  datepipe = new DatePipe('en-US');
  queue : Appointment[] = [];
  attended : Appointment[] = [];
  noShow : Appointment[] = [];

  displayColumns : string[] = ["patientName","patientContact","slot","status"];

  constructor(private appointment: AppointmentService) { 
    this.refreshTables();
  }

  ngOnInit(): void {
  }

  dateModified() {
    this.refreshTables();
  }

  refreshTables() {
    this.getAppointmentsInQueue();
    this.getAppointmentsAttended();
    this.getAppointmentsAbandoned();
  }

  getAppointmentsInQueue() {
    let date = this.datepipe.transform(this.pickeddate.value,'MM/dd/YYYY');
    this.appointment.getAppointments({status:"Pending",date:date}).subscribe(res=>{
      this.queue = res?.content;
    }, err => {
      console.log(err.error);
    });
  }

  getAppointmentsAttended() {
    let date = this.datepipe.transform(this.pickeddate.value,'MM/dd/YYYY');
    this.appointment.getAppointments({status:"Closed",date:date}).subscribe(res=>{
      this.attended = res?.content;
    }, err => {
      console.log(err.error);
    });
  }

  getAppointmentsAbandoned() {
    let date = this.datepipe.transform(this.pickeddate.value,'MM/dd/YYYY');
    this.appointment.getAppointments({status:"Abandoned",date:date}).subscribe(res=>{
      this.noShow = res?.content;
    }, err => {
      console.log(err.error);
    });
  }

}
