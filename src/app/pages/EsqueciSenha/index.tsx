import logo from '../../assets/LogoNote.svg'
import logoMaua from '../../assets/LogoMaua.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoExitOutline } from 'react-icons/io5'
import { useContext, useState } from 'react'
import { EmployeeContext } from '../../context/employee_context'

export default function EsqueciSenha(){
    const [email, setEmail] = useState('')

    const { forgotPassword } = useContext(EmployeeContext)
    const navigate = useNavigate()

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resp = await forgotPassword(email)

        if (resp !== '') {
            navigate('/RedefinirSenha')
        }
        // TOAST DE SUCESSO
    }

    return(
        <>
            <section className='h-screen bg-azul-claro flex flex-col'>
                <div className="flex justify-center items-center h-[90%]">
                    <div className="flex flex-col justify-center py-4 px-12 bg-branco border-[12px] border-cinza-escuro rounded-3xl w-[30%] min-h-[70%]">
                        <div className='flex justify-center'>
                            <img src={logo} alt="Logo da NoteMaua" />
                        </div>
                        
                        <h2 className='text-2xl font-bold text-center my-8'>Esqueci minha Senha</h2>
                        
                        <div className='flex justify-center mb-8'>
                            <p className='text-center text-lg'>Você receberá um e-mail para redefinir sua senha.</p>
                        </div>

                        <form onSubmit={handleForgotPassword}>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label className='px-2 font-semibold' htmlFor="">E-mail (@maua.br)</label>
                                    <input onChange={(e) => setEmail(e.target.value)} className='bg-cinza-claro shadow-2xl p-2 rounded-xl' type="email" />
                                </div>

                            </div>
                            <div className='flex justify-center my-4'>
                                <button type='submit' className='bg-azul text-branco text-xl font-bold px-12 py-1 rounded-md'>Enviar</button>
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