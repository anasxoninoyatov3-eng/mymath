export const PREMADE_QUIZZES: Record<string, {
  topic: string;
  level: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}> = {
  'Natural sonlar': {
    topic: 'Natural sonlar',
    level: '5-sinf',
    questions: [
      {
        question: 'Eng kichik natural son qaysi?',
        options: ['0', '1', '2', 'Yo\'q'],
        correctIndex: 1,
        explanation: 'Sanoqda ishlatiladigan eng kichik son 1 hisoblanadi.'
      },
      {
        question: '0 soni natural sonmi?',
        options: ['Ha', 'Yo\'q', 'Faqat ba\'zida'],
        correctIndex: 1,
        explanation: '0 soni narsalarni sanashda ishlatilmagani uchun natural son emas.'
      },
      {
        question: '99 va 101 orasida qaysi natural son bor?',
        options: ['98', '100', '102', '100.5'],
        correctIndex: 1,
        explanation: '99 dan keyingi natural son 100.'
      },
      {
        question: 'Qaysi qator faqat natural sonlardan iborat?',
        options: ['1, 2, 3, 4', '0, 1, 2, 3', '-1, 0, 1, 2'],
        correctIndex: 0,
        explanation: 'Natural sonlar 1 dan boshlanadi.'
      },
      {
        question: 'Eng katta natural son qaysi?',
        options: ['1 000 000', '1 000 000 000', 'Mavjud emas'],
        correctIndex: 2,
        explanation: 'Natural sonlar cheksiz davom etadi.'
      }
    ]
  },
  'Pifagor teoremasi': {
    topic: 'Pifagor teoremasi',
    level: '7-sinf',
    questions: [
      {
        question: 'Pifagor teoremasi qaysi uchburchak uchun amal qiladi?',
        options: ['Teng yonli', 'To\'g\'ri burchakli', 'O\'tmas burchakli'],
        correctIndex: 1,
        explanation: 'Pifagor teoremasi faqat to\'g\'ri burchakli uchburchaklar uchun.'
      },
      {
        question: 'Gipotenuza nima?',
        options: ['Eng kichik tomon', 'O\'tkir burchak qarshisidagi tomon', 'Eng uzun tomon'],
        correctIndex: 2,
        explanation: 'Gipotenuza to\'g\'ri burchak qarshisidagi eng uzun tomon.'
      },
      {
        question: 'Katetlar 3 va 4 bo\'lsa, gipotenuza nechaga teng?',
        options: ['5', '7', '25'],
        correctIndex: 0,
        explanation: '$3^2 + 4^2 = 9 + 16 = 25$, ildiz olsak 5 chiqadi.'
      },
      {
        question: 'Agar $a=6, b=8$ bo\'lsa, $c$ ning qiymatini toping.',
        options: ['10', '14', '100'],
        correctIndex: 0,
        explanation: '$6^2 + 8^2 = 36 + 64 = 100$, ildiz olsak 10.'
      },
      {
        question: 'Faqat katetlar kvdaratlari yig\'indisi nimaga teng?',
        options: ['Gipotenuza', 'Gipotenuza kvadrati', 'Gipotenuza yarmi'],
        correctIndex: 1,
        explanation: '$a^2 + b^2 = c^2$, ya\'ni gipotenuza kvadrati.'
      }
    ]
  }
};
