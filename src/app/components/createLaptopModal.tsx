import { useContext, useEffect, useState } from "react";
import { WithdrawContext } from "../context/withdraw_context";

interface CreateLaptopModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "create" | "delete"
}

export default function CreateLaptopModal({ isOpen, onClose, type }: CreateLaptopModalProps) {
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const { createLaptop, deleteLaptop } = useContext(WithdrawContext);

  useEffect(() => {
    if (isOpen) {
      // Ativa a opacidade após a montagem
      setTimeout(() => setIsVisible(true), 10);
    } else {
      // Remove a opacidade antes de desmontar
      setIsVisible(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    // Garante que o componente só será desmontado após a transição
    return null;
  }

  const create = async () => {
    if(type === "create") {
      await createLaptop(serialNumber);
      onClose();
    } else if (type === "delete") {
      await deleteLaptop(serialNumber);
      onClose();
    }
  };

  const handleSerialNumber = (value: string) => {
    if (/^\d*$/.test(value) && value.length <= 5) {
      setSerialNumber(value);
    }
  };

  // A implementação da request para criar o notebook foi iniciada no repository mas n foi terminada

  return (
    <div className={`h-full w-full absolute ${isVisible ? 'opacity-100' : 'opacity-0'} bg-gray-600/40 transition-all z-50 flex justify-center items-center backdrop-blur-sm duration-300`} onClick={onClose}>
      <div className={`bg-[#e1e1e1] shadow-sm ${isVisible ? '-translate-y-8' : ''} p-10 flex flex-col items-center gap-4 justify-center transition-all duration-300 rounded-lg`} onClick={(e) => e.stopPropagation()}>
        <h1 className="text-xl font-bold">Número de Série</h1>
        <input value={serialNumber} type="text" className="bg-white px-4 text-center rounded-lg outline-none shadow-sm" placeholder="00000" onChange={(e) => handleSerialNumber(e.target.value)} />
        <div className="flex w-full justify-between">
          <button className="bg-red-500 text-white shadow-sm rounded-lg w-[48%] hover:bg-red-400 duration-200" onClick={onClose}>Cancelar</button>
          <button className="bg-green-500 text-white shadow-sm rounded-lg w-[48%] hover:bg-green-400 duration-200" onClick={create}>{type == "delete" ? "Deletar" : "Criar"}</button>
        </div>
      </div>
    </div>
  )
} 