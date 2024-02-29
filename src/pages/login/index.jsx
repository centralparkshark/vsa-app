import { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../../firebase-config";
import Loading from "../../components/loading/Loading";

const AuthScreen = () => {
  const [loading, setLoading] = useState(false);
  const [initForm, setInitForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => { 
    setInitForm({
      ...initForm,
      [e.target.name]: e.target.value
    })
  }; 
      
  const handleAuth = async () => {
    try {
        setLoading(true)
        await signInWithEmailAndPassword(auth, initForm.email, initForm.password)
        setLoading(false)
    } catch(err) {
        const msg = err.code.split('auth/')[1].split('-').join(' ')
        console.log('Error signing in:', msg)
        setLoading(false)
    }
  };
  
  if (loading) {
    return <Loading />
  }
  

  return (
    <div className="bento justify-center items-center h-screen">
        <div className="box shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                <input type="email" id="email" name="email" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400" placeholder="Enter your email" defaultValue={initForm.email} onChange={handleChange}></input>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400" placeholder="Enter your password" defaultValue={initForm.password} onChange={handleChange}></input>
            </div>
            <button 
                disabled={loading || !initForm.email.trim() || !initForm.password.trim()} 
                onClick={handleAuth} 
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200 disabled:bg-gray-400"
                >Login</button>
        </form> 
    </div>
    </div>
  )
}

export default AuthScreen;