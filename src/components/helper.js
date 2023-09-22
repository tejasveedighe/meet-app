/* creates arrays of length 3, 
so that they can be used as a single row
in grid layout 
*/
export const chunk = (arr) => {
	const newArr = [];
	while (arr.length) newArr.push(arr.splice(0, 3));
	return newArr;
};
