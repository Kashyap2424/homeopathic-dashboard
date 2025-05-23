// React Imports
import { useEffect, useRef } from "react";

// Config Imports
import config from "../../../../utils/config";

const LiveVideoSender = ({ stream }) => {
  const wsRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const hoveredPointRef = useRef(null);
  const points = []; // Replace with actual points data

  useEffect(() => {
    if (!stream) return;

    const ws = new WebSocket(`${config.WEB_SOCKET_URL}/ws/stream`);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp8", // Make sure backend supports this
      });
      recorder.onstart = () => {
        console.log("MediaRecorder started");

        // Send initial data if needed
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
            ws.send({
              type: "image",
              image: event.data,
              hovered: hoveredPointRef.current,
              points: JSON.stringify(points),
            });
          }
        };
        recorder.start(100); // Send a video blob every 100ms
      };
    };

    return () => {
      mediaRecorderRef.current?.stop();
      wsRef.current?.close();
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return null; // This component just streams; no UI
};

export default LiveVideoSender;
