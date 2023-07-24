import {toast, ToastOptions} from "react-toastify";

const options: ToastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
}

export type ToastType = 'default' | 'success' | 'warning' | 'error'

export function showToast(msg: string, type: ToastType = 'default'): void {

    // window.alert(msg);

    switch (type) {
        case "default":
            toast(msg, options);
            break;
        case "success":
            toast.success(msg, options);
            break
        case "warning":
            toast.warning(msg, options);
            break;
        case "error":
            toast.error(msg, options);
    }
}