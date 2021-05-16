import axios from "axios";

const httpClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
});

export const getBooksPreview = async () =>
	await httpClient.get("/books/preview");

export const getAllBooks = async (query: string) =>
	await httpClient.get("/books" + query);

export const getBookDetails = async (id: string) =>
	await httpClient.get("/books/" + id);
