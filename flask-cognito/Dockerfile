FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code
COPY src/ .

# Expose the port Streamlit runs on
EXPOSE 5000

# Command to run the Streamlit app
CMD ["python", "main.py"]
