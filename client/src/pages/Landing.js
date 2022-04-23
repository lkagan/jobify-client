import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';

const Landing = () => {
    return (
        <main>
            <nav>
                <img src={logo} alt="Jobify" className={"logo"} />
            </nav>
            <div className="container page"></div>
            <div className="info">
                <h1>Job <span>tracking</span> app</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatum, quisquam.
                </p>
                <button className="btn btn-hero">Login / Register</button>
            </div>
            <img src={main} alt="Job Hunt" className="img main-img" />
        </main>
    );
};

export default Landing;