import { toast } from "react-toastify";

const useToast = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
    });
  };

  const showInfo = (message: string) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
  };
};

export default useToast;
