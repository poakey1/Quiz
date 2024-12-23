import { Answer } from "./answer";

export class FreeTextAnswer extends Answer {
    constructor(pattern: RegExp, explanation: string) {
        super(explanation);
        this.pattern = new RegExp(pattern, 'i');
    }

    public readonly pattern: RegExp;
}
