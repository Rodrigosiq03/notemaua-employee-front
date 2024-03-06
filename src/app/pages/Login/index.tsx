import logo from '../../assets/LogoNote.svg'
import logoMaua from '../../assets/LogoMaua.png'
import { Link, useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/employee_context'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [viewPass, setViewPass] = useState(true)

    const navigate = useNavigate()

    const { login, setIsLogged } = useContext(EmployeeContext)

    async function handleLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(email === '' || password === '') {
            toast.error("Preencha todos os campos", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return
        }

        const token = await login(email, password)
        
        if (token) {
            setIsLogged(true)
            toast.success("Login efetuado com sucesso", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            setTimeout(() => {
                navigate('/Withdraw')
            }, 3000)
        }else{
            toast.error("Email ou Senha Inválidos", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token')) navigate('/Withdraw')
    }, [])

    return(
        <>
            <section className='h-screen bg-azul-claro flex flex-col'>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                <div className="flex justify-center items-center h-[90%]">
                    <div className="flex flex-col justify-center p-12 bg-branco border-[12px] border-cinza-escuro rounded-3xl w-[30%]">
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
                                    <div className='bg-cinza-claro shadow-2xl p-2 rounded-xl flex justify-between items-center gap-4'>
                                        <input onChange={(e)=>setPassword(e.target.value)} className="w-full bg-transparent outline-none" type={viewPass ? "password" : "text"} />
                                        <button onClick={()=>setViewPass(!viewPass)} type='button'>
                                            {viewPass ? <FaEye size={20}/> : <FaEyeSlash size={20}/> }
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className='flex justify-center my-4'>
                                <button type='submit' className='bg-azul text-branco text-xl font-bold px-12 py-1 rounded-md'>Entrar</button>
                            </div>
                        </form>

                        <div className='text-center'>
                            <Link to={'/ForgotPassword'} className='py-4 font-bold text-azul hover:underline'>Esqueci minha Senha</Link>
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