/**
 * Utility functions for handling WhatsApp chat
 */

/**
 * Opens WhatsApp chat with a pre-filled greeting message
 * Works on both mobile and desktop devices
 * @param phoneNumber - The phone number to chat with (with or without country code)
 * @param message - Optional greeting message (defaults to a standard greeting)
 */
export const openWhatsAppChat = (phoneNumber: string, message?: string): void => {
  // Remove any existing whatsapp: prefix and clean the number
  const cleanNumber = phoneNumber.replace(/^whatsapp:/, '').replace(/^tel:/, '');
  
  // Remove any spaces, dashes, or other formatting from the phone number
  const formattedNumber = cleanNumber.replace(/[\s\-\(\)]/g, '');
  
  // Default greeting message if none provided
  const defaultMessage = "Namaste! 🙏 I'm interested in your divine puja services. Could you please provide more information about your ceremonies and availability?";
  
  const chatMessage = message || defaultMessage;
  
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(chatMessage);
  
  // Create the WhatsApp URL
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
  
  // Open WhatsApp
  try {
    window.open(whatsappUrl, '_blank');
    
    // Show a success message
    console.log(`Opening WhatsApp chat with ${formattedNumber}`);
  } catch (error) {
    console.error('Error opening WhatsApp:', error);
    
    // Fallback: try to copy the message to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(chatMessage).then(() => {
        console.log(`Message copied to clipboard: ${chatMessage}`);
        // You can add a toast notification here if needed
        // toast({
        //   title: "Message Copied",
        //   description: "WhatsApp message has been copied to clipboard",
        //   duration: 3000,
        // });
      });
    }
  }
};

/**
 * Opens WhatsApp chat with a specific service inquiry
 * @param phoneNumber - The phone number to chat with
 * @param serviceName - The specific service being inquired about
 */
export const openWhatsAppServiceInquiry = (phoneNumber: string, serviceName: string): void => {
  const message = `Namaste! 🙏 I'm interested in booking your ${serviceName} service. Could you please provide details about pricing, timing, and what's included in the ceremony? Thank you!`;
  openWhatsAppChat(phoneNumber, message);
};

/**
 * Opens WhatsApp chat for general consultation
 * @param phoneNumber - The phone number to chat with
 */
export const openWhatsAppConsultation = (phoneNumber: string): void => {
  const message = `Namaste! 🙏 I would like to schedule a free consultation about your puja services. I'm looking for guidance on the best ceremonies for my family's needs. When would be a good time to discuss this?`;
  openWhatsAppChat(phoneNumber, message);
};
