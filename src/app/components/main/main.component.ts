import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { GarageItem } from 'src/app/models/garage-item';
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
  dataSample: Sample[] = [{ "absent_occupied": 15, "guid": "tract_info::35807DA0-7881-421C-81CF-F0AC1F99E5F0", "name": "Aegean Heights", "owner_occupied": 86, "property_count": 101 }, { "absent_occupied": 0, "guid": "tract_info::B063A42D-6C90-4060-95E6-0BAC11804767", "name": "Amarante", "owner_occupied": 0, "property_count": 0 }, { "absent_occupied": 0, "guid": "tract_info::9324a633-61c7-4d86-8ef8-247f789800fb", "name": "Antiqua", "owner_occupied": 0, "property_count": 0 }, { "absent_occupied": 0, "guid": "tract_info::3D3D9773-64DE-4E50-A751-5B530D47E8A3", "name": "Bel Mira at Quail Run", "owner_occupied": 0, "property_count": 0 }]
  selectField: any;
  //@ViewChild('select') selectField: any;

  allfoods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
    {value: 'pasta-3', viewValue: 'Pasta'}
  ];
  myselectedFoods = ['pasta-3', 'steak-0'];
  foodForm: FormControl = new FormControl(this.myselectedFoods);

  displayedColumns: string[] = ['_id','mispar_mosah', 'shem_mosah'];

  dataSource = new MatTableDataSource<GarageItem>();

  data: GarageItem[] = [];

  constructor(private fb: FormBuilder, private garageService: GarageService, private commonService: CommonService) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.getAllGarages();
  }

  getAllGarages() {
    this.garageService.getAllGarages().subscribe({
      next: (response) => {
        this.data = response.data;
        this.dataSource = new MatTableDataSource<GarageItem>(this.data);
      },
      error: (error) => {
        this.commonService.displayMessage('There was an error in retrieving data from the server');
      }
    });
  }


  createForm(): FormGroup {
    return this.fb.group(
      {
        foodForm: ['', Validators.required],
        //tractList: ['', Validators.required],
      })
  }

  isIndeterminate(): boolean {
    return (
      this.selectField.value.length !== 0 &&
      this.selectField.value.length < this.data.length
    );
  }

  isChecked(): boolean {
    return (
      this.selectField.value &&
      this.data.length &&
      this.selectField.value.length === this.data.length
    );
  }

  toggleAllSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      this.selectField.options.forEach((item: MatOption) => item.select());
    } else {
      this.selectField.options.forEach((item: MatOption) => item.deselect());
    }
  }

  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {
    if (event.isUserInput) {
      if (event.source.selected === true) {
        console.log(event.source.value)
      } else {
        console.log(event.source.value)
      }
    }
  }
}

export interface Food {
  value: string;
  viewValue: string;
}
