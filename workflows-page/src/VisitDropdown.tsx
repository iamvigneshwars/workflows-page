import React, { useEffect, useState } from "react";
import { request } from "graphql-request";
import { GET_VISITS, Visit, GetVisitsResponse } from "./graphql";

const endpoint = "http://localhost:4001/";

const VisitDropdown: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await request<GetVisitsResponse>(endpoint, GET_VISITS);
        setVisits(data.visits);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVisitId = parseInt(event.target.value);
    const visit = visits.find((visit) => visit.id === selectedVisitId) || null;
    setSelectedVisit(visit);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  //   return (
  //     <div className="container mt-4">
  //       <div className="row justify-content-center">
  //         <div className="col-md-6">
  //           <select
  //             className="form-select"
  //             onChange={handleChange}
  //             defaultValue=""
  //           >
  //             <option value="" disabled>
  //               Select a visit
  //             </option>
  //             {visits.map((visit) => (
  //               <option key={visit.id} value={visit.id}>
  //                 {visit.name}
  //               </option>
  //             ))}
  //           </select>
  //           {selectedVisit && (
  //             <div className="mt-3">
  //               <h2>{selectedVisit.name}</h2>
  //               <pre>{JSON.stringify(selectedVisit, null, 2)}</pre>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="container mt-4">
      <div className="col-md-6">
        <select className="form-select" onChange={handleChange} defaultValue="">
          <option value="" disabled>
            Select a visit
          </option>
          {visits.map((visit) => (
            <option key={visit.id} value={visit.id}>
              {visit.name}
            </option>
          ))}
        </select>
        {selectedVisit && (
          <div className="mt-3">
            <h2>{selectedVisit.name}</h2>
            <pre>{JSON.stringify(selectedVisit, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitDropdown;
