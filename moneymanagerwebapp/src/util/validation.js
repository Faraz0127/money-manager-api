export const validateEmail = (email) => {
    // He first checks if the trimmed email is present, returning false if it isn't
    if (email.trim()) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    return false;
};

// export const validateEmail = (email) => {
//     // Check if the email exists and is not just empty spaces
//     if (!email || !email.trim()) {
//         return false;
//     }

//     // Standard regular expression for validating an email address
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     // Returns a boolean (true if valid, false if invalid)
//     return regex.test(email);
// };