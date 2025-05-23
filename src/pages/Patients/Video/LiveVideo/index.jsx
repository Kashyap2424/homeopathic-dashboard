// React Imports
import React, { useEffect, useRef, useState, memo } from "react";
import config from "../../../../utils/config";

const LiveVideo = (props) => {
  // Props
  const { points, stream, plainVideo } = props;

  // States
  const [landmarkPoints, setLandmarkPoints] = useState([]);
  const [wsStatus, setWsStatus] = useState("disconnected");

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const wsRef = useRef(null);
  const hoveredPointRef = useRef(null);

  // Hooks
  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (video) {
        video.srcObject = null;
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (!stream) {
      console.error("No stream available");
      return;
    }

    console.log(
      "Attempting to connect to WebSocket:",
      `${config.WEB_SOCKET_URL}/ws/stream`
    );
    const socket = new WebSocket(`${config.WEB_SOCKET_URL}/ws/stream`);
    wsRef.current = socket;

    // WebSocket event handlers
    socket.onopen = () => {
      console.log("WebSocket connection established");
      setWsStatus("connected");
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
      setWsStatus("disconnected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setWsStatus("error");
    };

    socket.onmessage = (event) => {
      console.log("Received message from server:", event.data);
      try {
        const response = JSON.parse(event.data);
        setLandmarkPoints(response.landmarks);
      } catch (error) {
        console.error("Error parsing server message:", error);
      }
    };

    handleStartStream(stream);

    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
        console.log("MediaRecorder stopped");
      }
      if (socket.readyState === WebSocket.OPEN) {
        // socket.close();
        console.log("WebSocket connection closed");
      }
    };
  }, [points, stream]);

  // Handlers
  const handleStartStream = async (stream) => {};

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let nearest = null;
    let minDist = Infinity;

    landmarkPoints.forEach((pt) => {
      const dx = pt.x - mouseX;
      const dy = pt.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 20 && dist < minDist) {
        minDist = dist;
        nearest = pt.name;
      }
    });

    hoveredPointRef.current = nearest;
  };

  return (
    <div className="w-full h-full flex md:flex-row flex-col gap-4 items-center justify-center-safe">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={
          plainVideo ? "w-full h-full rounded-lg overflow-hidden" : "hidden"
        }
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        onMouseMove={handleMouseMove}
        className="w-full h-full rounded-lg overflow-hidden"
      />
    </div>
  );
};

LiveVideo.propTypes = {};

export default memo(LiveVideo);
