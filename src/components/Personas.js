import React, { useState, useEffect } from "react";
import axios from 'axios'
import Global from "../Global";
import Persona from '../components/Persona'

const Personas = () => {
    const url = Global.url;
    // to add person
    const [people, setPeople] = useState({
        id: null,
        name: null,
        age: 0,
        orderBy: 0,
    });
    //to read rows
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        getPersons();
        //orderByMax();
        console.log(persons);
    }, [persons.length]);

    const getPersons = () => {
        axios.get('http://127.0.0.1:8000/people').then(res => {
            setPersons(res.data);
        })
    }

    const orderByMax = () => {
        if(persons.length == 0 ){
            return 0
        } else if (persons.length > 0){
            let numeroMasAlto = persons[0].orderBy;

        persons.forEach(person => {
            if (person.orderBy > numeroMasAlto) {
                numeroMasAlto = person.orderBy;
            }
        });

        return numeroMasAlto;
        }
    }

    const deletePerson = () => {
        const orderByPerson = orderByMax();
        axios.delete("http://127.0.0.1:8000/peoples?orderBy=" + orderByPerson).then(res => {
            getPersons();
        })
    }

    let nameRef = React.createRef();
    let ageRef = React.createRef();

    const changeState = () => {
        setPeople({
            id: null,
            name: nameRef.current.value,
            age: ageRef.current.value,
            orderBy: orderByMax() + 1
        });
        console.log(people)
    }

    const sendData = (e) => {
        e.preventDefault();
        changeState();

        axios.post(url + "people", people).then(res => {
            console.log(res.data);
            getPersons();
        })

    }

    const verdatos = () => {
        deletePerson();
    }

    return (
        <nav className="container">
            <div className="row align-items-start">
                <h1 className="title-Personas">Listado de Personas</h1>
            </div>
            <div id="formulario" className="mx-auto mb-3 mt-5">
                <div>
                    <form onSubmit={sendData} className="container">
                        <div className="row">
                            <label className="col-auto">Nombre:</label>
                            <input type="text" className="col-auto" placeholder="Ingrese Nombre" ref={nameRef} onChange={changeState} required></input>
                            <div className="col-4"></div>
                            <label className="col-auto">Edad:</label>
                            <input type="text" className="col-auto" placeholder="Ingrese Edad" ref={ageRef} onChange={changeState} required></input>
                            <div className="section-buttons row"></div>
                            <div className="container d-flex justify-content-center align-items-center">
                                <button type="submit" className="btn btn-primary col-3">Guardar</button>
                                <div className="col-1"></div>
                                <button type="button" className="btn btn-danger col-3" onClick={verdatos}>Eliminar ultimo registro</button>

                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <div className="container table-people">
                <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Edad</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                persons.length > 0 ? (
                                    persons.map((person, i) => {
                                        return (
                                            <Persona
                                                key={i}
                                                id={i}
                                                personData={person}
                                            />
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td>Sin registros</td>
                                        
                                    </tr>
                                )
                            }




                        </tbody>

                    </table>
                </div>
            </div>
        </nav>

    );
}

export default Personas;