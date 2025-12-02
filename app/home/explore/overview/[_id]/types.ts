export interface QuizType {
    question: string,
    options: string[],
    answered: boolean,
}

export type QuizAnswers = {
    [key:PropertyKey]: string
}
