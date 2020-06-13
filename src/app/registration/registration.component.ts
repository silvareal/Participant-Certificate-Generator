import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public load = false;
  
  participantForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private userService: UserService) {
  }

  ngOnInit() {
    this.participantForm = this.fb.group({
      email: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

  saveForm() {
    this.load = true;
    if (this.participantForm.valid) {
      this.userService.registerUser(this.participantForm.value).subscribe
      (resp => {
        if (!resp) {
          this.toastr.error('Email Error (email already exists or unable to validate)')
          this.toastr.error('registration error')
          this.load = false;
        } else {
          this.toastr.info('your uniqueID and passcode has been sent to your mail')
          this.toastr.success('registration successfull')
          this.router.navigate(['/generate-certificate']);
          this.load = false;
        }
      })
    } else {
      this.errorMessage = 'please correct validation'
    }
  }

}
