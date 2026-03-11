import React from 'react';

interface QuestionStepProps {
  question: string;
}

export default function QuestionStep({ question }: QuestionStepProps) {
  return (
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black">
      {question}
    </h2>
  );
}
