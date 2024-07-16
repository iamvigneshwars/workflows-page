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

  return (
    <div className="container px-4 py-4 bg-light">
      <div className="row justify-content-between mb-3">
        <div className="col-2">
          <select
            className="form-select"
            onChange={handleChange}
            defaultValue=""
          >
            <option value="" disabled>
              Select a visit
            </option>
            {visits.map((visit) => (
              <option key={visit.id} value={visit.id}>
                {visit.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-4">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="all"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              All
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="pending"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Pending
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="running"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Running
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio4"
              value="failed"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Failed
            </label>
          </div>
        </div>
      </div>
      {selectedVisit && (
        <div>
          {selectedVisit.workflows.map((workflow) => (
            <div key={workflow.id} className="row align-items-center mb-2 py-2">
              <div className="col-8">
                <h5>Workflow {workflow.id}</h5>
              </div>
              <div className="col-4 text-end">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id={`dropdownMenuButton${workflow.id}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tasks
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby={`dropdownMenuButton${workflow.id}`}
                  >
                    {workflow.tasks.map((task, index) => (
                      <li key={index}>
                        <a className="dropdown-item" href="#">
                          <strong>Task:</strong> {task.name} <br />
                          <strong>Status:</strong> {task.status}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisitDropdown;
