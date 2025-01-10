import { useState } from "react";

interface CreateLaptopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateLaptopModal({ isOpen, onClose }: CreateLaptopModalProps) {
  const [serialNumber, setSerialNumber] = useState<string>("");

  if (!isOpen) {
    return null;
  }

  const handleSerialNumber = (value: string) => {
    if (/^\d*$/.test(value) && value.length <= 5) {
      setSerialNumber(value);
    }
  };

  // A implementação da request para criar o notebook foi iniciada no repository mas n foi terminada

  return (
    <div className="h-full w-full absolute bg-gray-600/40 z-50 flex justify-center items-center backdrop-blur-sm duration-200" onClick={onClose}>
      <div className="bg-[#e1e1e1] shadow-sm p-10 flex flex-col items-center gap-4 justify-center rounded-lg" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-xl font-bold">Número de Série</h1>
        <input value={serialNumber} type="text" className="bg-white px-4 text-center rounded-lg outline-none shadow-sm" placeholder="00000" onChange={(e) => handleSerialNumber(e.target.value)} />
        <div className="flex w-full justify-between">
          <button className="bg-red-500 shadow-sm rounded-lg w-[48%] hover:bg-red-400 duration-200" onClick={onClose}>Cancelar</button>
          <button className="bg-green-500 shadow-sm rounded-lg w-[48%] hover:bg-green-400 duration-200">Criar</button>
        </div>
      </div>
    </div>
  )
} 