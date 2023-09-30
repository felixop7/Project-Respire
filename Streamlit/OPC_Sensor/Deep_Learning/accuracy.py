from logging import error
import streamlit as st
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd
import altair as alt

data_type = ['Test Data', 'Train Data']

lstm = [0.0212, 0.0253]
gru=[0.2249,0.2241]
cnn=[0.9434844255447388,0.9438334107398987]

def accuracy():
    st.sidebar.subheader("Choose Model ?")
    select_model1 = st.sidebar.checkbox('LSTM')
    select_model2 = st.sidebar.checkbox('GRU')
    select_model3 = st.sidebar.checkbox('CNN')

    models = list()
    arr = list()

    if select_model1:
        arr.append(lstm)
        models.append("LSTM")

    if select_model2:
        arr.append(gru) 
        models.append("GRU")

    if select_model3:
        arr.append(cnn)
        models.append("CNN")       

    errors = ['Accuracy on Test Data', 'Accuracy on Train Data']
    if len(models) > 0:
        st.header("Plot of Accuracy for different Models")
        chart_data = pd.DataFrame(np.array(arr), models, columns=errors)
        st.table(chart_data)
        st.bar_chart(chart_data, height=450)
    else:
        title = st.title("Welcome to Air Quality Result Analysis Web App")
        st.markdown("Comparative analysis on dataset of different machine learning models  and find out the best model having more accurate predictions of air quality .")
        st.markdown("The dataset is a collection of sensor data for 7 different locations of Malaysia which is collected through OPC sensors. These data are for 15 months that are from March 2019 to May 2020. These data are in CSV or Excel files. These data are saved in month wise format. These data have 57 columns and 35847 rows. These data are recorded for every hour.")
        st.markdown("For the sensor data, out of these 57 features(i.e. number of columns) we are taking 5 features as our input target and 7 as our output target. The input targets are Node value, date, time, external temperature and external RH. The output targets are NO2 ppb, O3 ppb, NO ppb, CO ppb, PM1, PM2.5 and PM10.We are processing the data before sending it to the network. ")
