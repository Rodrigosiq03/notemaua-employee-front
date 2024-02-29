import logo from '../../assets/LogoNote.svg'
import logoMaua from '../../assets/LogoMaua.png'
import { Link } from 'react-router-dom'

import { IoExitOutline } from "react-icons/io5";

export default function RedefinirSenha(){
    return(
        <>
            <section className='h-screen bg-azul-claro flex flex-col'>
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
                                    <input className='bg-cinza-claro shadow-2xl p-2 rounded-xl w-[70%]' type="password" />
                                </div>

                                <div className='flex flex-col items-center gap-1'>
                                    <label className='self-start ml-[20%] font-semibold' htmlFor="">Confirme a Senha</label>
                                    <input className='bg-cinza-claro shadow-2xl p-2 rounded-xl w-[70%]' type="password" />
                                </div>

                            </div>
                            <div className='flex justify-center my-4'>
                                <button className='bg-azul text-branco text-xl font-bold px-12 py-1 rounded-md'>Confirmar</button>
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