import whatsApp from '../../../assets/images/whatsApp.png';

export const WhatsAppIcon = ({ size = 14 }) => {
  return (
    <div className={`relative flex justify-center items-center w-${size} h-${size}`}>
      <img
        src={whatsApp}
        alt="whatsApp"
        className="absolute w-full h-full object-contain object-center"
      />
    </div>
  );
};
