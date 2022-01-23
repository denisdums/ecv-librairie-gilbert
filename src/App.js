import './App.css';
import {useEffect, useState} from "react";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Authors from "./pages/Authors";
import Editors from "./pages/Editors";
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams} from "react-router-dom";

function App() {
    return (

        <div className="container">
            <header className='py-10 flex items-center justify-between'>
                <a href='/' className='text-3xl font-bold'><span>Librairie<br></br>Gilbert</span></a>
                <nav>
                    <ul className='flex gap-4'>
                        <li><a href="/auteurs" className='text-blue-300 hover:text-blue-500 transition-all'>Auteurs</a></li>
                        <li><a href="/editeurs" className='text-blue-300 hover:text-blue-500'>Editeurs</a></li>
                        <li><a href="/" className='text-blue-300 hover:text-blue-500'>Livres</a></li>
                    </ul>
                </nav>
            </header>
            <Router>
                <div>
                    <Switch>
                        <Route path="/livre">
                            <Book/>
                        </Route>
                        <Route path="/auteurs">
                            <Authors/>
                        </Route>
                        <Route path="/editeurs">
                            <Editors/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
