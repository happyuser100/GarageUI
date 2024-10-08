import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, delay, forkJoin } from 'rxjs';
import { GarageItem, GarageResult } from 'src/app/models/garage-item';
import { NameValuePair } from 'src/app/models/name-value-pair';
import { Sample } from 'src/app/models/sample';
import { CommonService } from 'src/app/services/common.service';
import { GarageService } from 'src/app/services/garage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  form: FormGroup;
  displayedColumns: string[] = ['_id', 'mispar_mosah', 'shem_mosah'];

  dataSource = new MatTableDataSource<GarageItem>();

  data: GarageItem[] = [];

  allAPIGarages: GarageItem[] = [];
  allComboGarages: NameValuePair[] = [];

  garagesForm: FormControl = new FormControl();

  value = 0;
  loading = true;
  isLoading = true;
  isLoading2 = false;

  constructor(private fb: FormBuilder, private garageService: GarageService, private commonService: CommonService) {
    this.form = this.createForm();
    //this.loadContent();
  }

  createForm(): FormGroup {
    return this.fb.group(
      {
        garagesForm: ['', Validators.required],
      })
  }

  ngOnInit(): void {
    this.getAllGaragesCommon();
  }

  getAllGaragesCommon() {
    let getAllAPIGarages$ = this.garageService.getAllAPIGarages();
    let getAllGarages$ = this.garageService.getAllGarages();
    const source = [getAllAPIGarages$, getAllGarages$];

    forkJoin(source).subscribe({
      next: ([garagesModel1, garagesModel2]) => {
        this.isLoading = false;
        const response1 = garagesModel1 as GarageResult;
        const response2 = garagesModel2 as GarageItem[];
        this.allAPIGarages = response1.data;
        this.allComboGarages = this.commonService.getComboValues(this.allAPIGarages);
        this.data = response2;
        this.dataSource = new MatTableDataSource<GarageItem>(this.data);
      },
      error: (error) => {
        this.isLoading = false;
        this.commonService.displayMessage('אירעה שגיאה באחזור נתונים מהשרת');
      }
    });
  }

  getAllGarages() {
    this.garageService.getAllGarages().subscribe({
      next: (response) => {
        this.data = response;
        this.dataSource = new MatTableDataSource<GarageItem>(this.data);
      },
      error: (error) => {
        this.commonService.displayMessage('אירעה שגיאה באחזור נתונים מהשרת');
      }
    });
  }

  addGarages() {
    this.isLoading2 = true;
    const arr: [] = this.garagesForm.value;
    if (arr && arr.length > 0) {
      let sources:Observable<Object>[]  = [];

      //loop -  creating of observables array
      for (let index = 0; index < arr.length; index++) {
        const currentValue = arr[index];
        const garageItem = this.allAPIGarages.find(x => x._id == currentValue);
        if (garageItem) {
          const findItem = this.data.find(x => x._id == currentValue);
          if (!findItem) {
            sources.push(this.garageService.createGarage(garageItem));
          }
        }        
      }

      //Forkjoin of multiple observables and refresh garages table
      forkJoin(sources).pipe(delay(10000)).subscribe({
        next: (data) => {
          this.isLoading2 = false;
          this.getAllGarages();            
        },
        error: (error) => {
          this.isLoading = false;
          this.commonService.displayMessage('אירעה שגיאה באחזור נתונים מהשרת');
        }
      }); 
    }
    else{
      this.isLoading2 = false;
      this.commonService.displayMessage("בחר לפחות אחד מוסך");
    }
  }
}




