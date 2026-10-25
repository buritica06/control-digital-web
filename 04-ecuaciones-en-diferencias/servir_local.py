"""
Servidor HTTP Local para la Plataforma Interactiva de Ecuaciones en Diferencias (Semana 04)
MEC36 - Control II | Institución Universitaria de Barranquilla (IUB)
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8084

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print(f"[+] Servidor educativo activo en: {url}")
        webbrowser.open(url)
        httpd.serve_forever()
