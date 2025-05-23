// React Imports
import React, { useEffect, useMemo, useState } from "react";

// React Router DOM Imports
import { useParams } from "react-router-dom";

// Custom Hooks
import { useGetProcedure } from "../../../hooks/procedures/useProcedures";

// Component Imports
import Loader from "../../../components/ui/Loader";
import LayoutCard from "../../../components/ui/Card/Layout";

// Views Imports
import LiveVideo from "./LiveVideo";
import LiveVideoSender from "./LiveVideoSender";
import LiveVideoReceiver from "./LiveVideoReceiver";

const VideoStream = (props) => {
  // Props
  const {} = props;

  // States
  const [stream, setStream] = useState(null);
  const [selectedArea, setSelectedArea] = useState([]);
  const [plainVideo, setPlainVideo] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  // Custom Hooks
  const { areas, isProcedureLoading, getProcedureHandler } = useGetProcedure();

  // Hooks
  const { id } = useParams();
  useMemo(() => {
    if (areas) {
      const selected = areas.filter((area) => area.selected);
      setSelectedArea(selected);
    }
  }, [areas]);

  useEffect(() => {
    getProcedureHandler(id);

    const askForPermission = async () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          window.location.reload(true);
        })
        .catch((err) => {
          console.log("Error in asking for camera permission: ", err);
        });
    };

    navigator.permissions.query({ name: "camera" }).then((result) => {
      if (result.state === "granted") {
        // No need to ask for permission
      } else if (result.state === "prompt") {
        askForPermission();
      } else if (result.state === "denied") {
        askForPermission();
      }
    });

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setVideoDevices(videoDevices);
      setSelectedDeviceId(videoDevices[0].deviceId);
    });
  }, []);

  useEffect(() => {
    if (!selectedDeviceId) return;
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setStream(stream);
    });
  }, [selectedDeviceId]);

  // Handlers
  const plainVideoHandler = () => {
    setPlainVideo(!plainVideo);
  };

  // Render
  const toggleButton = (display) => {
    return (
      <div className={display}>
        <label
          htmlFor="plain-video-toggle"
          className="flex items-center gap-1 cursor-pointer relative"
        >
          <input
            type="checkbox"
            id="plain-video-toggle"
            className="hidden"
            checked={plainVideo}
            onChange={plainVideoHandler}
          />
          <div
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition ${
              plainVideo ? "bg-violet-500" : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
          <div className="relative w-9 h-5 bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner">
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition ${
                plainVideo
                  ? "bg-violet-500 left-[1.5px] animate-switch-on"
                  : "bg-white dark:bg-gray-800 left-0 animate-switch-off"
              }`}
            />
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-white">
            Plain Video
          </span>
        </label>
      </div>
    );
  };

  return (
    <LayoutCard className="w-full p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between md:justify-between">
        <div className="flex md:items-center justify-between gap-2">
          <h2 className="md:text-2xl text-md font-bold dark:text-gray-100 text-left">
            Patient Video Stream
          </h2>

          {toggleButton(
            "flex md:hidden items-center justify-center-safe gap-2"
          )}
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="md:w-[230px] w-full">
            <select
              className={`w-full mt-2 p-2 border rounded-lg focus:outline-none dark:bg-gray-700/50 placeholder:text-sm dark:placeholder:text-gray-400`}
              value={selectedDeviceId}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
            >
              <option value="">Select a webcam</option>
              {videoDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </div>
          {toggleButton(
            "hidden md:flex items-center justify-center-safe gap-2"
          )}
        </div>
      </div>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />

      {isProcedureLoading ? (
        <div className="w-full h-full flex items-center justify-center-safe">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="mt-4 md:mt-0">
            <h4 className="text-md font-semibold text-gray-700 dark:text-white">
              Injection Areas:
            </h4>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {areas &&
                areas
                  .filter((area) => area.selected !== false)
                  .map((area, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={area.name}
                        name={area.name}
                        value={area.name}
                        defaultChecked={true}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedArea((prev) => [...prev, area]);
                          } else {
                            setSelectedArea((prev) =>
                              prev.filter((a) => a.name !== area.name)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={area.name}
                        className="ml-2 block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        {area.display}
                      </label>
                    </div>
                  ))}
            </div>
          </div>

          <div className="w-full h-full">
            {selectedDeviceId ? (
              <>
                {/* <LiveVideo
                  stream={stream}
                  points={selectedArea}
                  plainVideo={plainVideo}
                /> */}
                <LiveVideoSender stream={stream} />
                <LiveVideoReceiver />
              </>
            ) : (
              <div className="w-full h-screen flex items-center justify-center-safe">
                <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
                  No Webcam Selected
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </LayoutCard>
  );
};

VideoStream.propTypes = {};

export default VideoStream;
