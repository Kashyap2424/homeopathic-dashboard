// React Imports
import React, { useEffect, useRef } from "react";

// Config Imports
import config from "../../../../utils/config";

const LiveVideoReceiver = () => {
  const videoRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const mediaSource = new MediaSource();
    mediaSourceRef.current = mediaSource;

    video.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener("sourceopen", () => {
      const mime = 'video/webm; codecs="vp8"';
      const sourceBuffer = mediaSource.addSourceBuffer(mime);
      sourceBuffer.mode = "segments";
      sourceBufferRef.current = sourceBuffer;

      const socket = new WebSocket(`${config.WEB_SOCKET_URL}/ws/stream`);
      socket.binaryType = "arraybuffer";

      socket.onmessage = (event) => {
        if (sourceBuffer.updating || mediaSource.readyState !== "open") return;
        sourceBuffer.appendBuffer(new Uint8Array(event.data));
      };

      socket.onclose = () => {
        console.log("WebSocket closed");
      };
    });

    return () => {
      videoRef.current?.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="w-full h-full rounded-lg overflow-hidden"
    />
  );
};

export default LiveVideoReceiver;
