import Landing from "./pages/Landing";
import styled from "styled-components";

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
            <Landing/>
        </>
    );
}

export default App;
