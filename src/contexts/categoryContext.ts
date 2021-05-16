import { createContext } from "react";

export const BookCategories = [
	"All",
	"Fantasy",
	"History",
	"Romance",
	"Scifi",
	"Horror",
];

export const InitialBookCategory = BookCategories[0];

export const CategoryContext = createContext(null);
