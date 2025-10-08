import toast, { Toaster } from 'react-hot-toast';


export const  notify = () => toast('Here is your toast.');

export const sucessNotify = (message: string) => toast.success(message);

export const errorNotify = (message: string) => toast.error(message);
