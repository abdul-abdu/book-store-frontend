import { createContext, Dispatch, SetStateAction } from "react";

export const BookCategories = [
	"all",
	"fantasy",
	"history",
	"romance",
	"scifi",
	"horror",
];

export type Context = {
	currentCategory: string;
	setCurrentCategory: Dispatch<SetStateAction<string>>;
};

export const initialContext = {
	currentCategory: BookCategories[0],
	setCurrentCategory: (): void => {
		throw new Error("setCurrentCategory function must be overridden");
	},
};

export const CategoryContext = createContext<Context>(initialContext);
