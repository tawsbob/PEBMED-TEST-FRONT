import { useEffect, useContext, useState, useRef } from 'react';
import AppContext from '../../context';
import './index.scss';

function ConsultaForm({ getRefs }){
    const Context = useContext(AppContext)
    const [ paciente, setPacientes ] = useState([])

    const inputPaciente = useRef(null);
    const inputData = useRef(null);

    useEffect(()=>{

        if(!paciente.length){
            Context
                .RestClient
                .get('/paciente')
                .then(({ data })=>{
                    setPacientes(data)
                })
        }

    })

    getRefs({ inputPaciente, inputData })

    return (
        <div className="form">
            <select ref={inputPaciente} list="paciente" id="paciente">
                {
                    paciente.map((p)=>(
                        <option value={p.id} key={p.id}>{ p.nome }</option>
                    ))
                }
            </select>
            <input ref={inputData} type="date" id="data" name="Data da consulta"/>
        </div>
    );
}

export default ConsultaForm;