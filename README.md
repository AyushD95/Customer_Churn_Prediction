## ⚙️ Working

The Customer Churn Prediction system follows a complete machine learning pipeline with the following modules:

### 1. 📥 Data Collection
- **Input:** Raw CSV file containing customer records (e.g., gender, tenure, contract type, monthly charges, churn label).
- **Tools Used:** `pandas`
- **Description:** Loads structured data for further analysis and model training.

### 2. 🧹 Data Preprocessing
- **Tasks:** 
  - Handling missing values
  - Label encoding (e.g., `LabelEncoder` for binary categories)
  - One-hot encoding for multi-category features
  - Feature scaling using `StandardScaler`
- **Tools Used:** `pandas`, `sklearn.preprocessing`, `numpy`
- **Purpose:** Ensures uniformity in feature format and scales values for optimal model performance.

### 3. 📊 Exploratory Data Analysis (EDA)
- **Tasks:** 
  - Visualizations of churn distribution, correlation matrix, bar plots, histograms
  - Identifying feature importance and outliers
- **Tools Used:** `matplotlib`, `seaborn`
- **Purpose:** Gains insights into patterns influencing churn behavior.

### 4. 🧠 Feature Selection
- **Techniques:** 
  - Correlation filtering
  - Recursive Feature Elimination (RFE)
  - Mutual Information Score
- **Tools Used:** `sklearn.feature_selection`
- **Purpose:** Reduces dimensionality and keeps only relevant features to avoid overfitting.

### 5. 🏗️ Model Building
- **Algorithms:** 
  - Logistic Regression
  - Random Forest Classifier
  - Decision Tree Classifier
  - Support Vector Machine (SVM)
- **Tools Used:** `sklearn.linear_model`, `sklearn.ensemble`, `sklearn.tree`, `sklearn.svm`
- **Approach:** Train-test split (e.g., 80-20), cross-validation to avoid model bias.

### 6. 📈 Model Evaluation
- **Metrics:**
  - Accuracy
  - Precision
  - Recall
  - F1-score
  - Confusion Matrix
  - ROC-AUC Curve
- **Tools Used:** `sklearn.metrics`, `matplotlib`
- **Purpose:** Assesses model performance and identifies areas for improvement.

### 7. 🔮 Prediction
- **Input:** New customer data (structured)
- **Output:** Probability of churn (0 or 1)
- **Tools Used:** Trained ML model
- **Use Case:** Helps businesses proactively retain high-risk customers.

### 8. 📊 Visualization & Insights
- **Visuals Generated:**
  - Feature importance
  - ROC Curve
  - Heatmaps and distribution plots
- **Tools Used:** `matplotlib`, `seaborn`
- **Purpose:** Provides intuitive understanding for stakeholders and aids in decision-making.

