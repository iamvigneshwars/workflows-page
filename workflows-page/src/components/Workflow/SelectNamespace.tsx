import React, { useEffect, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { NAMESPACES_QUERY } from "../../queries/NamespacesQuery";
import type { NamespacesQuery } from "../../queries/__generated__/NamespacesQuery.graphql";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const NamespaceSelect: React.FC = () => {
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [selectedNamespace, setSelectedNamespace] = useState<string>("");

  const queryData = useLazyLoadQuery<NamespacesQuery>(NAMESPACES_QUERY, {});

  useEffect(() => {
    if (queryData && queryData.namespaces) {
      const validNamespaces: string[] = queryData.namespaces
        .filter((namespace): namespace is string => namespace != null)
        .map((namespace) => namespace as string);
      setNamespaces(validNamespaces);
    }
  }, [queryData]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedNamespace(event.target.value);
  };

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
};

export default NamespaceSelect;
