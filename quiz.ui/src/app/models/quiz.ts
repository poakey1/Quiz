import { QuestionResult } from "./questionResult";

export class Quiz {
    constructor(name: string, creator: string, createdOn: Date, questions: QuestionResult[]) {
        this.name = name;
        this.creator = creator;
        this.createdOn = createdOn;
        this.questions = questions;
    }

    public get isComplete(): boolean {
        return this.questions.every(q => q.isAnswered);
    };

    public readonly name: string;

    public readonly creator: string;

    public readonly createdOn: Date;

    public readonly questions: QuestionResult[];
}
