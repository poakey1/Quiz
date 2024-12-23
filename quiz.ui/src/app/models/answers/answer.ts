export abstract class Answer {
    constructor(explanation?: string) {
        this._explanation = explanation || '';
    }

    private _explanation: string;
    public get explanation(): string { return this._explanation; };
}
