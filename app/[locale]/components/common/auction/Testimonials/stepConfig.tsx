export interface StepField {
    label: string;
    fieldId: string;
    required?: boolean;
  }
  
  export interface StepConfig {
    label: string;
    fields: StepField[];
  }
  
  export const stepConfig: StepConfig[] = [
    {
      label: 'About You',
      fields: [
        {
          label: 'What is your full name?',
          fieldId: 'name',
          required: true,
        },
        {
          label: 'What is your role?',
          fieldId: 'role',
        },
      ],
    },
    {
      label: 'Your Experience',
      fields: [
        {
          label: 'How was your experience with us?',
          fieldId: 'satisfaction',
          required: true,
        },
        {
          label: 'How likely are you to recommend us?',
          fieldId: 'recommendation',
        },
      ],
    },
    {
      label: 'Your Feedback',
      fields: [
        {
          label: 'Share your testimonial',
          fieldId: 'message',
          required: true,
        },
        {
          label: 'Purpose of using our platform',
          fieldId: 'useCase',
        },
      ],
    },
    {
      label: 'Additional Information',
      fields: [
        {
          label: 'Would you use our platform again?',
          fieldId: 'returning',
        },
        {
          label: 'Suggestions for improvement (optional)',
          fieldId: 'improvement',
        },
        {
          label: 'Upload your avatar (optional)',
          fieldId: 'avatar',
        },
      ],
    },
  ];