import './loading.css';
import hhclogo from '../../assets/hhclogo.png'

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center loading-container">
                <img src={hhclogo} className="w-24 h-24 inline-block relative loading-logo" alt="HHC Logo" />
                <div className="text-white text-xl font-bold mt-4">Loading...</div>
            </div>
        </div>
    );
};

export default Loading;
