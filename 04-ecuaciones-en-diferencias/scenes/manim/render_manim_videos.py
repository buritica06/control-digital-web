"""
Script de Integración Automatizada entre Manim CE y el Sitio Web Educativo
Asignatura: MEC36 - Control II (Sistemas de Control en Tiempo Discreto)
Institución Universitaria de Barranquilla (IUB)

Este script:
1. Configura automáticamente el binario FFmpeg (vía imageio-ffmpeg o PATH del sistema).
2. Ejecuta Manim Community Edition sobre `scenes/manim/manim_scenes.py`.
3. Exporta los 4 videos MP4 optimizados directamente a `assets/videos/`.
4. Genera las capturas póster de alta resolución en `assets/images/`.
"""

import os
import sys
import shutil
import tempfile
import subprocess
from pathlib import Path


SCENES_MAP = [
    ("Scene01AlgebraicDevelopment", "scene_01_algebraic_dev.mp4", "poster_scene_01.png"),
    ("Scene02ZTransformShift", "scene_02_z_transform_ci.mp4", "poster_scene_02.png"),
    ("Scene03TimeEvolution", "scene_03_time_evolution.mp4", "poster_scene_03.png"),
    ("Scene04StabilityZPlane", "scene_04_stability_zplane.mp4", "poster_scene_04.png"),
]


def ensure_ffmpeg_in_path() -> str:
    """Garantiza que ffmpeg.exe esté disponible en el PATH para Manim."""
    ffmpeg_sys = shutil.which("ffmpeg")
    if ffmpeg_sys:
        return ffmpeg_sys

    try:
        import imageio_ffmpeg
        ffmpeg_bin = Path(imageio_ffmpeg.get_ffmpeg_exe())
        if ffmpeg_bin.exists():
            scripts_dir = Path(sys.executable).parent / "Scripts"
            scripts_dir.mkdir(parents=True, exist_ok=True)
            target_ffmpeg = scripts_dir / "ffmpeg.exe"
            if not target_ffmpeg.exists():
                shutil.copy2(ffmpeg_bin, target_ffmpeg)
            os.environ["PATH"] = str(scripts_dir) + os.pathsep + os.environ.get("PATH", "")
            return str(target_ffmpeg)
    except Exception as exc:
        print(f"[!] Aviso al configurar imageio-ffmpeg: {exc}")

    raise RuntimeError("No se encontró ffmpeg. Instale imageio-ffmpeg (`pip install imageio-ffmpeg`).")


def main():
    project_root = Path(__file__).resolve().parents[2]
    scenes_file = Path(__file__).resolve().parent / "manim_scenes.py"
    videos_dir = project_root / "assets" / "videos"
    images_dir = project_root / "assets" / "images"
    # Usar ruta corta en TEMP para evitar el límite MAX_PATH (260 chars) de Windows en OneDrive
    media_dir = Path(tempfile.gettempdir()) / "iub_manim_build"
    old_local_media = project_root / "scenes" / "manim" / "build_media"
    if old_local_media.exists():
        shutil.rmtree(old_local_media, ignore_errors=True)

    videos_dir.mkdir(parents=True, exist_ok=True)
    images_dir.mkdir(parents=True, exist_ok=True)
    media_dir.mkdir(parents=True, exist_ok=True)

    ffmpeg_exe = ensure_ffmpeg_in_path()
    print(f"[+] FFmpeg configurado: {ffmpeg_exe}")
    print(f"[+] Raíz del proyecto:  {project_root}")

    for scene_class, mp4_name, poster_name in SCENES_MAP:
        print(f"\n[*] Renderizando escena Manim: {scene_class} -> {mp4_name} ...")
        cmd = [
            sys.executable,
            "-m",
            "manim",
            "render",
            "-qm",
            "--fps",
            "30",
            "--media_dir",
            str(media_dir),
            str(scenes_file),
            scene_class,
        ]
        res = subprocess.run(cmd, cwd=str(project_root), capture_output=True, text=True)
        if res.returncode != 0:
            print(f"[!] Error en Manim ({scene_class}):\n{res.stderr}\n{res.stdout}")
            sys.exit(1)

        # Localizar el MP4 generado por Manim
        found_mp4 = list(media_dir.rglob(f"{scene_class}.mp4"))
        if not found_mp4:
            raise FileNotFoundError(f"No se encontró el archivo {scene_class}.mp4 en {media_dir}")

        src_mp4 = found_mp4[0]
        dst_mp4 = videos_dir / mp4_name
        shutil.copy2(src_mp4, dst_mp4)
        print(f"    [OK] Video copiado a: {dst_mp4} ({dst_mp4.stat().st_size / 1024:.1f} KB)")

        # Extraer fotograma póster (en t = 5.4 s) usando FFmpeg
        dst_poster = images_dir / poster_name
        poster_cmd = [
            ffmpeg_exe,
            "-y",
            "-ss",
            "00:00:05.40",
            "-i",
            str(dst_mp4),
            "-frames:v",
            "1",
            "-q:v",
            "2",
            str(dst_poster),
        ]
        subprocess.run(poster_cmd, capture_output=True)
        if dst_poster.exists():
            print(f"    [OK] Póster generado: {dst_poster.name}")

    # Limpiar carpeta temporal de compilación de Manim para no ensuciar el repositorio
    if media_dir.exists():
        shutil.rmtree(media_dir, ignore_errors=True)
        print("\n[+] Directorio temporal build_media limpiado.")

    print("\n[OK] Las 4 animaciones de Manim fueron generadas e integradas exitosamente en assets/videos/.")


if __name__ == "__main__":
    main()
