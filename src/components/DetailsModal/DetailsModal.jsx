import ReactModal from "react-modal";
import { useTranslation } from "react-i18next";
ReactModal.setAppElement("#root");
import css from "./DetailsModal.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect } from "react";
import { Icon } from "../Icon/Icon";

const DetailsModal = ({ isOpen, onRequestClose, advert }) => {
  const { t } = useTranslation();
  const {
    year,
    img,
    rentalPrice,
    make,
    model,
    address,
    rentalCompany,
    type,
    engineSize,
    fuelConsumption,
    description,
    rentalConditions,
    mileage,
    accessories,
    functionalities,
  } = advert;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Advert Details"
      className={css.modalContent}
      overlayClassName={css.ReactModal__Overlay}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <button className={css.closeButton} onClick={onRequestClose}>
        &times;
      </button>

      <div className={css.imageWrapper}>
        <LazyLoadImage
          className={css.svgCar}
          src={img}
          alt={make}
          effect="blur"
          threshold={500}
        />
      </div>
      <h2 className={css.title}>
        {make}&nbsp;{model},&nbsp;{year}
      </h2>

      <div className={css.mainWrap}>
        <p className={css.text}>
          <span className={css.mainText}>{t("rentalPrice")}: </span>
          {rentalPrice}
        </p>
        <p className={css.text}>
          <span className={css.mainText}>{t("type")}: </span>
          {type}
        </p>
        <p className={css.text}>
          <span className={css.mainText}>{t("engineSize")}: </span>
          {engineSize}
        </p>
        <p className={css.text}>
          <span className={css.mainText}>{t("fuelConsumption")}: </span>
          {fuelConsumption}
        </p>
        <p className={css.text}>
          <span className={css.mainText}>{t("mileage")}: </span>
          {mileage}
        </p>
        <p className={css.text}>
          <span className={css.mainText}>{t("description")}: </span>
          {description}
        </p>
        <p className={css.text}>
          <span className={css.mainText}>{t("rentalConditions")}: </span>
          {rentalConditions.replace(/\n/g, ". ") + "."}
        </p>
      </div>

      <div className={css.additionalWrap}>
        <h3 className={css.titleAdditional}>
          {t("accessoriesFunctionalities")}:{" "}
        </h3>
        <p className={css.text}>{accessories.join(". ") + "."}</p>
        <p className={css.text}>{functionalities.join(". ") + "."}</p>
      </div>

      <div className={css.additionalWrap}>
        <h3 className={css.titleAdditional}>{t("rentalInformation")}</h3>
        <p className={css.text}>
          <span className={css.mainText}>{t("rentalCompany")}: </span>
          {rentalCompany}
        </p>
        <p className={css.text}>
          <span className={css.mainText}>{t("address")}: </span>
          {address}
        </p>
      </div>

      <a className={css.btnRent} href="tel:+380730000000">
        {t("rentCar")} <Icon id="phone" width="20" height="20" />
      </a>
    </ReactModal>
  );
};

export default DetailsModal;
