import classes from "./header.module.scss";

import Cointab from "../context-api/cointab";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Header() {
    const { setSignUp, setSignIn } = useContext(Cointab)

    const handleClick = () => {
        setSignIn(false);
        setSignUp(true);
    }

    return (
        <header>
            <div className={classes.header}>
                <h1>Cointab</h1>
                <Link to="/login" onClick={() => handleClick()}>
                    Add
                </Link>
            </div>
        </header>
    )
}

export default Header;