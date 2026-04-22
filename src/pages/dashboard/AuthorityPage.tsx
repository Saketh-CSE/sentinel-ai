import { useEffect, useState } from "react";
import { ShieldCheck, Trash2, UserPlus } from "lucide-react";

const API = "http://127.0.0.1:5000/api/authorities";

type Authority = {
  id: number;
  name: string;
  email: string;
  location: string;
  type: string;
};

const AuthorityPage = () => {
  const [authorities, setAuthorities] = useState<Authority[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const [available, setAvailable] = useState(true);

  const fetchAuthorities = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      if (data.length === 0) {
        const sampleAuthorities = [
          {
            name: "Vijay Kumar",
            email: "fire.vijay@gov.in",
            location: "Vijayawada",
            type: "Fire Department",
          },
          {
            name: "Inspector Ravi",
            email: "police.ravi@gov.in",
            location: "Hyderabad",
            type: "Police",
          },
          {
            name: "Dr. Priya Sharma",
            email: "medical.priya@gov.in",
            location: "Chennai",
            type: "Medical",
          },
          {
            name: "Arjun Reddy",
            email: "dma.arjun@gov.in",
            location: "Visakhapatnam",
            type: "State Authority",
          },
          {
            name: "Kiran Kumar",
            email: "rescue.kiran@gov.in",
            location: "Guntur",
            type: "Rescue Team",
          },
        ];

        for (const auth of sampleAuthorities) {
          await fetch(API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(auth),
          });
        }

        const newRes = await fetch(API);
        const newData = await newRes.json();
        setAuthorities(newData);
      } else {
        setAuthorities(data);
      }
    } catch (err) {
      console.error("Error fetching authorities", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorities();
  }, []);

  const addAuthority = async () => {
    if (!name || !email || !location || !type) {
      alert("Please fill all fields");
      return;
    }

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, location, type }),
    });

    setName("");
    setEmail("");
    setLocation("");
    setType("");

    fetchAuthorities();
  };

  const deleteAuthority = async (id: number) => {
    if (!confirm("Delete this authority?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchAuthorities();
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          AIR Authority Command
        </h1>
        <p className="text-slate-500 mt-2">
          Manage emergency responders and disaster coordination teams
        </p>
      </div>

      {/* System Authority Card */}
      <div className="bg-white rounded-xl shadow border p-6 flex justify-between items-center">

        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <ShieldCheck className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">System Authority</h2>
            <p className="text-sm text-slate-500">
              Disaster Coordination Unit
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <span
            className={`px-4 py-1 text-xs rounded-full font-medium ${
              available
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {available ? "Available" : "Unavailable"}
          </span>

          <button
            onClick={() => setAvailable(!available)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Toggle Availability
          </button>

        </div>
      </div>

      {/* Add Authority Form */}
      <div className="bg-white rounded-xl shadow border p-6 space-y-6">

        <div className="flex items-center gap-2">
          <UserPlus size={18} />
          <h2 className="text-lg font-semibold">Add Authority</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">

          <input
            placeholder="Name"
            className="border rounded-lg p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="border rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Location"
            className="border rounded-lg p-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            placeholder="Type (city/state/village)"
            className="border rounded-lg p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

        </div>

        <button
          onClick={addAuthority}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Authority
        </button>

      </div>

      {/* Authorities Table */}
      <div className="bg-white rounded-xl shadow border p-6">

        <h2 className="text-lg font-semibold mb-6">
          Registered Authorities
        </h2>

        {loading ? (
          <p className="text-slate-500">Loading authorities...</p>
        ) : authorities.length === 0 ? (
          <p className="text-slate-500">No authorities registered.</p>
        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Location</th>
                  <th className="text-left px-4 py-3">Role</th>
                  <th className="text-right px-4 py-3">Action</th>
                </tr>
              </thead>

              <tbody>

                {authorities.map((auth) => (
                  <tr
                    key={auth.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-4 py-3 font-medium">
                      {auth.name}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {auth.email}
                    </td>

                    <td className="px-4 py-3 text-slate-600">
                      {auth.location}
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                        {auth.type}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">

                      <button
                        onClick={() => deleteAuthority(auth.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default AuthorityPage;