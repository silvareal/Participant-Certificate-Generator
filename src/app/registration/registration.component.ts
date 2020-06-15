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
        ({
          next: participant => {
            this.toastr.info('your uniqueID and passcode has been sent to your mail')
            this.toastr.success('registration successfull')
            this.router.navigate(['/generate-certificate']);
            this.load = false;
          },
          error: error => {
            this.load = false;
            switch (error.status)  {
              case 400:
                this.errorMessage = "user with this email address already exists";
                break;
              case 502:
                this.errorMessage = "Network Error";
                break;
              case 503:
                this.errorMessage = "Network Error";
                break;
              case 592:
                this.errorMessage = "Network Error";
                break;
              case 500:
                this.errorMessage = "Internal Server Error";
                break;
            }
            this.toastr.info('If error persist, please refresh the page or contact our support team')
            this.toastr.error(this.errorMessage)
            this.toastr.error('registration error')
          }
        });
    } else {
      this.errorMessage = 'please correct validation'
    }
  }

}
