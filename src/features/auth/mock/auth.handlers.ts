import resetPasswordHandlers from "../reset-password/mock/reset-password.handlers";
import signInHandler from "../sign-in/mock/sign-in.handlers";
import meHandlers from "../me/mock/me.handlers";

const allAuthHandlers = [ ...resetPasswordHandlers, ...signInHandler, ...meHandlers ]

export default allAuthHandlers