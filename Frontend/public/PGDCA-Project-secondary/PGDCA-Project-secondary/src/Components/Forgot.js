import "../styles/forgot.css";

function Forgot() {
    return (
        <>
            <div className="forgotpage">
                <div className="forgot-p">


                    <h2>Forgot Password</h2>

                    <form>
                        <label>Email</label>
                        <input type="email" className="email" placeholder="Enter Your Email" required />
                        <label>OTP</label>
                        <input type="number" className="otp" placeholder="Enter OTP" required />

                        <button type="button">Send OTP</button>
                        <button type="submit">Done</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Forgot;