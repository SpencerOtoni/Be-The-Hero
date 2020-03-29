import React, {useState} from 'react'
import {FiLogIn} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon(){

    const [id, setid] = useState('')

    const histroy = useHistory()

    async function handleLogon(e){
        e.preventDefault()
        try {
            const response = await api.post('session', { id })
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)
            histroy.push('/profile')
        } catch (error) {
            alert('Erro no login, tente novamente.')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogon}>
                    <h1>Faça seu login</h1>
                    <input placeholder="Sua ID"
                    value={id}
                    onChange={ e => setid(e.target.value)}
                    />
                    <button   className='button' type='submit'>Entrar</button>
                    <Link to="/register" className='back-link'>
                        <FiLogIn size={16} color='#e02141'/>
                        Não tem cadastro!
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="heroes"/>
        </div>
    )
}

