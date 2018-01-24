import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomNotificationsService } from '../../services/notifications/notifications.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-to-project',
  templateUrl: './add-to-project.component.html',
  styleUrls: ['./add-to-project.component.css']
})
export class AddToProjectComponent implements OnInit {

  localFeature: any;

  @Input() set feature(data: any) {
    if (data.FeatureName) {
      this.localFeature = _.cloneDeep(data);
      this.fillFormValues();
      this.createForm();
    }
  }
  @Output() cancel: EventEmitter<string> = new EventEmitter();

  paramsForm: FormGroup;

  formValues= {};

  constructor( private fb: FormBuilder, private _notification: CustomNotificationsService ) {}

  ngOnInit() {}

  createForm() {
    this.paramsForm = this.fb.group(
      this.formValues
    );
  }

  onSubmit() {
    this.paramsForm['submitted'] = true;
    if (this.paramsForm.valid) {
      this.onValidForm();
    }
  }

  onValidForm():  void {
    const type = (this.localFeature.FeatureName.indexOf('project') !== -1) ? 'project' : 'comparison';
    this._notification.getSuccess(`Successfully added to ${type}!`);
    this.cancel.emit('cancel');
  }

  maxValue(max) {
    return (input: FormControl) => {
      return input.value <= max ? null : {max: true};
    };
  }

  minValue(min) {
    return (input: FormControl) => {
      return input.value >= min ? null : {max: true};
    };
  }

  fillFormValues(defaultValues: Boolean = false): void {
    for (const featureObject of this.localFeature.children) {
      for (const row of featureObject.children) {
        for (const parameter of row.children) {
          if (parameter.parameter) {
            let value;
              value = parameter.defaultOption ? parameter.defaultOption : '';
              this.formValues[parameter.parameter] = [value, []];
              if (parameter.required) {
                this.formValues[parameter.parameter][1].push(Validators.required);
              }
              if (parameter.max) {
                this.formValues[parameter.parameter][1].push(this.maxValue(parameter.max));
              }
              if (parameter.min) {
                this.formValues[parameter.parameter][1].push(this.minValue(parameter.min));
              }
          }
        }
      }
    }
  }

}
