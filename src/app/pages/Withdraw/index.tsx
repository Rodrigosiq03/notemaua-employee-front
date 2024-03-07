import logo from '../../assets/LogoNote.svg'
import logoMaua from '../../assets/LogoMaua.png'
import { FaSearch, FaCheckCircle, FaDoorOpen } from 'react-icons/fa'
import { GoXCircleFill } from "react-icons/go";
import { RiRefreshFill } from "react-icons/ri";
import { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/employee_context';
import { useNavigate } from 'react-router-dom';
import { WithdrawContext } from '../../context/withdraw_context';
import { Withdraw } from '../../../@clean/shared/domain/entities/withdraw';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Retirada(){
    const [modal, setModal] = useState(false)
    const [serial, setSerial] = useState('')
    const [filter, setFilter] = useState('')
    const [typeFilter, setTypeFilter] = useState('')

    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const { isLogged, updatePassword } = useContext(EmployeeContext)
    const { setWithdraws, getAllWithdraws, updateWithdrawState, finishWithdraw, withdraws } = useContext(WithdrawContext)

    function filterWithdraws(filter: string, typeFilter: string, withdrawList: Withdraw[] | undefined = withdraws) {
        if(typeFilter == 'ra'){
            const filtered = withdrawList ? withdrawList.filter((withdraw: Withdraw) => withdraw.studentRA ? withdraw.studentRA.includes(filter) : undefined) : []
            setWithdraws(filtered)
        }else if(typeFilter == 'serialNumber'){
            const filtered = withdrawList ? withdrawList.filter((withdraw: Withdraw) => withdraw.notebookSerialNumber.includes(filter)) : []
            setWithdraws(filtered)
        }else{
            getAll()
        }
    }

    const navigate = useNavigate()

    function getAll() {
        getAllWithdraws()
    }

    async function updateWithdraw(serialNumber: string, state: boolean){
        const response = await updateWithdrawState(serialNumber, state)
        if(response){
            getAll()
            return toast.success("alterado com sucesso", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }else{
            return toast.error("Erro ao alterar estado", {
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

    async function endWithdraw(serialNumber: string){
        const response = await finishWithdraw(serialNumber)
        if(response){
            getAll()
            return toast.success("Devolução realizada com sucesso", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            setSerial('')
        }else{
            return toast.error("Erro ao realizar devolução", {
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

    async function postNewPassword(email: string, oldPassword: string, newPassword: string){
        const response = await updatePassword(email, oldPassword, newPassword)
        if(response){
            setModal(false)
            return toast.success("Senha alterada com sucesso", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        }else{
            return toast.error("Erro ao alterar senha", {
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

    function Logout(){
        localStorage.removeItem('token')
        navigate('/')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!isLogged && !token) navigate('/')
        
        getAll()
    }, [])

    return (
        <>
        <section className='h-screen bg-azul-claro flex flex-col justify-around items-center gap-4 p-4'>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <img src={logo} alt="Logo da NoteMaua" />
            <div className="bg-branco border-[12px] border-cinza-escuro rounded-3xl w-[80%] h-[70%] p-8">
                <div className='flex items-center'>
                    <div className='flex gap-4'>
                        <button onClick={()=>Logout()} className='flex items-center gap-2 bg-red-500 px-4 py-1 rounded-lg text-white hover:bg-red-400'>Sair<FaDoorOpen/></button>
                        <button onClick={()=>setModal(true)} className='w-32 bg-azul flex items-center gap-2 px-4 py-1 rounded-lg text-white hover:bg-blue-500'>Alterar Senha</button>
                    </div>
                    <div className='flex justify-center gap-4 w-full'>
                        <input onChange={(e)=>setSerial(e.target.value)} className='bg-cinza-claro px-2 py-1 shadow-xl rounded-md' type="number" placeholder='Número de série' value={serial} />
                        <button type='button' className='bg-verde hover:bg-green-400 font-semibold px-6 shadow-xl py-1 rounded-md' onClick={()=>endWithdraw(serial)}>Confirmar devolução</button>
                    </div>
                    <div>
                        <RiRefreshFill onClick={()=>getAll()} className='text-4xl hover:cursor-pointer'/>
                    </div>
                </div>

                <div className='w-full h-[1px] mt-8 mb-2 bg-black'/>
            
                <div className='flex items-center gap-4 my-6'>
                    <input onChange={(e)=>setFilter(e.target.value)} type="text" className='bg-cinza-claro px-2 py-1 shadow-xl rounded-md' placeholder='Pesquisar'/>
                    <select onChange={(e)=>setTypeFilter(e.target.value)} className='w-32 h-8 rounded-md border-[1px] border-black text-center'>
                        <option value="">-- Escolha --</option>
                        <option value="ra">Ra do Aluno</option>
                        <option value="serialNumber">Número de série</option>
                    </select>
                    <button onClick={()=>filterWithdraws(filter, typeFilter)} className='text-xl'><FaSearch/></button>
                </div>

                <div className='relative h-[70%] overflow-y-auto'>
                    <table className='w-full border-collapse'>
                        <thead className='border-b-2 border-black'>
                            <tr>
                                <th>Número de Série</th>
                                <th>Estado</th>
                                <th>Horário de Retirada</th>
                                <th>RA do aluno</th>
                                <th>Nome do aluno</th>
                                <th>Opções</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdraws && withdraws.filter((withdraw: Withdraw) => withdraw.state == 'APPROVED').map((cell) => (
                            <tr key={Number(cell.notebookSerialNumber)}>
                                <td>
                                    <div className='rounded-lg m-2 p-4 bg-cinza-claro text-center text-lg font-bold underline'>
                                        {cell.notebookSerialNumber}
                                    </div>
                                </td>
                                <td>
                                    <div className='flex items-center justify-center gap-2 rounded-l-lg p-4 bg-cinza-claro text-center text-lg'>
                                        <div className='w-3 h-3 bg-verde rounded-full'/>
                                        {cell.state}
                                    </div>
                                </td>
                                <td>
                                    <div className='p-4 bg-cinza-claro text-center text-lg'>
                                        {cell.initTime ? new Date(cell.initTime).getHours() + ':' + new Date(cell.initTime).getMinutes() : ''}
                                    </div>
                                </td>
                                
                                <td>
                                    <div className='p-4 bg-cinza-claro text-center text-lg'>
                                        {cell.studentRA}
                                    </div>
                                </td>
                                
                                <td>
                                    <div className='rounded-r-lg p-4 bg-cinza-claro text-center text-lg'>
                                        {cell.name}
                                    </div>
                                </td>
                                <td>
                                    <div className='flex justify-around rounded-lg m-1 p-4 bg-cinza-claro text-center text-lg font-bold underline'>
                                        <FaCheckCircle className="text-2xl text-verde" />
                                    </div>
                                </td>
                            </tr>
                            ))}
                            {withdraws && withdraws.filter((withdraw: Withdraw) => withdraw.state == "PENDING").map((cell) => (
                                <tr tabIndex={Number(cell.notebookSerialNumber)}>
                                    <td>
                                        <div className='rounded-lg m-2 p-4 bg-cinza-claro text-center text-lg font-bold underline'>
                                            {cell.notebookSerialNumber}
                                        </div>
                                    </td>
                                    <td colSpan={4}>
                                        <div className='flex items-center justify-center gap-2 rounded-lg p-4 bg-cinza-claro text-center text-lg'>
                                            <div className='w-3 h-3 bg-amarelo rounded-full'/>
                                            {cell.state}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex justify-around rounded-lg m-1 p-4 bg-cinza-claro text-center text-lg font-bold underline'>
                                            <FaCheckCircle onClick={()=>updateWithdraw(cell.notebookSerialNumber, true)} className="text-2xl text-verde hover:cursor-pointer" />
                                            <GoXCircleFill onClick={()=>updateWithdraw(cell.notebookSerialNumber, false)} className="text-2xl text-vermelho hover:cursor-pointer"/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {withdraws && withdraws.filter((withdraw: Withdraw) => withdraw.state == "INACTIVE").map((cell) => (
                                <tr tabIndex={Number(cell.notebookSerialNumber)}>
                                    <td>
                                        <div className='rounded-lg m-2 p-4 bg-cinza-claro text-center text-lg font-bold underline'>
                                            {cell.notebookSerialNumber}
                                        </div>
                                    </td>
                                    <td colSpan={5}>
                                        <div className='flex items-center justify-center gap-2 rounded-lg p-4 bg-cinza-claro text-center text-lg'>
                                            <div className='w-3 h-3 bg-vermelho rounded-full'/>
                                            {cell.state}
                                        </div>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <img src={logoMaua} alt="Logo da NoteMaua" />
        </section>

        {/* <!-- Main modal --> */}
        <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${modal ? "" : "hidden"} bg-[rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full`}>
            <div className="relative top-[25%] left-[35%] p-4 w-full max-w-lg max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-branco rounded-xl shadow border-[12px] border-cinza-escuro p-8">
                    {/* <!-- Modal header --> */}
                    <div>
                        <h3 className="text-2xl font-bold text-center mb-8">Alterar Senha</h3>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="flex flex-col gap-8">
                        <div className='flex flex-col'>
                            <label className='text-md'>Email</label>
                            <input onChange={(e)=>setEmail(e.target.value)} className="bg-gray-400 shadow-2xl p-2 rounded-xl" type="text" />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-md'>Antiga Senha</label>
                            <input onChange={(e) => setOldPassword(e.target.value)} className="bg-gray-400 shadow-2xl p-2 rounded-xl" type="text" />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-md'>Nova Senha</label>
                            <input onChange={(e)=>setNewPassword(e.target.value)} className="bg-gray-400 shadow-2xl p-2 rounded-xl" type="text" />
                        </div>
                    </div>
                    {/* <!-- Modal footer --> */}
                    <div className="flex justify-center items-center p-4 md:p-5">
                        <button type='button' className='bg-azul text-white font-semibold px-6 shadow-xl py-1 rounded-md' onClick={()=>postNewPassword(email, oldPassword, newPassword)}>Alterar Senha</button>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}