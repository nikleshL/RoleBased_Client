import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  form: FormGroup;
  // @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  @Input() filterData: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: new FormControl(''),
      hair: new FormControl(''),
      gender: new FormControl(''),
      race: new FormControl('')
    });
  }

  onChange(value) {
    const filters = this.form.value;
    // tslint:disable-next-line: forin
    for (const field in this.form.controls) {
      filters[field] = this.form.controls[field].value;
    }
    Object.keys(filters).forEach(key => filters[key] === '' || filters[key] === 'Select' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }
}
