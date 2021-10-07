import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService, Receiver } from '../data.service';

@Component({
  selector: 'app-card-show',
  templateUrl: './card-show.component.html',
  styleUrls: ['./card-show.component.css'],
})
export class CardShowComponent implements OnInit {
  constructor(private dataService: DataService, private sb : MatSnackBar) { }
  imeiNum = new FormControl('', this.validateNum);
  correctedNum = 'Input Not Processed';
  clicked: boolean = false;
  getErrorMessage() {
    let v: any = this.validateNum(this.imeiNum);
    if (v == null) {
      return 'No Errors';
    } else {
      console.log(v.ErrorMessage);
      return v.ErrorMessage;
    }
  }

  ngOnInit(): void { }
  validateNum(ctrl: AbstractControl): ValidationErrors | null {
    ctrl = ctrl as FormControl;
    let s: string = ctrl.value.trim();
    if (s.length != 15) {
      return { ErrorMessage: 'Invalid Length' };
    }
    for (let i = 0; i < 15; ++i) {
      if (s.charAt(i) >= '0' && s.charAt(i) <= '9') {
        continue;
      }
      return { ErrorMessage: 'Invalid Characters' };
    }
    return null;
  }
  onClick() {
    if (this.imeiNum.invalid) {
      return;
    }
    this.clicked = true;
    this.dataService
      .getRequest(this.imeiNum.value)
      .subscribe((data: Receiver) => {
        this.clicked = false;
        this.correctedNum = data.num.toString();
        let message = 'Corrected IMEI';
        if(data.already) {
          message = 'IMEI is Correct';
        }
        this.sb.open(message, 'Dismiss');
      });
  }
}
