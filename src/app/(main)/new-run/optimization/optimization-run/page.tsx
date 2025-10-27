"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ul/Button";
import { useRouter } from "next/navigation";
import { useDryerStore } from "@/store/useDryerStore";
import { useSensorStore } from "@/store/useSensorStore";
import { FaCircleExclamation } from "react-icons/fa6";

const OptimizationRunScreen = () => {
  const router = useRouter();
  const { runData } = useDryerStore();
  const { data: sensorData, setData } = useSensorStore();
  const [dryingProgress, setDryingProgress] = useState(45);
  const [error, setError] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl =
      "ws://bipel2bpd2pgq3ojogco5nujky0icbnh.lambda-url.eu-north-1.on.aws/ws/sensor";

    const connectWebSocket = () => {
      const socket = new WebSocket(wsUrl);
      wsRef.current = socket;

      socket.onopen = () => setError("");

      socket.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          setData(parsed);

          if (parsed.humidity) {
            const humidityNum = Number(parsed.humidity);
            const progress = Math.max(0, Math.min(100, 100 - humidityNum / 2));
            setDryingProgress(progress);
          }
        } catch {
          setError("Invalid sensor data format");
        }
      };

      socket.onerror = () => setError("WebSocket error: cannot get data");
      socket.onclose = () => setError("Connection closed. Reconnecting...");

      setTimeout(() => {
        if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
          connectWebSocket();
        }
      }, 3000);
    };

    connectWebSocket();

    return () => wsRef.current?.close();
  }, [setData]);

  return (
    <div>
      <h2 className="text-text-primary text-2xl text-center">
        Live Performance feed
      </h2>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <div className="grid grid-cols-2 gap-4 mt-8 border-x border-b-3 rounded-2xl p-6 border-secondary">
        <p>
          Material:{" "}
          <span className="text-text-primary">{runData.crop || "Peas"}</span>
        </p>
        <p>
          Dryer Type:{" "}
          <span className="text-text-primary">
            {runData.dryer || "Tray Dryer"}
          </span>
        </p>

        <p>
          Initial Moisture Content:{" "}
          <span className="text-text-primary">
            {runData.initial_moisture_content || "50%"}
          </span>
        </p>
        <p>
          Target Moisture Content:
          <span className="text-text-primary">
            {runData.final_moisture_content || "5%"}
          </span>
        </p>
        <p>
          Temperature:{" "}
          <span className="text-text-primary">
            {sensorData.temperature ?? "50°C"}
          </span>
        </p>
        <p>
          Relative Humidity:{" "}
          <span className="text-text-primary">
            {sensorData.humidity ?? "50"}
          </span>
        </p>
        <p>
          Vibration:{" "}
          <span
            className={`${
              sensorData.vibration && Number(sensorData.vibration) > 5
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {sensorData.vibration ?? "05"}
          </span>
        </p>
        <p>
          Timestamp:{" "}
          <span className="text-text-primary">
            {sensorData.timestamp
              ? new Date(sensorData.timestamp).toLocaleTimeString()
              : "-"}
          </span>
        </p>

        <p>
          Estimated Drying Time:{" "}
          <span className="text-text-primary">05h 34min</span>
        </p>
        <p>
          Estimated Time Left:{" "}
          <span className="text-text-primary">05h 34min</span>
        </p>
        <p>
          Estimated Current Moisture:{" "}
          <span className="text-text-primary">34%</span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <p>Drying Process:</p>
        <div className="grid gap-8 items-center grid-cols-[1fr_auto]">
          <div className="border border-black/40 bg-input-bg h-3 rounded-full">
            <div
              style={{ width: `${dryingProgress}%` }}
              className="bg-secondary h-full rounded-full transition-all duration-500"
            ></div>
          </div>
          <p className="text-text-primary">{Math.round(dryingProgress)}%</p>
        </div>
      </div>

      {/* Charts and optimization tips remain unchanged */}

      <div className="mt-8">
        <h3 className="text-text-primary mb-6">Optimization tips </h3>
        <ul className="grid gap-4">
          <li className="flex justify-between items-center border-b  border-b-secondary/20 pb-2">
            <div className="flex gap-2">
              <FaCircleExclamation className="text-text-primary w-5 h-6" />
              <p> Target Moisture Reached: Stop Drying. </p>
            </div>
            <span className="text-text-primary">1s</span>
          </li>
          <li className="flex justify-between border-b  border-b-secondary/20 pb-2">
            <div className="flex gap-2">
              <FaCircleExclamation className="text-text-primary w-6 h-6" />
              <p>
                Rapid Heating Detected: Sudden temperature increase may damage
                material. Verify heat control.
              </p>
            </div>
            <span className="text-text-primary">2s</span>
          </li>
          <li className="flex justify-between  border-b  border-b-secondary/20 pb-2">
            <div className="flex gap-2">
              <FaCircleExclamation className="text-text-primary w-6 h-6" />{" "}
              <p>
                Rapid Heating Detected: Sudden temperature increase may damage
                material. Verify heat control.
              </p>
            </div>
            <span className="text-text-primary">5s</span>
          </li>
        </ul>
      </div>

      {/* control buttons */}

      <div className="flex justify-evenly items-center gap-4 mt-8">
        <Button variant="outline" name={"Pause"} />
        <Button
          name={"End Run"}
          onClick={() =>
            router.push("/new-run/optimization/optimization-report")
          }
        />
        <Button disabled name={"Save Log"} />
        <Button variant="red" name={"Stop Monitoring"} />
      </div>
    </div>
  );
};

export default OptimizationRunScreen;
