import classes from "./userList.module.scss";

import axios from "axios";
import Cointab from "../context-api/cointab";
import { useContext, useEffect } from "react";

function UserList() {

    const { BASEURL, setView, setDlt, getAllUser, setGetAllUser, edit, setEdit } = useContext(Cointab)

    useEffect(() => {
        axios.get(`${BASEURL}/getall`, { withCredentials: true })
            .then(res => {
                setGetAllUser(res.data.message)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const allUsers = getAllUser.map((user) => {

        const handleView = () => {
            axios.get(`${BASEURL}/getone/${user.id}`, { withCredentials: true })
                .then(res => {
                    setView(res.data.message);
                })
                .catch(err => {
                    console.log(err);
                })
        };

        const handleEdit = () => {
            // setEdit({ ...edit, state: true })
            axios.get(`${BASEURL}/getone/${user.id}`, { withCredentials: true })
                .then(res => {
                    let data = res.data.message;
                    setEdit({
                        ...edit,
                        state: true,
                        name: data.name,
                        email: data.email,
                        id: data.id
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        };

        const handleDelete = () => {
            setDlt({ state: true, id: user.id })
        };

        return (
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <i className="fa-regular fa-hand-pointer" title="View" onClick={handleView}></i>
                    <i className="fa-solid fa-pen-to-square" title="Edit" onClick={handleEdit}></i>
                    <i className="fa-solid fa-trash" title="Delete" onClick={handleDelete}></i>
                </td>
            </tr>
        );
    });

    return (
        <section className={classes.userListSection}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers}
                </tbody>
            </table>
        </section>
    )
}

export default UserList;