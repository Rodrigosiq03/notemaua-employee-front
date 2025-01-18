import logo from '../../assets/LogoNote.svg'
import logoMaua from '../../assets/LogoMaua.png'
import { FaSearch, FaCheckCircle, FaDoorOpen } from 'react-icons/fa'
import { GoXCircleFill } from "react-icons/go";
import { RiRefreshFill } from "react-icons/ri";
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { WithdrawContext } from '../../context/withdraw_context';
import { Withdraw } from '../../../@clean/shared/domain/entities/withdraw';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateLaptopModal from '../../components/createLaptopModal';

export default function Retirada(){
    const [serial, setSerial] = useState('')
    const [filter, setFilter] = useState('')
    const [typeFilter, setTypeFilter] = useState('')
    const [typeModal, setTypeModal] = useState<'create'|'delete'>('create')

    const { setWithdraws, getAllWithdraws, updateWithdrawState, finishWithdraw, withdraws } = useContext(WithdrawContext)

    const [isCreateLaptopOpen, setIsCreateLaptopOpen] = useState(false)

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

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) navigate('/')
    }, [])

    function getAll() {
        getAllWithdraws()

        if(!withdraws){
            return toast.error("Erro ao carregar retiradas", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        } else {
            return toast.success("Retiradas carregadas com sucesso", {
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

    async function updateWithdraw(serialNumber: string, state: boolean){
        const response = await updateWithdrawState(serialNumber, state)
        if(response){
            if(state){
                getAll()
                return toast.success("Retirada confirmada com sucesso", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
            } else{
                getAll()
                return toast.warn("Retirada cancelada com sucesso", {
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

    const toggleCreateLaptop = (type:"delete"|"create") => {
        setTypeModal(type)
        setIsCreateLaptopOpen(!isCreateLaptopOpen)
    }

    function Logout(){
        localStorage.removeItem('token')
        navigate('/')
    }

    // function Verify(){
    //     const timeNow = new Date().getTime()
    //     const timeLogin = localStorage.getItem('timeLogin')
    //     if(timeLogin){
    //         const time = new Date(Number(timeLogin)).getTime()
    //         if((timeNow - time) > (7*24*60*60*1000)){
    //             localStorage.removeItem('token')
    //             navigate('/')
    //         }
    //     }
    // }

    useEffect(() => {
        // const token = localStorage.getItem('token')
        // if(!isLogged && !token) navigate('/')

        // Verify()
        getAll()
    }, [])

    return (
        <>
            <CreateLaptopModal isOpen={isCreateLaptopOpen} onClose={()=>toggleCreateLaptop(typeModal)} type={typeModal} />
        <section className='h-screen bg-azul-claro flex flex-col justify-around items-center gap-4 p-4'>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <img src={logo} alt="Logo da NoteMaua" />
            <div className="bg-branco border-[12px] border-cinza-escuro rounded-3xl w-[80%] h-[70%] p-8">
                <div className='flex justify-between items-center'>
                    <div className='flex gap-4'>
                        <button onClick={()=>Logout()} className='flex items-center gap-2 bg-red-500 px-4 py-1 rounded-lg text-white hover:bg-red-400'>Sair<FaDoorOpen/></button>
                        {/* <button onClick={()=>setModal(true)} className='w-32 bg-azul flex items-center gap-2 px-4 py-1 rounded-lg text-white hover:bg-blue-500'>Alterar Senha</button> */}
                    </div>
                    {/* <div className='flex justify-center gap-4 w-full'>
                        <input onChange={(e)=>setSerial(e.target.value)} className='bg-cinza-claro px-2 py-1 shadow-xl rounded-md' type="number" placeholder='Número de série' value={serial} />
                        <button type='button' className='bg-verde hover:bg-green-400 font-semibold px-6 shadow-xl py-1 rounded-md' onClick={()=>endWithdraw(serial)}>Confirmar devolução</button>
                    </div> */}
                    <div>
                        <RiRefreshFill onClick={()=>getAll()} className='text-4xl hover:cursor-pointer'/>
                    </div>
                </div>

                <div className='w-full h-[1px] mt-8 mb-2 bg-black'/>
            
                <div className='flex justify-between items-center gap-2 my-6 flex-wrap'>
                    <div className='flex items-center gap-4'>
                        <input onChange={(e)=>setFilter(e.target.value)} type="text" className='bg-cinza-claro px-2 py-1 shadow-xl rounded-md' placeholder='Pesquisar'/>
                        <select onChange={(e)=>setTypeFilter(e.target.value)} className='w-32 h-8 rounded-md border-[1px] border-black text-center'>
                            <option value="">-- Escolha --</option>
                            <option value="ra">Ra do Aluno</option>
                            <option value="serialNumber">Número de série</option>
                        </select>
                            <button onClick={() => filterWithdraws(filter, typeFilter)} className='text-xl'><FaSearch /></button>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={()=>toggleCreateLaptop("create")} className='h-8 px-3 flex items-center justify-center bg-green-500 text-white rounded-lg hover:bg-green-600 duration-200 hover:cursor-pointer'>Adicionar Notebook</button>
                        <button onClick={()=>toggleCreateLaptop("delete")} className='h-8 px-3 flex items-center justify-center bg-red-500 text-white rounded-lg hover:bg-red-600 duration-200 hover:cursor-pointer'>Deletar Notebook</button>
                    </div>
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
                                        <FaCheckCircle onClick={()=>endWithdraw(cell.notebookSerialNumber)} className="text-2xl text-verde hover:cursor-pointer" />
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
        </>
    )
}