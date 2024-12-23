import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionResult } from '../models/questionResult';
import { IQuestion } from '../interfaces/i-question';

@Component({
  selector: 'app-question-with-free-text-answer',
  templateUrl: './question-with-free-text-answer.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class QuestionWithFreeTextAnswerComponent implements AfterViewInit, IQuestion {
  @Input() questionResult!: QuestionResult;
  @Output() pendingAnswerSubmitted: EventEmitter<string | null> = new EventEmitter();
  @ViewChild('questionInput') questionInput!: ElementRef;
  
  public ngAfterViewInit(): void {    
    setTimeout(() => { 
      this.questionInput.nativeElement.focus();
    } , 50);
  }

  public focusAnswerInput(): void {
    this.questionInput.nativeElement.focus();
  }

  public submit(): void {
    this.pendingAnswerSubmitted.emit(this.questionResult.pendingAnswer);
  }
}
