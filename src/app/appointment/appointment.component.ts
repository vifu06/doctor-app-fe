import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SlotComponent } from '../slot/slot.component';
import { DatePipe } from '@angular/common';
import { SlotService } from '../services/slot.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  selected: Date | null = new Date;
  datepipe = new DatePipe('en-US');
  morningSlot: string[] = [];
  eveningSlot: string[] = [];

  constructor(public dialog: MatDialog, private slot: SlotService) {
    this.getMorningSlots();
    this.getEveningSlots();
   }

  ngOnInit(): void {
  }

  dateChange(date : any) {
    this.selected = date;
    this.getMorningSlots();
    this.getEveningSlots();
  }

  openDialog(type: string) {
    let date = this.datepipe.transform(this.selected,'MM/dd/YYYY');
    const dialogRef = this.dialog.open(SlotComponent, {data:{type:type,date:date}});

    dialogRef.afterClosed().subscribe(result => {
      this.getMorningSlots();
      this.getEveningSlots();
    });
  }

  getMorningSlots() {
    let date = this.datepipe.transform(this.selected,'MM/dd/YYYY');
    this.morningSlot = [];
    this.slot.getSlots({date:date,type:"Morning"}).subscribe(res=>{
      for (const key in res.content) {
        if (Object.prototype.hasOwnProperty.call(res.content, key)) {
          const slot = res.content[key];
          this.morningSlot.push(`${slot.time} AM`);
        }
      }
    }, err => {
      console.log(err.error);
    })
  }

  getEveningSlots() {
    let date = this.datepipe.transform(this.selected,'MM/dd/YYYY');
    this.eveningSlot = [];
    this.slot.getSlots({date:date,type:"Evening"}).subscribe(res=>{
      for (const key in res.content) {
        if (Object.prototype.hasOwnProperty.call(res.content, key)) {
          const slot = res.content[key];
          let timeBreak = (slot.time).split(":");
          this.eveningSlot.push(`${parseInt(timeBreak[0])-12}:${timeBreak[1]} PM`);
        }
      }
    }, err => {
      console.log(err.error);
    })
  }

}
