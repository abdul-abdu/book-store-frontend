import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom'
import App from './App';
let contaner:any  = null

beforeEach(()=>{
    contaner = document.createElement("div")
    document.body.appendChild(contaner)
})


afterEach(()=>{
    unmountComponentAtNode(contaner)
    contaner.remove()
    contaner = null
})



describe("App component", () => {
    it("renders App", () => { 
        render(<App/>, contaner)
    })
})