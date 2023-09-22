import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../_services/contact/contact.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  constructor(private fb: FormBuilder, private contactService: ContactService) {
  }

  form !: FormGroup;
  uploadedFile: File | null = null;

  ngOnInit() {
    this.initForm();

  }

  initForm() {
    this.form = this.fb.group({
      senderName: ["", Validators.required],
      email: ["", Validators.required],
      subject: ["", Validators.required],
      message: ["", Validators.required],
      image: [""]
    })
  }


  addFile(event: any): void {
    if (event.target.files.length > 0) {
      this.uploadedFile = event.target.files[0];
    } else {
      // we set it to null because maybe the client upload a file and later he remove it !
      this.uploadedFile = null;
    }
  }


  sendMessage() {

    if (this.form.valid) {
      let formData :FormData = new FormData();
      if (this.uploadedFile) {
        formData.append("image", this.uploadedFile);
      }
      formData.append("senderName" , this.form.get("senderName")?.value);
      formData.append("message" , this.form.get("message")?.value);
      formData.append("subject" , this.form.get("subject")?.value);
      formData.append("email" , this.form.get("email")?.value);

      this.contactService.sendMessageContact(formData).subscribe(
        (response) => {
    Swal.fire(
      {
        "text" : "Thank you for your message !",
        "icon" : "success" ,
        "title" : "Success"
      }
    )
        },
        (error) => {
          Swal.fire(
            {
              "title" : "Error",
              "icon" : "error",
              "text" : error.error
            }
          )
        }
      )
    }else{
      Swal.fire(
        {
          'title' : "Error",
          'icon' : "error",
          "text" : "All Fields are required"
        }
      )
    }


  }


}
