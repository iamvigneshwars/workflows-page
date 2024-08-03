import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import useFetchNamespaces from "../../hooks/useFetchNamespaces";
import useFetchWorkflows from "../../hooks/useFetchWorkflows";

interface NamespaceSelectProps {
  selectedNamespace: string;
  handleChange: (event: SelectChangeEvent) => void;
}

const NamespaceSelect: React.FC<NamespaceSelectProps> = React.memo(
  ({ selectedNamespace, handleChange }) => {
    const namespaces = useFetchNamespaces();

    useFetchWorkflows();

    return (
      <Box sx={{ maxWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="namespace-label">Namespaces</InputLabel>
          <Select
            labelId="namespace-label"
            id="namespace-select"
            value={selectedNamespace}
            label="Namespaces"
            onChange={handleChange}
          >
            {namespaces.map((namespace) => (
              <MenuItem key={namespace} value={namespace}>
                {namespace}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
);

export default NamespaceSelect;
