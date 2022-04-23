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
            <Button>Click Me</Button>
            <ButtonSecond>Click Me</ButtonSecond>
            <h1>Jobify</h1>
            <Landing/>
        </>
    );
}

export default App;
