import { useRef } from 'react'
import './index.scss';

function PacienteForm({ getRefs }){

    const inputNome = useRef(null);
    const inputTelefone = useRef(null);
    const inputSexo = useRef(null);
    const inputNascimento = useRef(null);
    const inputAltura = useRef(null);
    const inputPeso = useRef(null);

    getRefs({
        inputNome,
        inputTelefone,
        inputSexo,
        inputNascimento,
        inputAltura,
        inputPeso
    })

    return (
        <div className="form">
            <input ref={inputNome} type="text" placeholder="Nome" />
            <input ref={inputTelefone} type="text" placeholder="Telefone" />
            <input ref={inputSexo} list="sexo" placeholder="Sexo"/>
            <datalist id="sexo">
                <option>masculino</option>
                <option>feminino</option>
            </datalist>
            <input ref={inputNascimento} type="date" id="nascimento" name="nascimento"/>
    
            <input ref={inputAltura} type="number" placeholder="Altura em cm" />
            <input ref={inputPeso} type="number" placeholder="Peso em kg" />
        </div>
    );
}

export default PacienteForm