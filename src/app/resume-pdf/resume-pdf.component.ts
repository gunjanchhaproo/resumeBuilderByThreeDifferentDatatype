import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resume-pdf',
  templateUrl: './resume-pdf.component.html',
  styleUrls: ['./resume-pdf.component.css']
})
export class ResumePdfComponent implements OnInit {

  @ViewChild('firstResume') firstResume!: ElementRef;
  @ViewChild('secondResume') secondResume!: ElementRef;
  clicked:boolean=false
  resumeForm!:FormGroup
  cardClicked=0
  DATA:any

  constructor() {}

  ngOnInit(): void {
    this.createResumeForm()
  }

  public openPDF(): void {
    if(this.cardClicked==1){
      this.DATA= document.getElementById('firstResume');
    }
    else{
      this.DATA= document.getElementById('secondResume');
    }
    html2canvas(this.DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('resume.pdf');
    });
  }

  createResumeForm(){
    this.resumeForm=new FormGroup({
      name: new FormControl(),
      phone:new FormControl(),
      email: new FormControl(),
      linkedin: new FormControl(),
      git : new FormControl(),
      specialisation:new FormControl(),
      ssc: new FormControl(),
      hsc : new FormControl(),
      degree:new FormControl(),
      skills: new FormControl(),
      project1: new FormControl(),
      project2:new  FormControl(),
      project3:new  FormControl(),
      project4:new  FormControl(),
      exp1: new FormControl(),
      exp2:new  FormControl(),
      exp3:new  FormControl(),
      exp4:new  FormControl(),
    })
  }
}
