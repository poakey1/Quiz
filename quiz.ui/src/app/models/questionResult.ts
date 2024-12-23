import { Question } from "./questions/question";

export class QuestionResult {
    constructor(question: Question) {
        this._question = question;
    }

    private _pendingAnswer: string | null = null;
    public get pendingAnswer(): string | null { return this._pendingAnswer; };
    public set pendingAnswer(value: string) { this._pendingAnswer = value; };

    private _submittedAnswer: string | null = null;
    public get submittedAnswer(): string | null { return this._submittedAnswer; };

    private _question: Question;
    public get question(): Question { return this._question; };

    private _isCorrect: boolean | null = null;
    public get isCorrect(): boolean | null { return this._isCorrect; };

    public get isAnswered(): boolean { return this._submittedAnswer !== null; }

    public setAnswer() {
        if (this._pendingAnswer === null) {
            throw "Cannot submit the answer because it is null.";
        }

        this._submittedAnswer = this._pendingAnswer;
        this._isCorrect = this._question.IsCorrect(this._submittedAnswer);
    }
}
