/**
 * Utility functions for handling phone calls
 */

/**
 * Initiates a phone call to the specified number
 * Works on both mobile and desktop devices
 * @param phoneNumber - The phone number to call (with or without tel: prefix)
 */
export const initiatePhoneCall = (phoneNumber: string): void => {
  // Remove any existing tel: prefix and clean the number
  const cleanNumber = phoneNumber.replace(/^tel:/, '');
  
  // Create the tel: URL
  const telUrl = `tel:${cleanNumber}`;
  
  // For desktop devices, we'll try to open the default phone app
  // For mobile devices, this will work natively
  try {
    window.open(telUrl, '_self');
    
    // Show a success message
    console.log(`Initiating call to ${cleanNumber}`);
  } catch (error) {
    // Fallback: try to copy to clipboard and show a message
    if (navigator.clipboard) {
      navigator.clipboard.writeText(cleanNumber).then(() => {
        console.log(`Phone number ${cleanNumber} copied to clipboard`);
        // You can add a toast notification here if needed
        // toast({
        //   title: "Phone Number Copied",
        //   description: `Phone number ${cleanNumber} has been copied to clipboard`,
        //   duration: 3000,
        // });
      });
    }
  }
};
