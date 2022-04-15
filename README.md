# spark
**spark** is a projected portfolio application that aims to help those interested in FI/RE (Financial independence, retire early). 

Default functionality includes the ability to predict portfolio value over time based on a few key variables such as net income, percentage of net income saved, and time horizon to retirement. Advanced functionality allows users to modify default assumptions on portfolio returns (10% for S&P500 average returns), yearly inflation (3% based on a conservative YoY inflation rate.), and yearly raise percentage (3% based on national averages). 

spark has the functionality to add and remove assets from your portfolio using simple variables that are standard to most asset investors; whether it is real estate, motor vehicles, or gold, spark can project the asset's performance over time and how it may influence the user's retirement plans. 

The frontend is developed using **React**, **Chart.js**, **Semantic UI**, along with some homemade CSS to tune things for the componenents not covered by SUI. Spark uses Firebase **Firestore** as its NoSQL database for storing user details, asset characteristics, and handling authentication/login. 

Future additions: 'how it works' explaining the method of projection, refactoring large functions -> smaller, maintainable functions
