#!/usr/bin/env python
# coding: utf-8

# Libraries for reading, cleaning and plotting the data
import numpy as np 
import pandas as pd 
import os

# Libraries for models 
from sklearn.linear_model import LinearRegression

def linear_model():
    '''This function generates a linear model to predict change in sea level rise in cm (global mean) given historical co2 emissions in gt'''
    # Read in training data 
    df= pd.read_excel("./slr_data.xlsx",sheet_name="data")
    #add a variable for change in sea level
    sl_chg =np.diff(df["sea_level (cm)"].to_numpy())
    #get the x variable without final year
    ppm_chg = np.diff(df["co2_ppm"].to_numpy())
    #create a new df for co2 emission(x) and change in sea level (y)
    new_df = pd.DataFrame(zip(sl_chg,ppm_chg),columns=["sl_chg","ppm_chg"])
    #create a new df for annual co2 emission(x) and change in co2 concentration (y)
    new_df2 = pd.DataFrame(zip(df["co2_gt"].iloc[0:-1],ppm_chg),columns=["co2_gt","ppm_chg"])
    
    
    #1-split the data into training and dev datasets
    training_df1 = new_df.sample(frac=0.8)
    dev_df1 = new_df.drop(training_df1.index)

    train_data1 = training_df1["ppm_chg"].to_numpy().reshape(-1,1)
    train_label1 = training_df1["sl_chg"].to_numpy()

    dev_data1 = dev_df1["ppm_chg"].to_numpy().reshape(-1,1)
    dev_label1 = dev_df1["sl_chg"].to_numpy()
    
    #fit a linear model-1
    model1 = LinearRegression()
    model1.fit(train_data1,train_label1)
    
    #2-split the data into training and dev datasets
    training_df2 = df.sample(frac=0.8)
    dev_df2 = df.drop(training_df2.index)

    train_data2 = training_df2["co2_ppm"].to_numpy().reshape(-1,1)
    train_label2 = training_df2["sea_level (cm)"].to_numpy()

    dev_data2 = dev_df2["co2_ppm"].to_numpy().reshape(-1,1)
    dev_label2 = dev_df2["sea_level (cm)"].to_numpy()
    
    #fit a linear model2
    model2 = LinearRegression()
    model2.fit(train_data2,train_label2)
    
    #3-split the data into training and dev datasets
    training_df3 = new_df2.sample(frac=0.8)
    dev_df3 = new_df2.drop(training_df3.index)

    train_data3 = training_df3["ppm_chg"].to_numpy().reshape(-1,1)
    train_label3 = training_df3["co2_gt"].to_numpy()

    dev_data3 = dev_df3["ppm_chg"].to_numpy().reshape(-1,1)
    dev_label3 = dev_df3["co2_gt"].to_numpy()
    
    #fit a linear model-3
    model3 = LinearRegression()
    model3.fit(train_data3,train_label3)


    pct_sl_chg = (df["sea_level (cm)"].iloc[-1]/df["sea_level (cm)"].iloc[0])**(1/len(df))
#     #score the model
    print("R2 for annual co2 change and sea level change model: ", model1.score(dev_data1,dev_label1))
    print("R2 for cumulative co2 and sea level model: ", model2.score(dev_data2,dev_label2))
    print("R2 for annual co2 concentration change and annual co2 emission model: ", model3.score(dev_data3,dev_label3))
    return model1, model2, model3, pct_sl_chg

#build our linear model
model_chg, model_cum, model_gt, annual_sl_chg = linear_model()

def gen_ppm(gt):
    base_line_ppm = 408.52 #2018 global co2 emission in ppm
    return base_line_ppm + round(float(model_gt.predict(np.array(gt).reshape(-1,1))),2)

def gen_slr(yr=2100,gt=-2.342):
    '''This function takes a co2 emission in gt, a year and gives slr change in meters by that year'''
    #predicts global mean sea level rise in meters.
    base_line_sl = 21.36 #2018 global mean sea level
    base_line_ppm = 408.52 #2018 global co2 emission in ppm
    num_years = yr - 2018
    ppm = gen_ppm(gt)
    if ppm <= base_line_ppm:
        return np.ceil(0.001*annual_sl_chg**num_years)#put a minimal sl rise(1mm) in case of very low emissions 
    else:
        return np.ceil(float(model_cum.predict(np.array([ppm]).reshape(-1,1)) - base_line_sl)/100*annual_sl_chg**num_years)
