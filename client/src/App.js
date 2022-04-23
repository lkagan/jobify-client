import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Error, Dashboard, Landing } from './pages';

const Button = styled.button`
  background: red;
  color: white;
  font-size: 1rem;
`;

const ButtonSecond = styled.button`
  background: blue;
  color: white;
  font-size: 1rem;
`;

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={ <Dashboard/> }
                    />
                    <Route
                        path="/register"
                        element={ <Register/> }
                    />
                    <Route
                        path="/landing"
                        element={ <Landing/> }
                    />
                    <Route
                        path="*"
                        element={ <Error/> }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
