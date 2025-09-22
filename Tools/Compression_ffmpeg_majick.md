# Basic conversion from PNG to JPG
        magick convert input.png output.jpg

        # Basic conversion for multiple files
        magick mogrify -format jpg *.png

        # Resize and compress JPG images in one command
        magick mogrify -quality 90 -resize 800x *.jpg

        # Parameters explained:
        # quality 50       - Compression level (0-100, lower = smaller file)
        # resize 800x      - Resize to 800px width, maintain aspect ratio
        # *.jpg           - Process all JPG files in current directory

=============================================================================
# Compress MP4 video to very small size while maintaining reasonable quality

        ffmpeg -i input.mp4 -vf "scale=320:-2" -c:v libx264 -crf 30 -preset veryslow -c:a aac -b:a 32k output_tiny.mp4

        # Parameters explained:
        # scale=320:-2     - Resize to 320px width, auto-height (must be even number)
        # crf=30           - Quality (18-28 normal range, 30+ for smaller files)
        # preset=veryslow  - Best compression (takes longer but smaller file)
        # b:a 32k         - Audio bitrate (32k for smallest size)