# AnnSetu | Bridging Hunger with Hope

AnnSetu is a web application designed to connect food providers (e.g. restaurants, households, event organizers) who have excess food with receivers (e.g. NGOs, charitable organizations, individuals in need).

This project features a fully functional frontend user interface and a Python Flask backend serving a SQLite database.

## Running Locally

To run the application locally on your machine:

1. **Install Python 3:**
   Ensure you have Python 3 installed. You can download it from [python.org](https://www.python.org/).

2. **Install Dependencies:**
   Open a terminal in this directory and install the necessary libraries:
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the Server:**
   Run the Flask server:
   ```bash
   python app.py
   ```
   The application will be accessible at: `http://localhost:8000`

## Live Deployment (Render / Heroku)

To officially host this project on the internet for free (e.g. using Render), follow these steps:

1. **Upload to GitHub:**
   Commit this directory to a GitHub repository.

2. **Create a Web Service on Render:**
   - Go to [Render](https://render.com/) and create a free account.
   - Click "New +" and select "Web Service".
   - Connect your GitHub repository.

3. **Configure the Service:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   
   *Note: If you plan to deploy to production, install gunicorn by adding `gunicorn` to the `requirements.txt` file.*

4. **Deploy:**
   Click "Create Web Service" and wait for the build to finish. Render will give you an official URL (e.g. `your-annsetu-app.onrender.com`).
