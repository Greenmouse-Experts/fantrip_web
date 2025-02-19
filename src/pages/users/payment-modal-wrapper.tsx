import PaymentModal from "@/modules/users/reservation/components/payment/payment-modal";
import { useNavigate, useParams } from "react-router-dom";

const PaymentModalWrapper = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg md:w-3/5 shadow-lg">
                <button className="absolute top-24 bg-white p-3 rounded-full right-60" onClick={() => navigate("/user/guest-activity")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="black"
                        width="24"
                        height="24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 1 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <PaymentModal id={id ?? ''} />
            </div>
        </div>
    );
}

export default PaymentModalWrapper;