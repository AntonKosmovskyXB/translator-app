const getDate = webix.Date.dateToStr("%Y-%m-%d");

const wordsGroups = new webix.DataCollection({
	data: [
		{
			name: "first group",
			date: "05-10-2021",
			numberOfWords: 0
		},
		{
			name: "second group",
			date: "03-10-2021",
			numberOfWords: 0
		}
	],
	scheme: {
		$init: (obj) => {
			obj.date = new Date(obj.date);
		},

		$save: (obj) => {
			obj.date = getDate(obj.date);
		}
	}
});

export default wordsGroups;
