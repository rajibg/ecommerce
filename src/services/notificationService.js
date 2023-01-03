import { toast } from 'react-toastify';

export const errorMsg = (msg) => {
    toast.error(msg ?? "Error Notification !");
}
export const successMsg = (msg) => {
    toast.success(msg ?? "Success Notification !");
}
export const warnMsg = (msg) => {
    toast.warn(msg ?? "Warn Notification !");
}

export const infoMsg = (msg) => {
    toast(msg ?? "Info Notification !");
}

export const notify = () => {
    toast("Default Notification !");

    toast.success("Success Notification !", {
        position: toast.POSITION.TOP_CENTER
    });

    toast.error("Error Notification !", {
        position: toast.POSITION.TOP_LEFT
    });

    toast.warn("Warning Notification !", {
        position: toast.POSITION.BOTTOM_LEFT
    });

    toast.info("Info Notification !", {
        position: toast.POSITION.BOTTOM_CENTER
    });

    toast("Custom Style Notification with css class!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'foo-bar'
    });
}; 