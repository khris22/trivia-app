export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

// any[] - any type
//  shuffle the array of choices from the fetch request
