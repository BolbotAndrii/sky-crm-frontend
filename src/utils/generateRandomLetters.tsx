export const generateRandomLetters = (count = 2) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let randomLetters = ''

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length)
    const randomLetter = alphabet.charAt(randomIndex)
    randomLetters += randomLetter
  }

  return randomLetters
}
