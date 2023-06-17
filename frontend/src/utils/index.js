import FileSaver from 'file-saver'

import { surpriseMePrompts } from '../constants'

export const getRandomPrompt = (prompt) => {
  const randomNumber = Math.floor(Math.random() * surpriseMePrompts.length)

  if (randomNumber === prompt) return getRandomPrompt(prompt)
  return surpriseMePrompts[randomNumber]
}

export async function downloadImage (_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`)
}
