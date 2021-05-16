import { ComponentType, ElementType } from "react";
import { Authlayout, DefaultLayout } from "../layouts";
import { Login, Register } from "./auth";
import BookList from "./booklist";
import BookDetails from "./details";
import Home from "./home";

interface IRoute {
	path: string;
	exact: boolean;
	layout: ElementType;
	component: ComponentType;
}

const routers: IRoute[] = [
	{
		path: "/",
		exact: true,
		layout: DefaultLayout,
		component: Home,
	},
	{
		path: "/books",
		exact: true,
		layout: DefaultLayout,
		component: BookList,
	},
	{
		path: "/books/details/:id",
		exact: true,
		layout: DefaultLayout,
		component: BookDetails,
	},
	{
		path: "/login",
		exact: true,
		layout: Authlayout,
		component: Login,
	},
	{
		path: "/register",
		exact: true,
		layout: Authlayout,
		component: Register,
	},
];

export default routers;
