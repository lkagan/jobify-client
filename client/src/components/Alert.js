const Alert = ({ type, message }) => {

    return (
        <div className="alert alert-danger">
            { message }
        </div>
    );
};

export default Alert;