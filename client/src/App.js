import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Error, Landing } from './pages';
import { AddJob, AllJobs, Profile, Stats, SharedLayout } from './pages/dashboard';

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
                    <Route path="/">
                        <Route path={"stats"} element={<Stats />} />
                        <Route path={"all-jobs"} element={<AllJobs />} />
                        <Route path={"add-job"} element={<AddJob />} />
                        <Route path={"profile"} element={<Profile />} />
                    </Route>
                    <Route
                        path="/"
                        element={ <div>Dashboard</div> }
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
