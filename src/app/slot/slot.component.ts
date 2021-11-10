import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SlotService } from '../services/slot.service';

export interface DialogData {
  type: 'Morning' | 'Evening',
  date: string
}

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  slotForm : FormGroup = this.fb.group({
    type: [this.data.type,[Validators.required]],
    date: [this.data.date,[Validators.required]],
    time: [null, [Validators.required]]
  })

  startTime = 9;
  endTime = 19;

  slotTimes : string[] = [];
  morningSlotTimes : string[] = [];
  eveningSlotTimes : string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, 
              private fb: FormBuilder, 
              public dialog: MatDialog, 
              public dialogRef: MatDialogRef<SlotComponent>,
              private snack: MatSnackBar,
              private slot: SlotService) { 
    this.generateTimeSlots();
    if(this.data.type == "Morning") {
      this.slotTimes = this.morningSlotTimes;
    } else {
      this.slotTimes = this.eveningSlotTimes;
    }
  }

  ngOnInit(): void {
  }

  generateTimeSlots() {
    for (let i = this.startTime; i < this.endTime; i++) {
      if(i < 13) {
        this.morningSlotTimes.push(`${i}:00 AM`);
        this.morningSlotTimes.push(`${i}:30 AM`);
      } else {
        this.eveningSlotTimes.push(`${i-12}:00 PM`);
        this.eveningSlotTimes.push(`${i-12}:30 PM`);
      }
    }
  }

  onCreate() {
    if(this.slotForm.valid){
      let payload = {
        type: this.slotForm.value.type,
        date: this.slotForm.value.date,
        time: this.slotForm.value.time
      }
      let time = (payload.time).split(" ");
      if(this.slotForm.value.type === "Morning") {
        payload.time = time[0];
      } else {
        let timeBreak = time[0].split(":");
        payload.time = `${parseInt(timeBreak[0])+12}:${timeBreak[1]}`;
      }
      this.slot.createSlot(payload).subscribe(res => {
        console.log(res);
        if(res.status === 200) {
          this.snack.open("Slot created successfully","X");
          this.dialog.closeAll();
        } else {
          this.snack.open(res.content,"X");
        }
      }, err => {
        this.snack.open(err.error.content,"X");
      })
    } else {
      this.snack.open("Please choose time","X");      
    }
  }

}
