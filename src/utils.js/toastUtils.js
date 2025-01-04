
export const callToast = (toast, variant, message) => {
  toast({
    variant: variant,
    description: message,
  });
};