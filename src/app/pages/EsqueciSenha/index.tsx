import logo from '../../assets/LogoNote.svg'
import logoMaua from '../../assets/LogoMaua.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoExitOutline } from 'react-icons/io5'
import { useContext, useState } from 'react'
import { EmployeeContext } from '../../context/employee_context'
import { IoMdClose } from "react-icons/io";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function EsqueciSenha(){
    const [email, setEmail] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [code, setCode] = useState('')

    const { forgotPassword } = useContext(EmployeeContext)
    const navigate = useNavigate()

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const resp = await forgotPassword(email)
        if (resp === 'E-mail não cadastrado') {
            toast.error(resp, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }else {
            localStorage.setItem('email', email)
            toast.success('E-mail enviado com sucesso', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setTimeout(()=>{
                setShowModal(true)
            }, 3000)
        }
    }

    const CodeVerify = () => {
        if(code.length < 6 || code === ''){
            return toast.error('Código inválido', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        const dateVerify = localStorage.getItem('createAt')

        if(new Date().getTime() - Number(dateVerify) < 600000){
            return toast.error('Código expirado', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }else{
            toast.success('Código Confirmado', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setTimeout(() => {
                setShowModal(false)
                navigate('/redefinirSenha')
            }, 2000)
        }
    }

    return(
        <>
            <section className='h-screen bg-azul-claro flex flex-col'>
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
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
            { showModal ?
                // Modal
                <div className='fixed top-0 right-0 left-0 z-50 bg-[rgba(0,0,0,0.6)] w-full h-screen'>
                    <div className='flex justify-center items-center h-screen'>
                        {/* MODAL */}
                        <div className='bg-white w-1/5 max-xl:w-1/3 rounded-xl'>
                            <header className='flex items-center justify-end border-b-2 border-gray-400 p-4'>
                                <IoMdClose className='cursor-pointer' onClick={()=>setShowModal(false)}/>
                            </header>
                            <section className='p-4 flex flex-col text-center gap-2'>
                                <label className='text-xl'>Código de Verificação</label>
                                <input onChange={(e)=>setCode(e.target.value)} className='text-center bg-gray-400 shadow-2xl p-2 rounded-xl' type="text" />
                                <button type='button' onClick={()=>CodeVerify()} className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Verificar
                                </button>
                            </section>
                        </div>
                    </div>
                </div>
                // <div id="select-modal" tabIndex={-1} aria-hidden="true" className={`hidden overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                //     <div className="relative p-4 w-full max-w-md max-h-full">
                //         {/* <!-- Modal content --> */}
                //         <div className="relative top-1/2 bg-white rounded-lg shadow border-4 border-cinza-escuro">
                //             {/* <!-- Modal header --> */}
                //             <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                //                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                //                     Open positions
                //                 </h3>
                //                 <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                //                     <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                //                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                //                     </svg>
                //                     <span className="sr-only">Close modal</span>
                //                 </button>
                //             </div>
                //             {/* <!-- Modal body --> */}
                //             <div className="p-4 md:p-5">
                //                 <p className="text-gray-500 dark:text-gray-400 mb-4">Select your desired position:</p>
                //                 <ul className="space-y-4 mb-4">
                //                     <li>
                //                         <input type="radio" id="job-1" name="job" value="job-1" className="hidden peer" required />
                //                         <label htmlFor="job-1" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">                           
                //                             <div className="block">
                //                                 <div className="w-full text-lg font-semibold">UI/UX Engineer</div>
                //                                 <div className="w-full text-gray-500 dark:text-gray-400">Flowbite</div>
                //                             </div>
                //                             <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
                //                         </label>
                //                     </li>
                //                     <li>
                //                         <input type="radio" id="job-2" name="job" value="job-2" className="hidden peer"/>
                //                         <label htmlFor="job-2" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                //                             <div className="block">
                //                                 <div className="w-full text-lg font-semibold">React Developer</div>
                //                                 <div className="w-full text-gray-500 dark:text-gray-400">Alphabet</div>
                //                             </div>
                //                             <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
                //                         </label>
                //                     </li>
                //                     <li>
                //                         <input type="radio" id="job-3" name="job" value="job-3" className="hidden peer"/>
                //                         <label htmlFor="job-3" className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                //                             <div className="block">
                //                                 <div className="w-full text-lg font-semibold">Full Stack Engineer</div>
                //                                 <div className="w-full text-gray-500 dark:text-gray-400">Apple</div>
                //                             </div>
                //                             <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
                //                         </label>
                //                     </li>
                //                 </ul>
                //                 <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                //                     Next step
                //                 </button>
                //             </div>
                //         </div>
                //     </div>
                // </div> 
                : null

            }
        </>
    )
}