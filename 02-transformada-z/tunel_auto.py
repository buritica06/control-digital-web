"""
Túnel con autoreconexión automática para la visualización web 3D de la Semana 2.
Reinicia el túnel si el servidor remoto cierra la conexión.
"""

import subprocess
import time
import re
import os

TUNNEL_LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tunel_url.txt")

def start_tunnel(port=8086):
    cmd = [
        "ssh",
        "-o", "StrictHostKeyChecking=no",
        "-o", "ServerAliveInterval=30",
        "-o", "ServerAliveCountMax=5",
        "-R", f"80:127.0.0.1:{port}",
        "nokey@localhost.run"
    ]
    
    while True:
        try:
            print(f"[TUNEL] Iniciando conexión SSH con localhost.run hacia puerto {port}...")
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding="utf-8",
                errors="replace"
            )
            
            for line in process.stdout:
                print(line, end="")
                match = re.search(r"https://[a-zA-Z0-9.-]+\.lhr\.life", line)
                if match:
                    url = match.group(0)
                    with open(TUNNEL_LOG, "w", encoding="utf-8") as f:
                        f.write(url + "\n")
                    print(f"\n>>> URL PUBLICA ACTIVA: {url} <<<\n", flush=True)
            
            process.wait()
            print("[TUNEL] Conexión cerrada por el servidor. Reconectando en 5 segundos...")
            time.sleep(5)
        except Exception as e:
            print(f"[TUNEL] Error: {e}. Reintentando en 10 segundos...")
            time.sleep(10)

if __name__ == "__main__":
    start_tunnel()
