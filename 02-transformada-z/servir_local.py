#!/usr/bin/env python3
"""
Servidor HTTP local rápido para previsualizar la plataforma de la Semana 2.
Uso:
    python servir_local.py [puerto]
"""

import http.server
import socketserver
import sys
import webbrowser
import os

PUERTO_DEFECTO = 8080

def main():
    puerto = int(sys.argv[1]) if len(sys.argv) > 1 else PUERTO_DEFECTO
    directorio = os.path.dirname(os.path.abspath(__file__))
    os.chdir(directorio)

    handler = http.server.SimpleHTTPRequestHandler
    handler.extensions_map.update({
        '.js': 'application/javascript',
        '.mjs': 'application/javascript',
        '.css': 'text/css',
        '.html': 'text/html',
        '.png': 'image/png',
        '.svg': 'image/svg+xml',
    })

    try:
        with socketserver.TCPServer(("", puerto), handler) as httpd:
            url = f"http://localhost:{puerto}/index.html"
            print(f"============================================================")
            print(f"  MEC36 Control II - Semana 2: Transformada Z (IUB)")
            print(f"  Servidor local activo en: {url}")
            print(f"  Presiona Ctrl+C para detener el servidor.")
            print(f"============================================================")
            webbrowser.open(url)
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 98 or e.errno == 10048:
            print(f"El puerto {puerto} está en uso. Probando puerto {puerto + 1}...")
            sys.argv[1] = str(puerto + 1)
            main()
        else:
            raise

if __name__ == '__main__':
    main()
