// Validation shared by the demo form (instant feedback) and the Worker (the
// authority). Each validator returns a map of field -> message; empty = valid.
export type FieldErrors = Record<string, string>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export function validateContact(input: Record<string, unknown>): FieldErrors {
  const errors: FieldErrors = {}

  const name = str(input.name)
  if (name.length < 2) errors.name = 'Enter your name.'
  else if (name.length > 120) errors.name = 'Keep your name under 120 characters.'

  if (!EMAIL.test(str(input.email))) errors.email = 'Enter a valid work email.'
  else if (str(input.email).length > 160) errors.email = 'That email is too long.'

  if (str(input.company).length > 120) errors.company = 'Keep the business name under 120 characters.'

  const phone = str(input.phone)
  if (phone && !/^[+()\d][\d\s().-]{5,24}$/.test(phone)) errors.phone = 'Enter a valid phone number.'

  const message = str(input.message)
  if (message.length < 15) errors.message = 'Tell us a little more (at least 15 characters).'
  else if (message.length > 3000) errors.message = 'Keep it under 3,000 characters.'

  return errors
}
