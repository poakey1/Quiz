import { Component } from '@angular/core';
import { Quiz } from '../models/quiz';
import { QuizComponent } from "../quiz/quiz.component";
import { QuestionResult } from '../models/questionResult';
import { MultipleChoiceAnswer } from '../models/answers/multipleChoiceAnswer';
import { QuestionWithMultipleChoiceAnswer } from '../models/questions/questionWithMultipleChoiceAnswer';
import { FreeTextAnswer } from '../models/answers/freeTextAnswer';
import { QuestionWithFreeTextAnswer } from '../models/questions/questionWithFreeTextAnswer';

@Component({
  selector: 'app-sandbox',
  imports: [QuizComponent],
  templateUrl: './sandbox.component.html'
})
export class SandboxComponent {
  public get quiz1(): Quiz {
    let q0a1: FreeTextAnswer = new FreeTextAnswer(/ace|ace rimmer/, 'Smoke me a kipper, I\'ll be back for breakfast, it\'s "Ace"!');
    let q0: QuestionWithFreeTextAnswer = new QuestionWithFreeTextAnswer('What is Rimmer\'s alter ego called?', q0a1);

    let q1a1: MultipleChoiceAnswer = new MultipleChoiceAnswer('Red', false, 'Close - his soft-light suit is red, but his hard-light suit is "Blue".');
    let q1a2: MultipleChoiceAnswer = new MultipleChoiceAnswer('Blue', true, 'Well done!  "Blue" is the correct answer.');
    let q1a3: MultipleChoiceAnswer = new MultipleChoiceAnswer('Pink', false, 'That would be funny, but "Blue" is the correct answer.');
    let q1a4: MultipleChoiceAnswer = new MultipleChoiceAnswer('Khaki', false, '"Blue" is the correct answer.  His suit prior to his death tended to be khaki though.');
    let q1: QuestionWithMultipleChoiceAnswer = new QuestionWithMultipleChoiceAnswer('What colour is Rimmer\'s hard-light suit?', [q1a1, q1a2, q1a3, q1a4]);

    let q2a1: MultipleChoiceAnswer = new MultipleChoiceAnswer('True', false, '"Danny John-Jules" plays Cat.  "Robert Llewellyn" plays Kryten.');
    let q2a2: MultipleChoiceAnswer = new MultipleChoiceAnswer('False', true, '"Danny John-Jules" plays Cat.  "Robert Llewellyn" plays Kryten.');
    let q2: QuestionWithMultipleChoiceAnswer = new QuestionWithMultipleChoiceAnswer('Robert Llewellyn plays "Cat".', [q2a1, q2a2]);

    return new Quiz('Red Dwarf', 'PGO', new Date(), [
      new QuestionResult(q1),
      new QuestionResult(q2),
      new QuestionResult(q0),
    ]);
  }
}
