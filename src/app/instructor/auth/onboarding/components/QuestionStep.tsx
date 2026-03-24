import React from 'react';

interface QuestionStepProps {
  question: string;
  helperText?: string;
}

export default function QuestionStep({
  question,
  helperText,
}: QuestionStepProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black">
        {question}
      </h2>
      {helperText ? (
        <p className="max-w-[620px] text-sm sm:text-base leading-6 text-neutral-600">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
