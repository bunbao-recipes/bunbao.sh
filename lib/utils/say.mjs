/**
 * say
 * @param {string} what 
 * @returns 
 */
export function say(what) {
	return what.toLowerCase();
}

say.unknown = function(whatHasUnknownVal, unknownVal) {
	return say(`the ${whatHasUnknownVal} "${unknownVal}" is unknown`);
}

say.shouldBeUndefined = function(thisShouldBeUndefined, butNowIts) {
	return say(`"${thisShouldBeUndefined}" should be undefined. now it's "${butNowIts}"`)
}

say.duplicated = function(whatsIsDuplicated, duplicateVal) {
	return say(`the ${whatsIsDuplicated} "${duplicateVal}" is duplicated`);
}
