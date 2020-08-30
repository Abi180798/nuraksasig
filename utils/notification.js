import cogoToast from "cogo-toast";

export default function ShowNotify(message, type, event) {
  const interval = 100;
  switch (type) {
    case "info":
      return setTimeout(() => {
        cogoToast.info(message, {
          position: "top-right",
        }).then(event)
      }, interval);
    case "error":
      return setTimeout(() => {
        cogoToast.error(message, { 
          position: "top-right",
        }).then(event)
      }, interval);
    case "success":
      return setTimeout(() => {
        cogoToast.success(message, {
          position: "top-right",
          hideAfter:1
        }).then(event)
      }, interval);
    case "loading":
      return setTimeout(() => {
        cogoToast.loading(message, {
          position: "top-right",
        }).then(event)
      }, interval);
    default:
      return setTimeout(() => {
        cogoToast.info(message, {
          position: "top-right",
          hideAfter:1
        }).then(event)
      }, interval);
  } 
}