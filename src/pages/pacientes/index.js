import { useEffect, useContext, useState } from 'react'
import Template from '../../template';
import { Table, PacienteForm } from '../../components';
import AppContext from '../../context';
import { formatDate } from '../../helpers';
import './index.scss';

const refToObject = (ref)=>{
    const nome = ref.inputNome.current.value
    const telefone = ref.inputTelefone.current.value
    const sexo = ref.inputSexo.current.value
    const altura = ref.inputAltura.current.value
    const peso = ref.inputPeso.current.value
    const nascimento = ref.inputNascimento.current.value
    return { nome, telefone, sexo, altura, peso, nascimento }
}

function Pacientes() {

  const Context = useContext(AppContext)
  const [ pacientes, setPacientes ] = useState([])
  const [ pacienteEdit, setPacientEdit ] = useState(null)
  const [ isCreating, setIsCreating ] = useState(false)

  let refs = null;

  const TABLE_HEAD = [

    {
        key: 'nome',
        text: 'Nome'
    },
    {
        key: 'nascimento',
        text: 'Data de Nascimento',
        transform: formatDate
    },
    {
        key: 'sexo',
        text: 'Sexo'
    },
    {
        key: 'telefone',
        text: 'Telefone'
    },
    {
        key: 'altura',
        text: 'Altura'
    },
    {
        key: 'peso',
        text: 'Peso'
    },
    {   
        key: 'acao',
        text: 'Ação',
        content: ( paciente )=>(
            <>
                <button onClick={ ()=>{ delPaciente(paciente) } } >Apagar</button>
                <button onClick={ ()=>{ setFormValue(paciente) } } >Editar</button>
            </>
        )
    }

]



  function sendForm(){

    Context
            .RestClient
            .post('/paciente',refToObject( refs ))
            .then(()=>{
                cancel()
                setPacientes([])
            })

  }

  function savePaciente(){

    const { id } = pacienteEdit 
    const paciente = {
        id,
        ...refToObject( refs )
    }

    Context
    .RestClient
    .put(`/paciente/`, paciente)
    .then(()=>{
        cancel()
        setPacientes([])
    })
    .catch(console.log)
  }

  function delPaciente(paciente){
        Context
        .RestClient
        .delete(`/paciente/${paciente.id}`)
        .then(()=>{
            setPacientes([])
        })
        .catch(console.log)
  }

  useEffect(()=>{
      if(!pacientes.length){
        Context
            .RestClient
            .get('/paciente')
            .then(({ data })=>{
                setPacientes(data)
            })
      }
  })

  function getRef(fields){
     refs = fields
  }

  
  function setFormValue(paciente){

    refs.inputNome.current.value = paciente.nome
    refs.inputTelefone.current.value = paciente.telefone
    refs.inputSexo.current.value = paciente.sexo
    refs.inputNascimento.current.value = paciente.nascimento.replace(/T(.*)/, '')
    refs.inputAltura.current.value = paciente.altura
    refs.inputPeso.current.value = paciente.peso
    setPacientEdit(paciente)

  }

  function cancel(){
    setPacientEdit(null)
    setIsCreating(false)
  }

  const isInEditMode = (pacienteEdit !== null)


  return (
    <>
        <Template>
            <div className="pacientes-page-container">
                <h1>
                    <span>Pacientes</span>
                    <button onClick={setIsCreating}>Novo usuário</button>
                </h1>
                <Table heading={TABLE_HEAD} content={pacientes} />
                
                <dialog className="modal" open={isCreating || isInEditMode}>
                    <h4>{ isInEditMode ? 'Editar usuário' : 'Cadastrar novo paciente' }</h4>
                    <PacienteForm getRefs={getRef} />

                    { !isInEditMode && (<button onClick={ sendForm }>Cadastrar novo paciente</button>) }
                    { isInEditMode && (<button onClick={ savePaciente }>Salvar</button>) }
                    <button onClick={ cancel }>Cancelar</button>
                </dialog>

            </div>
        </Template>
    </>
  );
}

export default Pacientes;
