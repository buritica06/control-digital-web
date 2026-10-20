"""
Servidor HTTP Local para la Aplicación Web 3D de la Semana 2
MEC36 - Control II: Transformada Z, Funciones Elementales y Teoremas Operacionales
Institución Universitaria de Barranquilla (IUB)
"""

import http.server
import socketserver
import webbrowser
import os
import sys

DEFAULT_PORT = 8086
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        sys.stdout.write(f"[{self.log_date_time_string()}] {args[0]} {args[1]}\n")

def find_available_port(start_port=8086, max_attempts=20):
    import socket
    for port in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('127.0.0.1', port)) != 0:
                return port
    return start_port

def run():
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    port = find_available_port(DEFAULT_PORT)
    url = f"http://localhost:{port}/index.html"
    
    print("=" * 70)
    print("  [ONLINE] SERVIDOR WEB LOCAL ACTIVO - MEC36 CONTROL II")
    print("  [MODULO] Semana 2: Transformada Z, Funciones Elementales y Teoremas 3D")
    print(f"  [URL]    {url}")
    print(f"  [DIR]    {DIRECTORY}")
    print("  Presiona Ctrl+C para detener el servicio.")
    print("=" * 70)

    if "--no-browser" not in sys.argv:
        try:
            webbrowser.open(url)
            print("  [OK] Navegador web abierto automaticamente.")
        except Exception as e:
            print(f"  [AVISO] No se pudo abrir automaticamente el navegador: {e}")
            print(f"  Por favor abre manualmente: {url}")

    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", port), CustomHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido con éxito.")

if __name__ == "__main__":
    run()
