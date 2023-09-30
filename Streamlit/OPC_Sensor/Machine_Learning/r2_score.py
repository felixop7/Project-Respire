from logging import error
import streamlit as st
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
import altair as alt

data_type = ['Test Data', 'Train Data']

xgboost_list = [0.9310061554157045, 0.9315455074103038]
randomforest_list = [0.6025078002605496, 0.6024441613305692]
Linear_regression_list = [-577.7316385657471, 0.09500857284144938]
Lasso_list = [0.12819541953125432, 0.011271609923641084]
knn_list = [0.650844072704262, 0.7456257407339981]
svm_list = [-47.4020930609896, -36.36515905532197]
lstm = [0.9267, 0.9241]


def r2_score():
    st.sidebar.subheader("Choose Model ?")
    select_model1 = st.sidebar.checkbox('Xgboost')
    select_model2 = st.sidebar.checkbox('Random Forest')
    select_model3 = st.sidebar.checkbox('Linear Regression')
    select_model4 = st.sidebar.checkbox('Lasso')
    select_model6 = st.sidebar.checkbox('K Nearest Neighbour')

    models = list()
    arr = list()

    if select_model1:
        models.append(["Xgboost", xgboost_list[0], "Test Data"])
        models.append(["Xgboost", xgboost_list[1], "Train Data"])

    if select_model2:
        models.append(["Random Forest", randomforest_list[0], "Test Data"])
        models.append(["Random Forest", randomforest_list[1], "Train Data"])

    if select_model3:
        models.append(["Linear Regression",
                      Linear_regression_list[0], "Test Data"])
        models.append(["Linear Regression",
                      Linear_regression_list[1], "Train Data"])

    if select_model4:
        models.append(["Lasso", Lasso_list[0], "Test Data"])
        models.append(["Lasso", Lasso_list[1], "Train Data"])

    if select_model6:
        models.append(["KNN", knn_list[0], "Test Data"])
        models.append(["KNN", knn_list[1], "Train Data"])

    errors = ['R2 Score on Test', 'R2 Score on Train']
    if len(models) > 0:
        st.header("Plot for R2 Score different Models")
        x = list(range(0, len(models)))
        chart_data = pd.DataFrame(
            models, x, columns=['Models', 'R2 Score', 'Data Type'])
        chart_data
        st.table(chart_data)
        chart = alt.Chart(chart_data).mark_bar().encode(
            x='Data Type:O',
            y='R2 Score:Q',
            color='Data Type:N',
            column='Models:N'
        )
        st.altair_chart(chart)
    else:
        title = st.title("Welcome to Air Quality Result Analysis Web App by Team Zero Matters")
        st.markdown("Comparative analysis on dataset of different machine learning models  and find out the best model having more accurate predictions of air quality .")
        st.markdown("For reference purpose we have used the dataset(available online) which includes a collection of sensor data for 7 different locations of Malaysia which is collected through OPC sensors. These data are for 15 months that are from March 2019 to May 2020. These data are in CSV or Excel files. These data are saved in month wise format. These data have 57 columns and 35847 rows. These data are recorded for every hour.")
        st.markdown("For the sensor data, out of these 57 features(i.e. number of columns) we are taking 5 features as our input target and 7 as our output target. The input targets are Node value, date, time, external temperature and external RH. The output targets are NO2 ppb, O3 ppb, NO ppb, CO ppb, PM1, PM2.5 and PM10.We are processing the data before sending it to the network. ")
