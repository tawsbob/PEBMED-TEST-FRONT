import { useEffect, useContext, useState } from 'react';
import Template from '../../template';
import { Table, ConsultaForm } from '../../components';
import AppContext from '../../context';
import { formatDate } from '../../helpers';
import './index.scss'

function Agendamento(){

    const Context = useContext(AppContext)
    const [ consultas, setConsultas ] = useState([])
    const [ agendamento, setAgendamento ] = useState(null)
    const [ isCreating, setIsCreating ] = useState(false)
    let refs = null

    const HEADING_TABLE = [
        {
            key: 'data',
            text: 'Data',
            transform: formatDate
        },
        {
            key: 'paciente',
            text: 'Paciente',
             content: ( consulta )=>(<span key={consulta.paciente.id}>{ consulta.paciente.nome }</span>)
        },
        {
            key: 'acoes',
            text: 'Ações',
            content: (consulta)=>(
                <>
                    <button className="danger" onClick={ ()=>{ deletarConsulta(consulta) } }>Deletar</button>
                    <button onClick={ ()=>{ editarAgendamento( consulta ) } } >Alterar</button>
                </>
            )
        }
    ]

    function getRefs(_refs){
        refs = _refs
    }

    function deletarConsulta( consulta ){
        Context
                .RestClient
                .delete(`/consulta/${consulta.id}`)
                .then(({ data })=>{
                    console.log(data)
                    setConsultas([])
                })
    }

    function agendar(){
        const paciente = { id: refs.inputPaciente.current.value };
        const data = refs.inputData.current.value;

        if(paciente && data){
            Context
                .RestClient
                .post('/consulta', { paciente, data })
                .then(()=>{
                    setConsultas([])
                })
        }

    }

    function editarAgendamento(consulta){
        refs.inputData.current.value = consulta.data.replace(/T(.*)/, '')
        const opts = [ ...refs.inputPaciente.current.options]
        opts.forEach((option)=>{
            if(option.value === consulta.paciente.id){
                option.setAttribute('selected', 'selected')
            } else {
                option.removeAttribute('selected')
            }
        })

        setAgendamento(consulta)
    }

    function modificar(){

        const paciente = { id: refs.inputPaciente.current.value };
        const data = refs.inputData.current.value;
        const { id } = agendamento;

        Context
            .RestClient
            .put('/consulta', { id, data, paciente })
            .then(({ data })=>{
                console.log(data)
                setConsultas( [] )
            })

    }

    function cancelar(){
        setAgendamento(null)
        setIsCreating(false)
    }

    function create(){
        setIsCreating(true)
    }

    useEffect(()=>{

        if(
            !consultas.length
        ){
            Context
            .RestClient
            .get('/consulta')
            .then(({ data })=>{
                setConsultas( data )
            })
        }


    })

    const isEditing = !!agendamento

    return (
        <Template>
            <div className="agendamento-page-container">
                <h1>
                    <span>Agendamentos</span>
                    <button onClick={create}> Crar agendamento</button>
                </h1>

                <Table heading={HEADING_TABLE} content={consultas} />
                
                <dialog className="modal" open={isCreating || isEditing}>
                    <h4>{ isEditing ? 'Modificar agendamento' : 'Agendar novo paciente' }</h4>
                    <ConsultaForm getRefs={getRefs} />
                    { !isEditing && (<button onClick={agendar}>Agendar</button>) }
                    { isEditing && (<button onClick={modificar}>Modificar</button>) }    
                    <button className="danger"  onClick={cancelar}>Cancelar</button>
                </dialog>
                
            </div>
        </Template>
    );
}

export default Agendamento;