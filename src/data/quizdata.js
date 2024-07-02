export const quizData = {
  topic: 'CSS',
  level: 'Beginner',
  totalQuestions: 6,
  perQuestionScore: 5,
  totalTime: 30, // in seconds
  questions: [
    {
      question: 'What does CSS stand for?',
      choices: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'None of the above'],
      type: 'MCQs',
      correctAnswer: 'Cascading Style Sheets',
    },
    {
      question: 'Which CSS property is used to change the text color of an element?',
      choices: ['color', 'text-color', 'font-color', 'foreground-color'],
      type: 'MCQs',
      correctAnswer: 'color',
    },
    {
      question: 'How can you include a CSS file named "styles.css" in an HTML document?',
      choices: [
        '<link rel="stylesheet" href="styles.css">',
        '<style src="styles.css">',
        '<css src="styles.css">',
        'None of the above',
      ],
      type: 'MCQs',
      correctAnswer: '<link rel="stylesheet" href="styles.css">',
    },
    {
      question: 'Which CSS property controls the spacing between elements?',
      choices: ['spacing', 'margin', 'padding', 'border-spacing'],
      type: 'MCQs',
      correctAnswer: 'margin',
    },
    {
      question: 'What does the "Cascading" in CSS refer to?',
      choices: ['The hierarchical order of selectors', 'The flow of elements in a document', 'The animation effects', 'None of the above'],
      type: 'MCQs',
      correctAnswer: 'The hierarchical order of selectors',
    },
    {
      question: 'Which CSS property is used to make text bold?',
      choices: ['font-weight', 'text-style', 'font-style', 'bold'],
      type: 'MCQs',
      correctAnswer: 'font-weight',
    },
  ],
};
