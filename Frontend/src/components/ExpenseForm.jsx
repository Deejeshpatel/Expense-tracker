import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addExpense } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./ExpenseForm.css";

const ExpenseForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    amount: "",
    description: "",
    date: "",
    category: "",
    paymentMethod: "cash",
  };

  const validationSchema = Yup.object({
    amount: Yup.number().required("Amount is required").positive(),
    description: Yup.string().required("Description is required"),
    date: Yup.date().required("Date is required"),
    category: Yup.string().required("Category is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await addExpense(values);
      resetForm();
      navigate("/");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, touched, errors, values }) => (
        <Form className="expense-form">
          <div className="form-container">
            <h2 className="form-title">Add Expense</h2>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <Field
                id="amount"
                name="amount"
                type="number"
                className={`form-input ${
                  touched.amount && errors.amount ? "form-error" : ""
                }`}
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                id="description"
                name="description"
                className={`form-input ${
                  touched.description && errors.description ? "form-error" : ""
                }`}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <Field
                id="date"
                name="date"
                type="date"
                className={`form-input ${
                  touched.date && errors.date ? "form-error" : ""
                }`}
              />
              <ErrorMessage
                name="date"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <Field
                id="category"
                name="category"
                className={`form-input ${
                  touched.category && errors.category ? "form-error" : ""
                }`}
              />
              <ErrorMessage
                name="category"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <p>Payment Method</p>
              <div className="radio-group">
                <label>
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={values.paymentMethod === "cash"}
                    onChange={(e) =>
                      setFieldValue("paymentMethod", e.target.value)
                    }
                  />
                  Cash
                </label>
                <label>
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={values.paymentMethod === "credit"}
                    onChange={(e) =>
                      setFieldValue("paymentMethod", e.target.value)
                    }
                  />
                  Credit
                </label>
              </div>
            </div>
            <button type="submit" className="submit-button">
              Add Expense
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ExpenseForm;
