import classes from "./home.module.scss";
import Header from "../components/header";
import UserList from "../components/userList";
import Actions from "../components/actions";

import Cointab from "../context-api/cointab";
import { useContext } from "react";

function Home() {

    const { view, dlt, edit } = useContext(Cointab);

    return (
        <>
            <Header />
            <main className={classes.homeMain}>
                <UserList />
                {
                    view &&
                    <Actions />
                }
                {
                    dlt.state &&
                    <Actions />
                }
                {
                    edit.state &&
                    <Actions />
                }
            </main>
        </>
    )
}

export default Home;