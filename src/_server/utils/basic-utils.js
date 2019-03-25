// TODO: throw this in an npm repository ???

// string
export const camelToKebab = str => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
export const kebabToCamel = str => str.replace(/-([a-z])/g, $1 => $1[1].toUpperCase())
export const hyphenate = str => str.replace(/[^a-z0-9+]+/gi, ' ').trim().replace(/ /g, '-')

// object
export const fastClone = obj => JSON.parse(JSON.stringify(obj)) // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/5344074#5344074

// array
export const unique = arr => arr.filter((value, index, self) => self.indexOf(value) === index)

// maths
export const random = (lower, upper) => Math.floor(Math.random() * upper) + lower

// NOTE: might write my own helpers?
// https://medium.com/@abustamam/for-loops-vs-foreach-in-javascript-7a977278a39e
