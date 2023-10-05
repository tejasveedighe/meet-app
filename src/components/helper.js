/* creates arrays of length 3, 
so that they can be used as a single row
in grid layout 
*/
export const chunk = (arr) => {
	const newArr = [];
	while (arr.length) newArr.push(arr.splice(0, 3));
	return newArr;
};

export const url =
	"https://storage.googleapis.com/backend-files-bucket/video%2F64d9fc9a9397c211d89ab555%2F64b7b36c1f9a7ef9e1a6e790%2FShinchan%20New%20Episode%20In%20Hindi%202023_Shinchan%20Cartoon%20shinchan%20in%20hindi.mp4-1696479890057.mp4";