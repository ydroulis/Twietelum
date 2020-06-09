import React from "react";
import { Link } from "react-router-dom"

const notFoundPage = ({ location }) =>  {
    console.log(location);
    return (
        <div className="container">
            A URL <strong>{location.pathname}</strong> não existeno Twitelum, se quiser voltar para a <Link to="/"> página inicial basta clicar aqui</Link>
        </div>
    );
};


export default notFoundPage;