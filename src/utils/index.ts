export function validatePassword(password: string): boolean {
    const minLength: number = 8;
    const maxLength: number = 20;

    // Regex patterns for different criteria
    const hasUppercase: RegExp = /[A-Z]/;
    const hasLowercase: RegExp = /[a-z]/;
    const hasDigit: RegExp = /\d/;
    const hasSpecial: RegExp = /[!@#$%^&*()-_+=]/;

    // Checking length and criteria
    if (
        password.length >= minLength &&
        password.length <= maxLength &&
        hasUppercase.test(password) &&
        hasLowercase.test(password) &&
        hasDigit.test(password) &&
        hasSpecial.test(password)
    ) {
        return true;
    } else {
        return false;
    }
}

export function validateEmail(email: string): boolean {
    const emailPattern: RegExp =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
}
