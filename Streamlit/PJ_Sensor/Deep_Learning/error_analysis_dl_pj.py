import streamlit as st
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
import altair as alt
import math

lstm = [0.0645, 0.1585, 0.2383]
gru=[0.012723429128527641,0.049209967255592346,0.07397405803203583]
cnn=[0.033225543797016144,0.14912758767604828,0.1787092387676239]

def error_anaysis_dl_pj():
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
