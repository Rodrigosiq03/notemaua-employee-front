import logo from '../../assets/LogoNote.svg'
import logoMaua from '../../assets/LogoMaua.png'
import microsoftLogo from '../../assets/microsoftLogo.jpg'
import { ToastContainer, toast } from "react-toastify";
import { PublicClientApplication } from '@azure/msal-browser';

export default function MicrosoftLogin() {
  const msalConfig = {
    auth: {
      clientId: 'SEU_CLIENT_ID',
      // authority: 'https://login.microsoftonline.com/common',
      redirectUri: 'http://localhost:3000',
    },
  };

  const loginRequest = {
    scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read'],
  };

  const msalInstance = new PublicClientApplication(msalConfig)
  
  const handleLogin = async () => {
    try {
      const response = await msalInstance.loginPopup(loginRequest);
      toast.success(`Welcome, ${response.account.username}!`);
      console.log(response);
    } catch (error) {
      toast.error("Login failed!");
      console.error(error);
    }
  };


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
            <button onClick={handleLogin} className='text-xl font-semibold duration-200 hover:underline'>
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