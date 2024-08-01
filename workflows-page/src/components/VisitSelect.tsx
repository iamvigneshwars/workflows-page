import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { Visit } from "./Workflows";

interface VisitSelectProps {
  visits: Visit[];
  selectedVisitId: string;
  handleChange: (event: SelectChangeEvent) => void;
}

const VisitSelect: React.FC<VisitSelectProps> = ({
  visits,
  selectedVisitId,
  handleChange,
}) => {
  const uniqueVisits = visits.filter(
    (visit, index, self) => index === self.findIndex((v) => v.id === visit.id)
  );
  return (
    <Box sx={{ maxWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="visits-label">Visits</InputLabel>
        <Select
          labelId="visits-label"
          id={selectedVisitId}
          value={selectedVisitId}
          label="Visits"
          onChange={handleChange}
        >
          {uniqueVisits.map((visit) => (
            <MenuItem key={visit.id} value={visit.id}>
              {visit.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default VisitSelect;
