/**
 * Validates user email address
 * @param email string
 * @returns Object {type: boolean,  message: string}
 */
export const validateEmail = (email: string) => {
    const result = {
        type: false,
        message: '',
    };

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(email);

    if (email === '') {
        result.type = true;
        result.message = 'Email is required';
    } else if (!isValid) {
        result.type = true;
        result.message = 'Email is invalid';
    }

    return result;
};

/**
 * Validates user password. 
 * If argument level is missing or is 0 - validates only for empty string, else
 * additional validation is added for password length and if password contains digit
 * @param password string 
 * @param level number - optional
 * @returns Object {type: boolean,  message: string}
 */

export const validatePassword = (password: string, level: number = 0) => {
    const result = {
        type: false,
        message: '',
    };

    const digitReg = /(?=.*\d)/;

    if (password === '') {
        result.type = true;
        result.message = 'Password is required';
    } 

    if (level !== 0) {
        if (password.length < 6) {
            result.type = true;
            result.message = 'Password has to be at least 6 characters.';
            return result;
        } else if (!digitReg.test(password)) {
            result.type = true;
            result.message = 'Password has to have at least one digit.';
    
            return result;
        }
    }

    return result;
};

/**
 * Generates new name for uploaded files.
 * 
 * @param currentFileName string 
 * @returns string
 */
export const generateFileName  = (currentFileName: string) => {
    const splitted = currentFileName.split('.');
    const fileExt = splitted[splitted.length - 1];
    const timestamp = Date.now();
    const newName = `${timestamp}.${fileExt}`;

    return newName;
};