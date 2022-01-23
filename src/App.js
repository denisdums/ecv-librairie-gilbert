import './App.css';
import {useEffect, useState} from "react";
import Home from "./pages/Home";
import Book from "./pages/Book";
import Authors from "./pages/Authors";
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams} from "react-router-dom";

function App() {
    return (

        <div className="container">
            <header className='py-10 flex items-center justify-between'>
                <a href='/' className='text-3xl font-bold'>Librairie Gilbert</a>
                <nav>
                    <ul className='flex gap-4'>
                        <li><a href="/auteurs">Auteurs</a></li>
                        <li><a href="/">Livres</a></li>
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
