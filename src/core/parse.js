export function parse(value = '') {
    // debugger
  if (value.startsWith('=')) {
    try {
        console.log(value.slice(1))
      return eval(value.slice(1))
        // return 228
    } catch (e) {

      console.warn('parse error', e.message)
    }
  }
  return value
}
