import { AuthServiceService } from './../register/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    profileForm: FormGroup;
    submited:boolean = false;
    notValid:boolean = false;
  
    constructor(private auth: AuthServiceService) { }

    ngOnInit() {
        this.profileForm = new FormGroup({
            DOB: new FormControl(null, Validators.required),
            imagePath: new FormControl(null, Validators.required)
        });
    }

    

    onSubmit() {
        if(this.profileForm.valid){
            this.submited = true;
            console.log(this.profileForm.value);
            this.resetForm();
            setTimeout(()=>{
                this.submited = false;
            },4000);

            this.auth.update({email:localStorage.getItem('email'), 
                DOB:this.profileForm.value.DOB, 
                imagePath:this.profileForm.value.imagePath})
                .subscribe((data)=>{});
        }
        else{
            this.notValid = true;
            setTimeout(()=>{
                this.notValid = false;
            },4000);
        }
    }

    resetForm(){
        // this.profileForm.reset();
    }

  
}
