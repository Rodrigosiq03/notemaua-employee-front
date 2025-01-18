import logo from '../../assets/LogoNote.svg'
import logoMaua from '../../assets/LogoMaua.png'
import microsoftLogo from '../../assets/microsoftLogo.jpg'
import { ToastContainer, toast } from "react-toastify";
import { useMsal } from '@azure/msal-react';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth_context';

export default function MicrosoftLogin() {
  const { instance } = useMsal(); // Obtém a instância do MSAL do contexto
  const { createUserOAuth } = useContext(AuthContext)

  const loginRequest = {
    scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
  };

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
      
    } catch (error) {
      toast.error("Login failed!");
      console.error(error);
    }
  };


  useEffect(() => {
    async function handleRedirectPromise() {
      const result = await instance.handleRedirectPromise()
      if (result) {
        const accessToken = result.accessToken;
        const backendToken = await createUserOAuth(accessToken);
        if (!backendToken) {
          toast.error("Login failed!");
          throw new Error("Login failed")
        }
        toast.success(`Welcome, ${result.account.username}!`);
        console.log(result);
      }
    }
    handleRedirectPromise()
  }, [instance, createUserOAuth])


  return (
    <section className='h-screen bg-azul-claro flex flex-col'>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <div className="flex justify-center items-center h-[90%]">
        <div className="flex flex-col justify-center p-12 bg-branco border-[12px] border-cinza-escuro rounded-3xl w-[30%]">
          <div className='flex justify-center'>
            <img src={logo} alt="Logo da NoteMaua" />
          </div>
          <div className='flex flex-col mt-12 items-center justify-center'>
            <img src={microsoftLogo} alt="Microsoft" />
            <button onClick={handleLogin} className='bg-azul text-branco text-xl font-semibold px-3 py-1 rounded-md hover:shadow-lg mt-4'>
              Entrar com Microsoft
            </button>
          </div>
        </div>
      </div>
      <div className='flex justify-center mb-4'>
        <img src={logoMaua} alt="Logo da Maua" />
      </div>
    </section>
  )
}