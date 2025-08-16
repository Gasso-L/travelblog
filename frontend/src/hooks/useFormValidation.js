import { getFieldFeedback } from "../utility/formUtils";
import { useState } from "react";

export const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [dirty, setDirty] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setDirty((prev) => ({ ...prev, [name]: true }));

    const feedback = getFieldFeedback(name, value, {
      password: values.password,
      dirty,
    });

    setErrors((prev) => ({ ...prev, [name]: feedback }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isFieldValid = (name) => {
    return !getFieldFeedback(name, values[name], {
      password: values.password,
      dirty,
    });
  };

  const isFormValid = () => {
    return Object.keys(initialValues).every((key) => isFieldValid(key));
  };

  const isModifiedFieldValid = () => {
    return Object.keys(dirty).every((key) => isFieldValid(key));
  };

  const resetForm = (newValues = initialValues) => {
    setValues(newValues);
    setTouched({});
    setErrors({});
    setDirty({});
  };

  return {
    values,
    setValues,
    handleChange,
    handleBlur,
    touched,
    errors,
    isFieldValid,
    getFeedback: (name) =>
      getFieldFeedback(name, values[name], {
        password: values.password,
        dirty,
      }),
    isFormValid,
    resetForm,
    dirty,
    isModifiedFieldValid,
  };
};
