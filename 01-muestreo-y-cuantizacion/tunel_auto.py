"""
Túnel con autoreconexión automática para la visualización web 3D.
Reinicia el túnel si el servidor remoto cierra la conexión.
"""

import subprocess
import time
import re
import os

TUNNEL_LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tunel_url.txt")

def start_tunnel():
    cmd = [
        "ssh",
        "-o", "StrictHostKeyChecking=no",
        "-o", "ServerAliveInterval=30",
        "-o", "ServerAliveCountMax=5",
        "-R", "80:127.0.0.1:8085",
        "nokey@localhost.run"
    ]
    
    while True:
        try:
            print("[TUNEL] Iniciando conexión SSH con localhost.run...")
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
                    print(f"\n>>> URL PUBLICA ACTIVA: {url} <<<\n")
            
            process.wait()
            print("[TUNEL] Conexión cerrada por el servidor. Reconectando en 5 segundos...")
            time.sleep(5)
        except Exception as e:
            print(f"[TUNEL] Error: {e}. Reintentando en 10 segundos...")
            time.sleep(10)

if __name__ == "__main__":
    start_tunnel()
