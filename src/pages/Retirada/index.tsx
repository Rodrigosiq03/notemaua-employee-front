import logo from '../../assets/LogoNote.svg'
import logoMaua from '../../assets/LogoMaua.png'
import { FaSearch, FaCheckCircle } from 'react-icons/fa'
import { GoXCircleFill } from "react-icons/go";
import { RiRefreshFill } from "react-icons/ri";
import { useState } from 'react'

export default function Retirada(){
    const [modal, setModal] = useState(false)
    
    const json = [
        {
            "serie": "12345",
            "estado": "ativo",
            "retirada": "07:40",
            "RA": 'xx.xxxxx-x',
            "nome": "Rodrigo"
        },
        {
            "serie": "19283",
            "estado": "ativo",
            "retirada": "11:30",
            "RA": 'xx.xxxxx-x',
            "nome": "Luca"
        },
        {
            "serie": "57012",
            "estado": "ativo",
            "retirada": "12:20",
            "RA": 'xx.xxxxx-x',
            "nome": "Gabriel"
        },
        {
            "serie": "22398",
            "estado": "pendente"
        },
        {
            "serie": "22398",
            "estado": "inativo"
        },
    ]

    return (
        <>
        <section className='h-screen bg-azul-claro flex flex-col justify-around items-center gap-4 p-4'>
            <img src={logo} alt="Logo da NoteMaua" />
            <div className="bg-branco border-[12px] border-cinza-escuro rounded-3xl w-[80%] h-[70%] p-8">
                <div className='flex items-center'>
                    <div className='flex justify-center gap-4 w-full'>
                        <input className='bg-cinza-claro px-2 py-1 shadow-xl rounded-md' type="number" placeholder='Número de série' />
                        <button type='button' className='bg-verde font-semibold px-6 shadow-xl py-1 rounded-md' onClick={()=>setModal(true)}>Confirmar devolução</button>
                    </div>
                    <div>
                        <RiRefreshFill className='text-4xl hover:cursor-pointer'/>
                    </div>
                </div>

                <div className='w-full h-[1px] mt-8 mb-2 bg-black'/>
            
                <div className='flex items-center gap-4 my-6'>
                    <input type="text" className='bg-cinza-claro px-2 py-1 shadow-xl rounded-md' placeholder='Pesquisar'/>
                    <select className='w-32 h-8 rounded-md border-[1px] border-black'>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                    </select>
                    <button className='text-xl'><FaSearch/></button>
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
                            {json.map((cell) => (
                            <tr>
                                <td>
                                    <div className='rounded-lg m-2 p-4 bg-cinza-claro text-center text-lg font-bold underline'>
                                        {cell.serie}
                                    </div>
                                </td>

                                { cell.estado == 'ativo' ? 
                                <>
                                    <td>
                                        <div className='flex items-center justify-center gap-2 rounded-l-lg p-4 bg-cinza-claro text-center text-lg'>
                                            <div className='w-3 h-3 bg-verde rounded-full'/>
                                            {cell.estado}
                                        </div>
                                    </td>

                                    <td>
                                        <div className='p-4 bg-cinza-claro text-center text-lg'>
                                            {cell.retirada}
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div className='p-4 bg-cinza-claro text-center text-lg'>
                                            {cell.RA}
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div className='rounded-r-lg p-4 bg-cinza-claro text-center text-lg'>
                                            {cell.nome}
                                        </div>
                                    </td>

                                    <td>
                                        <div className='flex justify-around rounded-lg m-1 p-4 bg-cinza-claro text-center text-lg font-bold underline'>
                                            <FaCheckCircle className="text-2xl text-verde hover:cursor-pointer" />
                                            <GoXCircleFill className="text-2xl text-vermelho hover:cursor-pointer"/>
                                        </div>
                                    </td>
                                </>
                                    : cell.estado == 'pendente' ?
                                <>
                                    <td colSpan={4}>
                                        <div className='flex items-center justify-center gap-2 rounded-lg p-4 bg-cinza-claro text-center text-lg'>
                                            <div className='w-3 h-3 bg-amarelo rounded-full'/>
                                            {cell.estado}
                                        </div>
                                    </td>
                                    <td>
                                        <div className='flex justify-around rounded-lg m-1 p-4 bg-cinza-claro text-center text-lg font-bold underline'>
                                            <FaCheckCircle className="text-2xl text-verde hover:cursor-pointer" />
                                            <GoXCircleFill className="text-2xl text-vermelho hover:cursor-pointer"/>
                                        </div>
                                    </td>
                                </>
                                    :
                                <>
                                    <td colSpan={5}>
                                        <div className='flex items-center justify-center gap-2 rounded-lg p-4 bg-cinza-claro text-center text-lg'>
                                            <div className='w-3 h-3 bg-vermelho rounded-full'/>
                                            {cell.estado}
                                        </div>
                                    </td>
                                </>
                                }
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
        <div id="default-modal" tabIndex={-1} aria-hidden="true" className={`${modal ? "" : "hidden"} bg-[rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative top-[25%] left-[35%] p-4 w-full max-w-lg max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-branco rounded-xl shadow border-[12px] border-cinza-escuro p-8">
                    {/* <!-- Modal header --> */}
                    <div>
                        <h3 className="text-2xl font-bold text-center mb-8">
                            Confirmar Devolução
                        </h3>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="flex flex-col gap-8">
                        <div className='text-center border-y-2 py-8'>
                            <h3 className='text-2xl font-bold'>Número de Série: 12345</h3>
                            <h5>Horário da Retirada: <span className='font-bold'>7:40</span></h5>
                            <h5>Horário de Devolução: <span className='font-bold'>11:40</span></h5>
                        </div>

                        <div className='text-center'>
                            <h3>Gabriel da Silva Merola</h3>
                            <h5>13.01292-6@maua.br</h5>
                            <h5>RA: <span className='font-bold'>13.01292-6</span></h5>
                        </div>
                    </div>
                    {/* <!-- Modal footer --> */}
                    <div className="flex justify-center items-center p-4 md:p-5">
                        <button type='button' className='bg-verde font-semibold px-6 shadow-xl py-1 rounded-md' onClick={()=>setModal(false)}>Confirmar devolução</button>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}