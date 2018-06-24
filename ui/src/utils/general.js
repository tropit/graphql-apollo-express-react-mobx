export const parseUpdateProperty = (key, value, func, type = 'int') => {
  switch (type) {
    case 'int':
    default:
      value = parseInt(value)
      func(key, value)
  }
}