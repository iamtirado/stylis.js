/**
 * @param {number}
 * @return {number}
 */
export var abs = Math.abs

/**
 * @param {number}
 * @return {string}
 */
export var from = String.fromCharCode

/**
 * @param {...object}
 * @return {object}
 */
export var assign = Object.assign

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
export function hash (value, length) {
	return (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3)
}

/**
 * @param {string} value
 * @return {string}
 */
export function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {boolean}
 */
export function test (value, pattern) {
	return pattern.test(value)
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
export function match (value, pattern) {
	return pattern.exec(value)[0]
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
export function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} value
 * @return {number}
 */
export function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
export function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
export function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
export function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
export function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
export function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
export function combine (array, callback) {
	return array.map(callback).join('')
}
