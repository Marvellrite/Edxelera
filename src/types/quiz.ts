export interface QuizType {
    question: string,
    options: string[],
    answered: boolean,
}

export interface QuizResult extends Omit<QuizType, "answered"> {
    correctAnswers: QuizAnswers,
    submittedAnswers: QuizAnswers
}

export type QuizAnswers = {
    [key:PropertyKey]: string
}
