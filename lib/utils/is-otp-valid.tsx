export const isOtpvalid = (value: string, type:'numeric'|'alphanumeric')=>{
    if (type==='numeric') {
        return /^[0-9]/.test(value)
    }
    return /^[0-9a-zA-Z]/.test(value)
}