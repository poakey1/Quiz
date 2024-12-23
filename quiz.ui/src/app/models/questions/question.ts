import { QuestionType } from "../questionType";
import { Answer } from "../answers/answer";

export abstract class Question {
    constructor(text: string, answers: Answer[]) {
        this.text = text;
        this.answers = answers;
    }

    public abstract questionType: QuestionType;

    public abstract IsCorrect(submittedAnswer: string): boolean;

    public readonly text: string;
    public readonly answers: Answer[];
}
