import { Formik, Form } from "formik";
import css from "./SearchBox.module.css";
import carMakes from "../../data/makes.json";
import { useTranslation } from "react-i18next";
import CustomSelect from "../CustomSelect/CustomSelect";

const initialValues = {
  make: "",
  rentalPrice: "",
  mileageFrom: "",
  mileageTo: "",
};

const mileageOptions = Array.from({ length: 11 }, (_, i) => ({
  value: 3000 + i * 500,
  label: (3000 + i * 500).toString(),
}));

const priceOptions = Array.from({ length: 50 }, (_, i) => ({
  value: 30 + i * 10,
  label: (30 + i * 10).toString(),
}));

const SearchBox = ({ onSearch }) => {
  const { t } = useTranslation();

  const onSubmit = (values) => {
    const parsedValues = {
      ...values,
      rentalPrice: values.rentalPrice ? parseInt(values.rentalPrice, 10) : "",
      mileageFrom: values.mileageFrom ? parseInt(values.mileageFrom, 10) : "",
      mileageTo: values.mileageTo ? parseInt(values.mileageTo, 10) : "",
    };

    onSearch(parsedValues);
  };

  const onReset = (resetForm) => {
    resetForm();
    onSearch(initialValues);
  };

  const carMakeOptions = carMakes.map((make) => ({ value: make, label: make }));

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ resetForm }) => (
        <Form className={css.searchForm}>
          <div className={css.mainWrapper}>
            <div className={css.wrapper}>
              <CustomSelect
                label={t("carBrand")}
                name="make"
                options={carMakeOptions}
                placeholder={t("selectBrand")}
              />
              <CustomSelect
                label={t("pricePerHour")}
                name="rentalPrice"
                options={priceOptions}
                placeholder={t("selectPriceRange")}
                type="price"
              />
            </div>

            <div className={css.wrapper}>
              <CustomSelect
                label={t("mileageFrom")}
                name="mileageFrom"
                options={mileageOptions}
                placeholder={t("from")}
                type="mileage"
              />
              <CustomSelect
                label="&nbsp;"
                name="mileageTo"
                options={mileageOptions}
                placeholder={t("to")}
                type="mileage"
              />
            </div>
          </div>

          <div className={css.buttonGroup}>
            <button type="submit" className={css.searchButton}>
              {t("search")}
            </button>
            <button
              type="button"
              className={css.searchButton}
              onClick={() => onReset(resetForm)}
            >
              {t("reset")}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchBox;
