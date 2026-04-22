import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type Disaster = {
  id: number;
  name: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: string;
  lat: number;
  lng: number;
};

const dummyDisasters: Disaster[] = [
  {
    id: 1,
    name: "Flood - Vijayawada",
    severity: "High",
    status: "Active",
    lat: 16.5062,
    lng: 80.648,
  },
  {
    id: 2,
    name: "Heatwave - Hyderabad",
    severity: "Medium",
    status: "Monitoring",
    lat: 17.385,
    lng: 78.4867,
  },
  {
    id: 3,
    name: "Cyclone - Chennai",
    severity: "Critical",
    status: "Emergency",
    lat: 13.0827,
    lng: 80.2707,
  },
];

const severityColor = {
  Low: "bg-green-100 text-green-600",
  Medium: "bg-yellow-100 text-yellow-600",
  High: "bg-orange-100 text-orange-600",
  Critical: "bg-red-100 text-red-600",
};

const defaultPosition: [number, number] = [16.5062, 80.648];

const MapController = ({ position }: { position: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 6, {
      animate: true,
      duration: 1.5,
    });
  }, [map, position]);

  return null;
};

const MapPage = () => {
  const [selected, setSelected] = useState<Disaster | null>(null);

  const currentPosition: [number, number] =
    selected ? [selected.lat, selected.lng] : defaultPosition;

  return (
    <div className="space-y-6">

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Live Disaster Map
        </h1>
        <p className="text-slate-500 mt-2">
          Monitor real-time disaster locations and severity levels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* MAP */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border h-[500px] overflow-hidden">

          <MapContainer
            // center/zoom props are not part of the current react-leaflet MapContainerProps
            // view is managed by MapController which will flyTo the desired position (with its own zoom)
            style={{ height: "100%", width: "100%" }}
          >

            <MapController position={currentPosition} />

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {dummyDisasters.map((d) => {

              const isSelected = selected?.id === d.id;

              const icon = new L.Icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                iconSize: isSelected ? [35, 55] : [25, 41],
                iconAnchor: [12, 41],
              });

              return (
                <Marker
                  key={d.id}
                  position={[d.lat, d.lng] as LatLngExpression}
                  {...({ icon } as any)}
                >
                  <Popup>
                    <strong>{d.name}</strong>
                    <br />
                    Severity: {d.severity}
                  </Popup>
                </Marker>
              );
            })}

          </MapContainer>

        </div>

        {/* Disaster List */}
        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">

          <h2 className="text-lg font-semibold">
            Active Disasters
          </h2>

          {dummyDisasters.map((disaster) => (
            <div
              key={disaster.id}
              onClick={() => setSelected(disaster)}
              className="p-4 rounded-lg border hover:bg-slate-50 cursor-pointer transition"
            >

              <div className="flex justify-between items-center">

                <p className="font-medium text-slate-700">
                  {disaster.name}
                </p>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    severityColor[disaster.severity]
                  }`}
                >
                  {disaster.severity}
                </span>

              </div>

              <p className="text-xs text-slate-500 mt-2">
                Status: {disaster.status}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Selected Info */}
      {selected && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">

          <div className="flex items-center gap-3 mb-4">
            <MapPin className="text-blue-600" />
            <h3 className="text-lg font-semibold">
              {selected.name}
            </h3>
          </div>

          <p className="text-sm text-slate-600">
            Severity Level: {selected.severity}
          </p>

          <p className="text-sm text-slate-600 mt-2">
            Current Status: {selected.status}
          </p>

        </div>
      )}

    </div>
  );
};

export default MapPage;