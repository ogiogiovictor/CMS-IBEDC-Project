import { toast } from "react-toastify";

export const notify = (status, msg) => {
  if (status === "success") {
    toast.success(msg);
  }
  if (status === "info") {
    toast.info(msg);
  }
  if (status === "warn") {
    toast.warn(msg);
  }
  if (status === "error") {
    toast.error(msg);
  }
  if (status === "default") {
    toast(msg);
  }
};
