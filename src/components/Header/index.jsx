import { Link } from "react-router-dom";


function Header() {
    return (
        <ul>
            <li><Link to="/">Home</Link> </li>
            <li><Link to="/survey/44">Questionnaire</Link></li>
            <li><Link to="/freelance">Freelance</Link></li>       
        </ul>
            
      
    )
}

export default Header