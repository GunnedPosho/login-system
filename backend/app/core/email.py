import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_HOST = "localhost"
SMTP_PORT = 1025
FROM_EMAIL = "noreply@login-system.dev"


def send_verification_email(email: str, token: str) -> None:
    verification_url = f"http://localhost:5173/verify-email?token={token}"

    message = MIMEMultipart()
    message["From"] = FROM_EMAIL
    message["To"] = email
    message["Subject"] = "Verifica tu email"

    body = f"""
    <h2>Bienvenido</h2>
    <p>Haz clic en el siguiente link para verificar tu cuenta:</p>
    <a href="{verification_url}">{verification_url}</a>
    <p>Este link expira en 24 horas.</p>
    """

    message.attach(MIMEText(body, "html"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.sendmail(FROM_EMAIL, email, message.as_string())