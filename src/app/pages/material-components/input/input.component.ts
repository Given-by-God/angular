import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { startWith, map } from 'rxjs/operators';



import { SharedService } from '../../../layouts/shared-service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const BREADCRUMBS: any[] = [
  {
    title: 'UI Elements',
    link: '#'
  },
  {
    title: 'Material components',
    link: '#'
  },
  {
    title: 'Input',
    link: ''
  }
];

@Component({
  moduleId: module.id,
  selector: 'page-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss']
})
export class PageInputComponent implements OnInit {
  pageTitle: string = 'Inputs';
  breadcrumb: any[] = BREADCRUMBS;
  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
  options: FormGroup;
  autoControl: FormControl;
  filteredOptions: Observable<string[]>;
  autoOptions: string[] = [
    'One',
    'Two',
    'Three'
  ];

  constructor( private _sharedService: SharedService, private fb: FormBuilder ) {
    this._sharedService.emitChange(this.pageTitle);
    this.autoControl = new FormControl();
    this.options = fb.group({
      'color': 'primary',
      'fontSize': [16, [Validators.min(10), Validators.max(20)]],
    });
  }

  ngOnInit() {
    this.filteredOptions = this.autoControl.valueChanges
      .pipe(
			startWith(null),
			map(val => val ? this.filter(val) : this.autoOptions.slice())
			);
  }

  getFontSize() {
    return Math.max(10, this.options.value.fontSize);
  }

  filter(val: string): string[] {
    return this.autoOptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
}
