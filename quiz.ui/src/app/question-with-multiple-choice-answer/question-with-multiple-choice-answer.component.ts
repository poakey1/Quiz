import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionResult } from '../models/questionResult';
import { IQuestion } from '../interfaces/i-question';
import { MultipleChoiceAnswer } from '../models/answers/multipleChoiceAnswer';
import { QuestionWithMultipleChoiceAnswer } from '../models/questions/questionWithMultipleChoiceAnswer';

@Component({
  selector: 'app-question-with-multiple-choice-answer',
  imports: [FormsModule],
  templateUrl: './question-with-multiple-choice-answer.component.html'
})
export class QuestionWithMultipleChoiceAnswerComponent  implements AfterViewInit, IQuestion {
  @Input() questionResult!: QuestionResult;
  @Output() pendingAnswerSubmitted: EventEmitter<string | null> = new EventEmitter();
  @ViewChild('firstOption') firstOption!: ElementRef;
  
  public ngAfterViewInit(): void {    
    setTimeout(() => { 
      this.firstOption.nativeElement.focus();
    } , 50);
  }

  public get multipleChoiceAnswers(): MultipleChoiceAnswer[] {
    let q = <QuestionWithMultipleChoiceAnswer>this.questionResult.question;
    return q.multipleChoiceAnswers;
  }

  public get explanation(): string {
    if (this.questionResult.submittedAnswer === null) {
      throw "Cannot determine 'explanation' because the submitted answer is null.";
    }

    let selectedAnswers = this.questionResult.submittedAnswer.split('|');
    let matchingAnswers = this.multipleChoiceAnswers.filter(x => selectedAnswers.some(y => y === x.text));

    return matchingAnswers.map(x => x.explanation).join('  ');
  }

  public focusAnswerInput(): void {
    this.firstOption.nativeElement.focus();
  }

  public submit(): void {
    this.pendingAnswerSubmitted.emit(this.questionResult.pendingAnswer);
  }
}
