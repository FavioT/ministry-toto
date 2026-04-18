import emailjs from "@emailjs/browser";

// ─────────────────────────────────────────────────────────────────
//  Reemplaza estos valores con los de tu cuenta de EmailJS:
//  https://dashboard.emailjs.com/admin
// ─────────────────────────────────────────────────────────────────
const PUBLIC_KEY   = "TU_PUBLIC_KEY";    // Account → API Keys
const SERVICE_ID   = "TU_SERVICE_ID";   // Email Services → Service ID
const TEMPLATE_ID  = "TU_TEMPLATE_ID";  // Email Templates → Template ID

// Inicializar EmailJS una sola vez
emailjs.init({ publicKey: PUBLIC_KEY });

/**
 * Envía el formulario de contacto via EmailJS.
 * @param {{ name: string, email: string, message: string }} data
 * @returns {Promise}
 */
export function sendContactEmail({ name, email, message }) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    from_name: name,
    from_email: email,
    message,
    reply_to: email,
  });
}

