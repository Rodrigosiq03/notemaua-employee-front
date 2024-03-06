import logo from '../../assets/LogoNote.svg'
import logoMaua from '../../assets/LogoMaua.png'
import { Link, useNavigate } from 'react-router-dom'

import { IoExitOutline } from "react-icons/io5";
import { useContext, useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { EmployeeContext } from '../../context/employee_context';

export default function RedefinirSenha(){
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const { confirmForgotPassword } = useContext(EmployeeContext)
    const navigate = useNavigate()

    const handleRedefinirSenha = async () => {
        if(senha !== confirmarSenha){
            return toast.error('As senhas não coincidem', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        const email = await localStorage.getItem('email') || ''
        
        const response = await confirmForgotPassword(email, senha)
        if(response === "Password updated successfully. You can now login."){
            toast.success('Senha redefinida com sucesso!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }else{
            return toast.error('Erro ao redefinir senha', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    return(
        <>
            <section className='h-screen bg-azul-claro flex flex-col'>
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
                <div className="flex justify-center items-center h-[90%]">
                    <div className="flex flex-col justify-center p-12 bg-branco border-[12px] border-cinza-escuro rounded-3xl w-[30%]">
                        <div className='flex justify-center'>
                            <img src={logo} alt="Logo da NoteMaua" />
                        </div>
                        
                        <h2 className='text-2xl font-bold text-center my-8'>Redefinir Senha</h2>

                        <form>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col items-center gap-1'>
                                    <label className='self-start ml-[20%] font-semibold' htmlFor="">Nova Senha</label>
                                    <input onChange={(e) => setSenha(e.target.value)} className='bg-cinza-claro shadow-2xl p-2 rounded-xl w-[70%]' type="password" />
                                </div>

                                <div className='flex flex-col items-center gap-1'>
                                    <label className='self-start ml-[20%] font-semibold' htmlFor="">Confirme a Senha</label>
                                    <input onChange={(e)=>setConfirmarSenha(e.target.value)} className='bg-cinza-claro shadow-2xl p-2 rounded-xl w-[70%]' type="password" />
                                </div>

                            </div>
                            <div className='flex justify-center my-4'>
                                <button type='button' onClick={()=>handleRedefinirSenha()} className='bg-azul text-branco text-xl font-bold px-12 py-1 rounded-md'>Confirmar</button>
                            </div>
                        </form>

                        <div className='text-center flex items-center justify-center gap-2'>
                            <Link to={'/'} className='py-4 font-bold hover:underline'>Voltar</Link>
                            <IoExitOutline className='text-xl'/>
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