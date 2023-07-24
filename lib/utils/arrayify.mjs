/** 
 * Arrayify 
 * 
 */

export function arrayify(input) {
	return Array.isArray(input) ? input : [input];
}