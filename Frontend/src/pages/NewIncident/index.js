import React, {useState} from 'react'
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function NewIncident(){

    const [title, settitle] = useState('')
    const [description, setdescription] = useState('')
    const [value, setvalue] = useState('')

    const ongId = localStorage.getItem('ongId')
    const histroy = useHistory()
    
    async function handleNewIncident(e) {
        e.preventDefault()
        const data = {title, description, value}
        try {
            await api.post('incidents', data, {
                headers: {
                    authorization : ongId
                }
            } 
            )
            histroy.push('/profile')
        } catch (error) {
            alert('Erro ao cadastrar incidente, tente novamente.')
        }      
    }

    return(
        <div className="new-incidents-container">
        <div className="content">
            <section>
                <img src={logoImg }alt="Be The Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreve o caso detalhadamente para encontrar um héroi para resolver isso.</p>
                <Link to="/profile" className='back-link'>
                    <FiArrowLeft size={16} color='#e02141'/>
                    Voltar para profile
                </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                    placeholder='Título do caso'
                    value= {title}
                    onChange= { e => settitle(e.target.value)}
                />
                <textarea 
                    placeholder='Descrição'
                    value= {description}
                    onChange= { e => setdescription(e.target.value)}
                />
                <input 
                    placeholder='Valor em reais'
                    value= {value}
                    onChange= { e => setvalue(e.target.value)}
                />
                <button className='button' type='submit'> Cadastrar</button>
            </form>
        </div>
    </div>
    )
}