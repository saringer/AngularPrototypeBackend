import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialogRef, MatTableDataSource} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {DogFormComponent} from "../../../forms/dog-form/dog-form.component";
import {OwnerFormComponent} from "../../../forms/owner-form/owner-form.component";

@Component({
  selector: 'app-dog-dialog',
  templateUrl: './dog-dialog.component.html',
  styleUrls: ['./dog-dialog.component.css']
})
export class DogDialogComponent implements OnInit {
  @ViewChild(DogFormComponent) dogForm: DogFormComponent;
  @Input()  name: string;
  @Output() onSubmit = new EventEmitter();

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<DogDialogComponent>) { }

  ngOnInit() {
  }

  onCreateNewClick() {
    this.dogForm.onSubmit();
    this.dialogRef.close();
    this.onSubmit.emit();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }




}


