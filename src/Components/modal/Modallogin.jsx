import { Modal } from "flowbite-react";
import Loginpopup from "../../Pages/Authentication/Loginpopup";
import modaltheme from "../../Themes/Modaltheme";
import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import SignupPopup from "../../Pages/Authentication/SignupPopup";
import Otpverify from "../../Pages/Authentication/Otpverify";

export function ModalAuth({ openModal, setOpenModal, onClose, onLoginSuccess }) {
  const [AuthValue, setAuthValue] = useContext(AuthContext);
  const [mobileNumber, setMobileNumber] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
    onClose();
  };

  const handleLoginSuccess = (token) => {
    onLoginSuccess(token);
    handleCloseModal();
  };

  const handleSignupSuccess = () => {
    setAuthValue("login");
  };

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
          <Otpverify onClose={handleCloseModal} mobileNumber={mobileNumber} />
        ) : null}
      </Modal.Body>
    </Modal>
  );
}