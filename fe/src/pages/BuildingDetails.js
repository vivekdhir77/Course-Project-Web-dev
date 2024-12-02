import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS for proper rendering

// Create a custom SVG icon with `L.divIcon`
const markerIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function BuildingDetails() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [lister, setLister] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuildingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/listers/listings/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch listing details");
        }

        const data = await response.json();
        setBuilding(data.listing);
        setLister(data.lister);
        console.log("Building details", data);
      } catch (error) {
        console.error("Error fetching building details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildingDetails();
  }, [id]);

  const handleContactLandlord = () => {
    if (!isAuthenticated) {
      navigate("/signin", { state: { from: `/building/${id}` } });
      return;
    }

    if (lister && lister.contactInfo) {
      alert(
        `Contact the landlord at:\nEmail: ${lister.contactInfo.email}${
          lister.contactInfo.phone ? `\nPhone: ${lister.contactInfo.phone}` : ""
        }`
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !building) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error || "Building not found"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button and Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 pt-8 pb-24">
        <div className="container mx-auto px-6">
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="inline-flex items-center text-white hover:text-blue-100 transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>
          <h1 className="text-5xl font-bold text-white mb-6">Property Details</h1>
        </div>
      </div>

      {/* Building Details Card */}
      <div className="container mx-auto px-6 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-600">Distance from NEU</span>
                    <span className="font-semibold">{building.distanceFromUniv} miles</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-600">Monthly Rent</span>
                    <span className="font-semibold text-blue-600">${building.rent}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-600">Bedrooms</span>
                    <span className="font-semibold">{building.numberOfRooms}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-600">Bathrooms</span>
                    <span className="font-semibold">{building.numberOfBathrooms}</span>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-gray-600">Square Footage</span>
                    <span className="font-semibold">{building.squareFoot} sq ft</span>
                  </div>
                  {lister && (
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-gray-600">Listed By</span>
                      <span className="font-semibold">{lister.name}</span>
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Description</h2>
                <p className="text-gray-600 mb-8">{building.description}</p>
                <button
                  onClick={handleContactLandlord}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  {isAuthenticated ? "Contact Landlord" : "Sign In to Contact Landlord"}
                </button>
              </div>

              {/* Right Column (Map) */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
                <div style={{ height: "400px", width: "100%" }}>
                  <MapContainer
                    center={[building.latitude, building.longitude]}
                    zoom={14}
                    style={{ height: "100%", width: "100%" }}
                    className="leaflet-container"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker icon={markerIcon} position={[building.latitude, building.longitude]}>
                      <Popup>
                        <strong>{building.address}</strong>
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildingDetails;
