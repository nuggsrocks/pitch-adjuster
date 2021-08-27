export const adjustPitch = (halfSteps) => {
  return Math.pow(2, halfSteps / 12)
}
