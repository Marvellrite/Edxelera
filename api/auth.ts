const ServerURL = process.env.NEXT_PUBLIC_SERVER_URL;


export const getOtp = async(otp:string)=>{

    const response = await fetch(`${ServerURL}/auth/otp`, {
        method: 'POST',
        body: JSON.stringify({ otp }),
        headers: { 'Content-Type':'application/json'}
     });

    if(!response.ok) throw new Error('Unable to fetch OTP')
}