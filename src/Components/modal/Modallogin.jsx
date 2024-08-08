import { Modal } from "flowbite-react";
import Loginpopup from "../../Pages/Authentication/Loginpopup";
import modaltheme from "../../Themes/Modaltheme";
import { useContext, useEffect, useState } from "react";
import { AuthContext, LoginContext } from "../../App";
import SignupPopup from "../../Pages/Authentication/SignupPopup";
import Otpverify from "../../Pages/Authentication/Otpverify";
import ResetPasswordModal from "../../Pages/Authentication/ResetPassword";
import ForgotPasswordModal from "../../Pages/Authentication/Forgetpassword";
import FavoriteModal from "./Favouratemodal";
import { useNavigate } from "react-router-dom";

export function ModalAuth({ openModal, setOpenModal, onClose, onLoginSuccess }) {
  const [AuthValue, setAuthValue] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [otpResponse, setOtpResponse] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setOpenModal(false);
    onClose();
  };

  const handleLoginSuccess = (token) => {
    onLoginSuccess(token);
    handleCloseModal();
  };

  const handleSignupSuccess = () => {
    setAuthValue("usertag");
  };

  const handleForgotPasswordSubmit = (submittedEmail, response) => {
    setEmail(submittedEmail);
    setOtpResponse(response);
    setAuthValue("otp");
  };

  const handleOtpSubmit = (otp, submittedEmail) => {
    console.log("OTP submitted:", otp);
    console.log("Email:", submittedEmail);
    setAuthValue("reset");
  };

  const handleResetPasswordSubmit = (newPassword) => {
    console.log("Reset password for email:", email, "New password:", newPassword);
    setAuthValue("login");
  };

  const handleFavoriteModalClose = () => {
    setAuthValue("login");
  };

  const handleFavoriteModalSubmit = () => {
    setAuthValue("login");
    setOpenModal(false);
    navigate('/');
  };

  useEffect(() => {
    const handleTokenUpdate = () => {
      const token = localStorage.getItem('usertoken');
      if (token) {
        setIsLoggedIn(true);
        onLoginSuccess(token);
      }
    };

    window.addEventListener('tokenUpdated', handleTokenUpdate);
    return () => {
      window.removeEventListener('tokenUpdated', handleTokenUpdate);
    };
  }, [setIsLoggedIn, onLoginSuccess]);

  return (
    <Modal
      theme={modaltheme}
      show={openModal}
      size="md"
      onClose={handleCloseModal}
      popup
    >
      <Modal.Body className="flex flex-col items-center py-3">
        {AuthValue === "login" ? (
          <Loginpopup onClose={onClose} onLoginSuccess={handleLoginSuccess} />
        ) : AuthValue === "signup" ? (
          <SignupPopup onClose={handleCloseModal} onSignupSuccess={handleSignupSuccess} />
        ) : AuthValue === "otp" ? (
          <Otpverify
            onClose={() => setAuthValue("login")}
            email={email}
            otpResponse={otpResponse}
            onSubmit={handleOtpSubmit}
            setOtpResponse={setOtpResponse}
            setEmail={setEmail}
          />
        ) : AuthValue === "forget" ? (
          <ForgotPasswordModal
            isOpen={true}
            onClose={() => setAuthValue("login")}
            onSubmit={handleForgotPasswordSubmit}
          />
        ) : AuthValue === "reset" ? (
          <ResetPasswordModal
            isOpen={true}
            onClose={() => setAuthValue("login")}
            onSubmit={handleResetPasswordSubmit}
            email={email}
          />
        ) : AuthValue === "usertag" ? (
          <FavoriteModal
            isOpen={true}
            onClose={handleFavoriteModalClose}
            onSubmit={handleFavoriteModalSubmit}
          />
        ) : null}
      </Modal.Body>
    </Modal>
  );
}