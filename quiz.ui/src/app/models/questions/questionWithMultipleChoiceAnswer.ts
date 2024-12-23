import { MultipleChoiceAnswer } from "../answers/multipleChoiceAnswer";
import { Question } from "./question";
import { QuestionType } from "../questionType";

export class QuestionWithMultipleChoiceAnswer extends Question {
    private readonly correctAnswerString: string;

    constructor(text: string, answers: MultipleChoiceAnswer[]) {
        super(text, answers);
        this.multipleChoiceAnswers = answers;
        this.allowMultipleSelection = this.multipleChoiceAnswers.filter(x => x.isCorrect).length > 1;
        
        this.correctAnswerString = this.multipleChoiceAnswers
            .filter(x => x.isCorrect)
            .sort((a, b) => a.text.localeCompare(b.text))
            .map(x => x.text)
            .join('|');
    }

    public readonly multipleChoiceAnswers: MultipleChoiceAnswer[];

    public readonly allowMultipleSelection: boolean;

    public override questionType: QuestionType = QuestionType.multiChoiceAnswer;

    public override IsCorrect(submittedAnswer: string): boolean {        
        return this.correctAnswerString === submittedAnswer;
    }
}
