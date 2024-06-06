// InfoFlyer.jsx
import { Modal } from "flowbite-react";
import modaltheme from "../../Themes/Modaltheme";
import { IoIosClose } from "react-icons/io";

export default function InfoFlyer({ isOpen, onClose }) {
  return (
    <Modal
      className="modal-info"  
      show={isOpen}
      size="full"
      onClose={onClose}
      popup
    >
      <Modal.Body className=" flex flex-col items-center py-8  w-full px-0 text-[#1F1F1F]">
        <div className="w-full text-sm">
          <div>
            <p className="flex justify-start ml-4 py-2">LuLu Xpress</p>
          </div>
          <div className="w-full h-[2px] bg-[#696969]"></div>
        </div>
        <div className="py-6 ">
<ul className="text-center info-ul mb-12">
    <li> Dubai</li>
    <li>Emirates Co-Operative Society</li>
    <li>Midweek Promotion</li>
    <li>Till 9th june</li>
</ul>

        </div>
        <div className="absolute top-0 right-0 mt-3 mr-3">
          <div
            className="w-[24px] h-[24px] shadow-loginicon rounded-full flex justify-center items-center bg-white cursor-pointer"
            onClick={onClose}
          >
            <IoIosClose className="text-base" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}