import classes from "./actions.module.scss";

import Cointab from "../context-api/cointab";
import { useContext, useState } from "react";
import axios from "axios";

function Actions() {

    const { BASEURL, view, setView, dlt, setDlt, setGetAllUser, edit, setEdit } = useContext(Cointab);

    const handleClose = () => {
        setView('');
        setEdit({ ...edit, state: false });
    }

    const handleYes = () => {
        axios.post(`${BASEURL}/delete/${dlt.id}`, {}, { withCredentials: true })
            .then(res => {
                setDlt({ state: false, id: '' })

                axios.get(`${BASEURL}/getall`, { withCredentials: true })
                    .then(res => {
                        setGetAllUser(res.data.message)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleNo = () => {
        setDlt({ ...dlt, state: false })
    }

    const handleConfirm = () => {
        if (edit.name && edit.email && edit.pwd && edit.cpwd) {
            axios.post(`${BASEURL}/edit/${edit.id}`, {
                name: edit.name,
                email: edit.email,
                password: edit.pwd,
                confirmpassword: edit.cpwd
            }, { withCredentials: true })
                .then(res => {
                    axios.get(`${BASEURL}/getall`, { withCredentials: true })
                        .then(res => {
                            setGetAllUser(res.data.message)
                            setEdit({ ...edit, state: false });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <section className={classes.actions}>
            {
                view &&
                <div className={classes.container}>
                    <h3 className={classes.nameEmail}>Name: {view.name}</h3>
                    <h3 className={classes.nameEmail}>Email: {view.email}</h3>
                    <i className="fa-solid fa-xmark" title="Close" onClick={handleClose}></i>
                </div>
            }
            {
                dlt.state &&
                <div className={classes.container}>
                    <p>Do you really want to delete?</p>
                    <div className={classes.btnContainer}>
                        <button onClick={handleYes}>Yes</button>
                        <button onClick={handleNo}>No</button>
                    </div>
                </div>
            }
            {
                edit.state &&
                <div className={classes.container}>
                    <h4>Edit</h4>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                        value={edit.name}
                        className={classes.editInput}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEdit({ ...edit, email: e.target.value })}
                        value={edit.email}
                        className={classes.editInput}
                        disabled
                        style={{ cursor: "not-allowed" }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setEdit({ ...edit, pwd: e.target.value })}
                        value={edit.pwd}
                        className={classes.editInput}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setEdit({ ...edit, cpwd: e.target.value })}
                        value={edit.cpwd}
                        className={classes.editInput}
                    />
                    <button onClick={handleConfirm} className={classes.btnConfirm}>
                        Confirm
                    </button>
                    <i className="fa-solid fa-xmark" title="Close" onClick={handleClose}></i>
                </div>
            }
        </section>
    )
}

export default Actions;