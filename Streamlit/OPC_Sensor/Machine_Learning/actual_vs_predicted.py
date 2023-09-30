from numpy import loadtxt
import streamlit as st
import numpy as np
import pandas as pd
import altair as alt
n = 25

particle = ['NO2', 'O3', 'NO', 'CO', 'PM1', 'PM2.5', 'PM10']
particle_loc = ['NO2', 'O3', 'NO', 'CO', 'PM1', 'PM2', 'PM10']


def actual_vs_predicted():
    select_model = st.sidebar.radio(
        "Choose Model ?", ('Xgboost', 'Randomforest', 'KNN','Linear Regression','Lasso'))

    select_particle = st.sidebar.radio(
        "Choose Particle ?", ('NO2', 'O3', 'NO', 'CO', 'PM1', 'PM2.5', 'PM10'))

    if select_particle == 'NO2':
        loc = 0
    if select_particle == 'O3':
        loc = 1
    if select_particle == 'NO':
        loc = 2

    if select_particle == 'CO':
        loc = 3

    if select_particle == 'PM1':
        loc = 4

    if select_particle == 'PM2.5':
        loc = 5

    if select_particle == 'PM10':
        loc = 6

    if select_model == 'Xgboost':
        get_xgboost(loc)
    if select_model == 'KNN':
        get_knn(loc)

    if select_model == 'Randomforest':
        get_randomforest(loc)

    if select_model=='Linear Regression':
        get_linear_regression(loc)

    if select_model=='Lasso':
        get_lasso(loc)        


def get_knn(loc):
    knn_y_test = pd.read_excel('Models_OPC/knn_y_test.xlsx')
    knn_y_test_pred = pd.read_excel('Models_OPC/knn_y_test_pred.xlsx')
    knn_y_test=knn_y_test[['DATE',particle_loc[loc],'Data']]
    knn_y_test_pred=knn_y_test_pred[['DATE',particle_loc[loc],'Data']]

    frames = [knn_y_test,knn_y_test_pred]

    results = pd.concat(frames)
    st.dataframe=frames

    chart = alt.Chart(results.reset_index()).mark_line().encode(
        x='DATE',
        y=particle_loc[loc],
        color='Data',
        strokeDash='Data',
    ).properties(
        title='Plot of Actual vs Predicted for KNN model for ' +
        particle[loc]+' particle'
    )
    st.altair_chart(chart, use_container_width=True)


def get_xgboost(loc):
    xgboost_y_test = pd.read_excel('Models_OPC/xgboost_y_test.xlsx')
    xgboost_y_test_pred = pd.read_excel('Models_OPC/xgboost_y_test_pred.xlsx')
    xgboost_y_test=xgboost_y_test[['DATE',particle_loc[loc],'Data']]
    xgboost_y_test_pred=xgboost_y_test_pred[['DATE',particle_loc[loc],'Data']]

    frames = [xgboost_y_test,xgboost_y_test_pred]

    results = pd.concat(frames)
    st.dataframe=frames

    chart = alt.Chart(results.reset_index()).mark_line().encode(
        x='DATE',
        y=particle_loc[loc],
        color='Data',
        strokeDash='Data',
    ).properties(
        title='Plot of Actual vs Predicted for Xgboost model for ' +
        particle[loc]+' particle'
    )
    st.altair_chart(chart, use_container_width=True)


def get_randomforest(loc):
    randomforest_y_test = pd.read_excel('Models_OPC/randomforest_y_test.xlsx')
    randomforest_y_test_pred = pd.read_excel('Models_OPC/randomforest_y_test_pred.xlsx')
    randomforest_y_test=randomforest_y_test[['DATE',particle_loc[loc],'Data']]
    randomforest_y_test_pred=randomforest_y_test_pred[['DATE',particle_loc[loc],'Data']]

    frames = [randomforest_y_test,randomforest_y_test_pred]

    results = pd.concat(frames)
    st.dataframe=frames

    chart = alt.Chart(results.reset_index()).mark_line().encode(
        x='DATE',
        y=particle_loc[loc],
        color='Data',
        strokeDash='Data',
    ).properties(
        title='Plot of Actual vs Predicted for Randomforest model for ' +
        particle[loc]+' particle'
    )
    st.altair_chart(chart, use_container_width=True)


def get_linear_regression(loc):
    xgboost_y_test = loadtxt('Models_OPC/linearregression_y_test.csv', delimiter=',')
    xgboost_y_test_pred = loadtxt(
        'Models_OPC/linearregression_y_test_pred.csv', delimiter=',')
    l1 = list()
    l1.append(['Y_Actual']*n)
    l1.append(np.round(xgboost_y_test[:n, loc], 9))
    l1.append(list(range(1, n+1)))
    temp1 = np.array(l1).transpose()
    x1 = list(range(1, n+1))

    chart_data1 = pd.DataFrame(temp1, x1, columns=['Data', particle[loc], 'X'])

    l2 = list()
    l2.append(['Y_Predicted']*n)
    l2.append(np.round(xgboost_y_test_pred[:n, loc], 9))
    l2.append(list(range(1, n+1)))
    temp2 = np.array(l2).transpose()
    x2 = list(range(n+1, 2*n+1))

    chart_data2 = pd.DataFrame(temp2, x2, columns=['Data', particle[loc], 'X'])

    frames = [chart_data1, chart_data2]

    results = pd.concat(frames)

    chart = alt.Chart(results.reset_index()).mark_line().encode(
        x='X',
        y=particle[loc],
        color='Data',
        strokeDash='Data',
    ).properties(
        title='Plot of Actual vs Predicted for Linear Regression model for ' +
        particle[loc]+' particle'
    )
    st.altair_chart(chart, use_container_width=True)


def get_lasso(loc):
    xgboost_y_test = loadtxt('Models_OPC/lasso_y_test.csv', delimiter=',')
    xgboost_y_test_pred = loadtxt(
        'Models_OPC/lasso_y_test_pred.csv', delimiter=',')
    l1 = list()
    l1.append(['Y_Actual']*n)
    l1.append(np.round(xgboost_y_test[:n, loc], 9))
    l1.append(list(range(1, n+1)))
    temp1 = np.array(l1).transpose()
    x1 = list(range(1, n+1))

    chart_data1 = pd.DataFrame(temp1, x1, columns=['Data', particle[loc], 'X'])

    l2 = list()
    l2.append(['Y_Predicted']*n)
    l2.append(np.round(xgboost_y_test_pred[:n, loc], 9))
    l2.append(list(range(1, n+1)))
    temp2 = np.array(l2).transpose()
    x2 = list(range(n+1, 2*n+1))

    chart_data2 = pd.DataFrame(temp2, x2, columns=['Data', particle[loc], 'X'])

    frames = [chart_data1, chart_data2]

    results = pd.concat(frames)

    chart = alt.Chart(results.reset_index()).mark_line().encode(
        x='X',
        y=particle[loc],
        color='Data',
        strokeDash='Data',
    ).properties(
        title='Plot of Actual vs Predicted for Lasso Regression model for ' +
        particle[loc]+' particle'
    )
    st.altair_chart(chart, use_container_width=True)

