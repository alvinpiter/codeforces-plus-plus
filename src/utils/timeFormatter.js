export function formatSeconds(seconds) {
  const hour = Math.floor(seconds/3600)
  const minute = (Math.floor(seconds/60))%60

  const zeroPadded = (number) => {
    if (number < 10)
      return `0${number}`
    else
      return number
  }

  return `${zeroPadded(hour)}:${zeroPadded(minute)}`
}
