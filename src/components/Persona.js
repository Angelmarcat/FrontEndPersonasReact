import React from "react";

const Persona = ({id, personData}) => {
    const {name, age} = personData;
    return(
        <tr>
            <td>{name}</td>
            <td>{age}</td>
        </tr>
    );
}

export default Persona;