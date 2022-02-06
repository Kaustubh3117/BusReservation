import { toast } from 'react-toastify';
import React, { useRef, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'primereact/toast';

export const ToastMessage =  (type, message) => {
  
//   const toast = useRef(null);
  
//   const showSuccess = () => {
//     toast.current.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
// }

  if (type === "SUCCESS") {
    toast.success(message);
  } else if (type === "ERROR") {
    toast.error(message);
  }
//   useEffect(()=>{
// showSuccess()
//   },[])
  // return(
  //   <>
  //      <Toast ref={toast} />
  //   </>
  // )
};
