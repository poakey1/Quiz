import { FreeTextAnswer } from "../answers/freeTextAnswer";
import { Question } from "./question";
import { QuestionType } from "../questionType";

export class QuestionWithFreeTextAnswer extends Question {
    constructor(text: string, answer: FreeTextAnswer) {
        super(text, [answer]);
        this.freeTextAnswer = answer;
    }

    public readonly freeTextAnswer: FreeTextAnswer;

    public override questionType: QuestionType = QuestionType.freeTextAnswer;

    public override IsCorrect(submittedAnswer: string): boolean {
        return this.freeTextAnswer.pattern.test(submittedAnswer);
    }
}
