import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Prediction() {
  const [prediction, setPrediction] = useState(null);
  const [predictionProb, setPredictionProb] = useState(null);
  const [error, setError] = useState(null);

  const [file, setFile] = useState(null); // State to store the selected file

  const [formData, setFormData] = useState({
    gender: "",
    SeniorCitizen: "",
    Partner: "",
    Dependents: "",
    tenure: 0,
    PhoneService: "",
    MultipleLines: "",
    InternetService: "",
    OnlineSecurity: "",
    OnlineBackup: "",
    DeviceProtection: "",
    TechSupport: "",
    StreamingTV: "",
    StreamingMovies: "",
    Contract: "",
    PaperlessBilling: "",
    PaymentMethod: "",
    MonthlyCharges: 0,
    TotalCharges: 0,
  });

  const [dataType, setDataType] = useState("Multiple Data"); // New state to track data type

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
  };

  const calculateNumServices = (data) => {
    return [
      data.PhoneService,
      data.MultipleLines,
      data.InternetService,
      data.OnlineSecurity,
      data.OnlineBackup,
      data.DeviceProtection,
      data.TechSupport,
      data.StreamingTV,
      data.StreamingMovies,
    ].filter(
      (service) =>
        service === "Yes" || service === "DSL" || service === "Fiber optics"
    ).length;
  };

  const calculateChargesPerMonth = (data) => {
    if (data.tenure > 0) {
      return (data.TotalCharges / data.tenure).toFixed(2);
    }
    return 0;
  };

  const tenureGroup = (tenure) => {
    if (tenure <= 12) return 0;
    else if (tenure <= 24) return 1;
    else if (tenure <= 48) return 2;
    else if (tenure <= 60) return 3;
    else return 4;
  };

  const combinations_with_indices = {
    "Month-to-month_Electronic check": 2,
    "Month-to-month_Mailed check": 3,
    "Month-to-month_Bank transfer (automatic)": 0,
    "Month-to-month_Credit card (automatic)": 1,
    "One year_Electronic check": 6,
    "One year_Mailed check": 7,
    "One year_Bank transfer (automatic)": 4,
    "One year_Credit card (automatic)": 5,
    "Two year_Electronic check": 11,
    "Two year_Mailed check": 10,
    "Two year_Bank transfer (automatic)": 8,
    "Two year_Credit card (automatic)": 9,
  };

  const hasPhoneAndInternet = (phoneService, internetService) => {
    return phoneService === "Yes" && internetService !== "No" ? 1 : 0;
  };

  const navigate = useNavigate();

  // validate form if any field is empty
  const validateForm = (formData) => {
    for (const [key, value] of Object.entries(formData)) {
      if (value === "" || value === null || value === undefined) {
        alert(`Please fill in the all the field.`);
        return false; // Stop the function if any field is empty
      }
    }
    return true; // Return true if all fields are filled
  };

  const handlePredict = async () => {
    if (!validateForm(formData)) return;

    // Concatenate Contract and PaymentMethod
    const contractPaymentMethod = `${formData.Contract}_${formData.PaymentMethod}`;

    // Search for the concatenated string in combinations_with_indices
    const index = combinations_with_indices[contractPaymentMethod];

    // Calculate NumServices
    const tenureGroupValue = tenureGroup(formData.tenure);
    const numServices = calculateNumServices(formData);
    const chargesPerMonth = calculateChargesPerMonth(formData);
    const hasPhoneAndInternetValue = hasPhoneAndInternet(
      formData.PhoneService,
      formData.InternetService
    );

    // Create transformed data object
    const transformedData = {
      gender: formData.gender === "Male" ? 1 : 0,
      SeniorCitizen: formData.SeniorCitizen === "Yes" ? 1 : 0,
      Partner: formData.Partner === "Yes" ? 1 : 0,
      Dependents: formData.Dependents === "Yes" ? 1 : 0,
      tenure: Number(formData.tenure),
      PhoneService: formData.PhoneService === "Yes" ? 1 : 0,
      MultipleLines:
        formData.MultipleLines === "Yes"
          ? 1
          : formData.MultipleLines === "No Phone"
          ? 0
          : 0,
      InternetService:
        formData.InternetService === "DSL"
          ? 1
          : formData.InternetService === "Fiber optics"
          ? 2
          : 0,
      OnlineSecurity:
        formData.OnlineSecurity === "Yes"
          ? 1
          : formData.OnlineSecurity === "No Internet"
          ? 0
          : 0,
      OnlineBackup:
        formData.OnlineBackup === "Yes"
          ? 1
          : formData.OnlineBackup === "No Internet"
          ? 0
          : 0,
      DeviceProtection:
        formData.DeviceProtection === "Yes"
          ? 1
          : formData.DeviceProtection === "No Internet"
          ? 0
          : 0,
      TechSupport:
        formData.TechSupport === "Yes"
          ? 1
          : formData.TechSupport === "No Internet"
          ? 0
          : 0,
      StreamingTV:
        formData.StreamingTV === "Yes"
          ? 1
          : formData.StreamingTV === "No Internet"
          ? 0
          : 0,
      StreamingMovies:
        formData.StreamingMovies === "Yes"
          ? 1
          : formData.StreamingMovies === "No Internet"
          ? 0
          : 0,
      Contract:
        formData.Contract === "Month-to-month"
          ? 0
          : formData.Contract === "One year"
          ? 1
          : 2,
      PaperlessBilling: formData.PaperlessBilling === "Yes" ? 1 : 0,
      PaymentMethod:
        formData.PaymentMethod === "Bank transfer (automatic)"
          ? 0
          : formData.PaymentMethod === "Credit card (automatic)"
          ? 1
          : formData.PaymentMethod === "Electronic check"
          ? 2
          : formData.PaymentMethod === "Mailed check"
          ? 3
          : null,
      MonthlyCharges: Number(formData.MonthlyCharges),
      TotalCharges: Number(formData.TotalCharges),
      NumServices: numServices,
      ChargesPerMonth: Number(chargesPerMonth),
      TenureGroup: tenureGroupValue,
      HasPhoneAndInternet: Number(hasPhoneAndInternetValue),
      ContractPaymentInteraction: Number(index),
    };

    try {
      const response = await fetch("https://customer-churn-prediction-t24j.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setPrediction(result.prediction);
      setPredictionProb(result.prediction_prob);
      setError(null); // Reset error state

      // Navigate to the review page after the prediction is processed
      // navigate('/review');
    } catch (error) {
      setError("Error occurred while making prediction.");
      console.error("Error:", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Store the selected file in state
  };

  const handleMultiplePredict = async () => {
    if (!file) {
      setError("Please upload a file before predicting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to the form data

    try {
      const response = await fetch("https://customer-churn-prediction-t24j.onrender.com/multi-predict", {
        method: "POST",
        body: formData, // Send the form data containing the file
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setError(null);

      // Pass the response data to the Review page
      navigate("/review", {
        state: {
          predictions: result.predictions,
          prediction_probs: result.prediction_probs,
          graph: result.graph,
          pie: result.pie,
          finaldf: result.finaldf,
        },
      });
    } catch (error) {
      setError("Error occurred while uploading the file.");
      console.error("Error:", error);
    }
  };


const handleSampleDatasetPredict = async () => {
  try {
    /* 1️⃣ Fetch the CSV that lives in public/test/ChurnTestCSV.csv
          – anything inside React’s public folder is served statically,
            so “/test/…” resolves correctly in production too. */
    const csvResponse = await fetch("/test/ChurnTestCSV.csv");
    if (!csvResponse.ok) throw new Error("Could not load sample CSV");

    /* 2️⃣ Convert it to a Blob, then to a File so we can
          reuse the same /multi‑predict upload API. */
    const csvBlob = await csvResponse.blob();
    const sampleFile = new File([csvBlob], "ChurnTestCSV.csv", {
      type: "text/csv",
    });

    /* 3️⃣ Build the FormData exactly like a manual upload. */
    const formData = new FormData();
    formData.append("file", sampleFile);

    /* 4️⃣ Call your Flask endpoint. */
    const response = await fetch("https://customer-churn-prediction-t24j.onrender.com/multi-predict", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Network response was not ok");

    /* 5️⃣ Handle result & navigate. */
    const result = await response.json();
    setError(null);
    navigate("/review", {
      state: {
        predictions: result.predictions,
        prediction_probs: result.prediction_probs,
        graph: result.graph,
        pie: result.pie,
        finaldf: result.finaldf,
      },
    });
  } catch (err) {
    setError("Error occurred while running the sample prediction.");
    console.error("Sample‑predict error:", err);
  }
};


  return (
    <div className="container mt-4">

<form className="prediction-form row mb-5 px-2 py-1 py-md-4 border rounded shadow bg-light">
        {dataType === "Single Data" && (
          <>
            {/* Single Data Form */}
            <div className="row">
              {/* First half of the form for various inputs */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Senior Citizen:</label>
                  <select
                    name="SeniorCitizen"
                    value={formData.SeniorCitizen}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Partner:</label>
                  <select
                    name="Partner"
                    value={formData.Partner}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Dependents:</label>
                  <select
                    name="Dependents"
                    value={formData.Dependents}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tenure:</label>
                  <input
                    type="number"
                    name="tenure"
                    value={formData.tenure}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Service:</label>
                  <select
                    name="PhoneService"
                    value={formData.PhoneService}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Multiple Lines:</label>
                  <select
                    name="MultipleLines"
                    value={formData.MultipleLines}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No Phone">No Phone</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Internet Service:</label>
                  <select
                    name="InternetService"
                    value={formData.InternetService}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="DSL">DSL</option>
                    <option value="Fiber optics">Fiber optics</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Online Security:</label>
                  <select
                    name="OnlineSecurity"
                    value={formData.OnlineSecurity}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No Internet">No Internet</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Online Backup:</label>
                  <select
                    name="OnlineBackup"
                    value={formData.OnlineBackup}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No Internet">No Internet</option>
                  </select>
                </div>
              </div>

              {/* Second half of the form for other inputs */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Device Protection:</label>
                  <select
                    name="DeviceProtection"
                    value={formData.DeviceProtection}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No Internet">No Internet</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tech Support:</label>
                  <select
                    name="TechSupport"
                    value={formData.TechSupport}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No Internet">No Internet</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Streaming TV:</label>
                  <select
                    name="StreamingTV"
                    value={formData.StreamingTV}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No Internet">No Internet</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Streaming Movies:</label>
                  <select
                    name="StreamingMovies"
                    value={formData.StreamingMovies}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No Internet">No Internet</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Contract:</label>
                  <select
                    name="Contract"
                    value={formData.Contract}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Month-to-month">Month-to-month</option>
                    <option value="One year">One year</option>
                    <option value="Two year">Two year</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Paperless Billing:</label>
                  <select
                    name="PaperlessBilling"
                    value={formData.PaperlessBilling}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Payment Method:</label>
                  <select
                    name="PaymentMethod"
                    value={formData.PaymentMethod}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select the Option
                    </option>
                    <option value="Bank transfer (automatic)">
                      Bank transfer (automatic)
                    </option>
                    <option value="Credit card (automatic)">
                      Credit card (automatic)
                    </option>
                    <option value="Electronic check">Electronic check</option>
                    <option value="Mailed check">Mailed check</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Monthly Charges:</label>
                  <input
                    type="number"
                    name="MonthlyCharges"
                    value={formData.MonthlyCharges}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Total Charges:</label>
                  <input
                    type="number"
                    name="TotalCharges"
                    value={formData.TotalCharges}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12 text-center">
              <button
                type="button"
                onClick={handlePredict}
                className="btn btn-primary fw-bold"
                style={{ borderRadius: "20px", padding: "10px 20px" }}
              >
                Predict
              </button>
            </div>

            {prediction !== null && (
              <div className="mt-3">
                <h5>Prediction: {prediction === 1 ? "Churn" : "No Churn"}</h5>
                <p>Churn Probability: {(predictionProb * 100).toFixed(2)}%</p>
              </div>
            )}
            {error && <p className="text-danger">{error}</p>}
          </>
        )}
        {dataType === "Multiple Data" && (
          <>
     <div className="container">
  <h2 className="text-center text-primary fw-bold fs-3 mb-3">
    📤 Upload Your CSV File
  </h2>

<div className="d-flex justify-content-center mb-4">
  <div className="custom-file-upload position-relative">
    <input
      type="file"
      id="fileUpload"
      accept=".csv"
      onChange={handleFileChange}
      className="d-none"
    />
    <label
      htmlFor="fileUpload"
      className="btn btn-outline-secondary fw-bold px-4 py-2"
      style={{ borderRadius: "30px", cursor: "pointer", fontSize: "16px" }}
    >
      📁 Choose CSV File
    </label>
  </div>
</div>


  {/* Predict Button */}
  <div className="text-center mb-2">
    <button
      type="button"
      onClick={handleMultiplePredict}
      className="btn btn-success fw-bold mx-2"
      style={{ borderRadius: "30px", padding: "12px 30px", fontSize: "18px" }}
    >
      🔍 Predict from File
    </button>
  </div>

  {/* Separator */}
  <div className="text-center my-3">
    <hr style={{ width: "40%", margin: "auto" }} />
    <h5 className="text-muted fw-semibold my-3">OR</h5>
    <hr style={{ width: "40%", margin: "auto" }} />
  </div>

  {/* Sample Dataset Section */}
  <h4 className="text-center text-primary fw-bold fs-4 mb-3">
    🧪 Test with a Sample Dataset
  </h4>
  <p className="text-center text-muted mb-3">
    Don’t have a CSV file? Use our preloaded sample dataset for a quick demo.
  </p>

  <div className="text-center ">
   <button
  type="button"
  onClick={handleSampleDatasetPredict} // Ensure this function is defined
  className="btn btn-primary fw-bold"
  style={{ borderRadius: "30px", padding: "12px 25px", fontSize: "18px" }}
>
  📄 Use Sample Dataset
</button>

  </div>

  {/* Error Display */}
  {error && (
    <div className="alert alert-danger text-center fw-semibold">
      {error}
    </div>
  )}
</div>

          </>
        )}
      </form>
    </div>
  );
}

export default Prediction;
