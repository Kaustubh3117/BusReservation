import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastMessage =  (type, message) => {
  if (type === "SUCCESS") {
    toast.success(message);
  } else if (type === "ERROR") {
    toast.error(message);
  }
};
