import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UploadfileService} from "../_services/uploadfile.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  constructor(private fb: FormBuilder, private uploadFileService : UploadfileService) {
  }

  form !: FormGroup;
  fileToUpload :File | null = null;

  ngOnInit() {
  this.initForm();

  }


  initForm() {
    this.form = this.fb.group({
      name: ["" , Validators.required],
      email: ["", Validators.required],
      subject: ["", Validators.required],
      message: ["", Validators.required],
      image : [""]
    })
  }

  // handleFileInput(files: FileList) {
  //     this.fileToUpload = files.item(0);
  //     console.log("lksdhlfk")
  // }

  uploadFileToActivity() {
    // if(this.fileToUpload){
    //   this.uploadFileService.postFile(this.fileToUpload).subscribe(response => {
    //     console.log(response);
    //   }, error => {
    //     console.log(error);
    //   });
    // }
  }


  sendMessage() {
    console.log(this.form?.value);
    console.log(this.uploadFileService.postFile(this.form.get("image")?.value));
  }
}
