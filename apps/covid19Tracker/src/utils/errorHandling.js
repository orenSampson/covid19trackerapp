import { Notify } from "quasar";

export const notifyError = (...args) => {
  if (args.length > 1) {
    return;
  }
  if (args.length === 1) {
    const err = args[0];

    if (err && err.response && err.response.data && err.response.data.message) {
      notifyMessage(err.response.data.message);
    } else {
      notifyGeneralError();
    }
  } else {
    notifyGeneralError();
  }
};

export const notifyMessage = message => {
  Notify.create({
    message: message,
    color: "primary"
  });
};

const notifyGeneralError = () => {
  Notify.create({
    message: "Error, Please try again later",
    color: "primary"
  });
};
