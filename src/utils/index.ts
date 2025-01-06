// Function to get the initials of a name (will used in fallback avatar)
export const getInitials = (name: string) => {
  if (!name) return "XYZ"; 
  
  const nameParts = name.split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials;
};
