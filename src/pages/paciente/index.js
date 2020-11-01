import { useEffect, useContext, useState, useRef } from 'react'
import {
    useParams
  } from "react-router-dom";
import Template from '../../template';
import AppContext from '../../context';
import { formatDate } from '../../helpers';
import './index.scss';



function Paciente() {

  let { id } = useParams()
  const Context = useContext(AppContext)
  const [ paciente, setPaciente ] = useState(null)
  const [ consultas, setConsultas ] = useState([])
  const [ consultaAlterar, setConsultaAlterar ] = useState(null)
  const inputAnotacoes = useRef(null);
  let refs = null;


  useEffect(()=>{
      if(!paciente){
        Context
            .RestClient
            .get(`/paciente/${id}`)
            .then(({ data })=>{
                setPaciente(data)
            })
      }

      if(!consultas.length){
          Context
            .RestClient
            .get(`/consulta/paciente/${id}`)
            .then(({ data })=>{
                console.log(data)
                setConsultas(data)
            })
      }

      if(consultaAlterar){
        inputAnotacoes.current.value = consultaAlterar.anotacoes
      }
  })

  function getRef(fields){
     refs = fields
  }

  function salvar(){

      const anotacoes = inputAnotacoes.current.value
      const { id } = consultaAlterar

      Context
        .RestClient
        .put('/consulta', { id, anotacoes })
        .then(({ data })=>{
            console.log(data)
            setConsultas([])
            setConsultaAlterar(null)
        })
  }

  function cancelar(){
    setConsultaAlterar(null)
  }



  return (
    <>
        <Template>
            <div className="paciente-page-container">
                {
                    paciente && (
                        <h1>
                            <span>Paciente { paciente.nome }</span>
                        </h1>
                    )
                }

                {
                    paciente && (
                        <>
                            <h4> Informações </h4>
                            <table className="paciente-table">
                                <tbody>
                                <tr>
                                    <td><strong>Data de Nascimento</strong></td>
                                    <td>{ formatDate(paciente.nascimento) }</td>
                                    <td><strong>Altura</strong></td>
                                    <td>{ paciente.altura }</td>
                                </tr>
                                <tr>
                                    <td><strong>Sexo</strong></td>
                                    <td>{ paciente.sexo }</td>
                                    <td><strong>Peso</strong></td>
                                    <td>{ paciente.peso }</td>
                                </tr>
                                <tr>
                                    <td><strong>Telefone</strong></td>
                                    <td>{ paciente.telefone }</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                </tbody>
                        </table>
                    </>
                    )
                }

                {
                    consultas.length && (
                        <>
                            <h4> Consultas </h4>
                            <table className="paciente-table" >
                                <tbody>
                                    <tr>
                                        <td><strong>Data da consulta</strong></td>
                                        <td><strong>Atendimento</strong></td>
                                        <td><strong>Ação</strong></td>
                                    </tr>
                                    {
                                        consultas.map((c)=>(
                                            <tr>
                                                <td>{ formatDate(c.data) }</td>
                                                <td>{ c.anotacoes }</td>
                                                <td> <button onClick={()=>{ setConsultaAlterar(c) }}>Inserir Anotações</button> </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </>
                    )
                }
                

               <dialog open={consultaAlterar} className="modal form">
                    {
                        consultaAlterar && (
                            <>
                                <h5>Inserir anotações para consulta: { formatDate(consultaAlterar.data)  }</h5>
                                <textarea ref={inputAnotacoes}></textarea>
                                <button onClick={salvar}>Salvar</button>
                                <button className="danger" onClick={cancelar}>Cancelar</button>
                            </>
                            
                        )
                    }
               </dialog>
            </div>
        </Template>
    </>
  );
}

export default Paciente;
