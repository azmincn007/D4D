import { Modal } from "flowbite-react";
import Loginpopup from "../../Pages/Authentication/Loginpopup";
import modaltheme from "../../Themes/Modaltheme";
import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import SignupPopup from "../../Pages/Authentication/SignupPopup";
import Otpverify from "../../Pages/Authentication/Otpverify";

export function ModalAuth({ openModal, setOpenModal, onClose }) {
  const [AuthValue, setAuthValue] = useContext(AuthContext);
  const [mobileNumber, setMobileNumber] = useState("");

  console.log(AuthValue);

  const handleCloseModal = () => {
    setOpenModal(false);
    onClose();
  };

  const handleSubmit = (mobile) => {
    setMobileNumber(mobile);
    setAuthValue("otp");
  };

  return (
    <Modal theme={modaltheme} show={openModal} size="md" onClose={handleCloseModal} popup>
      <Modal.Body className=" flex flex-col items-center w-[500px] py-3 ">
        {AuthValue === "login" ? (
          <Loginpopup onClose={handleCloseModal} />
        ) : AuthValue === "signup" ? (
          <SignupPopup onClose={handleCloseModal} onSubmit={handleSubmit} />
        ) : AuthValue === "otp" ? (
          <Otpverify onClose={handleCloseModal} mobileNumber={mobileNumber} />
        ) : null}
      </Modal.Body>
    </Modal>
  );
}

