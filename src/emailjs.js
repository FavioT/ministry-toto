import emailjs from "@emailjs/browser";

const CONFIG = Object.freeze({
  publicKey:  "TU_PUBLIC_KEY",
  serviceId:  "TU_SERVICE_ID",
  templateId: "TU_TEMPLATE_ID",
});

emailjs.init({ publicKey: CONFIG.publicKey });

export const sendContactEmail = ({ name, email, message }) => {
  const { promise, resolve, reject } = Promise.withResolvers();

  emailjs
    .send(CONFIG.serviceId, CONFIG.templateId, {
      from_name:  name,
      from_email: email,
      message,
      reply_to:   email,
    })
    .then(resolve)
    .catch(reject);

  return promise;
};
