interface IBook {
	_id: string;
	category: string;
	img: string;
	price: number;
	title: string;
}

type CategoryContext = {
	currentCategory: string;
	setCurrentCategory: (category: string) => void;
};
