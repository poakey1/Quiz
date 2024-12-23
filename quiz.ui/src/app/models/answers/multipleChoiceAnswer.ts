import { Answer } from "./answer";

export class MultipleChoiceAnswer extends Answer {
    constructor(text: string, isCorrect: boolean, explanation: string) {
        super(explanation);
        this.text = text;
        this.isCorrect = isCorrect;
    }
    
    public readonly text: string;

    public readonly isCorrect: boolean;
}
