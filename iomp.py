# Data Loading: Load vehicle emissions dataset using pandas
import pandas as pd

# Replace 'vehicle_emissions.csv' with your actual dataset filename
file_path = 'vehicle_emissions.csv'
df = pd.read_csv(file_path)

# Display the first few rows
print(df.head())
