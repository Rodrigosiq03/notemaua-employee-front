import logo from '../../assets/LogoNote.svg'
import logoMaua from '../../assets/LogoMaua.png'
import { Link, useNavigate } from 'react-router-dom'
import React, { useContext, useState } from 'react'
import { EmployeeContext } from '../../context/employee_context'

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const { login, setIsLogged } = useContext(EmployeeContext)

    async function handleLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const token = await login(email, password)
        if (token) {
            setIsLogged(true)
            navigate('/Retirada')
        }
        // TOAST DE ERRO!!!!
    }

    return(
        <>
            <section className='h-screen bg-azul-claro flex flex-col'>
                <div className="flex justify-center items-center h-[90%]">
                    <div className="flex flex-col justify-center py-4 px-12 bg-branco border-[12px] border-cinza-escuro rounded-3xl w-[30%] h-[70%]">
                        <div className='flex justify-center'>
                            <img src={logo} alt="Logo da NoteMaua" />
                        </div>
                        <h2 className='text-3xl font-bold text-center my-8'>Login</h2>

                        <form onSubmit={handleLogin}>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label className='px-2 font-semibold' htmlFor="">E-mail (@maua.br)</label>
                                    <input onChange={(e) => setEmail(e.target.value)} className='bg-cinza-claro shadow-2xl p-2 rounded-xl' type="email" />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <label className='px-2 font-semibold' htmlFor="">Senha</label>
                                    <input onChange={(e) => setPassword(e.target.value)} className='bg-cinza-claro shadow-2xl p-2 rounded-xl' type="password" />
                                </div>

                            </div>
                            <div className='flex justify-center my-4'>
                                <button type='submit' className='bg-azul text-branco text-xl font-bold px-12 py-1 rounded-md'>Entrar</button>
                            </div>
                        </form>

                        <div className='text-center'>
                            <Link to={'/EsqueciSenha'} className='py-4 font-bold text-azul hover:underline'>Esqueci minha Senha</Link>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center mb-4'>
                    <img src={logoMaua} alt="Logo da Maua" />
                </div>
            </section>
        </>
    )
}