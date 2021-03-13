const initialsFromName = (name) => {
  const initials = name.split(' ').map((n) => n[0])

  if (initials.length > 1) {
    return [initials[0], initials[initials.length - 1]].join('')
  } else {
    return initials[0]
  }
}

export default initialsFromName
