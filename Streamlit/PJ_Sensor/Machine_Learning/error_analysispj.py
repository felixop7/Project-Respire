import streamlit as st
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
import altair as alt
import math

xgboost_list = [0.0002003255664180864,
                0.007388090488858885, 0.014153641454342638]
knn_list = [0.0002061790700894036, 0.006902047365753544, 0.014358936941480159]
linear_regression_list = [0.0005747420137439317,
                          0.01391719554120551, 0.023973777627731757]
lasso_list = [0.0008129141100830015, 0.01655494630161575, 0.028511648673533445]
random_list = [0.00029808595786701435,
               0.009558281283174914, 0.017265166024889953]


def error_anaysispj():
    st.sidebar.subheader("Choose Model ?")
    select_model1 = st.sidebar.checkbox('Xgboost')
    select_model2 = st.sidebar.checkbox('KNN')
    select_model3 = st.sidebar.checkbox('Linear Regression')
    select_model4 = st.sidebar.checkbox('Lasso')
    select_model5 = st.sidebar.checkbox('Random Forest')

    models = list()

    if select_model1:
        models.append("Xgboost")

    if select_model2:
        models.append("KNN")

    if select_model3:
        models.append("Linear Regression")

    if select_model4:
        models.append("Lasso")

    if select_model5:
        models.append("Random Forest")

    st.sidebar.subheader("Choose Value ?")

    select_error2 = st.sidebar.checkbox('Mean Squared Error (MSE)')
    select_error3 = st.sidebar.checkbox('Mean Absolute Error (MAE)')
    select_error4 = st.sidebar.checkbox('Root Mean Squared Error (RMSE)')

    errors = list()

    if select_error2:
        errors.append("MSE")

    if select_error3:
        errors.append("MAE")

    if select_error4:
        errors.append("RMSE")

    arr = list()
    for m in models:
        l = list()
        for e in errors:
            if e == "MSE" and m == "Xgboost":
                l.append(xgboost_list[0])
            if e == "MAE" and m == "Xgboost":
                l.append(xgboost_list[1])
            if e == "RMSE" and m == "Xgboost":
                l.append(xgboost_list[2])

            if e == "MSE" and m == "KNN":
                l.append(knn_list[0])
            if e == "MAE" and m == "KNN":
                l.append(knn_list[1])
            if e == "RMSE" and m == "KNN":
                l.append(knn_list[2])

            if e == "MSE" and m == "Linear Regression":
                l.append(linear_regression_list[0])
            if e == "MAE" and m == "Linear Regression":
                l.append(linear_regression_list[1])
            if e == "RMSE" and m == "Linear Regression":
                l.append(linear_regression_list[2])

            if e == "MSE" and m == "Lasso":
                l.append(lasso_list[0])
            if e == "MAE" and m == "Lasso":
                l.append(lasso_list[1])
            if e == "RMSE" and m == "Lasso":
                l.append(lasso_list[2])

            if e == "MSE" and m == "Random Forest":
                l.append(random_list[0])
            if e == "MAE" and m == "Random Forest":
                l.append(random_list[1])
            if e == "RMSE" and m == "Random Forest":
                l.append(random_list[2])

        arr.append(l)

    temp = np.array(arr).transpose()

    if len(models) > 0 and len(errors) > 0:
        st.header("Plot for Different Errors for different Models")
        chart_data = pd.DataFrame(temp, errors, columns=models)
        st.table(chart_data)
        st.line_chart(chart_data, height=450)
    else:
        title = st.title("Welcome to Air Quality Result Analysis Web App by Team Zero Matters")
        st.markdown("Comparative analysis on dataset of different machine learning models  and find out the best model having more accurate predictions of air quality .")
        st.markdown("For reference purpose we have used the dataset(available online) which includes a collection of sensor data for 7 different locations of Malaysia which is collected through OPC sensors. These data are for 15 months that are from March 2019 to May 2020. These data are in CSV or Excel files. These data are saved in month wise format. These data have 57 columns and 35847 rows. These data are recorded for every hour.")
        st.markdown("For the sensor data, out of these 57 features(i.e. number of columns) we are taking 5 features as our input target and 7 as our output target. The input targets are Node value, date, time, external temperature and external RH. The output targets are NO2 ppb, O3 ppb, NO ppb, CO ppb, PM1, PM2.5 and PM10.We are processing the data before sending it to the network. ")
