import streamlit as st
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
import altair as alt
import math

lstm = [0.05459023267030716, 0.05129491165280342, 0.12296319007873535]
cnn=[0.00012385364971123636,0.004055249970406294,0.006716000847518444]
gru=[0.0006562928319908679,0.012329255230724812,0.02341914176940918]


def error_anaysis_dl():
    st.sidebar.subheader("Choose Model ?")
    select_model1 = st.sidebar.checkbox('LSTM')
    select_model2 = st.sidebar.checkbox('GRU')
    select_model3 = st.sidebar.checkbox('CNN')

    models = list()

    if select_model1:
        models.append("LSTM")

    if select_model2:
        models.append("GRU")

    if select_model3:
        models.append("CNN")        

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
            if e == "MSE" and m == "LSTM":
                l.append(lstm[0])
            if e == "MAE" and m == "LSTM":
                l.append(lstm[1])
            if e == "RMSE" and m == "LSTM":
                l.append(lstm[2])

            if e == "MSE" and m == "GRU":
                l.append(gru[0])
            if e == "MAE" and m == "GRU":
                l.append(gru[1])
            if e == "RMSE" and m == "GRU":
                l.append(gru[2])   


            if e == "MSE" and m == "CNN":
                l.append(cnn[0])
            if e == "MAE" and m == "CNN":
                l.append(cnn[1])
            if e == "RMSE" and m == "CNN":
                l.append(cnn[2])     

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
