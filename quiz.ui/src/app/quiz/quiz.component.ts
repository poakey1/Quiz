import { DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IQuestion } from '../interfaces/i-question';
import { Quiz } from '../models/quiz';
import { QuestionWithFreeTextAnswer } from '../models/questions/questionWithFreeTextAnswer';
import { QuestionType } from '../models/questionType';
import { QuestionWithFreeTextAnswerComponent } from "../question-with-free-text-answer/question-with-free-text-answer.component";
import { QuestionWithMultipleChoiceAnswerComponent } from '../question-with-multiple-choice-answer/question-with-multiple-choice-answer.component';
import { QuestionResult } from '../models/questionResult';
/*
TODO: 
----------------
---- PHASE 1 ---
----------------
 - sandbox with working quiz
      - modify to allow pass (maybe populate unanswered Qs with '-' at end)
      - allow Qs with freetext answer to specify type (number, maybe date?)
      - new Q type: multiple choice (allows for true/false or yes/no)
      - new Q type: re-order images
      - new Q type: re-order text
      - optional timer
----------------
---- PHASE 3 ---
----------------
 - persistence layer
 - page navigation
----------------
---- PHASE 4 ---
----------------
- pages to CRUD quizzes
----------------
---- PHASE 5 ---
----------------
- users + login/register
- security
----------------
---- PHASE 6 ---
----------------
 - quiz metrics
----------------
---- PHASE 7 ---
----------------
- hosting
*/
@Component({
  selector: 'app-quiz',
  imports: [DatePipe, NgClass, QuestionWithFreeTextAnswerComponent, QuestionWithMultipleChoiceAnswerComponent],
  templateUrl: './quiz.component.html'  
})
export class QuizComponent implements OnInit, AfterViewInit {
  @Input() quiz!: Quiz;  
  @ViewChild('question') questionComponent: IQuestion | undefined;
  
  public ngOnInit(): void {
    this.resetQuiz();
  }
  
  public ngAfterViewInit(): void {
    this.questionComponent?.pendingAnswerSubmitted.subscribe(x => {
      if (x !== undefined && x !== null) {
        this.submittingAnswer = true;
        this.submitAnswer();
      }
    });
  }

  ///////////// properties
  public get QT() { return QuestionType; }  
  public get questionWithFreeTextAnswer() { return <QuestionWithFreeTextAnswer><unknown>this.current.question; }
  public get current(): QuestionResult { return this._questionResults[this._currentIndex]; }
  public get score(): number { return this._questionResults.filter(x => x.isAnswered && x.isCorrect).length; }

  private _currentIndex!: number;
  public get currentIndex(): number { return this._currentIndex; }

  private _questionResults: QuestionResult[] = [];
  public get questionResults(): QuestionResult[] { return this._questionResults; }

  private _quizComplete: boolean = false;
  public get quizComplete(): boolean { return this._quizComplete; }

  ///////////// 2-way bound members
  public submittingAnswer: boolean = false;
  
  ///////////// public methods / functions
  public submitAnswer(): void {
    if (!this.submittingAnswer || this.current.isAnswered) {
      return;
    }
    else if (this.questionComponent !== undefined) {
      this.questionComponent.focusAnswerInput();
    }

    if (this.answerGiven()) {
      this._questionResults[this._currentIndex].setAnswer();
    }
    
    if (this.questionResults.some(x => !x.isAnswered)) {
      this.incrementQuestionIndex();
    }
    else {
      this._quizComplete = true;
    }

    this.submittingAnswer = false;
  }

  public previousQuestion(): void {
    this._currentIndex -= 1;
    
    if (this._currentIndex < 0) {
      this._currentIndex = this.quiz.questions.length - 1;
    }
  }

  public nextQuestion(): void {
    this._currentIndex += 1;
    
    if (this._currentIndex === this.quiz.questions.length) {
      this._currentIndex = 0;
    }
  }

  ///////////// private methods / functions
  private resetQuiz(): void {
    this._currentIndex = 0;    
    this._questionResults = this.quiz.questions;
  }

  private answerGiven(): boolean {
    let pendingAnswer = this._questionResults[this._currentIndex].pendingAnswer;
    return pendingAnswer !== null && pendingAnswer.match(/^\s*$/) === null;
  }

  private incrementQuestionIndex() {
    this._currentIndex = this._currentIndex === this.quiz.questions.length - 1 ? 0 : this._currentIndex + 1;
    
    let nextUnansweredIndex = this._questionResults.findIndex(
      (q, i) => i >= this._currentIndex && !q.isAnswered);

    if (nextUnansweredIndex !== -1 && this._currentIndex !== nextUnansweredIndex) {
      this._currentIndex = nextUnansweredIndex
    }
  }
}
