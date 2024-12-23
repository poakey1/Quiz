import { EventEmitter } from "@angular/core";

export interface IQuestion {
    focusAnswerInput(): void;
    pendingAnswerSubmitted: EventEmitter<string | null>
}
