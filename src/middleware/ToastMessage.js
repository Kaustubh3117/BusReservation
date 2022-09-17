import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastMessage =  (type, message) => {
  if (type === "SUCCESS") {
    toast.success(message);
  } else if (type === "ERROR") {
    toast.error(message);
  }
  else if(type === "WARNING"){
    toast.warning(message);
  }
  else if(type === "INFO"){
    toast.info(message);
  }
};
